import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';
import axios from 'axios';

const ChatBot = ({ isOpen, closeChat }) => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hi there! I\'m Joseph\'s assistant. How can I help you today?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputMessage.trim()) return;
        
        // Add user message
        const userMessageId = messages.length + 1;
        setMessages(prev => [...prev, { id: userMessageId, type: 'user', text: inputMessage }]);
        
        // Simulate bot thinking
        setTimeout(async () => {
            let response;
            const lowerCaseInput = inputMessage.toLowerCase();
            
            // Simple response logic
            if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
                response = "Hello! How can I assist you with Joseph's portfolio?";
            } else if (lowerCaseInput.includes('project')) {
                response = "Joseph has worked on several projects including CloudSpace, LLM Chatbot, and KTU-Results. You can check them out in the Projects section!";
            } else if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('email')) {
                response = "You can contact Joseph at josephliyon23@gmail.com";
            } else if (lowerCaseInput.includes('github')) {
                response = "You can find Joseph's GitHub at https://github.com/jliyon23";
            } else if (lowerCaseInput.includes('linkedin')) {
                response = "You can connect with Joseph on LinkedIn at https://www.linkedin.com/in/jliyon23/";
            } else if (lowerCaseInput.includes('stack') || lowerCaseInput.includes('technology') || lowerCaseInput.includes('skill')) {
                response = "Joseph is skilled in Node.js, React, Express, MongoDB, and ElectronJS among other technologies. His projects showcase these skills!";
            } else {
                try {
                    response = await axios.post('https://llmchatbotapi.vercel.app/ask', {
                        history: [],
                        message: inputMessage
                    });
                    response = response.data.data;

                } catch (error) {
                    console.error("Error fetching response from API:", error);
                    response = "I'm sorry, I couldn't understand that. Could you please rephrase?";
                }
            }
            
            // Add bot response
            setMessages(prev => [...prev, { id: userMessageId + 1, type: 'bot', text: response }]);
        }, 1000);
        
        // Clear input
        setInputMessage('');
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
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                                    {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-zinc-300" />}
                                </div>
                                <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 bg-zinc-800 text-zinc-200 rounded-md border border-zinc-700 focus:outline-none focus:border-blue-500"
                        />
                        <button 
                            type="submit" 
                            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                            disabled={!inputMessage.trim()}
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