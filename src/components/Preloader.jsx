'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 9) + 3;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(() => setExit(true), 350); setTimeout(() => onDone?.(), 1100); }
      setCount(v);
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-void flex flex-col justify-between p-6 md:p-10"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex justify-between font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500">
            <span>Abdul Razzaque Ansari</span>
            <span className="hidden sm:block">IT • Security • Web3</span>
            <span>©2026</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="font-mono text-xs text-zinc-500 space-y-2">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-ice animate-pulse" />
                LOADING EXPERIENCE
              </div>
              <div className="text-zinc-600">compiling cinematic modules…</div>
            </div>
            <div className="font-display font-bold leading-none text-[22vw] md:text-[13rem] text-white tabular-nums">
              {count}<span className="text-ice text-[6vw] md:text-5xl align-top">%</span>
            </div>
          </div>
          <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-ice transition-all duration-150" style={{ width: count + '%' }} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] bg-ice"
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
