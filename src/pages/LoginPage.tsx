import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import loginSvg from '../assets/images/login.svg';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { isDark } = useTheme();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic would go here
    console.log('Form submitted');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs hidden md:block"
        >
          <img src={loginSvg} alt="Secure login" className="w-full h-auto" />
        </motion.div>
        
        <motion.div 
          className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Join us for better healthcare management'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <motion.div variants={itemVariants} className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className={`relative rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none ${isDark 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500'}`}
                  placeholder="John Doe"
                  required
                />
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className={`relative rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="email"
                className={`block w-full pl-10 pr-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none ${isDark 
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                  : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500'}`}
                placeholder="email@example.com"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className={`relative rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2.5 rounded-lg focus:ring-2 focus:outline-none ${isDark 
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                  : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500'}`}
                placeholder="••••••••"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {isLogin && (
            <motion.div variants={itemVariants} className="flex justify-end mb-6">
              <Link 
                to="/forgot-password" 
                className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Forgot password?
              </Link>
            </motion.div>
          )}

          <motion.button
            variants={itemVariants}
            type="submit"
            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors ${isDark 
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' 
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;