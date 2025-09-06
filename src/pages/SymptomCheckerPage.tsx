import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Stethoscope, AlertTriangle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { symptomAnalysisService, SymptomAnalysis } from '../services/symptomAnalysisService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  severity?: 'low' | 'medium' | 'high';
  recommendations?: string[];
  urgency?: 'routine' | 'soon' | 'urgent' | 'emergency';
  possibleCauses?: string[];
}

const SymptomCheckerPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI Health Assistant powered by advanced AI. I can help you understand your symptoms and provide guidance on when to seek medical care. Please describe your symptoms in detail, and I'll provide personalized analysis.",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSymptoms, setCurrentSymptoms] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = async (input: string): Promise<Message> => {
    try {
      let analysis: SymptomAnalysis;
      
      if (currentSymptoms && currentSymptoms.trim()) {
        // This is a follow-up response
        analysis = await symptomAnalysisService.getFollowUpResponse(currentSymptoms, input);
      } else {
        // This is the initial symptom description
        analysis = await symptomAnalysisService.analyzeSymptoms(input);
        setCurrentSymptoms(input);
      }

      return {
        id: Date.now(),
        text: analysis.response,
        isBot: true,
        timestamp: new Date(),
        severity: analysis.severity,
        recommendations: analysis.recommendations,
        suggestions: analysis.suggestions,
        urgency: analysis.urgency,
        possibleCauses: analysis.possibleCauses
      };
    } catch (error) {
      console.error('Error getting AI response:', error);
      return {
        id: Date.now(),
        text: "I'm having trouble analyzing your symptoms right now. Please consult with a healthcare professional for proper evaluation of your symptoms. If you're experiencing severe symptoms, seek immediate medical attention.",
        isBot: true,
        timestamp: new Date(),
        severity: 'medium',
        recommendations: [
          'Consult with a healthcare professional',
          'Monitor your symptoms closely',
          'Seek immediate care if symptoms worsen',
          'Keep a record of your symptoms'
        ],
        suggestions: [
          'Can you describe your symptoms again?',
          'When did your symptoms start?',
          'How severe are your symptoms?'
        ]
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    const messageToAnalyze = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(messageToAnalyze);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = {
        id: Date.now(),
        text: "I'm having trouble processing your request. Please try again or consult with a healthcare professional.",
        isBot: true,
        timestamp: new Date(),
        severity: 'medium'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Stethoscope;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Symptom Checker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get instant health insights powered by Gemini AI. Describe your symptoms and receive 
              personalized analysis and guidance on when to seek medical care.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-4">
            <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                <strong>Medical Disclaimer:</strong> This AI tool is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for medical concerns.
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 lg:h-[500px] overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex space-x-3 max-w-3xl ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>

                    <div className={`flex flex-col ${message.isBot ? 'items-start' : 'items-end'}`}>
                      {/* Message Bubble */}
                      <div className={`px-6 py-4 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
                      }`}>
                        <p className="text-sm lg:text-base leading-relaxed">{message.text}</p>
                        
                        {/* Severity Indicator */}
                        {message.severity && (
                          <div className={`inline-flex items-center space-x-2 mt-3 px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(message.severity)}`}>
                            {React.createElement(getSeverityIcon(message.severity), { className: 'h-3 w-3' })}
                            <span className="capitalize">{message.severity} Priority</span>
                          </div>
                        )}
                      </div>

                      {/* Recommendations */}
                      {message.recommendations && (
                        <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 max-w-lg">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-2">
                            Recommendations:
                          </h4>
                          <ul className="space-y-1">
                            {message.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2 text-blue-800 dark:text-blue-200 text-sm">
                                <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Possible Causes */}
                      {message.possibleCauses && (
                        <div className="mt-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 max-w-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">
                            Possible Causes (Educational):
                          </h4>
                          <ul className="space-y-1">
                            {message.possibleCauses.map((cause, index) => (
                              <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 text-sm">
                                <Stethoscope className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Urgency Indicator */}
                      {message.urgency && (
                        <div className={`mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                          message.urgency === 'emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          message.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                          message.urgency === 'soon' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span className="capitalize">{message.urgency} Care Needed</span>
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block text-left px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3 max-w-3xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-300">Analyzing symptoms...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t dark:border-gray-700 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
                placeholder="Describe your symptoms in detail..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>AI Assistant Online</span>
                </div>
                <span>•</span>
                <span>End-to-end encrypted</span>
              </div>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSuggestionClick("I have a persistent headache that's been bothering me for 3 days")}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-left"
          >
            <div className="text-blue-500 mb-2">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Headache Assessment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get guidance on headache types and treatments</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSuggestionClick("I have chest pain and shortness of breath")}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-left"
          >
            <div className="text-red-500 mb-2">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Chest Pain Evaluation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Urgent assessment for chest-related symptoms</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSuggestionClick("I have a fever of 101°F and body aches")}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-left"
          >
            <div className="text-yellow-500 mb-2">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fever & Flu Symptoms</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Assessment for cold and flu-like symptoms</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomCheckerPage;