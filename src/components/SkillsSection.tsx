import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import pythonIcon from "@iconify-icons/simple-icons/python";
import cIcon from "@iconify-icons/simple-icons/c";
import cplusplusIcon from "@iconify-icons/simple-icons/cplusplus";
import mongodbIcon from "@iconify-icons/simple-icons/mongodb";
import supabaseIcon from "@iconify-icons/simple-icons/supabase";
import gitIcon from "@iconify-icons/simple-icons/git";
import reactIcon from "@iconify-icons/simple-icons/react";
import nodejsIcon from "@iconify-icons/simple-icons/nodedotjs";
import solidityIcon from "@iconify-icons/simple-icons/solidity";
import rustIcon from "@iconify-icons/simple-icons/rust";
import ipfsIcon from "@iconify-icons/simple-icons/ipfs";
import blenderIcon from "@iconify-icons/simple-icons/blender";
import unrealIcon from "@iconify-icons/simple-icons/unrealengine";
import powerbiIcon from "@iconify-icons/simple-icons/powerbi";
import tableauIcon from "@iconify-icons/simple-icons/tableau";
import googleAnalyticsIcon from "@iconify-icons/simple-icons/googleanalytics";

// Skills data with logos and expertise levels
interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Expert";
  logo: React.ReactNode;
  category: string;
  color: string;
}

interface SkillsSectionProps {
  isDarkMode?: boolean;
}

