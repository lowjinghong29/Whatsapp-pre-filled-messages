import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Phone,
    Share2,
    Heart,
    DollarSign,
    Users,
    ExternalLink,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getRestaurantById, isRestaurantOpen } from '../utils/restaurantService';
import Button from '../components/Button';
import Card from '../components/Card';
import ReservationForm from '../components/ReservationForm';

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [restaurant, setRestaurant] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const data = getRestaurantById(id);
        if (data) {
            setRestaurant(data);
        } else {
            // Restaurant not found
            navigate('/restaurants');
        }
    }, [id, navigate]);

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🍽️</div>
                    <p className="text-neutral-600">Loading restaurant...</p>
                </div>
            </div>
        );
    }

    const isLiked = isFavorite(restaurant.id);
    const isOpen = isRestaurantOpen(restaurant);

    const priceSymbols = {
        'budget': '$',
        'mid-range': '$$',
        'fine-dining': '$$$',
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: restaurant.name,
                    text: `Check out ${restaurant.name} on ReserveNow.my`,
                    url: url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    const handleGetDirections = () => {
        const query = encodeURIComponent(restaurant.address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    };

    const handleDirectWhatsApp = () => {
        const phone = restaurant.whatsappNumber.replace(/\D/g, '');
        const url = `https://wa.me/${phone}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Image */}
            <div className="relative h-96 bg-neutral-200 overflow-hidden">
                <img
                    src={restaurant.heroImage}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 p-3 bg-white bg-opacity-90 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                    <ArrowLeft className="w-5 h-5 text-neutral-800" />
                </button>

                {/* Share & Favorite Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button
                        onClick={handleShare}
                        className="p-3 bg-white bg-opacity-90 rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                        <Share2 className="w-5 h-5 text-neutral-800" />
                    </button>
                    <button
                        onClick={() => toggleFavorite(restaurant.id)}
                        className="p-3 bg-white bg-opacity-90 rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                        <Heart
                            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-neutral-800'
                                }`}
                        />
                    </button>
                </div>

                {copied && (
                    <div className="absolute top-20 right-6 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-primary animate-slide-up">
                        Link copied!
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="container-wide py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-7 mb-8 lg:mb-0">
                        {/* Restaurant Info */}
                        <Card className="p-6 mb-6">
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                                {restaurant.name}
                            </h1>

                            {/* Cuisine Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {restaurant.cuisineTypes.map((cuisine, index) => (
                                    <span key={index} className="badge badge-primary">
                                        {cuisine}
                                    </span>
                                ))}
                            </div>

                            {/* Status Badge */}
                            <div className="mb-4">
                                {isOpen ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Open Now</span>
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                        <XCircle className="w-4 h-4" />
                                        <span>Closed</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-neutral-700 leading-relaxed mb-6">
                                {restaurant.description}
                            </p>

                            {/* Location */}
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-neutral-800 font-medium">{restaurant.address}</p>
                                    <button
                                        onClick={handleGetDirections}
                                        className="text-primary hover:text-primary-dark text-sm font-medium mt-1 flex items-center gap-1"
                                    >
                                        Get Directions
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Operating Hours */}
                            <details className="mb-4">
                                <summary className="flex items-center gap-3 cursor-pointer text-neutral-800 font-medium hover:text-primary transition-colors">
                                    <Clock className="w-5 h-5 text-neutral-400" />
                                    <span>Operating Hours</span>
                                </summary>
                                <div className="mt-3 ml-8 space-y-1">
                                    {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between text-sm">
                                            <span className="capitalize text-neutral-600">{day}</span>
                                            <span className="text-neutral-800 font-medium">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </details>

                            {/* Price Range */}
                            <div className="flex items-center gap-3 mb-4">
                                <DollarSign className="w-5 h-5 text-neutral-400" />
                                <span className="text-neutral-800 font-medium">
                                    {priceSymbols[restaurant.priceRange]} · {restaurant.priceRange}
                                </span>
                            </div>

                            {/* Contact */}
                            <div className="flex items-center gap-3 mb-4">
                                <Phone className="w-5 h-5 text-neutral-400" />
                                <span className="text-neutral-800 font-medium">{restaurant.whatsappNumber}</span>
                            </div>

                            {/* Social Proof */}
                            <div className="pt-4 border-t border-neutral-200">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm">
                                        <span className="font-semibold text-neutral-800">{restaurant.reservationCount}</span> people requested reservations here this month
                                    </span>
                                </div>
                            </div>

                            {/* Direct WhatsApp Chat */}
                            <div className="mt-6">
                                <Button
                                    variant="ghost"
                                    size="medium"
                                    onClick={handleDirectWhatsApp}
                                    icon={Phone}
                                    className="w-full sm:w-auto"
                                >
                                    Contact via WhatsApp (No Reservation)
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Reservation Form - Sidebar */}
                    <div className="lg:col-span-5">
                        <ReservationForm restaurant={restaurant} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetailPage;
