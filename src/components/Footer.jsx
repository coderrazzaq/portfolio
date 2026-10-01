'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons.jsx';
import { PROFILE } from '../data';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-ice text-black font-display font-bold grid place-items-center text-sm">AR</span>
          <span className="font-display font-semibold">abdulrazzaque<span className="text-ice">.dev</span></span>
        </button>
        <p className="font-mono text-[11px] tracking-widest uppercase text-zinc-600">© 2026 Abdul Razzaque Ansari — All rights reserved</p>
        <div className="flex items-center gap-2">
          {[
            { icon: GithubIcon, href: PROFILE.github },
            { icon: LinkedinIcon, href: PROFILE.linkedin },
            { icon: Mail, href: `mailto:${PROFILE.email}` },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center rounded-full border border-white/15 text-zinc-400 hover:bg-ice hover:text-black hover:border-ice transition-colors"><Icon size={15} /></a>
          ))}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-11 h-11 grid place-items-center rounded-full bg-white text-black hover:bg-ice transition-colors ml-1"><ArrowUp size={15} /></button>
        </div>
      </div>
      <div className="font-display font-bold text-[18vw] leading-[0.8] text-center text-white/[0.04] select-none -mb-[4vw]">ABDUL</div>
    </footer>
  );
}
