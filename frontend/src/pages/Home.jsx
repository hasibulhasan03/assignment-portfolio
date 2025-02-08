import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import '../style.css';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, blogsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/projects'),
                    axios.get('http://localhost:5000/api/blogs')
                ]);

                setProjects(projectsRes.data);
                setBlogs(blogsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <HeroSection />
            {/* Blogs Section */}
            <section className="paddin-main">
                <h2 className="text-3xl font-bold text-center mb-6">My Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section className="paddin-main">
                <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
