import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';

const Service = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('https://assignment-portfolio-five.vercel.app/api/services')
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <section className="p-8 min-h-[80vh]">
                <h2 className="text-white text-3xl font-bold text-center mb-6">Services</h2>
                <div className="paddin-main grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Service;
