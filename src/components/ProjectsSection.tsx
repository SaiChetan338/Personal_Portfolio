import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contributor {
  name: string;
  avatar: string;
  profileUrl: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  details: string;
  status?: "completed" | "under progress";
  contributors?: Contributor[];
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Portfolio projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "SAGE AI TUTOR",
      description:
        "An intelligent AI-powered tutoring system with Intel OpenVINO optimization for enhanced performance and personalized learning experiences.",
      details:
        "SAGE AI TUTOR is a comprehensive educational platform that leverages artificial intelligence and Intel OpenVINO optimization for enhanced performance. The system features text generation, speech-to-text transcription, text-to-speech synthesis, image analysis, document processing, and attendance detection. Built with modern AI/ML technologies including PyTorch, Transformers, and Intel OpenVINO, it provides students with customized learning experiences, real-time feedback, and engaging educational content. The platform achieves 53.25% reduction in model size and 72.52% improvement in inference latency through CPU-optimized inference.",
      image:
        "/sage-cover.jpg",
      technologies: ["React", "Python", "FastAPI", "PyTorch", "Intel OpenVINO", "Transformers", "OpenCV"],
      githubUrl: "https://github.com/sathwik-y/AI-Tutor-Intel.git",
      featured: true,
      status: "completed",
      contributors: [
        {
          name: "SaiChetan338",
          avatar: "https://github.com/SaiChetan338.png",
          profileUrl: "https://github.com/SaiChetan338"
        },
        {
          name: "Sathwik Y",
          avatar: "https://github.com/sathwik-y.png",
          profileUrl: "https://github.com/sathwik-y"
        },
        {
          name: "Bhargav Padala",
          avatar: "/b-logo.svg?v=1",
          profileUrl: "https://www.linkedin.com/in/bhargav-padala-b636ab24a/"
        }
      ],
    },
    {
      id: 2,
      title: "WEB3 VAULT - IPFS FILE AND PASSWORD STORAGE",
      description:
        "A decentralized, secure vault system built on IPFS and Web3 technology for storing files and passwords with blockchain authentication.",
      details:
        "WEB3 VAULT is a revolutionary decentralized storage solution that combines IPFS (InterPlanetary File System) with Web3 technology to create a secure, user-controlled vault for files and passwords. The system features end-to-end encryption, blockchain wallet authentication, distributed storage across IPFS nodes, and zero-knowledge architecture. Users maintain complete control over their data through cryptographic keys, with no centralized server storing sensitive information. The platform provides seamless access to encrypted files and passwords while ensuring maximum security and privacy through decentralized technology.",
      image:
        "/web3-vault-cover.jpg",
      technologies: ["IPFS", "Web3", "Solidity", "React", "Encryption", "Blockchain", "MetaMask"],
      githubUrl: "https://github.com/SaiChetan338/web3-secure-keep.git",
      featured: true,
      status: "completed",
      contributors: [
        {
          name: "SaiChetan338",
          avatar: "https://github.com/SaiChetan338.png",
          profileUrl: "https://github.com/SaiChetan338"
        }
      ],
    },
    {
      id: 3,
      title: "NIVASA - APARTMENT ADMINISTRATION SYSTEM",
      description:
        "A modern, full-stack web application for managing apartment communities with role-based dashboards and real-time features.",
      details:
        "Nivasa is a comprehensive apartment administration system designed to streamline property management operations. The platform includes tenant registration and management, maintenance ticket tracking, rent collection, utility bill management, and financial reporting. The system provides role-based dashboards for Admins, Tenants, and Technicians with real-time notifications, secure JWT authentication, and responsive UI for both desktop and mobile. Built with React, Node.js, Express, and MongoDB, it offers a user-friendly interface ensuring efficient communication and transparent property management processes.",
      image:
        "/nivasa-cover.jpg",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS", "shadcn/ui"],
      githubUrl: "https://github.com/sai117/Nivasa.git",
      liveUrl: "https://nivasa-production-7aa9.up.railway.app",
      featured: true,
      status: "completed",
      contributors: [
        {
          name: "SaiChetan338",
          avatar: "https://github.com/SaiChetan338.png",
          profileUrl: "https://github.com/SaiChetan338"
        },
        {
          name: "sai117",
          avatar: "https://github.com/sai117.png",
          profileUrl: "https://github.com/sai117"
        },
        {
          name: "RushikX",
          avatar: "https://github.com/RushikX.png",
          profileUrl: "https://github.com/RushikX"
        },
        {
          name: "Bharyy",
          avatar: "https://github.com/Bharyy.png",
          profileUrl: "https://github.com/Bharyy"
        },
        {
          name: "Nitin-Penupala",
          avatar: "https://github.com/Nitin-Penupala.png",
          profileUrl: "https://github.com/Nitin-Penupala"
        },
        {
          name: "dineshviriyala",
          avatar: "https://github.com/dineshviriyala.png",
          profileUrl: "https://github.com/dineshviriyala"
        }
      ],
    },
    {
      id: 4,
      title: "WEB3 DAPP",
      description:
        "A decentralized application built with modern Web3 technologies for blockchain-based solutions and smart contract integration.",
      details:
        "WEB3 DAPP is an innovative decentralized application designed to leverage blockchain technology for secure, transparent, and decentralized solutions. The platform features smart contract integration, decentralized data storage, blockchain authentication, and Web3 wallet connectivity. Built with modern Web3 technologies, it provides users with a seamless decentralized experience while ensuring data integrity, transparency, and user control over their digital assets and interactions.",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      technologies: ["Web3", "Solidity", "React", "Hardhat", "Ethers.js", "IPFS", "MetaMask"],
      githubUrl: "https://github.com/SaiChetan338/web3-dapp",
      featured: false,
      status: "under progress",
      contributors: [
        {
          name: "SaiChetan338",
          avatar: "https://github.com/SaiChetan338.png",
          profileUrl: "https://github.com/SaiChetan338"
        }
      ],
    },
    {
      id: 5,
      title: "PHARMA DECK",
      description:
        "A comprehensive digital tracking system for pharmaceutical production companies with layer architecture and role-based management.",
      details:
        "PHARMA DECK is a sophisticated digital tracking and management system designed specifically for pharmaceutical production companies. The platform implements a multi-layer architecture with distinct roles and responsibilities for different stakeholders in the pharmaceutical production process. The system features real-time activity tracking, production workflow management, quality control monitoring, regulatory compliance tracking, inventory management, and comprehensive reporting. Built with modern web technologies, it provides role-based dashboards for production managers, quality assurance teams, regulatory officers, and administrative staff, ensuring efficient communication and transparent tracking of all pharmaceutical production activities.",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API", "Material-UI"],
      githubUrl: "https://github.com/SaiChetan338/pharma-deck",
      featured: false,
      status: "under progress",
      contributors: [
        {
          name: "SaiChetan338",
          avatar: "https://github.com/SaiChetan338.png",
          profileUrl: "https://github.com/SaiChetan338"
        },
        {
          name: "Bhargav Padala",
          avatar: "/b-logo.svg?v=1",
          profileUrl: "https://www.linkedin.com/in/bhargav-padala-b636ab24a/"
        }
      ],
    },
  ];

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <section
      id="projects"
      className="py-20 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Subtle gradient background that blends seamlessly */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent" />
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white relative inline-block">
            <span className="relative z-10">My Projects</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore my latest work showcasing my skills in development, design,
            and problem-solving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left side - Project list */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-lg shadow-blue-400/50"></span>
              Projects
            </h3>

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedProject === project.id
                    ? "bg-gray-800/80 border-blue-500/50 shadow-lg shadow-blue-500/20"
                    : "bg-gray-900/50 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/60"
                }`}
                onClick={() => handleProjectClick(project.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {project.title}
                      </h4>
                      {project.featured && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Featured
                        </Badge>
                      )}
                      {project.status && (
                        <Badge
                          className={`text-xs ${
                            project.status === "completed"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }`}
                        >
                          {project.status === "completed"
                            ? "Completed"
                            : "Under Progress"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-600/50 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-gray-800/50 text-gray-400 border-gray-600/50 text-xs"
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    

                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      selectedProject === project.id
                        ? "rotate-90 text-blue-400"
                        : ""
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Project details */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <AnimatePresence mode="wait">
              {selectedProjectData ? (
                <motion.div
                  key={selectedProjectData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/80 rounded-lg border border-gray-700/50 overflow-hidden backdrop-blur-sm"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={selectedProjectData.image}
                      alt={selectedProjectData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                    {/* Neon border effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-blue-500 to-green-500"></div>
                      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-green-500 to-blue-500"></div>
                      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-green-500 to-blue-500"></div>
                      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-blue-500 to-green-500"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {selectedProjectData.title}
                      </h3>
                      {selectedProjectData.featured && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Featured
                        </Badge>
                      )}
                      {selectedProjectData.status && (
                        <Badge
                          className={`${
                            selectedProjectData.status === "completed"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }`}
                        >
                          {selectedProjectData.status === "completed"
                            ? "Completed"
                            : "Under Progress"}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {selectedProjectData.details}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProjectData.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-600/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>



                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {selectedProjectData.githubUrl && (
                          <a
                            href={selectedProjectData.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-blue-400 transition-colors border border-gray-700 hover:border-blue-500/50"
                          >
                            <Github size={18} />
                            <span>Code</span>
                          </a>
                        )}
                        {selectedProjectData.liveUrl && (
                          <a
                            href={selectedProjectData.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                      
                      {/* Contributors next to GitHub link */}
                      {selectedProjectData.contributors && selectedProjectData.contributors.length > 0 && (
                        <div className="flex -space-x-2">
                          {selectedProjectData.contributors.map((contributor, index) => (
                            <a
                              key={index}
                              href={contributor.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative group"
                              title={contributor.name}
                            >
                              <img
                                src={contributor.avatar}
                                alt={contributor.name}
                                className="w-12 h-12 rounded-full border-2 border-gray-700 hover:border-blue-400 transition-all duration-200 group-hover:scale-110"
                                onError={(e) => {
                                  e.currentTarget.src = "https://github.com/github.png";
                                }}
                              />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-12 text-center backdrop-blur-sm"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <Code className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Select a Project
                  </h3>
                  <p className="text-gray-400">
                    Click on any project from the list to view detailed
                    information, technologies used, and live demos.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="glitch-button inline-block font-medium">
            Let's work together
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
