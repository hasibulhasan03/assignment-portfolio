import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardServices = ({ token }) => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    const baseURL = 'https://assignment-portfolio-five.vercel.app';

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/services`);
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${baseURL}/api/services/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingId(null);
            } else {
                await axios.post(`${baseURL}/api/services`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setForm({ title: '', description: '', image: '' });
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (service) => {
        setForm({ title: service.title, description: service.description, image: service.image });
        setEditingId(service._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Services</h2>
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
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                    {editingId ? 'Update Service' : 'Add Service'}
                </button>
            </form>
            <ul>
                {services.map((service) => (
                    <li
                        key={service._id}
                        className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <h3 className="font-bold text-lg text-white">{service.title}</h3>
                            <p className='text-white'>{service.description}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <button
                                onClick={() => handleEdit(service)}
                                className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service._id)}
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

export default DashboardServices;
