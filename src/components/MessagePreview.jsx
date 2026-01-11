import React from 'react';
import { X, MessageSquare, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { generateMessage } from '../utils/whatsappService';

const MessagePreview = ({ restaurant, formData, onClose, onConfirm, loading }) => {
    const [copied, setCopied] = useState(false);

    const message = generateMessage(restaurant, formData);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-heading font-bold text-neutral-800">
                            Preview Your Message
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Message Preview */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl text-white shadow-medium">
                            <div className="flex items-start space-x-3 mb-4">
                                <MessageSquare className="w-6 h-6 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">WhatsApp Message</p>
                                    <p className="text-sm text-white text-opacity-80">
                                        This will be sent to {restaurant.name}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {message}
                                </pre>
                            </div>
                        </div>

                        {/* Copy Button */}
                        <div className="mt-4">
                            <Button
                                variant="ghost"
                                size="small"
                                onClick={handleCopy}
                                icon={copied ? Check : Copy}
                                className="w-full"
                            >
                                {copied ? 'Copied!' : 'Copy Message'}
                            </Button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6">
                        <h4 className="font-semibold text-neutral-800 mb-2">What happens next?</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-600">
                            <li>Click "Send via WhatsApp" below</li>
                            <li>Your WhatsApp will open with this pre-filled message</li>
                            <li>Review and tap Send in WhatsApp</li>
                            <li>The restaurant will receive your reservation request</li>
                            <li>They'll confirm via WhatsApp within a few hours</li>
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                        <Button
                            variant="secondary"
                            size="large"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Edit Details
                        </Button>
                        <Button
                            variant="primary"
                            size="large"
                            onClick={onConfirm}
                            loading={loading}
                            icon={MessageSquare}
                            className="flex-1"
                        >
                            Send via WhatsApp
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MessagePreview;
