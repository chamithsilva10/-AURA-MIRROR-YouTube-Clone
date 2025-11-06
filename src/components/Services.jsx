import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import '../styles/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Building responsive, high-performance websites and web applications using modern technologies and best practices.",
      icon: "=�",
      color: "#f7ffdc",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"]
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Creating intuitive and visually stunning user interfaces that enhance user experience and drive engagement.",
      icon: "<�",
      color: "#d1f3f5",
      features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing"]
    },
    {
      id: 3,
      title: "Mobile Development",
      description: "Crafting native and cross-platform mobile applications that deliver seamless experiences across all devices.",
      icon: "=�",
      color: "#ddd9ff",
      features: ["React Native", "iOS & Android", "App Store Deployment", "Push Notifications"]
    },
    {
      id: 4,
      title: "Brand Strategy",
      description: "Developing comprehensive brand identities that resonate with your audience and stand out in the market.",
      icon: "(",
      color: "#ffddc4",
      features: ["Brand Identity", "Logo Design", "Style Guidelines", "Marketing Materials"]
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive solutions tailored to your needs</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      className="service-card"
      style={{
        backgroundColor: service.color,
        y: index % 2 === 0 ? y : -y
      }}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 10 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }}
      whileHover={{ scale: 1.02, rotateZ: 0 }}
    >
      <motion.div
        className="service-icon"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
      >
        {service.icon}
      </motion.div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>

      <ul className="service-features">
        {service.features.map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1 + 0.3 + idx * 0.1 }}
          >
            <span className="feature-dot">"</span>
            {feature}
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="service-btn"
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More �
      </motion.button>
    </motion.div>
  );
};

export default Services;
