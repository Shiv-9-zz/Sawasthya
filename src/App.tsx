import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FindDoctorPage from './pages/FindDoctorPage';
import VideoConsultationPage from './pages/VideoConsultationPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import LoginPage from './pages/LoginPage';
import PharmacyPage from './pages/PharmacyPage';
import HealthReportsPage from './pages/HealthReportsPage';
import { ThemeProvider } from './context/ThemeContext';
import FloatingCTA from './components/FloatingCTA';
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/find-doctor" element={<FindDoctorPage />} />
              <Route path="/consultation" element={<VideoConsultationPage />} />
              <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/pharmacy" element={<PharmacyPage />} />
              <Route path="/health-reports" element={<HealthReportsPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <FloatingCTA />
          <AIChatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;