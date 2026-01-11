import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('reservenow_favorites');
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (error) {
                console.error('Failed to load favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('reservenow_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (restaurantId) => {
        setFavorites(prev => {
            if (prev.includes(restaurantId)) {
                return prev;
            }
            return [...prev, restaurantId];
        });
    };

    const removeFavorite = (restaurantId) => {
        setFavorites(prev => prev.filter(id => id !== restaurantId));
    };

    const isFavorite = (restaurantId) => {
        return favorites.includes(restaurantId);
    };

    const toggleFavorite = (restaurantId) => {
        if (isFavorite(restaurantId)) {
            removeFavorite(restaurantId);
        } else {
            addFavorite(restaurantId);
        }
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
