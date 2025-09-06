import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { isDark } = useTheme();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = { text: inputValue, isUser: true };
    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Placeholder for future Gemini API integration
    // For now, just show a placeholder response
    setTimeout(() => {
      const botResponse = {
        text: "This is a placeholder response. Gemini API will be integrated later.",
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className={`fixed bottom-6 left-6 z-50 rounded-full p-3 shadow-lg ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>

      {/* Chatbot panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-20 left-6 z-50 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className={`p-4 ${isDark ? 'bg-gray-900' : 'bg-blue-500'} text-white flex justify-between items-center`}>
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-medium">Sawasthya Assistant</h3>
              </div>
              <button 
                onClick={toggleChatbot}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages container */}
            <div 
              className={`h-80 overflow-y-auto p-4 ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Bot size={40} className={`mb-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>How can I help you today?</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ask me anything about healthcare</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.isUser 
                          ? isDark 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-500 text-white'
                          : isDark 
                            ? 'bg-gray-700 text-gray-100' 
                            : 'bg-white text-gray-800 border border-gray-200'}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input area */}
            <form 
              onSubmit={handleSubmit}
              className={`p-3 flex items-center space-x-2 ${isDark ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className={`flex-1 py-2 px-3 rounded-full focus:outline-none ${isDark ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' : 'bg-gray-100 text-gray-800 border border-gray-300 focus:border-blue-400'}`}
              />
              <button 
                type="submit"
                className={`rounded-full p-2 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                disabled={inputValue.trim() === ''}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;