import restaurantData from '../data/restaurantData.json';

/**
 * Get all restaurants
 */
export const getAllRestaurants = () => {
    return restaurantData;
};

/**
 * Get restaurant by ID
 */
export const getRestaurantById = (id) => {
    return restaurantData.find(restaurant => restaurant.id === id);
};

/**
 * Search restaurants by name (case-insensitive, fuzzy)
 */
export const searchRestaurants = (query) => {
    if (!query || query.trim() === '') {
        return restaurantData;
    }

    const lowerQuery = query.toLowerCase();
    return restaurantData.filter(restaurant =>
        restaurant.name.toLowerCase().includes(lowerQuery) ||
        restaurant.cuisineTypes.some(cuisine => cuisine.toLowerCase().includes(lowerQuery)) ||
        restaurant.locationDistrict.toLowerCase().includes(lowerQuery)
    );
};

/**
 * Filter restaurants by multiple criteria
 */
export const filterRestaurants = (filters = {}) => {
    let results = restaurantData;

    // Filter by cuisine types
    if (filters.cuisines && filters.cuisines.length > 0) {
        results = results.filter(restaurant =>
            restaurant.cuisineTypes.some(cuisine =>
                filters.cuisines.includes(cuisine)
            )
        );
    }

    // Filter by location/city
    if (filters.locations && filters.locations.length > 0) {
        results = results.filter(restaurant =>
            filters.locations.includes(restaurant.city) ||
            filters.locations.includes(restaurant.locationDistrict)
        );
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange.length > 0) {
        results = results.filter(restaurant =>
            filters.priceRange.includes(restaurant.priceRange)
        );
    }

    // Search query
    if (filters.searchQuery) {
        results = searchRestaurants(filters.searchQuery).filter(r =>
            results.some(res => res.id === r.id)
        );
    }

    return results;
};

/**
 * Sort restaurants by different criteria
 */
export const sortRestaurants = (restaurants, sortBy = 'name') => {
    const sorted = [...restaurants];

    switch (sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'popular':
            return sorted.sort((a, b) => b.reservationCount - a.reservationCount);
        case 'recent':
            // For MVP, just reverse the order (assuming newer restaurants are at the end)
            return sorted.reverse();
        default:
            return sorted;
    }
};

/**
 * Get unique cuisine types from all restaurants
 */
export const getAllCuisineTypes = () => {
    const cuisines = new Set();
    restaurantData.forEach(restaurant => {
        restaurant.cuisineTypes.forEach(cuisine => cuisines.add(cuisine));
    });
    return Array.from(cuisines).sort();
};

/**
 * Get unique cities
 */
export const getAllCities = () => {
    const cities = new Set();
    restaurantData.forEach(restaurant => {
        cities.add(restaurant.city);
    });
    return Array.from(cities).sort();
};

/**
 * Get unique districts/locations
 */
export const getAllDistricts = () => {
    const districts = new Set();
    restaurantData.forEach(restaurant => {
        districts.add(restaurant.locationDistrict);
    });
    return Array.from(districts).sort();
};

/**
 * Check if restaurant is currently open
 */
export const isRestaurantOpen = (restaurant) => {
    const now = new Date();
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

    const hours = restaurant.operatingHours[dayName];
    if (!hours || hours === 'Closed') {
        return false;
    }

    // Handle 24/7 restaurants
    if (hours === '00:00-23:59') {
        return true;
    }

    // Parse operating hours (e.g., "11:00-22:00" or "11:30-14:30, 18:30-22:30")
    const timeRanges = hours.split(',').map(range => range.trim());

    for (const range of timeRanges) {
        const [open, close] = range.split('-');
        const [openHour, openMin] = open.split(':').map(Number);
        const [closeHour, closeMin] = close.split(':').map(Number);

        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;

        if (currentTime >= openTime && currentTime <= closeTime) {
            return true;
        }
    }

    return false;
};

/**
 * Get featured restaurants (top by reservation count)
 */
export const getFeaturedRestaurants = (limit = 6) => {
    return sortRestaurants(restaurantData, 'popular').slice(0, limit);
};

/**
 * Get restaurants by cuisine type
 */
export const getRestaurantsByCuisine = (cuisineType) => {
    return restaurantData.filter(restaurant =>
        restaurant.cuisineTypes.includes(cuisineType)
    );
};
