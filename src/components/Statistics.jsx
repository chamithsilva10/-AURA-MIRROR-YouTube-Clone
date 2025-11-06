import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/Statistics.css';

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const stats = [
    { id: 1, value: 150, suffix: "+", label: "Projects Completed", duration: 2 },
    { id: 2, value: 50, suffix: "+", label: "Happy Clients", duration: 2 },
    { id: 3, value: 8, suffix: " Years", label: "Experience", duration: 1.5 },
    { id: 4, value: 95, suffix: "%", label: "Client Satisfaction", duration: 2 }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Outstanding work! The team delivered beyond our expectations and the results speak for themselves.",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager, InnovateCo",
      content: "Professional, creative, and incredibly efficient. Our project was completed on time and exceeded all requirements.",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Founder, DesignHub",
      content: "The attention to detail and design expertise is remarkable. Highly recommend for any digital project.",
      avatar: "ER"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={ref} className="statistics" id="experience">
      <div className="statistics-container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} isInView={isInView} />
          ))}
        </motion.div>

        <motion.div
          className="testimonials"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">What Clients Say</h2>

          <div className="testimonial-container">
            <motion.div
              key={activeTestimonial}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <div className="quote-icon">"</div>
              <p className="testimonial-content">{testimonials[activeTestimonial].content}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[activeTestimonial].avatar}</div>
                <div className="author-info">
                  <h4 className="author-name">{testimonials[activeTestimonial].name}</h4>
                  <p className="author-role">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </motion.div>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = stat.duration * 1000;
      const steps = 60;
      const increment = stat.value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCount(Math.min(Math.floor(increment * currentStep), stat.value));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [isInView, stat.value, stat.duration]);

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 90 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.h3
        className="stat-value"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
      >
        {count}{stat.suffix}
      </motion.h3>
      <p className="stat-label">{stat.label}</p>
      <div className="stat-decoration"></div>
    </motion.div>
  );
};

export default Statistics;
