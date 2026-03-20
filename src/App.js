import React, { useState } from 'react';
import Loader       from './components/Loader';
import Background3D from './components/Background3D';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Certificates from './components/Certificates';
import Projects     from './components/Projects';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './styles/scrollReveal.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <Background3D />
      <CustomCursor />
      <div className={`site-wrapper ${loaded ? 'site-visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Certificates />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
