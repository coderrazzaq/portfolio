'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'About', href: '#about', n: '01' },
  { label: 'Skills', href: '#skills', n: '02' },
  { label: 'Work', href: '#projects', n: '03' },
  { label: 'Journey', href: '#journey', n: '04' },
  { label: 'Contact', href: '#contact', n: '05' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !open);
    setScrolled(y > 30);
  });

  const go = (href) => {
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-all ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl transition-all ${scrolled ? 'glass shadow-2xl shadow-black/40' : 'bg-transparent border border-transparent'}`}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <span className="w-9 h-9 rounded-xl bg-ice text-black font-display font-bold grid place-items-center text-sm group-hover:rotate-[15deg] transition-transform">AR</span>
              <span className="font-display font-semibold tracking-tight text-[15px] hidden sm:block">abdulrazzaque<span className="text-ice">.dev</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-1 font-mono text-[12px] tracking-widest uppercase">
              {LINKS.map((l) => (
                <button key={l.href} onClick={() => go(l.href)} className="px-4 py-2 rounded-full text-zinc-400 hover:text-black hover:bg-ice transition-colors">
                  <span className="text-[10px] opacity-60 mr-1">{l.n}</span> {l.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href="mailto:a.razzaq8097@gmail.com" className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-ice transition-colors">
                Hire Me <ArrowUpRight size={15} />
              </a>
              <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 grid place-items-center rounded-full glass">
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[75] bg-void/95 backdrop-blur-2xl pt-28 pb-10 px-6 md:hidden overflow-y-auto"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}
                onClick={() => go(l.href)}
                className="flex items-baseline gap-4 w-full text-left py-4 border-b border-white/10 font-display text-3xl font-bold"
              >
                <span className="font-mono text-xs text-ice">{l.n}</span> {l.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              href="mailto:a.razzaq8097@gmail.com"
              className="mt-6 flex items-center justify-center gap-2 bg-ice text-black font-bold px-6 py-4 rounded-2xl"
            >
              Hire Me <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
