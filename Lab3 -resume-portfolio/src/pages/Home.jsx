import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Education from '../components/Education/Education';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Achievements from '../components/Achievements/Achievements';
import Certifications from '../components/Certifications/Certifications';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import AnimatedBackground from '../components/AnimatedBackground/AnimatedBackground';
import { resumeData } from '../data/resumeData';

const Home = () => {
  return (
    <div className="home-page">
      <AnimatedBackground />
      <Navbar personalInfo={resumeData.personalInfo} />
      <main>
        <Hero personalInfo={resumeData.personalInfo} />
        <About personalInfo={resumeData.personalInfo} education={resumeData.education} />
        <Education education={resumeData.education} />
        <Skills skills={resumeData.skills} />
        <Experience experiences={resumeData.experiences} />
        <Projects projects={resumeData.projects} />
        <Achievements achievements={resumeData.achievements} />
        <Certifications certifications={resumeData.certifications} />
        <Contact personalInfo={resumeData.personalInfo} />
      </main>
      <Footer personalInfo={resumeData.personalInfo} />
    </div>
  );
};

export default Home;