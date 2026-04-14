/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const Background = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 6 : 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft Animated Gradient */}
      <div className="absolute inset-0 bg-brand-cream" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform, opacity" }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-brand-gold/10 blur-[40px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform, opacity" }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-burgundy/5 blur-[40px] md:blur-[100px]"
      />

      {/* Grid Shimmer */}
      <div className="absolute inset-0 grid-shimmer opacity-40" />

      {/* Light Field / Beam Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_100%)]" />

      {/* Particle Drift */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${p.y - 20}%`],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: p.size,
            height: p.size,
            willChange: "transform, opacity",
          }}
          className="absolute bg-brand-gold rounded-full"
        />
      ))}

      {/* Slow Parallax Abstract Shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] border border-brand-gold/5 rounded-full pointer-events-none hidden md:block"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] border border-brand-burgundy/5 rounded-full pointer-events-none hidden md:block"
      />
    </div>
  );
};
