'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Layers } from 'lucide-react';
import { GithubIcon } from './icons.jsx';
import { PROJECTS } from '../data';
import { Reveal, SectionHead, Magnetic } from './ui';

const FILTERS = ['All', 'Web3', 'AI', 'Web'];

function TiltCard({ p, i, onOpen }) {
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const featured = i === 0;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        setT({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100 });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 })}
      style={{ perspective: 1000 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <motion.div
        animate={{ rotateX: t.rx, rotateY: t.ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => onOpen(p)}
        className="group relative rounded-3xl border border-white/10 overflow-hidden cursor-pointer bg-panel card-shine h-full"
        data-hover
      >
        {/* cover */}
        <div className={`relative h-52 md:h-60 bg-gradient-to-br ${p.grad} overflow-hidden`}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">{p.cat}</span>
            <span className="font-mono text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">{p.year}</span>
          </div>
          <div className="absolute bottom-2 right-4 font-display font-bold text-[7rem] md:text-[9rem] leading-none text-white/15 select-none">{String(i + 1).padStart(2, '0')}</div>
          <div className="absolute bottom-5 left-5 text-5xl drop-shadow-2xl group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-500">{p.icon}</div>
          {/* hover glow follows mouse */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(500px circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.18), transparent 60%)` }} />
        </div>
        <div className="p-6 md:p-7">
          <h3 className="font-display font-bold text-xl md:text-2xl leading-tight group-hover:text-ice transition-colors">{p.title}</h3>
          <p className="text-zinc-400 text-[14px] mt-2 leading-relaxed line-clamp-2">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="font-mono text-[10.5px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">{tag}</span>
            ))}
            {p.tags.length > 4 && <span className="font-mono text-[10.5px] px-2.5 py-1 rounded-full text-ice">+{p.tags.length - 4}</span>}
          </div>
          <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/10">
            <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-500 flex items-center gap-1.5"><Layers size={12} /> Case study</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-black group-hover:bg-ice rounded-full px-4 py-2 border border-white/20 group-hover:border-ice transition-all">Open <ArrowUpRight size={14} /></span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const list = PROJECTS.filter((p) => filter === 'All' || p.cat === filter);

  return (
    <section id="projects" className="relative py-24 md:py-36 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          index="03" eyebrow="Some of my recent work"
          title={<>Featured <span className="text-stroke">Projects</span></>}
          desc="Seven builds across fraud-graphs, AI agents, Web3 assistants and community platforms. Click any card for the full story."
        />
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-5 py-3 rounded-full font-mono text-[12px] tracking-widest uppercase border transition-all ${filter === f ? 'bg-ice text-black border-ice font-bold' : 'border-white/15 text-zinc-400 hover:border-ice/50 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <TiltCard key={p.id} p={p} i={PROJECTS.indexOf(p)} onOpen={setActive} />)}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[85] grid place-items-center p-4 bg-black/70 backdrop-blur-xl" onClick={() => setActive(null)}>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[88vh] overflow-y-auto rounded-3xl border border-white/15 bg-panel"
            >
              <div className={`relative h-48 rounded-t-3xl bg-gradient-to-br ${active.grad} p-6 flex items-end`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-black/50 border border-white/20 hover:bg-ice hover:text-black transition-colors"><X size={16} /></button>
                <div className="relative text-6xl">{active.icon}</div>
              </div>
              <div className="p-6 md:p-8">
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-ice">{active.cat} — {active.year}</div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mt-2">{active.title}</h3>
                <p className="text-zinc-400 mt-3 leading-relaxed text-[15px]">{active.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {active.tags.map((t) => <span key={t} className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-zinc-200">{t}</span>)}
                </div>
                <div className="flex gap-3 mt-7">
                  <Magnetic><a href="https://github.com/coderrazzaq" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-ice text-black font-semibold px-6 py-3 rounded-full text-sm"><GithubIcon size={15} /> View Code</a></Magnetic>
                  <Magnetic><button onClick={() => setActive(null)} className="px-6 py-3 rounded-full text-sm font-semibold border border-white/20 hover:border-ice transition-colors">Close</button></Magnetic>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
