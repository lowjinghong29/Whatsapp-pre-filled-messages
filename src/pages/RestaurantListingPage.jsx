import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import RestaurantCard from '../components/RestaurantCard';
import Button from '../components/Button';
import { filterRestaurants, sortRestaurants } from '../utils/restaurantService';

const RestaurantListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [filters, setFilters] = useState({
        cuisines: searchParams.get('cuisine') ? [searchParams.get('cuisine')] : [],
        locations: [],
        priceRange: [],
    });
    const [sortBy, setSortBy] = useState('name');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    // Update restaurants when filters or search changes
    useEffect(() => {
        let results = filterRestaurants({
            ...filters,
            searchQuery,
        });
        results = sortRestaurants(results, sortBy);
        setRestaurants(results);
    }, [filters, searchQuery, sortBy]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Update URL params
        if (query) {
            searchParams.set('search', query);
        } else {
            searchParams.delete('search');
        }
        setSearchParams(searchParams);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="container-wide py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                        Browse Restaurants
                    </h1>
                    <p className="text-lg text-neutral-600 mb-6">
                        Discover and book your next dining experience
                    </p>

                    {/* Search Bar */}
                    <SearchBar onSearch={handleSearch} autoFocus={false} />
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-soft p-6">
                            <FilterPanel onFilterChange={handleFilterChange} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-neutral-700">
                                <span className="font-semibold">{restaurants.length}</span> restaurants found
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-neutral-600 hidden sm:inline">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                                    >
                                        <option value="name">Alphabetical</option>
                                        <option value="popular">Most Popular</option>
                                        <option value="recent">Recently Added</option>
                                    </select>
                                </div>

                                {/* Mobile Filter Button */}
                                <Button
                                    variant="secondary"
                                    size="small"
                                    icon={Filter}
                                    onClick={() => setMobileFilterOpen(true)}
                                    className="lg:hidden"
                                >
                                    Filters
                                </Button>
                            </div>
                        </div>

                        {/* Restaurant Grid */}
                        {restaurants.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {restaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
                                    No restaurants found
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilters({ cuisines: [], locations: [], priceRange: [] });
                                        searchParams.delete('search');
                                        searchParams.delete('cuisine');
                                        setSearchParams(searchParams);
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileFilterOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-strong overflow-y-auto animate-slide-up">
                        <FilterPanel
                            onFilterChange={handleFilterChange}
                            isMobile
                            onClose={() => setMobileFilterOpen(false)}
                        />
                        <div className="p-6 border-t border-neutral-200">
                            <Button
                                variant="primary"
                                size="large"
                                onClick={() => setMobileFilterOpen(false)}
                                className="w-full"
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantListingPage;
