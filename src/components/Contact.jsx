'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons.jsx';
import { PROFILE } from '../data';
import { Reveal, Magnetic } from './ui';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', msg: '' }); }, 3500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-white/5 overflow-hidden scroll-mt-20 overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-frost/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-ice/10 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice flex items-center gap-3">
            <span className="w-10 h-px bg-ice/70" /> 05 — Let's connect and collaborate
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display font-bold tracking-tight leading-[0.95] text-[13vw] md:text-[7rem] mt-4">
            LET'S <span className="text-stroke-ice">BUILD</span><br />SOMETHING <span className="text-ice">SECURE.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <Reveal delay={0.12}>
            <div className="space-y-3">
              {[
                { icon: Mail, k: 'Email', v: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: LinkedinIcon, k: 'LinkedIn', v: 'linkedin.com/in/abdul-razzaque-ansari', href: PROFILE.linkedin },
                { icon: GithubIcon, k: 'GitHub', v: 'github.com/coderrazzaq', href: PROFILE.github },
              ].map((c) => (
                <Magnetic key={c.k} strength={0.2}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-ice/50 hover:bg-white/[0.05] transition-colors group">
                    <span className="w-12 h-12 shrink-0 rounded-xl bg-ice/10 border border-ice/20 grid place-items-center text-ice group-hover:bg-ice group-hover:text-black transition-colors"><c.icon size={19} /></span>
                    <span><span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">{c.k}</span><span className="block font-semibold text-[15px] mt-0.5 break-all">{c.v}</span></span>
                    <ArrowUpRight size={16} className="ml-auto text-zinc-600 group-hover:text-ice shrink-0" />
                  </a>
                </Magnetic>
              ))}
              <div className="rounded-2xl border border-ice/25 bg-ice/[0.06] p-5 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-ice animate-pulse shrink-0" />
                <p className="text-sm text-zinc-300"><span className="font-semibold text-white">Current status:</span> {PROFILE.status}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-panel p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ice via-glacier to-frost" />
              <h3 className="font-display font-bold text-xl">Send Me a Message</h3>
              <p className="text-zinc-500 text-sm mt-1">Replies within 24 hours. No spam, ever.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 transition-all" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" type="email" className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 transition-all" />
              </div>
              <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Tell me about your project, internship or idea…" rows={5} className="w-full mt-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-600 transition-all resize-none" />
              <button type="submit" className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-ice text-black font-bold py-3.5 rounded-xl text-[15px] hover:shadow-[0_0_40px_rgba(125,211,252,0.35)] transition-shadow">
                <Send size={16} /> Send Message
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-ice text-sm font-semibold bg-ice/10 border border-ice/25 rounded-xl px-4 py-3">
                    <CheckCircle2 size={16} /> Message transmitted. I'll get back to you soon!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
