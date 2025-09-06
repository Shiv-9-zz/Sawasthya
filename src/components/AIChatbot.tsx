import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { geminiChatService, ChatMessage } from '../services/geminiService';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        text: "Hello! I'm Sawasthya Assistant, your AI companion. I can help you with a wide range of topics and questions. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message immediately
    const newUserMessage: ChatMessage = { 
      text: userMessage, 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Get response from Gemini
      const response = await geminiChatService.sendMessage(userMessage);
      
      // Add bot response
      const botMessage: ChatMessage = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: ChatMessage = {
        text: "I'm sorry, I'm having trouble right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickResponse = async (quickResponse: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    const userMessage: ChatMessage = { 
      text: quickResponse, 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await geminiChatService.sendMessage(quickResponse);
      const botMessage: ChatMessage = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: ChatMessage = {
        text: "I'm sorry, I'm having trouble right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Ask me anything you'd like to know</p>
                  
                  {/* Quick response buttons */}
                  <div className="space-y-2 w-full max-w-xs">
                    {geminiChatService.getQuickResponses().slice(0, 3).map((response, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickResponse(response)}
                        className={`w-full text-xs px-3 py-2 rounded-lg transition-colors ${
                          isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                            : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {response}
                      </button>
                    ))}
                  </div>
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
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`max-w-[80%] rounded-lg px-4 py-2 flex items-center space-x-2 ${
                        isDark ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
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
                className={`rounded-full p-2 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={inputValue.trim() === '' || isLoading}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;