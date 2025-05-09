import React from 'react';
import { X, Home, BarChart, Award, Code, Briefcase, Github, Linkedin, Mail } from 'lucide-react';

const NavBar = ({ isOpen, closeNav, activeSection }) => {
    const navLinks = [
        { id: 'home', name: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'services', name: 'My Services', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'contributions', name: 'Contributions', icon: <BarChart className="w-5 h-5" /> },
        { id: 'certifications', name: 'Certifications', icon: <Award className="w-5 h-5" /> },
        { id: 'projects', name: 'Projects', icon: <Code className="w-5 h-5" /> }
    ];

    const socialLinks = [
        { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com/jliyon23' },
        { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/in/joseph-liyon-9619ab250' },
        { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:josephliyon23@gmail.com' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        closeNav();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeNav}
                ></div>
            )}
            
            {/* Navbar */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-zinc-950/95 border-l border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <img src="https://avatars.githubusercontent.com/u/120583161?u=0000a3b685f97197eaf8f83e6dcb8d4213d95dc3&v=4" alt="" className='w-12 h-12 rounded-md' />
                                {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <span className="text-xl font-bold text-white">JL</span>
                                </div> */}
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-100">JLiyon23</h2>
                                    <p className="text-sm text-zinc-400">Full Stack Developer</p>
                                </div>
                            </div>
                            <button 
                                onClick={closeNav}
                                className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {navLinks.map(link => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        activeSection === link.id 
                                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30' 
                                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${
                                        activeSection === link.id 
                                        ? 'bg-blue-500/20 text-blue-400' 
                                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'
                                    }`}>
                                        {link.icon}
                                    </div>
                                    <span className="font-medium">{link.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="p-6 border-t border-zinc-800">
                        <div className="flex items-center justify-between text-sm text-zinc-500">
                            <span>© 2024 Joseph Liyon</span>
                            <span>v1.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;