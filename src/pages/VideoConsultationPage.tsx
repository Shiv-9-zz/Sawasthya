import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  User,
  Heart,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

interface PatientFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  
  // Medical Information
  chiefComplaint: string;
  symptoms: string[];
  symptomDuration: string;
  painLevel: number;
  allergies: string;
  currentMedications: string;
  medicalHistory: string;
  surgicalHistory: string;
  familyHistory: string;
  
  // Lifestyle
  smoking: string;
  alcohol: string;
  exercise: string;
  
  // Insurance
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  
  // Consultation Preferences
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  additionalNotes: string;
}

const VideoConsultationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    chiefComplaint: '',
    symptoms: [],
    symptomDuration: '',
    painLevel: 0,
    allergies: '',
    currentMedications: '',
    medicalHistory: '',
    surgicalHistory: '',
    familyHistory: '',
    smoking: '',
    alcohol: '',
    exercise: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'video',
    additionalNotes: ''
  });

  const totalSteps = 3;
  
  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language') as 'en' | 'hi';
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translations
  const translations = {
    en: {
      title: 'Patient Intake Form',
      step: 'Step',
      of: 'of',
      personalInfo: 'Personal Information',
      medicalInfo: 'Medical Information & Emergency Contact',
      consultationPrefs: 'Consultation Preferences',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Street Address',
      city: 'City',
      state: 'State/Province',
      zipCode: 'ZIP/Postal Code',
      emergencyContact: 'Emergency Contact',
      emergencyName: 'Emergency Contact Name',
      emergencyPhone: 'Emergency Contact Phone',
      relationship: 'Relationship',
      chiefComplaint: 'Chief Complaint',
      symptoms: 'Current Symptoms (Select all that apply)',
      symptomDuration: 'How long have you had these symptoms?',
      painLevel: 'Pain Level (0-10 scale)',
      medications: 'Current Medications',
      allergies: 'Allergies',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      consultationType: 'Consultation Type',
      additionalNotes: 'Additional Notes',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit Form',
      required: '*',
      selectGender: 'Select gender',
      selectDuration: 'Select duration',
      selectTime: 'Select time',
      selectRelationship: 'Select relationship',
      noPain: 'No pain',
      severePain: 'Severe pain',
      videoCall: 'Video Call',
      phoneCall: 'Phone Call',
      textChat: 'Text Chat',
      videoDesc: 'Face-to-face consultation via video',
      phoneDesc: 'Audio-only consultation',
      chatDesc: 'Written consultation via chat',
      morning: 'Morning (8:00 AM - 12:00 PM)',
      afternoon: 'Afternoon (12:00 PM - 5:00 PM)',
      evening: 'Evening (5:00 PM - 8:00 PM)'
    },
    hi: {
      title: 'रोगी प्रवेश फॉर्म',
      step: 'चरण',
      of: 'का',
      personalInfo: 'व्यक्तिगत जानकारी',
      medicalInfo: 'चिकित्सा जानकारी और आपातकालीन संपर्क',
      consultationPrefs: 'परामर्श प्राथमिकताएं',
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      dateOfBirth: 'जन्म तिथि',
      gender: 'लिंग',
      phone: 'फोन नंबर',
      email: 'ईमेल पता',
      address: 'पता',
      city: 'शहर',
      state: 'राज्य/प्रांत',
      zipCode: 'पिन कोड',
      emergencyContact: 'आपातकालीन संपर्क',
      emergencyName: 'आपातकालीन संपर्क का नाम',
      emergencyPhone: 'आपातकालीन संपर्क फोन',
      relationship: 'रिश्ता',
      chiefComplaint: 'मुख्य शिकायत',
      symptoms: 'वर्तमान लक्षण (सभी लागू का चयन करें)',
      symptomDuration: 'आपको ये लक्षण कब से हैं?',
      painLevel: 'दर्द का स्तर (0-10 पैमाना)',
      medications: 'वर्तमान दवाएं',
      allergies: 'एलर्जी',
      preferredDate: 'पसंदीदा तारीख',
      preferredTime: 'पसंदीदा समय',
      consultationType: 'परामर्श प्रकार',
      additionalNotes: 'अतिरिक्त टिप्पणियां',
      previous: 'पिछला',
      next: 'अगला',
      submit: 'फॉर्म जमा करें',
      required: '*',
      selectGender: 'लिंग चुनें',
      selectDuration: 'अवधि चुनें',
      selectTime: 'समय चुनें',
      selectRelationship: 'रिश्ता चुनें',
      noPain: 'कोई दर्द नहीं',
      severePain: 'गंभीर दर्द',
      videoCall: 'वीडियो कॉल',
      phoneCall: 'फोन कॉल',
      textChat: 'टेक्स्ट चैट',
      videoDesc: 'वीडियो के माध्यम से आमने-सामने परामर्श',
      phoneDesc: 'केवल ऑडियो परामर्श',
      chatDesc: 'चैट के माध्यम से लिखित परामर्श',
      morning: 'सुबह (8:00 AM - 12:00 PM)',
      afternoon: 'दोपहर (12:00 PM - 5:00 PM)',
      evening: 'शाम (5:00 PM - 8:00 PM)'
    }
  };

  const t = translations[language];
  
  const commonSymptoms = language === 'en' ? [
    'Fever', 'Headache', 'Cough', 'Shortness of breath', 'Chest pain',
    'Abdominal pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue',
    'Dizziness', 'Joint pain', 'Muscle pain', 'Skin rash', 'Sore throat'
  ] : [
    'बुखार', 'सिरदर्द', 'खांसी', 'सांस लेने में कठिनाई', 'छाती में दर्द',
    'पेट दर्द', 'मतली', 'उल्टी', 'दस्त', 'थकान',
    'चक्कर आना', 'जोड़ों का दर्द', 'मांसपेशियों में दर्द', 'त्वचा पर चकत्ते', 'गले में खराश'
  ];

  const handleInputChange = (field: keyof PatientFormData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Consultation request submitted successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="relative">
            {/* Theme and Language Toggle Buttons */}
            <div className="absolute top-0 right-0 flex space-x-3 z-10">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="group relative p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="relative w-6 h-6">
                  {isDarkMode ? (
                    <Sun className="h-6 w-6 text-yellow-500 animate-pulse" />
                  ) : (
                    <Moon className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
              </button>
              
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="group relative p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 min-w-[24px]">
                  {language === 'en' ? 'हिं' : 'EN'}
                </span>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
                </div>
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {t.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {language === 'en' ? 'Please fill out this form to schedule your consultation' : 'कृपया अपना परामर्श निर्धारित करने के लिए यह फॉर्म भरें'}
              </p>
              
              {/* Progress Bar */}
              <div className="mt-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {t.step} {currentStep} {t.of} {totalSteps}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {Math.round((currentStep / totalSteps) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center transition-colors duration-300">
                  <User className="h-6 w-6 mr-2 text-blue-500" />
                  {t.personalInfo}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.firstName} {t.required}
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.lastName} {t.required}
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.dateOfBirth} {t.required}
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.gender} {t.required}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                    >
                      <option value="">{t.selectGender}</option>
                      <option value="male">{language === 'en' ? 'Male' : 'पुरुष'}</option>
                      <option value="female">{language === 'en' ? 'Female' : 'महिला'}</option>
                      <option value="other">{language === 'en' ? 'Other' : 'अन्य'}</option>
                      <option value="prefer-not-to-say">{language === 'en' ? 'Prefer not to say' : 'कहना नहीं चाहते'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.phone} {t.required}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
                      placeholder={language === 'en' ? '(555) 123-4567' : '+91 98765 43210'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      {t.email} {t.required}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="New York"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="NY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Medical Information & Emergency Contact */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-red-500" />
                  Medical Information & Emergency Contact
                </h2>
                
                <div className="space-y-8">
                  {/* Medical Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                      Medical Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chief Complaint *
                      </label>
                      <textarea
                        value={formData.chiefComplaint}
                        onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        rows={3}
                        placeholder="Please describe your main health concern or reason for this consultation"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Current Symptoms (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {commonSymptoms.map((symptom) => (
                          <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.symptoms.includes(symptom)}
                              onChange={() => handleSymptomToggle(symptom)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{symptom}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How long have you had these symptoms?
                        </label>
                        <select
                          value={formData.symptomDuration}
                          onChange={(e) => handleInputChange('symptomDuration', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Select duration</option>
                          <option value="less-than-day">Less than a day</option>
                          <option value="1-3-days">1-3 days</option>
                          <option value="4-7-days">4-7 days</option>
                          <option value="1-2-weeks">1-2 weeks</option>
                          <option value="2-4-weeks">2-4 weeks</option>
                          <option value="1-3-months">1-3 months</option>
                          <option value="more-than-3-months">More than 3 months</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pain Level (0-10 scale)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={formData.painLevel}
                          onChange={(e) => handleInputChange('painLevel', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>No pain</span>
                          <span className="font-medium">{formData.painLevel}/10</span>
                          <span>Severe pain</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Medications
                        </label>
                        <textarea
                          value={formData.currentMedications}
                          onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          rows={2}
                          placeholder="List any medications you're currently taking"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Allergies
                        </label>
                        <textarea
                          value={formData.allergies}
                          onChange={(e) => handleInputChange('allergies', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          rows={2}
                          placeholder="List any known allergies"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                      Emergency Contact
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Emergency Contact Name *
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyName}
                          onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Emergency Contact Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Relationship *
                        </label>
                        <select
                          value={formData.emergencyRelation}
                          onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Select relationship</option>
                          <option value="spouse">Spouse</option>
                          <option value="parent">Parent</option>
                          <option value="child">Child</option>
                          <option value="sibling">Sibling</option>
                          <option value="friend">Friend</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Consultation Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-blue-500" />
                  Consultation Preferences
                </h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Consultation Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: 'video', label: 'Video Call', description: 'Face-to-face consultation via video' },
                        { value: 'phone', label: 'Phone Call', description: 'Audio-only consultation' },
                        { value: 'chat', label: 'Text Chat', description: 'Written consultation via chat' }
                      ].map((type) => (
                        <label key={type.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="consultationType"
                            value={type.value}
                            checked={formData.consultationType === type.value}
                            onChange={(e) => handleInputChange('consultationType', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                            formData.consultationType === type.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                          }`}>
                            <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{type.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      rows={4}
                      placeholder="Any additional information you'd like to share with your healthcare provider"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep === totalSteps ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Submit Request
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoConsultationPage;