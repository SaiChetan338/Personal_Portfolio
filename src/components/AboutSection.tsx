import React from "react";
import { motion } from "framer-motion";
import { Code, Brain, Rocket, Users } from "lucide-react";

interface AboutSectionProps {
  isDarkMode?: boolean;
}

const AboutSection = ({ isDarkMode = true }: AboutSectionProps) => {
  const achievements = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code Advocate",
      description: "Writing maintainable, scalable code with best practices",
      color: "blue",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI/ML Integration",
      description: "Implementing intelligent features in web applications",
      color: "green",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Building fast, efficient applications that scale",
      color: "blue",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Leading projects and mentoring junior developers",
      color: "green",
    },
  ];

  return (
    <div className="bg-black">
      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} space-y-4`}
        >
          <p>
            I'm a passionate full-stack developer and AI enthusiast with
            expertise in building scalable web applications and intelligent
            systems. With a strong foundation in computer science and hands-on
            experience with cutting-edge technologies, I create innovative
            solutions that bridge the gap between complex problems and elegant
            user experiences.
          </p>
          <p>
            My journey in technology began with a fascination for artificial
            intelligence and machine learning, which evolved into a
            comprehensive skill set spanning frontend development, backend
            architecture, cloud computing, and AI/ML implementation.
          </p>
          <p>
            When I'm not coding, you can find me experimenting with new AI
            models, contributing to open-source projects, or sharing insights
            about the intersection of traditional software development and
            artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white shadow-md border-gray-200"
              } hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`mb-3 ${
                  achievement.color === "blue"
                    ? "text-blue-400"
                    : "text-green-400"
                }`}
              >
                {achievement.icon}
              </div>
              <h4
                className={`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {achievement.title}
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
