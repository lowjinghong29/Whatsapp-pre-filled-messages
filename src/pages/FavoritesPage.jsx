import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getAllRestaurants } from '../utils/restaurantService';
import RestaurantCard from '../components/RestaurantCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const { favorites, clearFavorites } = useFavorites();
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const allRestaurants = getAllRestaurants();
        const favs = allRestaurants.filter(r => favorites.includes(r.id));
        setFavoriteRestaurants(favs);
    }, [favorites]);

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to remove all favorites?')) {
            clearFavorites();
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="container-wide py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Heart className="w-8 h-8 text-red-500 fill-current" />
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800">
                                My Favorites
                            </h1>
                        </div>
                        {favoriteRestaurants.length > 0 && (
                            <Button
                                variant="ghost"
                                size="small"
                                onClick={handleClearAll}
                                icon={X}
                            >
                                Clear All
                            </Button>
                        )}
                    </div>
                    <p className="text-lg text-neutral-600">
                        {favoriteRestaurants.length > 0
                            ? `You have ${favoriteRestaurants.length} saved ${favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'}`
                            : 'No saved restaurants yet'}
                    </p>
                </div>

                {/* Favorites Grid */}
                {favoriteRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
                            No favorites yet
                        </h3>
                        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                            Start exploring restaurants and click the heart icon to save your favorites for quick access
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/restaurants')}
                        >
                            Browse Restaurants
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
