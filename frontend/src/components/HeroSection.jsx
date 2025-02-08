import React from 'react';
import '../style.css'

const HeroSection = () => {
    return (
        <section className="hero h-screen bg-[#1d1c22] grid grid-cols-2 place-items-center justify-center">
            <div className="left">
                <h3>Hello, It's Me</h3>
                <h1>Md. Hasibul Hasan</h1>
                <h2>a <span className="green">Tech Enthusiast</span></h2>
            </div>
            <div className="right">
                <div className="img-container w-[350px] h-[350px]">
                    <img src="https://hasibulhasanmahi.me/images/hasibul_hasan_mahi.png" alt="" />
                </div>
            </div>
        </section >
    );
};

export default HeroSection;
