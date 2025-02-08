import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="border rounded overflow-hidden shadow-lg bg-white p-4 text-center">
            {service.image && (
                <img src={service.image} alt={service.title} className="w-20 h-20 mx-auto object-cover mb-4" />
            )}
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
        </div>
    );
};

export default ServiceCard;
