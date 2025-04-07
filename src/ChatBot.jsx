import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';
import axios from 'axios';
import portfolioData from './data.json';


const ChatBot = ({ isOpen, closeChat }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `Hi there! I'm ${portfolioData.name}'s portfolio assistant. How can I help you today?` }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAllSkills = () => {
        const projectTech = portfolioData.projects.flatMap(project => project.technologies);
        const certSkills = portfolioData.certifications.flatMap(cert => cert.skills);
        const allSkills = [...new Set([...projectTech, ...certSkills])];
        return allSkills.join(", ");
    };

    const getProjectsInfo = () => {
        return portfolioData.projects.map(project => 
            `${project.title}: ${project.description} (Status: ${project.status})`
        ).join("\n");
    };

    const getCertificationsInfo = () => {
        return portfolioData.certifications.map(cert => 
            `${cert.title} from ${cert.issuer} (${cert.issueDate})`
        ).join("\n");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim()) return;
        
        const userMessageId = messages.length + 1;
        setMessages(prev => [...prev, { id: userMessageId, type: 'user', text: inputMessage }]);
        
        const userMessage = inputMessage;
        
        setInputMessage('');
        
        setChatHistory(oldChatHistory => [
            ...oldChatHistory,
            {
                role: "user",
                parts: [{ text: userMessage }]
            }
        ]);
        
        setLoading(true);
        setTimeout(async () => {
            let response;
            const lowerCaseInput = userMessage.toLowerCase();
            
            if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
                response = `Hello! I'm ${portfolioData.name}'s portfolio assistant. How can I help you learn more about Joseph today?`;
            } else if (lowerCaseInput.includes('who') && (lowerCaseInput.includes('you') || lowerCaseInput.includes('are') || lowerCaseInput.includes('joseph'))) {
                response = `I'm an assistant for ${portfolioData.name}'s portfolio. Joseph is a web developer who studied at ${portfolioData.college}. He has experience with various web technologies and has worked on multiple projects.`;
            } else if (lowerCaseInput.includes('name')) {
                response = `My creator's name is ${portfolioData.name}.`;
            } else if (lowerCaseInput.includes('project')) {
                if (lowerCaseInput.includes('cloud') || lowerCaseInput.includes('cloudspace')) {
                    const project = portfolioData.projects.find(p => p.title === "CloudSpace");
                    response = `CloudSpace is ${project.description}. It uses technologies like ${project.technologies.join(', ')}. You can check it out on GitHub: ${project.repoUrl}`;
                } else if (lowerCaseInput.includes('llm') || lowerCaseInput.includes('chatbot')) {
                    const project = portfolioData.projects.find(p => p.title === "LLM Chatbot");
                    response = `LLM Chatbot is ${project.description}. It uses technologies like ${project.technologies.join(', ')}. You can see the demo at ${project.demoUrl} or check the code at ${project.repoUrl}`;
                } else if (lowerCaseInput.includes('ktu') || lowerCaseInput.includes('result')) {
                    const project = portfolioData.projects.find(p => p.title === "KTU-Results");
                    response = `KTU-Results is ${project.description}. It uses technologies like ${project.technologies.join(', ')}. You can see the demo at ${project.demoUrl} or check the code at ${project.repoUrl}`;
                } else if (lowerCaseInput.includes('fugeniz')) {
                    const project = portfolioData.projects.find(p => p.title === "FUGENIZ.11");
                    response = `FUGENIZ.11 is ${project.description}. It uses technologies like ${project.technologies.join(', ')}. You can see the demo at ${project.demoUrl} or check the code at ${project.repoUrl}`;
                } else if (lowerCaseInput.includes('student') || lowerCaseInput.includes('management')) {
                    const project = portfolioData.projects.find(p => p.title === "Student Management System");
                    response = `Student Management System is ${project.description}. It uses technologies like ${project.technologies.join(', ')}. You can check the code at ${project.repoUrl}`;
                } else {
                    response = `Joseph has worked on several projects including:\n\n${getProjectsInfo()}\n\nWhich project would you like to know more about?`;
                }
            } else if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('email')) {
                response = `You can contact Joseph at ${portfolioData.email}`;
            } else if (lowerCaseInput.includes('github')) {
                response = `You can find Joseph's GitHub at ${portfolioData.github}`;
            } else if (lowerCaseInput.includes('linkedin')) {
                response = `You can connect with Joseph on LinkedIn at ${portfolioData.linkedin}`;
            } else if (lowerCaseInput.includes('college') || lowerCaseInput.includes('education') || lowerCaseInput.includes('study')) {
                response = `Joseph studied at ${portfolioData.college}.`;
            } else if (lowerCaseInput.includes('certification') || lowerCaseInput.includes('certificate')) {
                response = `Joseph has the following certifications:\n\n${getCertificationsInfo()}`;
            } else if (lowerCaseInput.includes('stack') || lowerCaseInput.includes('technology') || lowerCaseInput.includes('skill') || lowerCaseInput.includes('tech')) {
                response = `Joseph is skilled in ${getAllSkills()}. His projects showcase these skills in practical applications.`;
            } else {
                try {
                    const apiResponse = await axios.post('https://llmchatbotapi.vercel.app/ask', {
                        history: chatHistory,
                        message: userMessage
                    });
                    response = apiResponse.data.data;
                } catch (error) {
                    console.error("Error fetching response from API:", error);
                    response = "I'm sorry, I couldn't understand that. Could you please rephrase?";
                }
            }
            
            setMessages(prev => [...prev, { id: userMessageId + 1, type: 'bot', text: response }]);
            
            setChatHistory(oldChatHistory => [
                ...oldChatHistory,
                {
                    role: "model",
                    parts: [{ text: response }]
                }
            ]);
            
            setLoading(false);
        }, 1000);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:bg-transparent md:backdrop-blur-none"
                    onClick={closeChat}
                ></div>
            )}
            
            {/* Chat Window */}
            <div className={`fixed bottom-2 right-2 w-full max-w-sm h-96 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                {/* Chat Header */}
                <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <h3 className="text-zinc-100 font-medium">Portfolio Assistant</h3>
                    </div>
                    <button 
                        onClick={closeChat}
                        className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-zinc-950">
                    {messages.map(message => (
                        <div 
                            key={message.id} 
                            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-white' : 'bg-zinc-800'}`}>
                                    {message.type === 'user' ? <User className="w-4 h-4 text-black" /> : <Bot className="w-4 h-4 text-zinc-300" />}
                                </div>
                                <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-teal-500 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="mb-4 flex justify-start">
                            <div className="flex gap-2 max-w-xs lg:max-w-md">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800">
                                    <Bot className="w-4 h-4 text-zinc-300" />
                                </div>
                                <div className="p-3 rounded-lg bg-zinc-800 text-zinc-200">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about Joseph's portfolio..."
                            className="flex-1 p-2 bg-zinc-800 text-zinc-200 rounded-md border border-zinc-700 focus:outline-none focus:border-teal-500"
                            disabled={loading}
                        />
                        <button 
                            type="submit" 
                            className="p-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition-colors disabled:bg-zinc-800 disabled:cursor-not-allowed"
                            disabled={!inputMessage.trim() || loading}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatBot;
