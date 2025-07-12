import React from "react";
import { motion } from "framer-motion";

interface RetroGridProps {
  className?: string;
}

export const RetroGrid = ({ className = "" }: RetroGridProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Perspective grid */}
      <div className="absolute inset-0 perspective-1000">
        <div className="absolute inset-0 transform-gpu">
          {/* Horizontal lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-px"
              style={{
                top: `${5 + i * 5}%`,
                background: `linear-gradient(90deg, transparent 0%, #00ffff 20%, #00ff00 50%, #ffff00 80%, transparent 100%)`,
                opacity: 0.6 - i * 0.02,
                transform: `rotateX(75deg) translateZ(${i * -10}px)`,
                boxShadow: `0 0 2px #00ffff, 0 0 4px #00ff00, 0 0 6px #ffff00`,
              }}
              animate={{
                opacity: [0.6 - i * 0.02, 0.8 - i * 0.02, 0.6 - i * 0.02],
              }}
              transition={{
                duration: 3 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Vertical lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-px"
              style={{
                left: `${3 + i * 3.2}%`,
                background: `linear-gradient(180deg, transparent 0%, #00ffff 20%, #00ff00 50%, #ffff00 80%, transparent 100%)`,
                opacity: 0.4 - i * 0.01,
                transform: `rotateX(75deg) translateZ(${i * -5}px)`,
                boxShadow: `0 0 1px #00ffff, 0 0 2px #00ff00, 0 0 3px #ffff00`,
              }}
              animate={{
                opacity: [0.4 - i * 0.01, 0.6 - i * 0.01, 0.4 - i * 0.01],
              }}
              transition={{
                duration: 2.5 + i * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background:
              i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#00ff00" : "#ffff00",
            boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 45%, rgba(0, 255, 0, 0.2) 50%, rgba(255, 255, 0, 0.1) 55%, transparent 100%)`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vertical scanning line */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.05) 45%, rgba(0, 255, 0, 0.1) 50%, rgba(255, 255, 0, 0.05) 55%, transparent 100%)`,
        }}
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
    </div>
  );
};
