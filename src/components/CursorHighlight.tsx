import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const CursorHighlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let trailInterval: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Add trail particle
      const newParticle: TrailParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setTrailParticles((prev) => [...prev.slice(-8), newParticle]);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Clean up old particles
    trailInterval = setInterval(() => {
      const now = Date.now();
      setTrailParticles((prev) =>
        prev.filter((particle) => now - particle.timestamp < 1000),
      );
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timeout);
      clearInterval(trailInterval);
    };
  }, []);

  return (
    <>
      {/* Main cursor core */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: isClicking ? 1.5 : isMoving ? 1.2 : 1,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="fixed pointer-events-none z-49"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: isMoving ? 1.3 : 1,
          opacity: isMoving ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="w-10 h-10 rounded-full border border-blue-400/40 bg-blue-400/10 blur-sm" />
      </motion.div>

      {/* Ripple effect on click */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-48"
            style={{
              left: mousePosition.x - 30,
              top: mousePosition.y - 30,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-15 h-15 rounded-full border-2 border-green-400/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced trail particles */}
      <AnimatePresence>
        {trailParticles.map((particle, index) => {
          const age = Date.now() - particle.timestamp;
          const opacity = Math.max(0, 1 - age / 800);
          const scale = Math.max(0.2, 1 - age / 600);

          return (
            <motion.div
              key={particle.id}
              className="fixed pointer-events-none z-47"
              style={{
                left: particle.x - 3,
                top: particle.y - 3,
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: scale,
                opacity: opacity,
                rotate: age / 10,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  index % 2 === 0 ? "bg-blue-400" : "bg-green-400"
                } shadow-sm`}
                style={{
                  boxShadow: `0 0 ${4 * scale}px ${index % 2 === 0 ? "#60a5fa" : "#4ade80"}`,
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Matrix-style binary digits */}
      {isMoving && (
        <motion.div
          className="fixed pointer-events-none z-46 text-green-400 text-xs font-mono select-none"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 15,
          }}
          initial={{ opacity: 0, scale: 0.5, y: 5 }}
          animate={{ opacity: 0.7, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {Math.random() > 0.5 ? "01" : "10"}
        </motion.div>
      )}

      {/* Ambient glow effect */}
      <motion.div
        className="fixed pointer-events-none z-45"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
        }}
        animate={{
          scale: isMoving ? 1.2 : 0.8,
          opacity: isMoving ? 0.15 : 0.05,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-xl" />
      </motion.div>
    </>
  );
};

export default CursorHighlight;
