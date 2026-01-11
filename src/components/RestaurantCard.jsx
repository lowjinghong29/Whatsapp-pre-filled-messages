import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Heart, Users } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import Card from './Card';
import Button from './Button';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const isLiked = isFavorite(restaurant.id);

    const priceSymbols = {
        'budget': '$',
        'mid-range': '$$',
        'fine-dining': '$$$',
    };

    const handleCardClick = () => {
        navigate(`/restaurants/${restaurant.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent card click
        toggleFavorite(restaurant.id);
    };

    return (
        <Card hover className="group relative">
            <div onClick={handleCardClick}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={restaurant.heroImage}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                    {/* Favorite Button */}
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:scale-110 transition-transform duration-200 z-10"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-neutral-600'
                                }`}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Restaurant Name */}
                    <h3 className="text-lg font-heading font-bold text-neutral-800 mb-2 line-clamp-1">
                        {restaurant.name}
                    </h3>

                    {/* Cuisine Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {restaurant.cuisineTypes.slice(0, 2).map((cuisine, index) => (
                            <span
                                key={index}
                                className="badge badge-primary text-xs"
                            >
                                {cuisine}
                            </span>
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-neutral-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-neutral-400" />
                        <span className="line-clamp-1">{restaurant.locationDistrict}</span>
                    </div>

                    {/* Price Range */}
                    <div className="flex items-center text-sm text-neutral-600 mb-3">
                        <DollarSign className="w-4 h-4 mr-1 text-neutral-400" />
                        <span className="font-medium">{priceSymbols[restaurant.priceRange]}</span>
                        <span className="ml-2 text-neutral-500">{restaurant.priceRange}</span>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                        <div className="flex items-center text-xs text-neutral-500">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{restaurant.reservationCount} reservations</span>
                        </div>
                        <Button size="small" variant="primary">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
