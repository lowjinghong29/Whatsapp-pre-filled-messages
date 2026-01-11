import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { getAllCuisineTypes, getAllDistricts } from '../utils/restaurantService';
import Button from './Button';

const FilterPanel = ({ onFilterChange, isMobile = false, onClose }) => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

    const cuisines = getAllCuisineTypes();
    const locations = getAllDistricts();
    const priceRanges = [
        { value: 'budget', label: 'Budget ($)' },
        { value: 'mid-range', label: 'Mid-range ($$)' },
        { value: 'fine-dining', label: 'Fine Dining ($$$)' },
    ];

    const handleCuisineChange = (cuisine) => {
        const newCuisines = selectedCuisines.includes(cuisine)
            ? selectedCuisines.filter(c => c !== cuisine)
            : [...selectedCuisines, cuisine];

        setSelectedCuisines(newCuisines);
        applyFilters(newCuisines, selectedLocations, selectedPriceRanges);
    };

    const handleLocationChange = (location) => {
        const newLocations = selectedLocations.includes(location)
            ? selectedLocations.filter(l => l !== location)
            : [...selectedLocations, location];

        setSelectedLocations(newLocations);
        applyFilters(selectedCuisines, newLocations, selectedPriceRanges);
    };

    const handlePriceRangeChange = (priceRange) => {
        const newPriceRanges = selectedPriceRanges.includes(priceRange)
            ? selectedPriceRanges.filter(p => p !== priceRange)
            : [...selectedPriceRanges, priceRange];

        setSelectedPriceRanges(newPriceRanges);
        applyFilters(selectedCuisines, selectedLocations, newPriceRanges);
    };

    const applyFilters = (cuisines, locations, priceRanges) => {
        if (onFilterChange) {
            onFilterChange({
                cuisines,
                locations,
                priceRange: priceRanges,
            });
        }
    };

    const clearAllFilters = () => {
        setSelectedCuisines([]);
        setSelectedLocations([]);
        setSelectedPriceRanges([]);
        if (onFilterChange) {
            onFilterChange({
                cuisines: [],
                locations: [],
                priceRange: [],
            });
        }
    };

    const hasFilters = selectedCuisines.length > 0 || selectedLocations.length > 0 || selectedPriceRanges.length > 0;

    return (
        <div className={`${isMobile ? 'p-6' : ''}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-lg text-neutral-800">Filters</h3>
                </div>
                {isMobile && (
                    <button onClick={onClose} className="text-neutral-600 hover:text-neutral-800">
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Clear All */}
            {hasFilters && (
                <Button
                    variant="ghost"
                    size="small"
                    onClick={clearAllFilters}
                    className="w-full mb-4 justify-center"
                >
                    Clear All Filters
                </Button>
            )}

            {/* Cuisine Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Cuisine Type</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {cuisines.map((cuisine) => (
                        <label key={cuisine} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCuisines.includes(cuisine)}
                                onChange={() => handleCuisineChange(cuisine)}
                                className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-0 border-neutral-300 rounded cursor-pointer"
                            />
                            <span className="text-sm text-neutral-700 group-hover:text-primary transition-colors">
                                {cuisine}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Location</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {locations.slice(0, 10).map((location) => (
                        <label key={location} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                                className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-0 border-neutral-300 rounded cursor-pointer"
                            />
                            <span className="text-sm text-neutral-700 group-hover:text-primary transition-colors">
                                {location}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h4 className="font-semibold text-neutral-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedPriceRanges.includes(range.value)}
                                onChange={() => handlePriceRangeChange(range.value)}
                                className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-0 border-neutral-300 rounded cursor-pointer"
                            />
                            <span className="text-sm text-neutral-700 group-hover:text-primary transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
