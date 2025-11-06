import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Statistics />
      <Footer />
    </div>
  );
};

export default App;
