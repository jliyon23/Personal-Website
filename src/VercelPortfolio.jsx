import React, { useState, useEffect } from 'react';
import data from './data.json';
import { Github, Linkedin, Download, MapPin, Mail, ExternalLink, Menu, X, MessageCircle, Home, Award, Code, BarChart } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import NavBar from './NavBar';
import ChatBot from './ChatBot';

const VercelPortfolio = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'contributions', 'certifications', 'projects'];
            let current = 'home';
            
            sections.forEach(section => {
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
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='w-full min-h-screen flex flex-col items-center bg-zinc-950 pt-10 px-4'>
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
            <ChatBot 
                isOpen={isChatOpen}
                closeChat={() => setIsChatOpen(false)}
            />
            
            {/* profile card - Home section */}
            <section id="home" className='w-full max-w-4xl border border-zinc-800 rounded-md overflow-hidden backdrop-blur-sm bg-zinc-900/20 shadow-2xl flex flex-col md:flex-row items-center p-6 md:p-8 gap-8 transition-all hover:border-zinc-700'>
                <div className='relative group'>
                    <div className='absolute -inset-0.5 bg-gradient-to-r from-zinc-500 to-slate-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500'></div>
                    <div className='relative'>
                        <img
                            src="https://avatars.githubusercontent.com/u/120583161?u=0000a3b685f97197eaf8f83e6dcb8d4213d95dc3&v=4"
                            alt={data.name}
                            className='w-36 h-36 md:w-48 md:h-48 rounded-xl object-cover border border-zinc-800 group-hover:scale-[1.02] transition-all'
                        />
                    </div>
                </div>

                <div className='flex flex-col justify-start h-full gap-4 md:gap-5 text-center md:text-left w-full md:w-auto'>
                    <div>
                        <h1 className='text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight'>{data.name}</h1>
                        <div className='flex items-center justify-center md:justify-start gap-2 mt-5'>
                            <span className='inline-flex px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20'>NodeJS Developer</span>

                            <div className='flex items-center text-zinc-400 text-sm'>
                                <MapPin className='w-3 h-3 mr-1' />
                                <span>Kochi, Kerala</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm mt-2">
                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-500/10 text-green-300 rounded-full border border-purple-500/20">
                                BTech CSE, {data.college}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 mt-1'>
                        <p className='text-zinc-300 font-medium uppercase text-sm tracking-wider'>Connect with me</p>
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
                        <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                            <Mail className="w-4 h-4" />
                            <span>{data.email}</span>
                        </a>
                        <a href={data.github} className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>Projects</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* github calender - Contributions section */}
            <section id="contributions" className="w-full max-w-4xl mt-8 p-6 md:p-8 border border-zinc-800 rounded-md bg-zinc-900/20 shadow-xl flex flex-col gap-5 backdrop-blur-sm transition-all hover:border-zinc-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Github className="w-5 h-5 text-zinc-300" />
                        <h2 className="text-zinc-200 font-semibold text-lg">GitHub Contributions</h2>
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
                            color="#00ff00"
                            fontSize={12}
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
            <section id="certifications" className="w-full max-w-4xl mt-12 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-zinc-100">Certifications</h2>
                    </div>
                    <a
                        href={'https://www.linkedin.com/in/joseph-liyon-9619ab250/details/certifications/'}
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
                                    <span className={`px-2 py-1 text-xs font-medium bg-${cert.category.color}-500/90 text-white rounded-full`}>
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
                                    <p className="text-zinc-500 text-xs mt-1">Issued: {cert.issueDate}</p>
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
            <section id="projects" className="w-full max-w-4xl mt-12 flex flex-col gap-6 mb-16">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.projects.map((project) => (
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
                                    <span className={`px-2 py-1 text-xs font-medium bg-${project.primaryTag.color}-500/90 text-white rounded-full`}>
                                        {project.primaryTag.name}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium bg-${project.secondaryTag.color}-800/90 text-${project.secondaryTag.color}-200 rounded-full`}>
                                        {project.secondaryTag.name}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 p-5">
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                                        {project.title}
                                        {project.status && (
                                            <span className={`text-xs px-2 py-0.5 ${project.status.toLowerCase() === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} rounded-full`}>
                                                {project.status}
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-zinc-400 mt-1 text-sm">{project.description}</p>
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
        </div>
    );
};

export default VercelPortfolio;