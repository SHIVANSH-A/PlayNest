import React from 'react';

function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-all duration-300 mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                    <p className="text-sm md:text-base text-center md:text-left">
                        © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">PlayNest</span>. All rights reserved.
                    </p>
                    <p className="text-sm md:text-base text-center md:text-right">
                        Designed & Built with 😁 by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Shivansh</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
