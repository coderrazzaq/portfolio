'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function Reveal({ children, delay = 0, y = 36, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, eyebrow, title, desc }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-ice">
          <span className="w-10 h-px bg-ice/70" />
          {index} — {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.02] mt-4 tracking-tight">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="text-zinc-400 max-w-xl mt-4 text-[15px] md:text-base leading-relaxed">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

export function SplitLetters({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', rotate: 4, opacity: 0 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}
