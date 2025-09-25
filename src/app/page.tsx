"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  type: "web" | "mobile";
  image?: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  current?: boolean;
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Data
  const projects: Project[] = [
    {
      id: 1,
      title: "Typecast",
      description:
        "A content discovery platform that curates short-form videos from top creators and brands to inspire organic social strategies. Built with Next.js, featuring dynamic interface, user authentication, and SEO optimization.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://www.usetypecast.com/",
      type: "web",
    },
    {
      id: 2,
      title: "FIIB Website",
      description:
        "Official website for Fortune Institute of International Business. Comprehensive platform with dynamic CMS, responsive design, and optimized performance for enhanced user experience.",
      tech: ["Next.js", "Redux", "Tailwind CSS", "CMS Integration"],
      link: "https://www.fiib.edu.in/",
      type: "web",
    },
    {
      id: 3,
      title: "Smoll - Pet Care App",
      description:
        "React Native mobile application connecting pet parents with wellness experts. Features free expert advice, custom quotations, and seamless vet appointment bookings.",
      tech: ["React Native", "TypeScript", "Redux", "Firebase"],
      link: "https://play.google.com/store/apps/details?id=com.seldom.small_friend",
      type: "mobile",
    },
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Lead Frontend Developer",
      company: "NSS Pvt. Ltd",
      period: "Oct 2023 – Present",
      current: true,
      description: [
        "Led development of FIIB website using Next.js with elegant animations and intuitive UI/UX",
        "Collaborated directly with clients for 3 months to gather requirements and deploy features",
        "Implemented state management using Redux and Zustand for modularity and scalability",
        "Built Ring Sizer mobile application using React Native with smooth cross-platform usability",
      ],
    },
    {
      id: 2,
      title: "Lead Frontend Developer",
      company: "P2P Block Technologies Pvt. Ltd",
      period: "Jan 2023 – Oct 2023",
      description: [
        "Led frontend development of company portfolio and real-time trading web application",
        "Built projects from scratch using React.js, Next.js with complex state management",
        "Ensured pixel-perfect, accessible UI/UX with secure API integrations",
        "Delivered optimized interfaces using lazy loading and code splitting",
      ],
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Infinity Pillars Pvt. Ltd",
      period: "Jan 2022 – Jan 2023",
      description: [
        "Designed and developed full-fledged E-learning platform with web and mobile interfaces",
        "Built custom UI/UX, API integrations, user dashboards, and multimedia lesson support",
        "Integrated Redux for state management and handled mobile deployment",
        "Delivered seamless learning experience with responsive layouts and clean animations",
      ],
    },
  ];

  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "React Native",
    "Redux",
    "API Integration",
    "Zustand",
    "React Context API",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Material UI",
    "Framer Motion",
    "GSAP",
    "Node.js",
    "MongoDB",
    "Firebase",
    "Docker",
    "Git",
    "Bootstrap",
    "RESTful APIs",
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-4">
            {/* <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              FH
            </motion.div> */}

            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "experience", "contact"].map(
                (section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-300 ${
                      activeSection === section
                        ? "text-blue-400"
                        : "hover:text-blue-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section}
                  </motion.button>
                )
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-zinc-800 border-t border-zinc-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-2 space-y-2">
                {["home", "about", "projects", "experience", "contact"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="block w-full text-left py-2 capitalize hover:text-blue-400 transition-colors"
                    >
                      {section}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10"
          style={{ y: backgroundY }}
        />

        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                Farhan Hussain
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-zinc-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Frontend Developer & React Specialist
            </motion.p>

            <motion.p
              className="text-lg mb-12 max-w-2xl mx-auto text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              3.7+ years crafting exceptional digital experiences with React.js,
              Next.js, and modern frontend technologies. Passionate about
              creating scalable, performant applications that users love.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>

              <motion.a
                href="https://github.com/farhanmian"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-600 px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub Profile
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
                  I&apos;m a passionate Frontend Developer with over 3.7 years
                  of experience building modern, scalable web applications. I
                  specialize in React.js, Next.js, and creating seamless user
                  experiences through thoughtful UI/UX design.
                </p>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  My expertise spans the full development lifecycle, from
                  requirement analysis and architecture design to deployment and
                  optimization. I&apos;m committed to writing clean,
                  maintainable code and staying current with the latest
                  technologies and best practices.
                </p>

                <motion.a
                  href="mailto:farhanmian099@gmail.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="bg-zinc-800 px-4 py-2 rounded-full text-sm font-medium border border-zinc-700 hover:border-blue-500/50 transition-colors duration-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-zinc-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700 overflow-hidden hover:border-blue-500/50 hover:bg-zinc-900/70 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.type === "web"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {project.type}
                    </span>
                  </div>

                  <p className="text-zinc-300 mb-6 line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    View Project
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Work Experience
          </motion.h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative mb-12 ml-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <div className="absolute -left-20 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-zinc-900"></div>

                <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:bg-zinc-800/70 transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-zinc-300">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="text-zinc-400">{exp.period}</span>
                      {exp.current && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-zinc-300">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-zinc-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s connect and discuss how we can bring your ideas
            to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.a
              href="mailto:farhanmian099@gmail.com"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </motion.a>

            <motion.a
              href="tel:+917983265440"
              className="border border-zinc-600 px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Me
            </motion.a>

            <motion.a
              href="https://github.com/farhanmian"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-600 px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            className="text-zinc-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            © All rights reserved. Farhan Hussain.
          </motion.p>
        </div>
      </footer>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default Portfolio;
