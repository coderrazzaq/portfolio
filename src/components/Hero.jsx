'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, Sparkles, ShieldCheck, Boxes } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons.jsx';
import { PROFILE } from '../data';
import ParticleField from './ParticleField';
import { Magnetic, SplitLetters } from './ui';

function RoleRotator() {
  const [i, setI] = useState(0);
  const longest = PROFILE.roles.reduce((a, b) => (a.length >= b.length ? a : b));
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % PROFILE.roles.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden h-[1.4em] align-bottom max-w-full text-left">
      {/* invisible sizer reserves room for the longest role so text never clips */}
      <span className="invisible whitespace-nowrap font-semibold" aria-hidden="true">
        {longest}
      </span>
      {PROFILE.roles.map((r, idx) => (
        <motion.span
          key={r}
          aria-hidden={idx !== i}
          className="absolute left-0 top-0 whitespace-nowrap text-ice font-semibold"
          initial={false}
          animate={{ y: (idx - i) * 34, opacity: idx === i ? 1 : 0, filter: idx === i ? 'blur(0px)' : 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {r}
        </motion.span>
      ))}
      <span className="sr-only">{PROFILE.roles[i]}</span>
    </span>
  );
}

export default function Hero({ started }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* aurora */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-frost/30 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-glacier/15 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[500px] rounded-full bg-ice/10 blur-[130px]" />
        <ParticleField />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      </motion.div>

      <motion.div style={{ y: yFg, opacity: fade }} className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 md:px-8 pt-32 pb-10">
        {started && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-ice animate-ping" /> Available for opportunities
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 glass rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400">
                <Sparkles size={12} className="text-ice" /> {PROFILE.tagline.split('|')[1]?.trim()}
              </span>
            </motion.div>

            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-[14vw] sm:text-[12vw] lg:text-[8.2rem]">
              <span className="block overflow-hidden"><SplitLetters text={PROFILE.first} delay={0.25} /></span>
              <span className="block overflow-hidden">
                <SplitLetters text={PROFILE.last} delay={0.55} className="text-stroke" />
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                  className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-ice ml-3 align-baseline"
                />
              </span>
            </h1>

            <div className="mt-6 md:mt-8 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                <p className="font-display text-lg md:text-2xl text-zinc-200">
                  Hi, I'm <span className="text-white font-bold">Abdul Razzaque Ansari</span> — <RoleRotator />
                </p>
                <p className="text-zinc-400 mt-3 max-w-xl text-[15px] md:text-base leading-relaxed">{PROFILE.bio}</p>
                <div className="flex flex-wrap gap-3 mt-7">
                  <Magnetic className="w-full sm:w-auto">
                    <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-ice text-black font-semibold px-7 py-3.5 rounded-full text-[15px] hover:shadow-[0_0_40px_rgba(125,211,252,0.4)] transition-shadow">
                      View Projects <ArrowDown size={16} />
                    </a>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                    <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 glass font-semibold px-7 py-3.5 rounded-full text-[15px] hover:border-ice/50 transition-colors">
                      Contact Me
                    </a>
                  </Magnetic>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  {[
                    { icon: GithubIcon, href: PROFILE.github },
                    { icon: LinkedinIcon, href: PROFILE.linkedin },
                    { icon: Mail, href: `mailto:${PROFILE.email}` },
                  ].map(({ icon: Icon, href }, i) => (
                    <Magnetic key={i}>
                      <a href={href} target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center rounded-full border border-white/15 text-zinc-300 hover:bg-ice hover:text-black hover:border-ice transition-colors">
                        <Icon size={17} />
                      </a>
                    </Magnetic>
                  ))}
                  <span className="font-mono text-[11px] text-zinc-500 ml-2 hidden sm:block">github.com/coderrazzaq</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="grid grid-cols-3 gap-3">
                {[
                  { k: '07+', v: 'Projects shipped', icon: Boxes },
                  { k: '16', v: 'Tech skills', icon: Sparkles },
                  { k: '03y', v: 'Building & hacking', icon: ShieldCheck },
                ].map((s) => (
                  <div key={s.v} className="glass rounded-2xl p-3 sm:p-4 card-shine">
                    <s.icon size={16} className="text-ice mb-2" />
                    <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl">{s.k}</div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{s.v}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </motion.div>

      {/* marquee */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3.5 font-mono text-[12px] tracking-[0.25em] uppercase text-zinc-400 mask-fade-x">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0">
              {['Cybersecurity', 'Solidity', 'Smart Contracts', 'DeFi', 'React', 'Python', 'Linux', 'AI × Blockchain', 'Ethical Hacking', 'Web3'].map((t) => (
                <span key={t + n} className="mx-6 flex items-center gap-6">{t} <span className="text-ice">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
