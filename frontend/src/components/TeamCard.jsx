import React from 'react';

const TeamCard = ({ member }) => {
    return (
        <div className="border rounded overflow-hidden shadow-lg bg-white text-center p-4">
            {member.image && (
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover mb-4" />
            )}
            <h3 className="font-bold text-xl">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
        </div>
    );
};

export default TeamCard;
