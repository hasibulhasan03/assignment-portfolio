import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TeamCard from '../components/TeamCard';
import Footer from '../components/Footer';
import '../style.css'

const About = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios.get('https://assignment-portfolio-five.vercel.app/api/team')
            .then(res => setTeam(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <section className="p-8 min-h-[80vh]">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">About Me</h2>
                <p className="max-w-2xl mx-auto text-center mb-8 text-white">
                    I am a passionate developer and designer. Learn more about my journey and the team that supports my work.
                </p>
                <h3 className="text-2xl font-bold text-center mb-4 mt-20 text-white">My Team</h3>
                <div className="paddin-main grid grid-cols-1 md:grid-cols-3 gap-6">
                    {team.map(member => (
                        <TeamCard key={member._id} member={member} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default About;
