import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardTeam = ({ token }) => {
    const [team, setTeam] = useState([]);
    const [form, setForm] = useState({ name: '', role: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    const baseURL = 'https://assignment-portf-git-acbbf0-md-hasibul-hasans-projects-ee70a7f0.vercel.app';

    const fetchTeam = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/team`);
            setTeam(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${baseURL}/api/team/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingId(null);
            } else {
                await axios.post(`${baseURL}/api/team`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setForm({ name: '', role: '', image: '' });
            fetchTeam();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (member) => {
        setForm({ name: member.name, role: member.role, image: member.image });
        setEditingId(member._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/team/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTeam();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Team Members</h2>
            <form onSubmit={handleSubmit} className="mb-8 flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    {editingId ? 'Update Member' : 'Add Member'}
                </button>
            </form>
            <ul>
                {team.map((member) => (
                    <li
                        key={member._id}
                        className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <h3 className="font-bold text-lg text-white">{member.name}</h3>
                            <p className='text-white'>{member.role}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <button
                                onClick={() => handleEdit(member)}
                                className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(member._id)}
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

export default DashboardTeam;
