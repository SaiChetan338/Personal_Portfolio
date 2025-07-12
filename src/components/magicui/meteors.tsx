import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const colors = ["#ffffff", "#00ffff", "#0099ff", "#ffffff", "#00ccff"];

    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * 360,
      speed: 0.5 + Math.random() * 2,
      size: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }));

    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          initial={{
            x: meteor.x,
            y: meteor.y,
            opacity: 0,
          }}
          animate={{
            x: meteor.x - window.innerWidth * 1.5,
            y: meteor.y + window.innerHeight * 1.5,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: meteor.delay,
            ease: "linear",
          }}
        >
          {/* Main meteor */}
          <div
            className="rounded-full"
            style={{
              width: `${meteor.size * 2}px`,
              height: `${meteor.size * 2}px`,
              background: meteor.color,
              boxShadow: `
                0 0 6px ${meteor.color},
                0 0 12px ${meteor.color},
                0 0 18px ${meteor.color === "#ffffff" ? "#ffffff" : "#00ffff"}
              `,
            }}
          />

          {/* Meteor tail */}
          <div
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: `${20 + meteor.size * 10}px`,
              height: "1px",
              background: `linear-gradient(90deg, ${meteor.color} 0%, transparent 100%)`,
              transform: `translate(-50%, -50%) rotate(${meteor.angle}deg)`,
              boxShadow: `0 0 6px ${meteor.color}`,
            }}
          />

          {/* Additional glow effect */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full opacity-50"
            style={{
              width: `${meteor.size * 6}px`,
              height: `${meteor.size * 6}px`,
              background: `radial-gradient(circle, ${meteor.color === "#ffffff" ? "#ffffff" : "#00ffff"} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
