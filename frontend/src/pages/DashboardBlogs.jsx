import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardBlogs = ({ token }) => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', content: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    const baseURL = 'https://assignment-portfolio-five.vercel.app';

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/blogs`);
            setBlogs(res.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${baseURL}/api/blogs/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingId(null);
            } else {
                await axios.post(`${baseURL}/api/blogs`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setForm({ title: '', content: '', image: '' });
            fetchBlogs();
        } catch (err) {
            console.error('Error submitting blog:', err);
        }
    };

    const handleEdit = (blog) => {
        setForm({ title: blog.title, content: blog.content, image: blog.image });
        setEditingId(blog._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBlogs();
        } catch (err) {
            console.error('Error deleting blog:', err);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Blogs</h2>
            <form onSubmit={handleSubmit} className="mb-8 flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="border p-2 rounded"
                    rows="3"
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    {editingId ? 'Update Blog' : 'Add Blog'}
                </button>
            </form>
            <ul>
                {blogs.map((blog) => (
                    <li
                        key={blog._id}
                        className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <h3 className="font-bold text-lg text-white">{blog.title}</h3>
                            <p className='text-white'>{blog.content}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <button
                                onClick={() => handleEdit(blog)}
                                className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardBlogs;
