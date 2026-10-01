'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, GraduationCap, Mail, ShieldCheck, Link2 } from 'lucide-react';
import { PROFILE } from '../data';
import { Reveal, SectionHead, Magnetic } from './ui';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          index="01" eyebrow="Background & Journey"
          title={<>About <span className="text-stroke-ice">Me</span></>}
          desc="Aspiring IT professional building a career at the intersection of code, security and decentralization."
        />
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 md:gap-10">
          {/* portrait / code card */}
          <Reveal className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-panel">
              <div className="absolute inset-0 bg-gradient-to-br from-frost/40 via-transparent to-ice/20" />
              {/* window chrome */}
              <div className="relative flex items-center gap-2 px-5 py-4 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-500/80" /><span className="w-3 h-3 rounded-full bg-yellow-500/80" /><span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-[11px] text-zinc-500">abdul@portfolio:~</span>
              </div>
              <div className="relative p-5 sm:p-6 md:p-8 font-mono text-[12px] sm:text-[13px] md:text-sm leading-7 overflow-x-auto">
                <div><span className="text-ice">$</span> <span className="text-zinc-400">whoami</span></div>
                <div className="text-white font-semibold text-lg">Abdul Razzaque Ansari</div>
                <div className="mt-3 text-zinc-500">{`{`}</div>
                <div className="pl-5"><span className="text-glacier">role</span>: <span className="text-sky-200">"B.Tech IT Student"</span>,</div>
                <div className="pl-5"><span className="text-glacier">focus</span>: [<span className="text-sky-200">"cybersecurity"</span>, <span className="text-sky-200">"web3"</span>, <span className="text-sky-200">"AI agents"</span>],</div>
                <div className="pl-5"><span className="text-glacier">stack</span>: <span className="text-frost text-white/90">Python · JS · Solidity · Linux</span>,</div>
                <div className="pl-5"><span className="text-glacier">mission</span>: <span className="text-ice">"secure, decentralized solutions"</span></div>
                <div className="text-zinc-500">{`}`}</div>
                <div className="mt-4 flex items-center gap-2 text-zinc-400"><span className="w-2 h-4 bg-ice animate-pulse inline-block" /></div>
              </div>
              {/* big monogram */}
              <div className="relative border-t border-white/10 p-6 md:p-8 flex items-center gap-5 bg-black/30">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-ice to-glacier grid place-items-center font-display font-bold text-black text-2xl shrink-0">AR</div>
                <div>
                  <div className="font-display font-bold">Abdul Razzaque Ansari</div>
                  <div className="font-mono text-[11px] tracking-widest uppercase text-zinc-500 mt-1 flex items-center gap-1.5"><MapPin size={11} /> Mumbai, India · <GraduationCap size={12} /> B.Tech IT</div>
                  <div className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-ice bg-ice/10 border border-ice/20 rounded-full px-3 py-1"><ShieldCheck size={12} /> {PROFILE.status}</div>
                </div>
              </div>
            </div>
            {/* floating badge */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-5 -right-3 md:-right-5 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
              <span className="w-10 h-10 rounded-xl bg-ice/15 grid place-items-center text-xl">⛓️</span>
              <div><div className="font-display font-bold text-sm">AI × Blockchain</div><div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">core obsession</div></div>
            </motion.div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                I'm <span className="text-white font-semibold">Abdul Razzaque Ansari</span>, an aspiring IT professional currently pursuing <span className="text-ice">B.Tech in Information Technology</span> at {PROFILE.college}, after completing my Diploma in IT from Vidyalankar Polytechnic (2023 — 2026).
              </p>
              <p className="text-zinc-400 mt-4 leading-relaxed text-[15px]">
                Skilled in Python, Java, C, C++, HTML, CSS, JavaScript & Linux, with a strong interest in software development and problem-solving. Exploring <span className="text-white">Cybersecurity & Ethical Hacking</span> — vulnerability assessment and security analysis. Passionate about <span className="text-white">Blockchain & Web3</span> — Solidity, Smart Contracts, DeFi, NFTs and dApps.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {[
                  { k: 'Name', v: 'Abdul Razzaque Ansari' },
                  { k: 'Email', v: PROFILE.email },
                  { k: 'Education', v: 'B.Tech IT — SLRTCE' },
                  { k: 'Status', v: 'B.Tech IT Student' },
                ].map((f) => (
                  <div key={f.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-ice/40 transition-colors">
                    <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">{f.k}</div>
                    <div className="font-semibold text-[14px] mt-1 break-all">{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-3 mt-7">
                <Magnetic className="w-full sm:w-auto">
                  <a href="mailto:a.razzaq8097@gmail.com" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-ice transition-colors">
                    <Mail size={15} /> a.razzaq8097@gmail.com
                  </a>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <a href="/Abdul_Razzaque_Ansari_Resume.pdf" download="Abdul_Razzaque_Ansari_Resume.pdf" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-sm font-semibold hover:border-ice hover:text-ice transition-colors">
                    <Download size={15} /> Download Resume
                  </a>
                </Magnetic>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-ice px-2 py-3"><Link2 size={14} /> LinkedIn</a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
