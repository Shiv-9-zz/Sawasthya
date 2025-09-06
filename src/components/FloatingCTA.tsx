import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl shadow-2xl p-4 max-w-xs">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="text-white">
              <h3 className="font-semibold text-lg mb-2">Need Medical Help?</h3>
              <p className="text-sm text-blue-100 mb-4">
                Book a consultation with qualified doctors in minutes.
              </p>
              
              <Link
                to="/consultation"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Now</span>
              </Link>
            </div>
            
            {/* Floating animation dots */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <motion.div
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                animate={{
                  x: [10, 60, 10],
                  y: [20, 80, 20],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                animate={{
                  x: [50, 20, 50],
                  y: [60, 30, 60],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;