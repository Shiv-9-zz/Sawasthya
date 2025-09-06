import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Bot, 
  FileText, 
  Pill, 
  Activity, 
  Smartphone,
  Calendar,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Heart
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: Video,
      title: 'Online Consultation',
      description: 'Connect with licensed doctors through secure video calls from anywhere.',
      features: ['HD Video & Audio', '24/7 Availability', 'Secure & Private', 'Multi-language Support'],
      color: 'from-blue-500 to-blue-600',
      link: '/consultation',
      popular: true
    },
    {
      icon: Bot,
      title: 'AI Symptom Checker',
      description: 'Get instant health insights with our advanced AI-powered symptom analysis.',
      features: ['Instant Assessment', 'Personalized Results', 'Treatment Recommendations', 'Doctor Referrals'],
      color: 'from-emerald-500 to-emerald-600',
      link: '/symptom-checker'
    },
    {
      icon: FileText,
      title: 'E-Prescriptions',
      description: 'Receive digital prescriptions that can be sent directly to your pharmacy.',
      features: ['Digital Prescriptions', 'Pharmacy Integration', 'Medication History', 'Refill Reminders'],
      color: 'from-purple-500 to-purple-600',
      link: '/services'
    },
    {
      icon: Pill,
      title: 'Pharmacy Integration',
      description: 'Order medications online and get them delivered to your doorstep.',
      features: ['Home Delivery', 'Insurance Coverage', 'Generic Options', 'Medication Tracking'],
      color: 'from-orange-500 to-orange-600',
      link: '/services'
    },
    {
      icon: Activity,
      title: 'Lab Test Booking',
      description: 'Schedule lab tests and upload reports for doctor review and analysis.',
      features: ['Home Collection', 'Digital Reports', 'Trend Analysis', 'Doctor Review'],
      color: 'from-red-500 to-red-600',
      link: '/services'
    },
    {
      icon: Smartphone,
      title: 'Wearable Integration',
      description: 'Connect your fitness trackers and health devices for comprehensive monitoring.',
      features: ['Device Sync', 'Health Monitoring', 'Trend Analysis', 'Alerts & Notifications'],
      color: 'from-cyan-500 to-cyan-600',
      link: '/services'
    }
  ];

  const specialties = [
    'General Medicine',
    'Pediatrics',
    'Dermatology',
    'Mental Health',
    'Cardiology',
    'Endocrinology',
    'Orthopedics',
    'Gynecology',
    'Ophthalmology',
    'ENT',
    'Neurology',
    'Gastroenterology'
  ];

  const stats = [
    { icon: Users, number: '10K+', label: 'Patients Served' },
    { icon: Video, number: '50K+', label: 'Consultations' },
    { icon: Clock, number: '24/7', label: 'Availability' },
    { icon: Shield, number: '99.9%', label: 'Uptime' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              From video consultations to AI-powered health insights, we provide comprehensive 
              telemedicine services designed to meet all your healthcare needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Video className="h-5 w-5" />
                <span>Start Consultation</span>
              </Link>
              <Link
                to="/find-doctor"
                className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
              >
                <span>Find a Doctor</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to meet your every need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={service.link}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:underline transition-colors duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with specialists across a wide range of medical disciplines
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
              >
                <Heart className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="font-medium text-gray-900 dark:text-white">{specialty}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get the healthcare you need in just three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Service',
                description: 'Select from our range of healthcare services including consultations, symptom checking, or lab tests.',
                icon: Calendar
              },
              {
                step: '02',
                title: 'Connect with a Doctor',
                description: 'Get matched with a qualified healthcare professional based on your needs and preferences.',
                icon: Video
              },
              {
                step: '03',
                title: 'Receive Care',
                description: 'Get your diagnosis, treatment plan, prescriptions, and follow-up care all digitally.',
                icon: Heart
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 text-blue-500 font-bold text-sm px-3 py-1 rounded-full border-2 border-blue-500">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-500 to-emerald-500">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust Sawasthya for their healthcare needs. 
              Start your journey to better health today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Video className="h-5 w-5" />
                <span>Book Consultation</span>
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <span>View Pricing</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;