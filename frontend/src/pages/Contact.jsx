import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert('Message sent!');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div>
            <Navbar />
            <section className="p-8 max-w-lg mx-auto min-h-[80vh]">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Contact Me</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <textarea
                        placeholder="Message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border p-2 rounded"
                        rows="5"
                        required
                    ></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
                        Send Message
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;
