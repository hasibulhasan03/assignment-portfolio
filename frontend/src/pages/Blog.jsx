import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import '../style.css'

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('https://assignment-portfolio-five.vercel.app/api/blogs')
            .then(res => setBlogs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <section className="p-8 min-h-[80vh]">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Blog</h2>
                <div className="paddin-main grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Blog;
