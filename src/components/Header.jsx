import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, Home, List } from 'lucide-react';
import Button from './Button';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navigation = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Browse', path: '/restaurants', icon: List },
        { name: 'Favorites', path: '/favorites', icon: Heart },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-lg border-b border-neutral-200 shadow-sm">
            <nav className="container-wide py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl">🍽️</span>
                        <span className="text-xl font-heading font-bold text-secondary">
                            ReserveNow<span className="text-primary">.my</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 font-medium transition-colors duration-200 ${isActive(item.path)
                                            ? 'text-primary'
                                            : 'text-neutral-600 hover:text-primary'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-up">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive(item.path)
                                            ? 'bg-primary bg-opacity-10 text-primary'
                                            : 'text-neutral-600 hover:bg-neutral-100'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
