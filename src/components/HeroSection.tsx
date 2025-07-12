import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Twitter, Mail } from "lucide-react";
import Hyperspeed from "./Hyperspeed";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  cvLink?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const HeroSection = ({
  name = "Sai Chetan Karri",
  title = "Full Stack Developer & AI Enthusiast",
  description = "Navigating the Intersection of Innovation, Technology, Business, Blockchain, and Web3",
  cvLink = "#",
  socialLinks = {
    github: "https://github.com/SaiChetan338",
    linkedin: "https://www.linkedin.com/in/saichetan117/",
    email: "mailto:saichetankarri9@gmail.com",
  },
}: HeroSectionProps) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Glitchy text state
  const [glitchText, setGlitchText] = useState(
    "Full Stack Developer",
  );
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTexts = [
    "Full Stack Developer",
    "AI Enthusiast",
    "Blockchain Enthusiast",
    "Web3 Developer",
    "Frontend Developer",
    "Backend Developer",
    "3D Modelling",
    "3D Designer",
  ];
  const [currentGlitchIndex, setCurrentGlitchIndex] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const fullText = `${name}`;

  // Aurora background colors
  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Aurora background animation
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  // Glitch effect for title text
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);

      // Glitch effect duration
      setTimeout(() => {
        setCurrentGlitchIndex((prev) => (prev + 1) % glitchTexts.length);
        setGlitchText(
          glitchTexts[(currentGlitchIndex + 1) % glitchTexts.length],
        );
        setIsGlitching(false);
      }, 200);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(glitchInterval);
  }, [currentGlitchIndex, glitchTexts]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      ref={containerRef}
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-gray-950 overflow-hidden cursor-none"
    >
      {/* Hyperspeed Background */}
      <Hyperspeed />

      <motion.div
        className="z-20 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
          <span className="relative">
            {typedText}
            <span className="absolute -right-4 top-0 h-full w-1 bg-green-400 animate-blink"></span>
          </span>
        </h1>

        {/* Glitchy subtitle */}
        <div className="relative mb-4">
          <motion.h2
            className={`text-xl md:text-2xl font-medium text-gray-300 transition-all duration-200 ${
              isGlitching ? "glitch-text" : ""
            }`}
            key={glitchText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: isGlitching
                ? "2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px #ffffff"
                : "0 4px 8px rgba(0,0,0,0.8)",
              transform: isGlitching ? "skew(-2deg) scale(1.02)" : "none",
            }}
          >
            {glitchText}
          </motion.h2>
        </div>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto text-center drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <a href="/intressai.pdf" download>
              <Download className="mr-2 h-5 w-5" /> Resume
            </a>
          </Button>

          <div className="flex gap-4">
            {socialLinks.github && (
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
              </motion.a>
            )}

            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={24} />
              </motion.a>
            )}

            {socialLinks.email && (
              <motion.a
                href={socialLinks.email}
                className="p-3 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={24} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 animate-gradient-x"></div>
    </motion.section>
  );
};

export default HeroSection;
