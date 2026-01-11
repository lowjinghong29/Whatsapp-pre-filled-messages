import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ListChecks, MessageCircle, ArrowRight, Utensils, Coffee, Globe } from 'lucide-react';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { getFeaturedRestaurants, getAllCuisineTypes } from '../utils/restaurantService';

const HomePage = () => {
    const navigate = useNavigate();
    const featuredRestaurants = getFeaturedRestaurants(6);
    const cuisineTypes = getAllCuisineTypes().slice(0, 8);

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/restaurants?search=${encodeURIComponent(query)}`);
        }
    };

    const howItWorks = [
        {
            icon: Search,
            title: 'Find Your Restaurant',
            description: 'Browse our curated directory of Malaysian restaurants',
        },
        {
            icon: ListChecks,
            title: 'Fill Reservation Details',
            description: 'Enter your name, party size, date, and preferences',
        },
        {
            icon: MessageCircle,
            title: 'Send via WhatsApp',
            description: 'Instant pre-filled message sent directly to the restaurant',
        },
    ];

    const cuisineIcons = {
        'Japanese': '🍱',
        'Chinese': '🥟',
        'Malay': '🍛',
        'Italian': '🍝',
        'Indian': '🍛',
        'Korean': '🍜',
        'Western': '🍔',
        'Thai': '🍜',
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero text-white py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light rounded-full blur-3xl"></div>
                </div>

                <div className="container-wide relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                            Find & Book Restaurants <br />
                            <span className="gradient-text bg-gradient-to-r from-primary to-primary-light">via WhatsApp</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-3xl mx-auto">
                            Send reservation requests instantly. No sign-up needed.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <SearchBar onSearch={handleSearch} autoFocus={false} />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="primary"
                                size="large"
                                onClick={() => navigate('/restaurants')}
                                icon={ArrowRight}
                                iconPosition="right"
                            >
                                Browse Restaurants
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">20+</div>
                                <div className="text-sm text-neutral-300 mt-1">Restaurants</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">3</div>
                                <div className="text-sm text-neutral-300 mt-1">Cities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">1000+</div>
                                <div className="text-sm text-neutral-300 mt-1">Reservations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="container-wide">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Reserve your table in just three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {howItWorks.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="relative text-center p-8 rounded-2xl border-2 border-neutral-200 hover:border-primary hover:shadow-medium transition-all duration-300 group"
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-medium group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Icon className="w-16 h-16 mx-auto text-primary" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-neutral-800 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-neutral-600">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Restaurants */}
            <section className="py-20 bg-neutral-50">
                <div className="container-wide">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-2">
                                Featured Restaurants
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Popular choices this month
                            </p>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/restaurants')}>
                            View All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Browse by Cuisine */}
            <section className="py-20 bg-white">
                <div className="container-wide">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                            Browse by Cuisine
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Discover your favorite flavors
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {cuisineTypes.map((cuisine) => (
                            <button
                                key={cuisine}
                                onClick={() => navigate(`/restaurants?cuisine=${cuisine}`)}
                                className="group p-6 bg-white border-2 border-neutral-200 rounded-2xl hover:border-primary hover:shadow-medium transition-all duration-300 text-center"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                    {cuisineIcons[cuisine] || '🍽️'}
                                </div>
                                <h3 className="font-semibold text-neutral-800 group-hover:text-primary transition-colors">
                                    {cuisine}
                                </h3>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-hero text-white">
                <div className="container-wide text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Ready to Make a Reservation?
                    </h2>
                    <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
                        Join hundreds of diners who are booking tables the easy way
                    </p>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={() => navigate('/restaurants')}
                        icon={ArrowRight}
                        iconPosition="right"
                    >
                        Start Browsing
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
