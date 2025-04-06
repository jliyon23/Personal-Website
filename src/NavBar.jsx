import React from 'react';
import { X, Home, BarChart, Award, Code } from 'lucide-react';

const NavBar = ({ isOpen, closeNav, activeSection }) => {
    const navLinks = [
        { id: 'home', name: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'contributions', name: 'Contributions', icon: <BarChart className="w-5 h-5" /> },
        { id: 'certifications', name: 'Certifications', icon: <Award className="w-5 h-5" /> },
        { id: 'projects', name: 'Projects', icon: <Code className="w-5 h-5" /> }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80; // header height + some padding
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
            <div className={`fixed top-0 right-0 h-full w-64 bg-zinc-950/50 border-l border-zinc-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-zinc-100">JLiyon23</h2>
                        <button 
                            onClick={closeNav}
                            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {navLinks.map(link => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    activeSection === link.id 
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                                }`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </button>
                        ))}
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-zinc-800">
                        <p className="text-zinc-500 text-sm">
                            © 2025 Joseph Liyon PT
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;