import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Stethoscope, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  severity?: 'low' | 'medium' | 'high';
  recommendations?: string[];
}

const SymptomCheckerPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI Health Assistant. I can help you understand your symptoms and provide guidance on when to seek medical care. Please describe your symptoms in detail.",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const symptomResponses: { [key: string]: any } = {
    'chest pain': {
      severity: 'high',
      response: "Chest pain can have various causes, some serious. Based on your description, I recommend seeking immediate medical attention, especially if you're experiencing shortness of breath, sweating, or pain radiating to your arm or jaw.",
      recommendations: [
        "Seek immediate medical attention if severe",
        "Call 911 if experiencing heart attack symptoms",
        "Avoid physical exertion until evaluated",
        "Consider stress and anxiety as possible causes for mild cases"
      ],
      suggestions: ["Is the pain sharp or crushing?", "Does it radiate to other areas?", "Are you experiencing shortness of breath?"]
    },
    'headache': {
      severity: 'medium',
      response: "Headaches are common and can be caused by stress, dehydration, eye strain, or other factors. However, severe or unusual headaches should be evaluated by a healthcare provider.",
      recommendations: [
        "Stay hydrated and get adequate rest",
        "Try over-the-counter pain relievers if appropriate",
        "Identify and avoid triggers",
        "Seek medical care for severe or persistent headaches"
      ],
      suggestions: ["How severe is the headache (1-10)?", "Have you had similar headaches before?", "Are you experiencing nausea or vision changes?"]
    },
    'fever': {
      severity: 'medium',
      response: "Fever is often a sign that your body is fighting an infection. While low-grade fevers can often be managed at home, high fevers or persistent symptoms warrant medical attention.",
      recommendations: [
        "Monitor temperature regularly",
        "Stay hydrated and rest",
        "Use fever-reducing medications as appropriate",
        "Seek medical care if fever exceeds 103°F or persists"
      ],
      suggestions: ["What's your current temperature?", "How long have you had the fever?", "Are you experiencing other symptoms?"]
    },
    'cough': {
      severity: 'low',
      response: "Coughs can be caused by allergies, viral infections, or other respiratory conditions. Most coughs resolve on their own, but persistent or severe coughs should be evaluated.",
      recommendations: [
        "Stay hydrated to help thin mucus",
        "Use throat lozenges or honey for comfort",
        "Avoid irritants like smoke",
        "See a doctor if cough persists over 3 weeks"
      ],
      suggestions: ["Is it a dry cough or are you producing phlegm?", "How long have you been coughing?", "Are you experiencing any breathing difficulties?"]
    }
  };

  const getAIResponse = (input: string): Message => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for specific symptoms
    for (const [symptom, data] of Object.entries(symptomResponses)) {
      if (lowercaseInput.includes(symptom)) {
        return {
          id: Date.now(),
          text: data.response,
          isBot: true,
          timestamp: new Date(),
          severity: data.severity,
          recommendations: data.recommendations,
          suggestions: data.suggestions
        };
      }
    }

    // Generic responses
    if (lowercaseInput.includes('pain')) {
      return {
        id: Date.now(),
        text: "I understand you're experiencing pain. Can you tell me more about the location, severity (1-10), and type of pain you're feeling? This will help me provide better guidance.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ["Where exactly is the pain located?", "How would you rate the pain from 1-10?", "Is it sharp, dull, throbbing, or burning?"]
      };
    }

    // Default response
    return {
      id: Date.now(),
      text: "Thank you for sharing that information. To provide you with the most accurate guidance, could you please provide more specific details about your symptoms? For example, when did they start, how severe they are, and any associated symptoms?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["When did your symptoms start?", "How severe are they (1-10)?", "What other symptoms are you experiencing?"]
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
              Get instant health insights powered by advanced AI. Describe your symptoms and receive 
              personalized guidance on when to seek medical care.
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
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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