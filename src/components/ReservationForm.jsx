import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Users, Calendar, Clock, Phone, MessageSquare } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from './Input';
import Button from './Button';
import MessagePreview from './MessagePreview';
import { sendReservationRequest, isValidMalaysianPhone } from '../utils/whatsappService';

const ReservationForm = ({ restaurant }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 86400000)); // Tomorrow
    const [selectedTime, setSelectedTime] = useState('19:00');
    const [showPreview, setShowPreview] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            name: '',
            partySize: 2,
            phone: '',
            specialRequests: '',
        },
    });

    const specialRequests = watch('specialRequests', '');

    // Generate time options (30-minute intervals from 11:00 AM to 11:00 PM)
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 11; hour <= 23; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                });
                times.push({ value: displayTime, label: displayTime });
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const onSubmit = (data) => {
        const formData = {
            ...data,
            date: selectedDate,
            time: selectedTime,
        };

        // Show preview modal
        setShowPreview(true);
    };

    const handleSendToWhatsApp = async () => {
        const formData = watch();
        const completeData = {
            ...formData,
            date: selectedDate,
            time: selectedTime,
        };

        setSubmitting(true);
        try {
            await sendReservationRequest(restaurant, completeData);
            // Note: We can't track if the user actually sends the message in WhatsApp
        } catch (error) {
            console.error('Error sending reservation:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-medium p-6 sticky top-24">
                <h3 className="text-2xl font-heading font-bold text-neutral-800 mb-6">
                    Make a Reservation
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <Input
                        label="Your Name"
                        type="text"
                        placeholder="Ahmad Zainal"
                        icon={User}
                        required
                        error={errors.name?.message}
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                            },
                            maxLength: {
                                value: 50,
                                message: 'Name must be less than 50 characters',
                            },
                        })}
                    />

                    {/* Party Size */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Party Size <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center space-x-4">
                            <Users className="w-5 h-5 text-neutral-400" />
                            <input
                                type="number"
                                min="1"
                                max="20"
                                className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                                {...register('partySize', {
                                    required: 'Party size is required',
                                    min: { value: 1, message: 'Minimum 1 person' },
                                    max: { value: 20, message: 'Maximum 20 people' },
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                        {errors.partySize && (
                            <p className="mt-1 text-sm text-red-600">{errors.partySize.message}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10 pointer-events-none" />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={new Date()}
                                maxDate={maxDate}
                                dateFormat="EEEE, dd MMM yyyy"
                                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10 pointer-events-none" />
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary appearance-none bg-white"
                            >
                                {timeOptions.map((time) => (
                                    <option key={time.value} value={time.value}>
                                        {time.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Phone */}
                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+60 12-345 6789"
                        icon={Phone}
                        required
                        helperText="Malaysian mobile number"
                        error={errors.phone?.message}
                        {...register('phone', {
                            required: 'Phone number is required',
                            validate: {
                                validPhone: (value) =>
                                    isValidMalaysianPhone(value) || 'Please enter a valid Malaysian mobile number',
                            },
                        })}
                    />

                    {/* Special Requests */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Special Requests (Optional)
                        </label>
                        <div className="relative">
                            <textarea
                                placeholder="E.g., Window seat, birthday celebration, dietary requirements..."
                                maxLength={200}
                                rows={3}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary resize-none"
                                {...register('specialRequests', {
                                    maxLength: {
                                        value: 200,
                                        message: 'Maximum 200 characters',
                                    },
                                })}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-neutral-400">
                                {specialRequests.length}/200
                            </div>
                        </div>
                        {errors.specialRequests && (
                            <p className="mt-1 text-sm text-red-600">{errors.specialRequests.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className="w-full"
                        icon={MessageSquare}
                    >
                        Preview & Send Request
                    </Button>
                </form>

                <p className="mt-4 text-xs text-center text-neutral-500">
                    You'll be redirected to WhatsApp to send your reservation request
                </p>
            </div>

            {/* Message Preview Modal */}
            {showPreview && (
                <MessagePreview
                    restaurant={restaurant}
                    formData={{
                        ...watch(),
                        date: selectedDate,
                        time: selectedTime,
                    }}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleSendToWhatsApp}
                    loading={submitting}
                />
            )}
        </>
    );
};

export default ReservationForm;
