import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      clipPath: 'inset(100% 0% 0% 0%)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2 + i * 0.03,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  const text = "Designed to be remembered";

  return (
    <section ref={ref} className="hero" id="about">
      <motion.div
        className="hero-background"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [mousePosition.x, mousePosition.x * 2]),
          y: useTransform(scrollYProgress, [0, 1], [mousePosition.y, mousePosition.y * 2])
        }}
      >
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div className="gradient-blob blob-4"></div>
      </motion.div>

      <motion.div
        className="hero-content"
        style={{ y, opacity, scale, rotate }}
      >
        <motion.div className="hero-text">
          <motion.div className="hero-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            IVENTIONS CLONE
          </motion.div>

          <motion.h1
            className="hero-title main"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            Branding &
          </motion.h1>
          <motion.h1
            className="hero-title accent"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            Digital Products
          </motion.h1>
          <motion.h1
            className="hero-title main"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            That Convert
          </motion.h1>
        </motion.div>

        <motion.div
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="hero-tagline-char"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          We create memorable brands and high-performing digital experiences that drive results and captivate audiences
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="cta-button primary"
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-inner">
              <span className="button-text">View Our Work</span>
              <span className="button-bg"></span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="cta-button secondary"
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-inner">
              <span className="button-text">Start a Project</span>
              <span className="button-bg"></span>
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <motion.div
            className="scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="stat-item">
          <motion.div
            className="stat-number"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            150+
          </motion.div>
          <div className="stat-label">Projects Delivered</div>
        </div>
        <div className="stat-item">
          <motion.div
            className="stat-number"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            50+
          </motion.div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-item">
          <motion.div
            className="stat-number"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            10+
          </motion.div>
          <div className="stat-label">Years Experience</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
