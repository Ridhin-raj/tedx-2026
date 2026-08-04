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
    <main className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#090909] px-6 py-10">
      {/* Layer 1 — Grain/noise texture */}
      {/* Background nebula */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#EB0028]/10 blur-[160px]" />
  <div className="absolute -right-40 bottom-1/4 h-[600px] w-[600px] rounded-full bg-[#EB0028]/8 blur-[220px]" />
</div>
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 2 — Radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_center,transparent_0%,transparent_35%,rgba(0,0,0,0.9)_100%)]" />
{/* Slow Energy Pulse */}
<motion.div
  aria-hidden
  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
  style={{
    background:
      "radial-gradient(circle, rgba(235,0,40,0.08) 0%, rgba(235,0,40,0.03) 40%, transparent 75%)",
    filter: "blur(80px)",
  }}
  animate={{
    scale: [1, 1.08, 1],
    opacity: [0.5, 0.8, 0.5],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
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
<div className="absolute left-[15%] top-[18%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]" animate={{
  opacity: [0.3, 1, 0.3],
  scale: [1, 1.3, 1],
  y: [0, -3, 0],
  x: [0, 2, 0],
}} />
<div className="absolute right-[18%] top-[30%] h-2 w-2 rounded-full bg-white shadow-[0_0_12px_white]" animate={{
  opacity: [0.3, 1, 0.3],
  scale: [1, 1.3, 1],
  y: [0, -3, 0],
  x: [0, 2, 0],
}}/>
<div className="absolute left-[70%] top-[12%] h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]" animate={{
  opacity: [0.3, 1, 0.3],
  scale: [1, 1.3, 1],
  y: [0, -3, 0],
  x: [0, 2, 0],
}} />
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
        <div
  aria-hidden
  className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
/>

<div
  aria-hidden
  className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-900/20"
/>

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

      {/* Bottom gradient */}
<div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[32vh] w-full bg-gradient-to-t from-black via-black/90 to-transparent" />
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1.2,
    delay: 1.4,
    ease: easeOut,
  }}
  className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 text-center"
>
  <motion.h2
  animate={{
    opacity: [0.7, 1, 0.7],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex items-center justify-center gap-1 text-xl font-light uppercase tracking-[0.35em] text-white sm:text-2xl md:text-3xl"
>
  <span>COMING</span>

  <span>S</span>

  {/* Black Hole O */}
  <motion.span
    animate={{
      rotate: 360,
      boxShadow: [
        "0 0 12px rgba(235,0,40,.45)",
        "0 0 24px rgba(235,0,40,.85)",
        "0 0 12px rgba(235,0,40,.45)",
      ],
    }}
    transition={{
      rotate: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
      boxShadow: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
    className="relative mx-1 inline-flex h-[0.9em] w-[0.9em] items-center justify-center rounded-full border border-red-500"
  >
    {/* Event Horizon */}
    <span className="absolute inset-0 rounded-full border border-red-500 opacity-70" />

    {/* Black Core */}
    <span className="absolute h-[68%] w-[68%] rounded-full bg-black" />

    {/* Glow */}
    <span className="absolute h-full w-full rounded-full bg-red-500 opacity-20 blur-md" />
  </motion.span>

  <span>ON</span>
</motion.h2>
</motion.div>
    </main>
  );
}
