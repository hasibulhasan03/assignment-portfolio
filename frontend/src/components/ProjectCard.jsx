import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-[#2c2c2c]">
            {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">{project.title}</h3>
                <p className="text-white mb-2">{project.description.substring(0, 100)}...</p>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Project
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
