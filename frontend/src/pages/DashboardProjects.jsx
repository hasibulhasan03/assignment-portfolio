import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardProjects = ({ token }) => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', image: '', link: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('https://assignment-portfolio-five.vercel.app/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`https://assignment-portfolio-five.vercel.app/api/projects/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditingId(null);
            } else {
                await axios.post('https://assignment-portfolio-five.vercel.app/api/projects', form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setForm({ title: '', description: '', image: '', link: '' });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (project) => {
        setForm({ title: project.title, description: project.description, image: project.image, link: project.link });
        setEditingId(project._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://assignment-portfolio-five.vercel.app/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-white">Manage Projects</h2>
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
                <input
                    type="text"
                    placeholder="Project Link"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    {editingId ? 'Update Project' : 'Add Project'}
                </button>
            </form>
            <ul>
                {projects.map(project => (
                    <li key={project._id} className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-white font-bold text-lg">{project.title}</h3>
                            <p className='text-white'>{project.description}</p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Visit
                                </a>
                            )}
                        </div>
                        <div className="mt-2 md:mt-0">
                            <button onClick={() => handleEdit(project)} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardProjects;
