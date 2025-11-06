import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: '#', icon: '=»' },
    { name: 'LinkedIn', url: '#', icon: '=¼' },
    { name: 'Twitter', url: '#', icon: '=&' },
    { name: 'Dribbble', url: '#', icon: '<¨' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-main">
            <div className="footer-section">
              <h3 className="footer-title">Let's Work Together</h3>
              <p className="footer-description">
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
              <motion.a
                href="mailto:hello@portfolio.com"
                className="footer-email"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                hello@portfolio.com ’
              </motion.a>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a href={link.href}>{link.name}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Follow Us</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="social-link"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <p className="copyright">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
            <p className="made-with">
              Made with <span className="heart">d</span> and creativity
            </p>
          </motion.div>
        </motion.div>

        <div className="footer-decoration">
          <motion.div
            className="decoration-circle"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
