'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      setHovering(!!t?.closest?.('a,button,[data-hover]'));
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none mix-blend-difference"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            width: hovering ? 64 : 32,
            height: hovering ? 64 : 32,
            backgroundColor: hovering ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <div className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice" />
      </motion.div>
    </>
  );
}
