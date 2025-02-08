import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-4 mt-8">
            &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </footer>
    );
};

export default Footer;
