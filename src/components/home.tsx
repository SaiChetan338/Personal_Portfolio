import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ThemeToggle from "./ThemeToggle";
import MatrixBackground from "./MatrixBackground";
import ProfileCard from "./ProfileCard";
import { Github, Linkedin, Mail, Menu, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import DecryptedText from './DecryptedText';
import Hyperspeed from './Hyperspeed';
import ScrollVelocity from './ScrollVelocity';
import Dock from './ui/dock';
import { FaGithub, FaDiscord, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">(
    "",
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Additional theme switching logic would go here
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Initialize EmailJS
      await emailjs.sendForm(
        "service_qjra6pe", // EmailJS service ID
        "template_rcgpewf", // EmailJS template ID
        formRef.current!,
        "7wzNJ8y8Z9UGXW4lu", // EmailJS public key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-transparent" : "bg-gray-50"} transition-all duration-700 ease-in-out relative z-10`}
      style={{
        scrollBehavior: "smooth",
      }}
    >
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <HeroSection isDarkMode={isDarkMode} />
        </section>

        {/* Profile Section */}
        <section className="py-20 transition-all duration-700 ease-in-out bg-black relative">
          <MatrixBackground className="opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Meet{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  The Person
                </span>
              </h2>
              <div className="flex justify-center items-center w-full min-h-[60vh]">
                <ProfileCard 
                  isDarkMode={isDarkMode}
                  avatarUrl="/avatar.png"
                  onContactClick={() => {
                    // Scroll to contact section
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 transition-all duration-700 ease-in-out bg-black relative"
        >
          <MatrixBackground className="opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                About{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  Me
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} space-y-4`}
                >
                  <DecryptedText text="I’m an enthusiastic full-stack developer and AI enthusiast with a strong foundation in computer science and hands-on experience in Python and C; My passion lies in building smart, scalable, and user-friendly applications that combine traditional development with modern AI capabilities; I actively explore prompt engineering, AI-powered workflows, and vibe coding with AI to enhance productivity and creativity in software development; Alongside my coding skills, I’ve worked on 3D modeling in Blender and game development using Unreal Engine, where I enjoy bringing ideas to life in interactive formats; I’m also interested in SEO and how intelligent design can improve digital reach and user experience; Whether it’s developing decentralized systems or experimenting with AI models, I love working on projects that challenge me to learn, adapt, and build meaningful tech;" />
                </div>

                <div>
                  <div className="matrix-card">
                    <div className="card__border"></div>
                    <div className="card_title__container">
                      <h3 className="card_title text-xl font-semibold">
                        Quick Facts
                      </h3>
                      <p className="card_paragraph">
                        Key highlights of my professional journey
                      </p>
                    </div>
                    <hr className="line" />
                    <div className="card__list">
                      <div className="card__list_item">
                        <div className="check">
                          <svg className="check_svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="list_text">
                          Strong foundation in full-stack development with Python and C;
                        </span>
                      </div>
                      <div className="card__list_item">
                        <div className="check">
                          <svg className="check_svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="list_text">
                          Hands-on experience in building AI-powered and decentralized applications;
                        </span>
                      </div>
                      <div className="card__list_item">
                        <div className="check">
                          <svg className="check_svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="list_text">
                          Developed 5+ projects including 3D games, IPFS-based storage, and AI integrations;
                        </span>
                      </div>
                      <div className="card__list_item">
                        <div className="check">
                          <svg className="check_svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="list_text">
                          Skilled in modern 3D tools like Blender, Unreal Engine, and Metamask-based auth systems;
                        </span>
                      </div>
                      <div className="card__list_item">
                        <div className="check">
                          <svg className="check_svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="list_text">
                          Passionate about prompt engineering, vibe coding with AI, and creative tech innovation;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 transition-all duration-700 ease-in-out bg-black relative"
        >
          <MatrixBackground className="opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                In my{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  Barracks
                </span>
              </h2>
              <SkillsSection isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 transition-all duration-700 ease-in-out relative overflow-hidden"
        >
          {/* Hyperspeed Background */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <Hyperspeed />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Featured{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  Projects
                </span>
              </h2>
              <ProjectsSection isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 transition-all duration-700 ease-in-out bg-black relative"
        >
          <MatrixBackground className="opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Get In{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  Touch
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} space-y-4`}
                >
                  <p>
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision. Feel free to
                    reach out through any of the methods below.
                  </p>

                  <div className="flex flex-col items-center mt-8 space-y-8">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-green-500 shadow-lg">
                        <img
                          src="/profile.png"
                          alt="Contact Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Social Media Dock */}
                    <div className="relative w-full flex justify-center">
                      <Dock
                        position="bottom"
                        className="!static !w-auto !h-auto"
                        items={[
                          {
                            link: 'mailto:saichetankarri9@gmail.com',
                            target: '_self',
                            Icon: <Mail size={28} />,
                            defaultBgColor: 'bg-zinc-700',
                            hoverBgColor: 'bg-zinc-600',
                            tooltip: 'Email',
                          },
                          {
                            link: 'https://github.com/SaiChetan338',
                            target: '_blank',
                            Icon: <FaGithub size={28} />,
                            defaultBgColor: 'bg-zinc-700',
                            hoverBgColor: 'bg-zinc-600',
                            tooltip: 'GitHub',
                          },
                          {
                            link: 'https://discord.com/users/your-discord-id',
                            target: '_blank',
                            Icon: <FaDiscord size={28} />,
                            defaultBgColor: 'bg-zinc-700',
                            hoverBgColor: 'bg-zinc-600',
                            tooltip: 'Discord',
                          },
                          {
                            link: 'https://www.linkedin.com/in/saichetan117/',
                            target: '_blank',
                            Icon: <FaLinkedin size={28} />,
                            defaultBgColor: 'bg-zinc-700',
                            hoverBgColor: 'bg-zinc-600',
                            tooltip: 'LinkedIn',
                          },
                          {
                            link: 'https://instagram.com/saichetan338',
                            target: '_blank',
                            Icon: <FaInstagram size={28} />,
                            defaultBgColor: 'bg-zinc-700',
                            hoverBgColor: 'bg-zinc-600',
                            tooltip: 'Instagram',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-gray-900 border-gray-700 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"} focus:ring-2 focus:ring-blue-500/20 outline-none`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border transition-colors ${isDarkMode ? "bg-gray-900 border-gray-700 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"} focus:ring-2 focus:ring-blue-500/20 outline-none`}
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block mb-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={`w-full px-4 py-2 rounded-md border transition-colors resize-none ${isDarkMode ? "bg-gray-900 border-gray-700 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"} focus:ring-2 focus:ring-blue-500/20 outline-none`}
                        placeholder="Your message"
                      ></textarea>
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-3 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                        Failed to send message. Please try again or contact me
                        directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${isDarkMode ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" : "bg-black hover:bg-gray-800"} text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Scroll Velocity Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <MatrixBackground className="opacity-30" />
        <div className="relative z-10">
          <ScrollVelocity
            texts={['!Thank you!', '!Looking forward to connect with you!']}
            velocity={50}
            className="text-gray-500"
          />
        </div>
      </section>

      {/* Back to top button */}
      <motion.button
        onClick={() => scrollToSection("hero")}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-100"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ y: -2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;
