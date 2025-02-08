import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLanding = ({ user }) => {
    return (
        <div className="min-h-screen bg-[#1d1c22] flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold mb-4 text-white">
                Welcome, User!
            </h1>
            <p className="text-lg text-white mb-8">
                What would you like to manage today?
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
                <Link
                    to="/dashboard/blogs"
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                >
                    Blogs
                </Link>
                <Link
                    to="/dashboard/projects"
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
                >
                    Projects
                </Link>
                <Link
                    to="/dashboard/team"
                    className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 transition"
                >
                    Team
                </Link>
                <Link
                    to="/dashboard/services"
                    className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition"
                >
                    Services
                </Link>
            </div>
        </div>
    );
};

export default DashboardLanding;
