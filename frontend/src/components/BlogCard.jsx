import React from 'react';

const BlogCard = ({ blog }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-[#2c2c2c]">
            {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">{blog.title}</h3>
                <p className="text-white">{blog.content.substring(0, 100)}...</p>
            </div>
        </div>
    );
};

export default BlogCard;
