import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import '../styles/Services.css';

const Services = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const services = [
    {
      id: 1,
      title: "Brand Strategy",
      description: "We craft compelling brand identities that resonate with your audience and stand out in the marketplace.",
      icon: "✦",
      color: "#f7ffdc",
      features: ["Brand Identity", "Visual Language", "Brand Guidelines", "Market Positioning"]
    },
    {
      id: 2,
      title: "Digital Product Design",
      description: "Creating intuitive digital experiences that combine beautiful aesthetics with seamless functionality.",
      icon: "◆",
      color: "#d1f3f5",
      features: ["UX/UI Design", "Prototyping", "Design Systems", "User Testing"]
    },
    {
      id: 3,
      title: "Web Development",
      description: "Building high-performance websites and web applications using cutting-edge technologies.",
      icon: "▲",
      color: "#ddd9ff",
      features: ["React & Next.js", "Full-Stack Dev", "API Integration", "Performance Optimization"]
    },
    {
      id: 4,
      title: "E-commerce Solutions",
      description: "Developing conversion-optimized e-commerce platforms that drive sales and delight customers.",
      icon: "●",
      color: "#ffddc4",
      features: ["Custom Platforms", "Payment Integration", "Inventory Management", "Analytics"]
    }
  ];

  return (
    <section className="services" id="services" ref={containerRef}>
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            WHAT WE DO
          </motion.span>
          <h2 className="section-title">Services That Drive Results</h2>
          <p className="section-subtitle">
            Comprehensive solutions designed to elevate your brand and drive measurable business growth
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, scrollYProgress }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const { scrollYProgress: cardProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(cardProgress, [0, 1], [80, -80]);
  const rotate = useTransform(cardProgress, [0, 0.5, 1], [-2, 0, 2]);
  const scale = useTransform(cardProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      className="service-card-wrapper"
      style={{
        y: index % 2 === 0 ? y : useTransform(y, (value) => -value)
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <motion.div
        className="service-card"
        style={{
          backgroundColor: service.color,
          scale,
          rotate: isHovered ? 0 : rotate
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -10,
          transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
        }}
      >
        <div className="card-content">
          <motion.div
            className="service-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{
              delay: index * 0.15 + 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {service.icon}
          </motion.div>

          <motion.h3
            className="service-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className="service-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          >
            {service.description}
          </motion.p>

          <ul className="service-features">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  delay: index * 0.15 + 0.6 + idx * 0.08,
                  duration: 0.5
                }}
              >
                <span className="feature-dot">•</span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div className="card-hover-bg"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        <motion.button
          className="service-btn"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.8 }}
          whileHover={{
            scale: 1.05,
            x: 5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="btn-text">Explore Service</span>
          <motion.span
            className="btn-arrow"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Services;
