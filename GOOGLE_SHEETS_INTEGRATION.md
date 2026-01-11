# Google Sheets Integration

## Overview
This application now automatically sends reservation data to your Google Sheets via webhook when a user submits a reservation form.

## Webhook URL
```
https://script.google.com/macros/s/AKfycby_BB0XPBn8ci3ZtX3wlIuF1QXPCtLu0sqdhhCw6iLzyyMKVBNwoiks-NOiLHxmkwd5Og/exec
```

## Data Structure
The following data is sent to Google Sheets when a reservation is made:

```json
{
  "timestamp": "2026-01-11T06:20:36.000Z",
  "restaurantName": "Sushi Mentai TTDI",
  "restaurantId": "1",
  "customerName": "Ahmad Zainal",
  "partySize": 4,
  "date": "Saturday, 12 Jan 2026",
  "time": "7:00 PM",
  "phone": "+60 12-345 6789",
  "specialRequests": "Window seat, birthday celebration",
  "status": "Sent to WhatsApp"
}
```

## How It Works

1. User fills out the reservation form
2. User clicks "Preview & Send Request"
3. User confirms in the preview modal
4. **Data is sent to Google Sheets** via POST request to the webhook
5. User is redirected to WhatsApp with the pre-filled message

## Implementation Details

### Modified Files

1. **`src/utils/whatsappService.js`**
   - Added `sendToGoogleSheets()` function
   - Updated `sendReservationRequest()` to be async and call the Google Sheets webhook

2. **`src/components/ReservationForm.jsx`**
   - Updated `handleSendToWhatsApp()` to be async and properly handle the submission

### Error Handling

- If the Google Sheets webhook fails, the error is logged to the console
- The WhatsApp redirect still proceeds even if the webhook fails
- This ensures users can always complete their reservation request

## Testing

To test the integration:

1. Go to any restaurant page (e.g., http://localhost:5173/restaurants/1)
2. Fill out the reservation form
3. Click "Preview & Send Request"
4. Click "Send via WhatsApp"
5. Check your Google Sheets - a new row should appear with the reservation data
6. Check the browser console for the log: "Data sent to Google Sheets: {...}"

## Troubleshooting

### Data not appearing in Google Sheets

1. Check the browser console for errors
2. Verify your Google Apps Script webhook is deployed and accessible
3. Make sure the webhook accepts POST requests
4. Check that the Google Apps Script is properly configured to write to your sheet

### CORS Issues

- The integration uses `mode: 'no-cors'` which is required for Google Apps Script webhooks
- This means you won't get response data back, but the POST will still work
