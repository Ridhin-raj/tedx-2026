"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, easeOut } from "framer-motion";

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.5 });

  const xParallaxX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const xParallaxY = useTransform(smoothY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.25 + 0.05,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Layer 5 — TEDx CUSAT wordmark (delay 0.1s)
  const logoVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: easeOut, delay: 0.1 },
      },
    }),
    []
  );

  // Eclipse circle (delay 0.4s)
  

  // Mascot (delay 0.7s)
  const mascotVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, scale: 0.97 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.2, ease: easeOut, delay: 0.7 },
      },
    }),
    []
  );

  // Scroll indicator (delay 1.6s)
  const scrollVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 1, ease: easeOut, delay: 1.6 },
      },
    }),
    []
  );

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#090909] px-6 py-10">
      {/* Layer 1 — Grain/noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 2 — Radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_center,transparent_0%,transparent_35%,rgba(0,0,0,0.9)_100%)]" />

      {/* Layer 3 — Floating particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [p.opacity, p.opacity * 1.6, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Layer 4 — Giant translucent X with mouse parallax */}
      <motion.div
  aria-hidden="true"
  className="pointer-events-none absolute z-0 select-none font-serif  leading-none text-[#EB0028] opacity-10
  text-[80vw]
  sm:text-[78vw]
  md:text-[75vw]
  lg:text-[75vw]
  xl:text-[75vw]
  -translate-y-[7vh]"
  style={{ 
    x: xParallaxX, 
    y: xParallaxY, 
    scaleY: 0.9,   // Increase height
    scaleX: 2
    }}
>
        X
      </motion.div>

      {/* Top — TEDx CUSAT wordmark */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={logoVariants}
        className="relative z-20 translate-y-8 select-none"
      >
        <span className="text-lg font-bold uppercase tracking-[0.25em] text-[#EB0028] sm:text-xl md:text-2xl">
          TEDx
        </span>
        <span className="text-lg font-bold uppercase tracking-[0.25em] text-white sm:text-xl md:text-2xl">
          CUSAT
        </span>
      </motion.div>

      {/* Center — Eclipse + Mascot */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Eclipse circle */}
        

        {/* Mascot + glow */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={mascotVariants}
          className="relative flex items-center justify-center"
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EB0028] opacity-20 blur-[90px] sm:h-[360px] sm:w-[360px] md:h-[440px] md:w-[440px]"
          />

          <Image
  src="/mascot.png"
  alt="TEDxCUSAT mascot"
  width={1200}
  height={900}
  priority
  className="
    w-[48vw]
    max-w-[780px]
    min-w-[320px]
    h-auto
    object-contain
    drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]
  "
/>
        </motion.div>
      </div>

      {/* Bottom — Scroll indicator */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={scrollVariants}
        className="relative z-20 mb-2 flex flex-col items-center gap-2"
      >
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-[#EB0028] to-transparent sm:h-12"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
      </motion.div>
    </main>
  );
}
