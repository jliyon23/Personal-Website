import React, { useState, useEffect } from "react";
import data from "./data.json";
import {
  Github,
  Linkedin,
  Download,
  MapPin,
  Mail,
  ExternalLink,
  Menu,
  X,
  MessageCircle,
  Home,
  Award,
  Code,
  BarChart,
  Briefcase,
} from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import NavBar from "./NavBar";
import ChatBot from "./ChatBot";

const VercelPortfolio = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProjectTab, setActiveProjectTab] = useState("web");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "contributions", "certifications", "projects"];
      let current = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rgb-border {
            0% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
            33% { border-color: #00ff00; box-shadow: 0 0 5px #00ff00; }
            66% { border-color: #0000ff; box-shadow: 0 0 5px #0000ff; }
            100% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
        }
        .rgb-border {
            animation: rgb-border 3s linear infinite;
        }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleWhatsAppContact = (service) => {
    const message = `Hi, I'm interested in your ${service} service. Can we discuss more about it?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916282428193?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-zinc-950 pt-10 px-4">
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-6 right-6 z-40 p-2 bg-zinc-800 rounded-md border border-zinc-700 shadow-lg hover:bg-zinc-700 transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-zinc-200" />
      </button>

      {/* Chat Icon */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-zinc-600/50 rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Bar Component */}
      <NavBar
        isOpen={isNavOpen}
        closeNav={() => setIsNavOpen(false)}
        activeSection={activeSection}
      />

      {/* Chat Component */}
      <ChatBot isOpen={isChatOpen} closeChat={() => setIsChatOpen(false)} />

      {/* profile card - Home section */}
      <section
        id="home"
        className="w-full max-w-4xl border border-zinc-800 rounded-md overflow-hidden backdrop-blur-sm bg-zinc-900/20 shadow-2xl flex flex-col md:flex-row items-center p-6 md:p-8 gap-8 transition-all hover:border-zinc-700"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-500 to-slate-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/120583161?u=0000a3b685f97197eaf8f83e6dcb8d4213d95dc3&v=4"
              alt={data.name}
              className="w-36 h-36 md:w-48 md:h-48 rounded-xl object-cover border border-zinc-800 group-hover:scale-[1.02] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start h-full gap-4 md:gap-5 text-center md:text-left w-full md:w-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
              {data.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-5">
              <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                NodeJS Developer
              </span>

              <div className="flex items-center text-zinc-400 text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                <span>Kochi, Kerala</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm mt-2">
              <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-500/10 text-green-300 rounded-full border border-purple-500/20">
                BTech CSE, {data.college}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <p className="text-zinc-300 font-medium uppercase text-sm tracking-wider">
              Connect with me
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center h-10 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-all duration-300 gap-2 border border-zinc-700"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center h-10 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-all duration-300 gap-2 border border-zinc-700"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="resume.pdf"
                download
                className="group relative flex items-center justify-center h-10 px-4 bg-white hover:bg-slate-300 text-black rounded-lg transition-all duration-300 gap-2"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Resume</span>
              </a>
            </div>
          </div>

          <div className="mt-2 flex items-center text-zinc-400 text-sm gap-6 justify-center md:justify-start">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </a>
            <a
              href={data.github}
              className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Projects</span>
            </a>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="#services"
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-zinc-200 border rounded-lg transition-all duration-300 rgb-border hover:bg-zinc-800"
            >
              <Briefcase className="w-4 h-4" />
              My Services
            </a>
          </div>
        </div>
      </section>

      {/* github calender - Contributions section */}
      <section
        id="contributions"
        className="w-full max-w-4xl mt-8 p-6 md:p-8 border border-zinc-800 rounded-md bg-zinc-900/20 shadow-xl flex flex-col gap-5 backdrop-blur-sm transition-all hover:border-zinc-700"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-zinc-300" />
            <h2 className="text-zinc-200 font-semibold text-lg">
              GitHub Contributions
            </h2>
          </div>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            View Profile <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          <div className="min-w-max">
            <GitHubCalendar
              username="jliyon23"
              blockSize={10}
              blockMargin={5}
              fontSize={12}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-xs text-zinc-400">Total Contributions</p>
            <p className="text-xl font-bold text-zinc-100">1000+</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-xs text-zinc-400">Repositories</p>
            <p className="text-xl font-bold text-zinc-100">50+</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-xs text-zinc-400">Longest Streak</p>
            <p className="text-xl font-bold text-zinc-100">12 days</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-xs text-zinc-400">Current Streak</p>
            <p className="text-xl font-bold text-zinc-100">5 days</p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="w-full max-w-4xl mt-12 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-zinc-100">Certifications</h2>
          </div>
          <a
            href={
              "https://www.linkedin.com/in/joseph-liyon-9619ab250/details/certifications/"
            }
            className="text-sm text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            View All <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data.certifications.map((cert) => (
            <div
              key={cert.id}
              className="group flex overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-purple-900/10 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105 hidden md:block"
                />
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium bg-${cert.category.color}-500/90 text-white rounded-full`}
                  >
                    {cert.category.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                    {cert.title}
                    {cert.featured && (
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">
                        Featured
                      </span>
                    )}
                  </h3>
                  <p className="text-zinc-400 mt-1 text-sm">{cert.issuer}</p>
                  <p className="text-zinc-500 text-xs mt-1">
                    Issued: {cert.issueDate}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-blue-400/20  text-zinc-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-zinc-400 text-black rounded-lg transition-all duration-300 text-sm font-medium border border-zinc-700"
                  >
                    <Award className="w-4 h-4" />
                    View Credential
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="w-full max-w-4xl mt-12 flex flex-col gap-6 mb-16"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-zinc-100">Projects</h2>
          </div>
          <a
            href={`${data.github}?tab=repositories`}
            className="text-sm text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            View All <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Project Tabs */}
        <div className="flex gap-2 border-b border-zinc-800">
          <button
            onClick={() => setActiveProjectTab("web")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeProjectTab === "web"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Full Stack
          </button>
          <button
            onClick={() => setActiveProjectTab("scrap")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeProjectTab === "scrap"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Web Scrap
          </button>
          <button
            onClick={() => setActiveProjectTab("ai")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeProjectTab === "ai"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            AI Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects
            .filter((project) => {
              switch (activeProjectTab) {
                case "web":
                  return project.primaryTag.name === "Full Stack";
                case "scrap":
                  return project.primaryTag.name === "Web Scraping";
                case "ai":
                  return project.primaryTag.name === "AI/ML";
                default:
                  return true;
              }
            })
            .map((project) => (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-blue-900/10 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium bg-${project.primaryTag.color}-500/90 text-white rounded-full`}
                    >
                      {project.primaryTag.name}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium bg-${project.secondaryTag.color}-800/90 text-${project.secondaryTag.color}-200 rounded-full`}
                    >
                      {project.secondaryTag.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                      {project.title}
                      {project.status && (
                        <span
                          className={`text-xs px-2 py-0.5 ${
                            project.status.toLowerCase() === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          } rounded-full`}
                        >
                          {project.status}
                        </span>
                      )}
                    </h3>
                    <p className="text-zinc-400 mt-1 text-sm">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-all duration-300 text-sm font-medium border border-zinc-700"
                    >
                      <Github className="w-4 h-4" />
                      View Repo
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm flex items-center gap-1"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-4">
          <a
            href={data.github}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-all duration-300"
          >
            View More Projects
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="w-full max-w-4xl mt-12 flex flex-col gap-6 mb-16"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-zinc-100">My Services</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Stack Development */}
          <div className="group flex flex-col overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-purple-900/10 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                Full Stack Development
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Comprehensive web solutions including e-commerce platforms,
                business websites, custom portals, and powerful admin panels.
                Built with modern technologies and best practices.
              </p>
              <button
                onClick={() => handleWhatsAppContact("Full Stack Development")}
                className="w-full px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-all duration-300 text-sm font-medium border border-purple-500/20"
              >
                Contact for Full Stack
              </button>
            </div>
          </div>

          {/* Static Websites */}
          <div className="group flex flex-col overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-purple-900/10 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                Static Websites
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Fast, responsive, and SEO-friendly static websites for events,
                portfolios, and landing pages. Perfect for showcasing your work
                or promoting special events.
              </p>
              <button
                onClick={() => handleWhatsAppContact("Static Website")}
                className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 text-sm font-medium border border-blue-500/20"
              >
                Contact for Static Site
              </button>
            </div>
          </div>

          {/* Poster Design */}
          <div className="group flex flex-col overflow-hidden border border-zinc-800 rounded-lg bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-purple-900/10 hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                Poster Design
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Creative and professional designs for event posters, menu cards,
                and notices. Eye-catching visuals that effectively communicate
                your message.
              </p>
              <button
                onClick={() => handleWhatsAppContact("Poster Design")}
                className="w-full px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all duration-300 text-sm font-medium border border-green-500/20"
              >
                Contact for Design
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VercelPortfolio;
