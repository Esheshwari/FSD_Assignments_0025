import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = ({ projects }) => {
  return (
    <section id="projects">
      <h2 className="section-title">Featured Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000}>
              <div className="glass-card project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tags">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <FaGithub /> Code
                  </a>
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FaExternalLinkAlt /> Demo
                  </a>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;