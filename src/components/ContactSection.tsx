import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Phone, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

interface ContactSectionProps {
  isDarkMode?: boolean;
}

const ContactSection = ({ isDarkMode = true }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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
    setStatusMessage("");

    try {
      // Initialize EmailJS (replace with your actual service ID, template ID, and public key)
      const result = await emailjs.sendForm(
        "service_qjra6pe", // Your EmailJS service ID
        "template_rcgpewf", // Your EmailJS template ID
        formRef.current!,
        "7wzNJ8y8Z9UGXW4lu", // Your EmailJS public key
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
      setStatusMessage("Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "saichetan.karri@example.com",
      href: "mailto:saichetan.karri@example.com",
      color: "blue",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Available for Remote Work",
      color: "green",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Response Time",
      value: "Within 24 hours",
      color: "blue",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:text-blue-400",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://linkedin.com",
      color: "hover:text-blue-400",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      href: "mailto:saichetan.karri@example.com",
      color: "hover:text-green-400",
    },
  ];

  return (
    <div className="bg-black">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3
            className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Let's Connect
          </h3>

          <p
            className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-8 leading-relaxed`}
          >
            I'm always excited to discuss new projects, innovative ideas, or
            opportunities to contribute to your vision. Whether you're looking
            for a full-stack developer, AI integration specialist, or technical
            consultant, I'd love to hear from you.
          </p>

          <div className="space-y-6 mb-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div
                  className={`p-3 rounded-full border ${
                    info.color === "blue"
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : "border-green-500/30 bg-green-500/10 text-green-400"
                  }`}
                >
                  {info.icon}
                </div>
                <div>
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className={`${isDarkMode ? "text-white" : "text-gray-900"} hover:text-blue-400 transition-colors`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className={isDarkMode ? "text-white" : "text-gray-900"}>
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full border ${
                  isDarkMode
                    ? "border-gray-700 text-gray-400 hover:border-blue-500/50"
                    : "border-gray-300 text-gray-600 hover:border-blue-500/50"
                } ${social.color} transition-all duration-300`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`p-8 rounded-lg border ${
            isDarkMode
              ? "bg-gray-900/50 border-gray-800"
              : "bg-white shadow-lg border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:ring-2 focus:ring-blue-500/20 outline-none`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  } focus:ring-2 focus:ring-blue-500/20 outline-none`}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:ring-2 focus:ring-blue-500/20 outline-none`}
                placeholder="Project discussion, collaboration, etc."
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:ring-2 focus:ring-blue-500/20 outline-none`}
                placeholder="Tell me about your project, ideas, or how we can work together..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </Button>

            {submitStatus === "success" && (
              <div className="flex items-center text-green-400 text-sm">
                <CheckCircle className="w-5 h-5 mr-2" />
                {statusMessage}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="flex items-center text-red-400 text-sm">
                <XCircle className="w-5 h-5 mr-2" />
                {statusMessage}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
