import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Find Doctor', path: '/find-doctor' },
      { name: 'Pricing', path: '/pricing' },
    ],
    'Services': [
      { name: 'Video Consultation', path: '/consultation' },
      { name: 'Symptom Checker', path: '/symptom-checker' },
      { name: 'E-Prescriptions', path: '/services' },
      { name: 'Lab Tests', path: '/services' },
      { name: 'Pharmacy', path: '/services' },
    ],
    'Support': [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/contact' },
      { name: 'Patient Dashboard', path: '/patient-dashboard' },
      { name: 'Doctor Dashboard', path: '/doctor-dashboard' },
      { name: 'Emergency', path: '/contact' },
    ],
    'Legal': [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'HIPAA Compliance', path: '/hipaa' },
      { name: 'Medical Disclaimer', path: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 py-2">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm font-medium">
            🚨 Emergency? Call 911 or go to your nearest emergency room immediately
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Sawasthya</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Healthcare anytime, anywhere. Connecting patients with qualified healthcare professionals through secure, convenient telemedicine solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-400">1-800-MEDICARE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-400">support@medicare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-400">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-white font-semibold mb-2">Download Our App</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-147413.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                    alt="App Store"
                    className="w-6 h-6 mr-2"
                  />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-147413.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                    alt="Google Play"
                    className="w-6 h-6 mr-2"
                  />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 Sawasthya. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&fit=crop"
                  alt="HIPAA Compliant"
                  className="h-6 opacity-70"
                />
                <img
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&fit=crop"
                  alt="SSL Secured"
                  className="h-6 opacity-70"
                />
              </div>
            </div>
            <div className="text-gray-400 text-xs">
              <span>🔒 Your health data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;