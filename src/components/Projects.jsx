import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern, scalable e-commerce solution with real-time inventory management and seamless checkout experience.",
      color: "#f7ffdc",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Brand Identity",
      category: "Design",
      description: "Complete brand redesign including logo, color palette, and visual identity system for a tech startup.",
      color: "#d1f3f5",
      tags: ["Branding", "UI/UX", "Figma"]
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Intuitive mobile banking application with advanced security features and real-time transaction tracking.",
      color: "#ddd9ff",
      tags: ["React Native", "TypeScript", "API"]
    },
    {
      id: 4,
      title: "AI Dashboard",
      category: "Data Visualization",
      description: "Interactive dashboard for AI model performance monitoring with real-time analytics and insights.",
      color: "#ffddc4",
      tags: ["D3.js", "Python", "ML"]
    }
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section ref={ref} className="projects" id="projects">
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="projects-header" variants={itemVariants}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Showcasing our best work across various domains</p>
        </motion.div>

        <div className="carousel-container">
          <motion.div
            className="project-card"
            style={{ backgroundColor: projects[activeProject].color }}
            key={activeProject}
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <div className="project-image-placeholder">
              <motion.div
                className="project-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {String(activeProject + 1).padStart(2, '0')}
              </motion.div>
            </div>

            <div className="project-info">
              <span className="project-category">{projects[activeProject].category}</span>
              <h3 className="project-title">{projects[activeProject].title}</h3>
              <p className="project-description">{projects[activeProject].description}</p>

              <div className="project-tags">
                {projects[activeProject].tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="tag"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.button
                className="view-project-btn"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project í
              </motion.button>
            </div>
          </motion.div>

          <div className="carousel-controls">
            <motion.button
              className="carousel-btn prev"
              onClick={prevProject}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              ê
            </motion.button>

            <div className="carousel-indicators">
              {projects.map((_, index) => (
                <motion.div
                  key={index}
                  className={`indicator ${index === activeProject ? 'active' : ''}`}
                  onClick={() => setActiveProject(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              className="carousel-btn next"
              onClick={nextProject}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              í
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