const SkillsSection = ({ isDarkMode = true }: SkillsSectionProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(0);
  // Track which row is hovered ("top" or "bottom")
  const [hoveredRow, setHoveredRow] = useState<"top" | "bottom" | null>(null);

  // Icon colors for brand consistency
  const iconColors = {
    python: "#00BFFF", // Neonish blue for Python
    cplusplus: "#1E90FF", // Neonish blue for C++
    c: "#A8B9CC",
    react: "#61DAFB",
    nodejs: "#339933",
    mongodb: "#47A248",
    supabase: "#3ECF8E",
    git: "#FF8C00", // Light neonish orange for Git
    solidity: "#FFFFFF", // Changed to white for visibility
    rust: "#DEA584",
    ipfs: "#65C2CB",
    powerbi: "#F2C811",
    tableau: "#E97627",
    blender: "#F5792A",
    unrealengine: "#FFFFFF", // Changed to white for visibility
    googleanalytics: "#F4B400",
    brain: "#FF6F61",
    puzzlePiece: "#A37ACC",
    userTie: "#4ECDC4",
    comments: "#36A2EB",
    users: "#FFA600"
  };

  // React hover card color for consistent hover effects
  const hoverColor = "#61DAFB"; // React's cyan color

  // Top row skills (Programming Languages & Core Technologies)
  const topSkills: Skill[] = [
    { name: "Python", level: "Intermediate", logo: <Icon icon={pythonIcon} width="32" height="32" style={{ color: iconColors.python }} />, category: "Language", color: iconColors.python },
    { name: "C++", level: "Beginner", logo: <Icon icon={cplusplusIcon} width="32" height="32" style={{ color: iconColors.cplusplus }} />, category: "Language", color: iconColors.cplusplus },
    { name: "C", level: "Beginner", logo: <Icon icon={cIcon} width="32" height="32" style={{ color: iconColors.c }} />, category: "Language", color: iconColors.c },
    { name: "MongoDB", level: "Intermediate", logo: <Icon icon={mongodbIcon} width="32" height="32" style={{ color: iconColors.mongodb }} />, category: "Database", color: iconColors.mongodb },
    { name: "Supabase", level: "Intermediate", logo: <Icon icon={supabaseIcon} width="32" height="32" style={{ color: iconColors.supabase }} />, category: "Backend", color: iconColors.supabase },
    { name: "Git", level: "Expert", logo: <Icon icon={gitIcon} width="32" height="32" style={{ color: iconColors.git }} />, category: "Tools", color: iconColors.git },
    { name: "Prompt Engineering", level: "Intermediate", logo: <Icon icon="fa-solid:brain" width="32" height="32" style={{ color: iconColors.brain }} />, category: "AI", color: iconColors.brain },
    { name: "Solidity", level: "Beginner", logo: <Icon icon={solidityIcon} width="32" height="32" style={{ color: iconColors.solidity }} />, category: "Blockchain", color: iconColors.solidity },
    { name: "Rust", level: "Beginner", logo: <Icon icon={rustIcon} width="32" height="32" style={{ color: iconColors.rust }} />, category: "Language", color: iconColors.rust },
    { name: "Unreal Engine", level: "Intermediate", logo: <Icon icon={unrealIcon} width="32" height="32" style={{ color: iconColors.unrealengine }} />, category: "Game Dev", color: iconColors.unrealengine },
    { name: "Blender", level: "Intermediate", logo: <Icon icon={blenderIcon} width="32" height="32" style={{ color: iconColors.blender }} />, category: "3D Design", color: iconColors.blender },
    { name: "Power BI", level: "Intermediate", logo: <Icon icon={powerbiIcon} width="32" height="32" style={{ color: iconColors.powerbi }} />, category: "Analytics", color: iconColors.powerbi },
  ];

  // Bottom row skills (Tools, Analytics & Soft Skills)
  const bottomSkills: Skill[] = [
    { name: "Tableau", level: "Beginner", logo: <Icon icon={tableauIcon} width="32" height="32" style={{ color: iconColors.tableau }} />, category: "Analytics", color: iconColors.tableau },
    { name: "SEO", level: "Intermediate", logo: <Icon icon={googleAnalyticsIcon} width="32" height="32" style={{ color: iconColors.googleanalytics }} />, category: "Marketing", color: iconColors.googleanalytics },
    { name: "Problem Solving", level: "Intermediate", logo: <Icon icon="fa-solid:puzzle-piece" width="32" height="32" style={{ color: iconColors.puzzlePiece }} />, category: "Skills", color: iconColors.puzzlePiece },
    { name: "Leadership", level: "Expert", logo: <Icon icon="fa-solid:user-tie" width="32" height="32" style={{ color: iconColors.userTie }} />, category: "Management", color: iconColors.userTie },
    { name: "Communication", level: "Intermediate", logo: <Icon icon="fa-solid:comments" width="32" height="32" style={{ color: iconColors.comments }} />, category: "Soft Skills", color: iconColors.comments },
    { name: "React", level: "Intermediate", logo: <Icon icon={reactIcon} width="32" height="32" style={{ color: iconColors.react }} />, category: "Frontend", color: iconColors.react },
    { name: "Node.js", level: "Intermediate", logo: <Icon icon={nodejsIcon} width="32" height="32" style={{ color: iconColors.nodejs }} />, category: "Backend", color: iconColors.nodejs },
    { name: "IPFS", level: "Intermediate", logo: <Icon icon={ipfsIcon} width="32" height="32" style={{ color: iconColors.ipfs }} />, category: "Web3", color: iconColors.ipfs },
    { name: "Community Management", level: "Intermediate", logo: <Icon icon="fa-solid:users" width="32" height="32" style={{ color: iconColors.users }} />, category: "Management", color: iconColors.users },
    { name: "n8n", level: "Intermediate", logo: <Icon icon="simple-icons:n8n" width="32" height="32" style={{ color: "#FF6B6B" }} />, category: "Automation", color: "#FF6B6B" },
  ];

  // Set container width for tooltip positioning
  useEffect(() => {
    const updateContainerWidth = () => {
      const container = document.querySelector(".skills-container");
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  // Handle mouse movement for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Determine tooltip color based on screen position (always green)
  const getTooltipColor = (x: number, containerWidth: number) => {
    return "green";
  };

  // Handle skill hover without pausing the animation
  const handleSkillHover = (skill: Skill, isHovering: boolean, row: "top" | "bottom") => {
    if (isHovering) {
      setHoveredSkill(skill);
      setHoveredRow(row);
    } else {
      setHoveredSkill(null);
      setHoveredRow(null);
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden pt-16 pb-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent" />
      </div>

      {/* Top Skills Marquee - Moves Left to Right */}
      <div className="relative z-20 h-1/2 flex items-center skills-container">
        {/* Enhanced fade edges for seamless scroll effect */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black/90 via-black/60 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black/90 via-black/60 to-transparent z-30 pointer-events-none" />

        {/* Top Scrolling Marquee */}
        <div
          className="flex overflow-hidden w-full"
          onMouseMove={handleMouseMove}
        >
          <div
              className="flex space-x-12 min-w-max animate-marquee"
              style={{
                animationDuration: '40s',
                animationDirection: 'normal',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
            {/* First set of skills */}
            {topSkills.map((skill, index) => (
              <motion.div
                key={`top-1-${skill.name}-${index}`}
                className="relative flex-shrink-0 w-28 h-28 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center group border-cyan-500/70 bg-cyan-500/10 hover:border-cyan-400"
                style={{
                  boxShadow: hoveredSkill?.name === skill.name
                    ? `0 0 30px ${hoverColor}, 0 0 60px ${hoverColor}60`
                    : `0 0 15px ${hoverColor}50`,
                }}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                onMouseEnter={() => handleSkillHover(skill, true, "top")}
                onMouseLeave={() => handleSkillHover(skill, false, "top")}
              >
                {/* Skill Logo - Bigger and clearer */}
                <span className="text-4xl select-none filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200 font-bold">
                  {skill.logo}
                </span>

                {/* Enhanced pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 opacity-60 border-cyan-400"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-1 rounded-full opacity-20 bg-cyan-500 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {topSkills.map((skill, index) => (
              <motion.div
                key={`top-2-${skill.name}-${index}`}
                className="relative flex-shrink-0 w-28 h-28 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center group border-cyan-500/70 bg-cyan-500/10 hover:border-cyan-400"
                  style={{
                  boxShadow: hoveredSkill?.name === skill.name
                    ? `0 0 30px ${hoverColor}, 0 0 60px ${hoverColor}60`
                    : `0 0 15px ${hoverColor}50`,
                }}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                onMouseEnter={() => handleSkillHover(skill, true, "top")}
                onMouseLeave={() => handleSkillHover(skill, false, "top")}
              >
                {/* Skill Logo - Bigger and clearer */}
                <span className="text-4xl select-none filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200 font-bold">
                  {skill.logo}
                </span>

                {/* Enhanced pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 opacity-60 border-cyan-400"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-1 rounded-full opacity-20 bg-cyan-500 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Skills Marquee - Moves Right to Left */}
      <div className="relative z-20 h-1/2 flex items-center skills-container">
        {/* Enhanced fade edges for seamless scroll effect */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black/90 via-black/60 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black/90 via-black/60 to-transparent z-30 pointer-events-none" />

        {/* Bottom Scrolling Marquee */}
        <div
          className="flex overflow-hidden w-full"
          onMouseMove={handleMouseMove}
        >
                      <div
              className="flex space-x-12 min-w-max animate-marquee-reverse"
              style={{
                animationDuration: '40s',
                animationDirection: 'reverse',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
            {/* First set of skills */}
            {bottomSkills.map((skill, index) => (
              <motion.div
                key={`bottom-1-${skill.name}-${index}`}
                className="relative flex-shrink-0 w-28 h-28 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center group border-cyan-500/70 bg-cyan-500/10 hover:border-cyan-400"
                style={{
                  boxShadow: hoveredSkill?.name === skill.name
                    ? `0 0 30px ${hoverColor}, 0 0 60px ${hoverColor}60`
                    : `0 0 15px ${hoverColor}50`,
                  }}
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                onMouseEnter={() => handleSkillHover(skill, true, "bottom")}
                onMouseLeave={() => handleSkillHover(skill, false, "bottom")}
                >
                  {/* Skill Logo - Bigger and clearer */}
                  <span className="text-4xl select-none filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200 font-bold">
                    {skill.logo}
                  </span>

                  {/* Enhanced pulsing ring effect */}
                  <motion.div
                  className="absolute inset-0 rounded-full border-2 opacity-60 border-cyan-400"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  />

                  {/* Inner glow effect */}
                <div className="absolute inset-1 rounded-full opacity-20 bg-cyan-500 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {bottomSkills.map((skill, index) => (
              <motion.div
                key={`bottom-2-${skill.name}-${index}`}
                className="relative flex-shrink-0 w-28 h-28 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center group border-cyan-500/70 bg-cyan-500/10 hover:border-cyan-400"
                style={{
                  boxShadow: hoveredSkill?.name === skill.name
                    ? `0 0 30px ${hoverColor}, 0 0 60px ${hoverColor}60`
                    : `0 0 15px ${hoverColor}50`,
                }}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                onMouseEnter={() => handleSkillHover(skill, true, "bottom")}
                onMouseLeave={() => handleSkillHover(skill, false, "bottom")}
              >
                {/* Skill Logo - Bigger and clearer */}
                <span className="text-4xl select-none filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200 font-bold">
                  {skill.logo}
                </span>

                {/* Enhanced pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 opacity-60 border-cyan-400"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-1 rounded-full opacity-20 bg-cyan-500 group-hover:opacity-30 transition-opacity duration-300" />
                </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Interactive Tooltip */}
      <AnimatePresence>
        {hoveredSkill && containerWidth > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: Math.min(
                Math.max(mousePosition.x - 100, 20),
                containerWidth - 220,
              ),
              top: hoveredRow === "top"
                ? Math.max(mousePosition.y - 140, 10) // show above for top row
                : Math.min(420, 500 - 140), // shift up if it would overflow (500 is container height, 140 is tooltip height)
            }}
          >
            <div
                className="px-5 py-4 rounded-xl border-2 backdrop-blur-lg shadow-2xl relative overflow-hidden"
              style={{
                  borderColor: `${hoveredSkill.color}80`,
                  backgroundColor: `${hoveredSkill.color}25`,
                  color: hoveredSkill.color,
                  boxShadow: `0 0 30px ${hoveredSkill.color}80, 0 0 60px ${hoveredSkill.color}40`,
              }}
            >
              {/* Background glow effect */}
              <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: hoveredSkill.color }}
              />

              <div className="relative z-10">
                <div className="font-bold text-lg mb-1 flex items-center gap-2">
                  <span className="text-2xl">{hoveredSkill.logo}</span>
                  {hoveredSkill.name}
                </div>
                <div
                  className="text-sm opacity-90 mb-3"
                  style={{ color: `${hoveredSkill.color}CC` }}
                >
                  {hoveredSkill.level} • {hoveredSkill.category}
                </div>

                {/* Enhanced expertise level indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-75">Skill Level:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((level) => {
                      const isActive =
                        (hoveredSkill.level === "Expert" && level <= 3) ||
                        (hoveredSkill.level === "Intermediate" && level <= 2) ||
                        (hoveredSkill.level === "Beginner" && level <= 1);

                      return (
                        <motion.div
                          key={level}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: level * 0.1 }}
                          className={`w-3 h-3 rounded-full border ${
                            isActive
                              ? "shadow-lg"
                              : "bg-gray-700 border-gray-600"
                          }`}
                          style={{
                            backgroundColor: isActive ? hoveredSkill.color : undefined,
                            borderColor: isActive ? hoveredSkill.color : undefined,
                            boxShadow: isActive ? `0 0 10px ${hoveredSkill.color}80` : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsSection;
