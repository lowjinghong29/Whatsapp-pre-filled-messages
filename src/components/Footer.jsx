import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-white mt-20">
            <div className="container-wide py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🍽️</span>
                            <span className="text-xl font-heading font-bold">
                                ReserveNow<span className="text-primary">.my</span>
                            </span>
                        </div>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                            Book your table in seconds via WhatsApp. Making restaurant reservations easier for Malaysians.
                        </p>
                        <div className="flex items-center space-x-2 mt-4 text-sm text-neutral-300">
                            <MapPin className="w-4 h-4" />
                            <span>Built for Malaysia</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-neutral-300 hover:text-primary transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/restaurants" className="text-neutral-300 hover:text-primary transition-colors text-sm">
                                    Browse Restaurants
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-neutral-300 hover:text-primary transition-colors text-sm">
                                    My Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Get in Touch</h3>
                        <p className="text-neutral-300 text-sm mb-4">
                            Have questions or want to add your restaurant?
                        </p>
                        <a
                            href="mailto:hello@reservenow.my"
                            className="inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors text-sm"
                        >
                            <Mail className="w-4 h-4" />
                            <span>hello@reservenow.my</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-neutral-400 text-sm">
                        © {currentYear} ReserveNow.my. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-1 text-neutral-400 text-sm">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>in Malaysia</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
