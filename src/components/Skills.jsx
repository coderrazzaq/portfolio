'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data';
import { Reveal, SectionHead } from './ui';

const CATS = ['All', 'Languages', 'Frontend', 'Web3', 'Security', 'Tools'];

export default function Skills() {
  const [cat, setCat] = useState('All');
  const list = SKILLS.filter((s) => cat === 'All' || s.cat === cat);

  return (
    <section id="skills" className="relative py-24 md:py-36 border-t border-white/5 scroll-mt-20 overflow-x-clip">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-frost/15 blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHead
          index="02" eyebrow="Technologies I work with"
          title={<>My <span className="text-ice">Skills</span> Arsenal</>}
          desc="Tap a category to filter. Bars animate on scroll — hover any card for a glow trace."
        />
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-3 rounded-full font-mono text-[12px] tracking-widest uppercase border transition-all ${cat === c ? 'bg-ice text-black border-ice font-bold' : 'border-white/15 text-zinc-400 hover:border-ice/50 hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((s, i) => (
            <motion.div
              layout
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 card-shine hover:border-ice/40 hover:bg-white/[0.05] transition-colors"
              data-hover
            >
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-display font-semibold">{s.name}</span>
                <span className="font-mono text-xs text-ice">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: s.level + '%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-ice via-ice to-glacier"
                />
              </div>
              <div className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">{s.cat}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* marquee pills */}
        <div className="mt-12 overflow-hidden mask-fade-x">
          <div className="flex whitespace-nowrap animate-marquee-rev gap-3 w-max">
            {[0, 1].map((n) => (
              <div key={n} className="flex gap-3">
                {SKILLS.map((s) => (
                  <span key={s.name + n} className="glass rounded-full px-5 py-2.5 text-sm text-zinc-300 font-medium shrink-0">{s.name} <span className="text-ice font-mono text-xs ml-1">{s.level}%</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
