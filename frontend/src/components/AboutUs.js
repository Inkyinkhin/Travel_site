import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="header">
        
        <nav>
          <a href="#intro">Introduction</a>
          <a href="#mission">Our Mission</a>
          <a href="#team">Our Team</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main-content">
        <section id="intro" className="section card">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            Welcome to Our Project!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            Embark on a virtual journey through Myanmar with our innovative map application, designed to be your ultimate guide to exploring this captivating country. Our project offers a detailed and interactive map that showcases an array of remarkable destinations, from the bustling streets of Yangon and Mandalay to the tranquil beauty of Inle Lake and Bagan’s ancient temples. Each location is meticulously curated with rich descriptions, high-resolution images, and insightful information to help you appreciate Myanmar's cultural heritage and natural splendor.
          <motion.p>
          Our platform goes beyond mere location data by providing interactive features that allow you to dive deep into each destination. Explore historic landmarks, uncover local hotspots, and access practical travel tips, all through a user-friendly interface. Whether you're an avid traveler, a cultural enthusiast, or planning a future trip, our goal is to inspire and inform, making your exploration of Myanmar both immersive and enriching. Join us as we bring the wonders of Myanmar to your fingertips and help you experience the magic of this extraordinary land.
          </motion.p>

          </motion.p>
        </section>
        <section id="mission" className="section card">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
           At the heart of our project is a commitment to revolutionize the way people explore Myanmar. Our mission is to provide an in-depth and immersive experience that highlights the nation's most extraordinary destinations and cultural landmarks. We aim to bridge the gap between travelers and the rich tapestry of Myanmar's heritage by offering a comprehensive digital platform that is both informative and engaging.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
           We meticulously2222 curate each location to offer not just a map but a gateway to understanding the essence of Myanmar. Our platform is designed to empower users with detailed insights, practical travel tips, and captivating visual content, making it easier for explorers to plan their journey and fully appreciate the country’s diverse beauty. Whether you're an intrepid traveler, a cultural enthusiast, or someone seeking a deeper connection with Myanmar, our mission is to inspire and inform, providing you with the tools to experience the country in all its glory.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
           By integrating modern technology with traditional knowledge, we strive to create a resource that enriches the travel experience and fosters a deeper appreciation for Myanmar’s unique cultural and natural wonders. Join us in our mission to uncover and celebrate the hidden gems of Myanmar, and let us guide you on a memorable exploration of this enchanting land.
          </motion.p>
        </section>
        <section id="team" className="section team">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Meet the Team
          </motion.h2>
          <div className="team-grid">
            <motion.div 
              className="team-card"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img src="member1.jpg" alt="Team Member 1" />
              <div className="card-content">
                <p>John Doe - Lead Developer</p>
              </div>
            </motion.div>
            <motion.div 
              className="team-card"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 1 }}
            >
              <img src="member3.jpg" alt="Team Member 2" />
              <div className="card-content">
                <p>Jane Smith - Project Manager</p>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="contact" className="section card">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            Email: contact@ourproject.com
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 1 }}
          >
            Phone: +123 456 7890
          </motion.p>
        </section>
      </main>
     
    </div>
  );
};

export default AboutUs;
