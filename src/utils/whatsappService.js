/**
 * Format reservation data into a WhatsApp message
 */
export const generateMessage = (restaurant, formData) => {
    const { name, partySize, date, time, phone, specialRequests } = formData;

    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-MY', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    // Format time (ensure it's in 12-hour format with AM/PM)
    const formattedTime = time;

    const message = `🍽️ RESERVATION REQUEST

Restaurant: ${restaurant.name}
Date: ${formattedDate}
Time: ${formattedTime}
Party Size: ${partySize} ${partySize === 1 ? 'person' : 'people'}
Name: ${name}
Contact: ${phone}

Special Requests:
${specialRequests || 'None'}

---
Sent via ReserveNow.my`;

    return message;
};

/**
 * Format phone number to international format without symbols
 * Input: +60 12-345 6789 or 0123456789
 * Output: 60123456789
 */
export const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');

    // If starts with 0, replace with country code 60
    if (cleaned.startsWith('0')) {
        cleaned = '60' + cleaned.substring(1);
    }

    // Ensure it has country code
    if (!cleaned.startsWith('60')) {
        cleaned = '60' + cleaned;
    }

    return cleaned;
};

/**
 * Create WhatsApp URL with pre-filled message
 */
export const createWhatsAppURL = (phoneNumber, message) => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Redirect user to WhatsApp with pre-filled message
 */
export const redirectToWhatsApp = (url) => {
    // Try to open WhatsApp in a new window/tab
    // On mobile, this will launch the WhatsApp app
    // On desktop, this will open WhatsApp Web
    const newWindow = window.open(url, '_blank');

    if (!newWindow) {
        // If popup was blocked, fallback to same window
        window.location.href = url;
    }

    return true;
};

/**
 * Send form data to Google Sheets via webhook
 */
export const sendToGoogleSheets = async (restaurant, formData) => {
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby_BB0XPBn8ci3ZtX3wlIuF1QXPCtLu0sqdhhCw6iLzyyMKVBNwoiks-NOiLHxmkwd5Og/exec';

    try {
        // Format date for Google Sheets
        const formattedDate = new Date(formData.date).toLocaleDateString('en-MY', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // Create the payload
        const payload = {
            timestamp: new Date().toISOString(),
            restaurantName: restaurant.name,
            restaurantId: restaurant.id,
            customerName: formData.name,
            partySize: formData.partySize,
            date: formattedDate,
            time: formData.time,
            phone: formData.phone,
            specialRequests: formData.specialRequests || 'None',
            status: 'Sent to WhatsApp'
        };

        // Send POST request to Google Sheets webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('Data sent to Google Sheets:', payload);
        return { success: true, payload };
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Don't block the WhatsApp redirect even if this fails
        return { success: false, error };
    }
};

/**
 * Send reservation request (combines all steps)
 */
export const sendReservationRequest = async (restaurant, formData) => {
    // Send to Google Sheets first
    await sendToGoogleSheets(restaurant, formData);

    // Then redirect to WhatsApp
    const message = generateMessage(restaurant, formData);
    const whatsappURL = createWhatsAppURL(restaurant.whatsappNumber, message);
    return redirectToWhatsApp(whatsappURL);
};

/**
 * Validate Malaysian phone number format
 */
export const isValidMalaysianPhone = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Malaysian mobile numbers are typically 10-11 digits (with or without country code)
    // Format: 01X-XXX XXXX (10 digits) or +60 1X-XXX XXXX (11-12 digits with country code)
    if (cleaned.length < 10 || cleaned.length > 12) {
        return false;
    }

    // Check if it starts with valid Malaysian mobile prefixes
    // 010, 011, 012, 013, 014, 015, 016, 017, 018, 019 (after removing country code)
    const withoutCountryCode = cleaned.startsWith('60') ? cleaned.substring(2) : cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;

    const validPrefixes = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
    return validPrefixes.some(prefix => withoutCountryCode.startsWith(prefix));
};
