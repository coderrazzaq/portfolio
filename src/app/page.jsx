'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import Preloader from '../components/Preloader.jsx';
import Cursor from '../components/Cursor.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Journey from '../components/Journey.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  return (
    <div className="noise bg-void text-white min-h-screen">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Cursor />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-ice via-glacier to-frost origin-left z-[82]"
      />

      <Navbar />
      <main>
        <Hero started={loaded} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
