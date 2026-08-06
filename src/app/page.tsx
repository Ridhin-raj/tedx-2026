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
   <main
  className="
    relative
    h-[100dvh]
    w-full
    overflow-hidden
    flex
    flex-col
    items-center
    justify-between
    bg-[#090909]
    px-4
    sm:px-6
    md:px-8
    py-4
  "
>
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
      }} />
      <div className="absolute left-[70%] top-[12%] h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]" animate={{
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.3, 1],
        y: [0, -3, 0],
        x: [0, 2, 0],
      }} />
      {/* Layer 4 — Giant translucent X with mouse parallax */}
      <motion.div
        aria-hidden="true"
        className="
pointer-events-none
absolute
z-0
select-none
font-serif
leading-none
text-[#EB0028]
opacity-10
text-[120vw]
sm:text-[95vw]
md:text-[80vw]
lg:text-[75vw]
-translate-y-[4vh]
sm:-translate-y-[6vh]
"
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
      {/* Top — TEDx CUSAT Logo */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={logoVariants}
        className="
relative
z-20
translate-y-4
sm:translate-y-6
md:translate-y-8
flex
flex-col
items-center
"
      >
        {/* Main Logo */}
        <div className="flex items-start leading-none">
          {/* TED */}
          {/* TED */}
          <span
            className="
    font-black
    text-[#EB0028]
    text-[1.4rem]
sm:text-[1.8rem]
md:text-[2.2rem]
lg:text-[2.8rem]
    tracking-[-0.08em]
  "
          >
            TED
          </span>

          {/* x */}
          {/* TED */}
          <span
            className="
    ml-[2px]
    mt-[0.2em]
    font-black
    text-[#EB0028]
    text-[0.7rem]
sm:text-[0.85rem]
md:text-[1rem]
lg:text-[1.2rem]
  "
          >
            x
          </span>


          {/* CUSAT */}
          <span
            className="
    ml-1
    font-light
    text-white
    text-[1.4rem]
sm:text-[1.8rem]
md:text-[2.2rem]
lg:text-[2.8rem]
    tracking-[-0.03em]
  "
          >
            CUSAT
          </span>
        </div>

        {/* Tagline */}
        <p className="mt-1 text-[7px]
sm:text-[9px]
md:text-[11px]
lg:text-xs font-medium text-white/90">
          <span className="text-[#EB0028]">x</span> = independently organized TED event
        </p>
      </motion.div>

      {/* Center — Eclipse + Mascot */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Eclipse circle */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70vw]
w-[70vw]
max-h-[650px]
max-w-[650px]
min-h-[280px]
min-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        />

        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[82vw]
w-[82vw]
max-h-[760px]
max-w-[760px]
min-h-[340px]
min-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-900/20"
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
            className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EB0028] opacity-20 blur-[90px] h-[45vw]
w-[45vw]
min-h-[180px]
min-w-[180px]
max-h-[440px]
max-w-[440px]"
          />

          <Image
            src="/mascot.png"
            alt="TEDxCUSAT mascot"
            width={1200}
            height={900}
            priority
            className="
w-[80vw]
sm:w-[60vw]
md:w-[48vw]
lg:w-[42vw]
max-w-[780px]
min-w-[220px]
h-auto
object-contain
drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]
"
          />
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[26vh]
sm:h-[30vh]
md:h-[32vh] w-full bg-gradient-to-t from-black via-black/90 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 1.4,
          ease: easeOut,
        }}
        className="
absolute
bottom-8
sm:bottom-10
md:bottom-12
 left-1/2 z-30 -translate-x-1/2 text-center"
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
          className="flex items-center justify-center gap-1 font-light uppercase tracking-[0.35em] text-white text-base
sm:text-xl
md:text-2xl
lg:text-3xl"
        >
          {/* C */}
          <span>C</span>

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
            className="relative inline-flex h-[0.75em]
w-[0.75em]
sm:h-[0.85em]
sm:w-[0.85em]
md:h-[0.9em]
md:w-[0.9em] items-center justify-center rounded-full border border-red-500"
          >
            {/* Event Horizon */}
            <span className="absolute inset-0 rounded-full border border-red-500 opacity-70" />

            {/* Black Core */}
            <span className="absolute h-[68%] w-[68%] rounded-full bg-black" />

            {/* Glow */}
            <span className="absolute h-full w-full rounded-full bg-red-500 opacity-20 blur-md" />
          </motion.span>

          {/* MING */}
          <span>MING</span>

          {/* SOON */}
          <span>SOON</span>
        </motion.h2>
      </motion.div>
    </main>
  );
}
