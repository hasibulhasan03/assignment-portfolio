import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="font-bold text-xl">MyPortfolio</Link>
                </div>

                {/* Hamburger Menu Icon for Mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                    <Link to="/blog" className="hover:text-gray-300">Blog</Link>
                    <Link to="/service" className="hover:text-gray-300">Service</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                    <Link to="/dashboard/login" className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500">Login</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <Link to="/about" className="hover:text-gray-300">About</Link>
                        <Link to="/blog" className="hover:text-gray-300">Blog</Link>
                        <Link to="/service" className="hover:text-gray-300">Service</Link>
                        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                        <Link to="/dashboard/login" className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500 text-center">Login</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;