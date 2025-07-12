import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SmoothCursorProps {
  color?: string;
}

export const SmoothCursor = ({ color = "#00ffff" }: SmoothCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timeout);
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
        <div
          className="w-4 h-4 rounded-full shadow-lg"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          }}
        />
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
        <div
          className="w-10 h-10 rounded-full border blur-sm"
          style={{
            borderColor: `${color}40`,
            backgroundColor: `${color}10`,
          }}
        />
      </motion.div>

      {/* Ripple effect on click */}
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
          <div
            className="w-15 h-15 rounded-full border-2"
            style={{
              borderColor: `${color}60`,
            }}
          />
        </motion.div>
      )}
    </>
  );
};
