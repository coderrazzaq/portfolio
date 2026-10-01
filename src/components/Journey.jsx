'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { JOURNEY } from '../data';
import { Reveal, SectionHead } from './ui';

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.5'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <section id="journey" className="relative py-24 md:py-36 border-t border-white/5 overflow-hidden scroll-mt-20 overflow-x-clip">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-ice/[0.06] blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead
          index="04" eyebrow="My academic journey"
          title={<>Education & <span className="text-ice">Learning</span></>}
        />
        <div ref={ref} className="relative pl-8 md:pl-12">
          <div className="absolute left-[13px] md:left-[19px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
          <motion.div style={{ scaleY }} className="absolute left-[13px] md:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-ice via-glacier to-frost rounded-full origin-top" />
          <div className="space-y-6">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.title} delay={0.05 * i}>
                <div className="relative group">
                  <span className="absolute -left-8 md:-left-12 top-6 w-[28px] h-[28px] md:w-[40px] md:h-[40px] -translate-x-[1px] rounded-full bg-void border border-ice/40 grid place-items-center text-sm md:text-lg group-hover:bg-ice transition-colors"> {j.icon} </span>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-ice/40 transition-colors card-shine">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ice">{j.period}</span>
                      <span className="font-mono text-[11px] text-zinc-600">0{i + 1} / 04</span>
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl mt-2">{j.title}</h3>
                    <div className="text-zinc-400 text-sm font-medium mt-1">{j.org}</div>
                    <p className="text-zinc-500 text-[14px] mt-3 leading-relaxed">{j.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
