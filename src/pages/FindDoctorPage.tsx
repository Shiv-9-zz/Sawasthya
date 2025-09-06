import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Calendar, Clock, Video, Users, Award, ChevronDown } from 'lucide-react';

const FindDoctorPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    'All Specialties',
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Urology'
  ];

  const availabilityOptions = [
    'Any Time',
    'Available Now',
    'Today',
    'Tomorrow',
    'This Week',
    'Next Week'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      image: 'https://images.pexels.com/photos/559827/pexels-photo-559827.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.9,
      reviewsCount: 127,
      experience: '15 years',
      location: 'New York, NY',
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      availableSlots: ['Today 2:00 PM', 'Today 4:00 PM', 'Tomorrow 10:00 AM'],
      consultationFee: 150,
      isAvailable: true,
      bio: 'Specialized in preventive cardiology and heart disease management with extensive experience in telemedicine.',
      achievements: ['Board Certified', 'Top Doctor 2023', 'Patient Choice Award']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.8,
      reviewsCount: 203,
      experience: '12 years',
      location: 'Los Angeles, CA',
      languages: ['English', 'Mandarin'],
      education: 'Stanford University School of Medicine',
      availableSlots: ['Today 3:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 2:00 PM'],
      consultationFee: 120,
      isAvailable: true,
      bio: 'Primary care physician with focus on holistic health approaches and chronic disease management.',
      achievements: ['Board Certified', 'Excellence in Patient Care', 'Digital Health Pioneer']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.9,
      reviewsCount: 156,
      experience: '10 years',
      location: 'Chicago, IL',
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'Johns Hopkins School of Medicine',
      availableSlots: ['Tomorrow 11:00 AM', 'Tomorrow 1:00 PM', 'Tomorrow 3:00 PM'],
      consultationFee: 130,
      isAvailable: false,
      bio: 'Pediatric specialist with expertise in child development and adolescent health.',
      achievements: ['Board Certified', 'Pediatric Excellence Award', 'Community Health Champion']
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Dermatology',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.7,
      reviewsCount: 89,
      experience: '8 years',
      location: 'Miami, FL',
      languages: ['English', 'Korean'],
      education: 'University of Pennsylvania School of Medicine',
      availableSlots: ['Today 5:00 PM', 'Tomorrow 10:30 AM', 'Tomorrow 2:30 PM'],
      consultationFee: 140,
      isAvailable: true,
      bio: 'Dermatologist specializing in medical and cosmetic dermatology with telemedicine expertise.',
      achievements: ['Board Certified', 'Dermatology Innovation Award', 'Patient Satisfaction Leader']
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Psychiatry',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.9,
      reviewsCount: 94,
      experience: '14 years',
      location: 'Seattle, WA',
      languages: ['English', 'French'],
      education: 'Yale School of Medicine',
      availableSlots: ['Today 6:00 PM', 'Tomorrow 12:00 PM', 'Tomorrow 4:00 PM'],
      consultationFee: 160,
      isAvailable: true,
      bio: 'Psychiatrist specializing in anxiety, depression, and stress management through virtual therapy.',
      achievements: ['Board Certified', 'Mental Health Advocate', 'Teletherapy Pioneer']
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 4.6,
      reviewsCount: 112,
      experience: '18 years',
      location: 'Boston, MA',
      languages: ['English'],
      education: 'Harvard Medical School',
      availableSlots: ['Tomorrow 9:30 AM', 'Tomorrow 1:30 PM', 'Tomorrow 4:30 PM'],
      consultationFee: 170,
      isAvailable: false,
      bio: 'Orthopedic surgeon with expertise in sports medicine and joint replacement consultations.',
      achievements: ['Board Certified', 'Sports Medicine Expert', 'Surgical Excellence Award']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All Specialties' ||
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Find the Right <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Doctor</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Connect with qualified healthcare professionals who are available for video consultations
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Specialty Filter */}
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty === 'All Specialties' ? '' : specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Availability Filter */}
              <div className="relative">
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option === 'Any Time' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                      <option>Any Rating</option>
                      <option>4.5+ Stars</option>
                      <option>4.0+ Stars</option>
                      <option>3.5+ Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Experience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                      <option>Any Experience</option>
                      <option>10+ Years</option>
                      <option>5+ Years</option>
                      <option>2+ Years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                      <option>Any Language</option>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Mandarin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                      <option>Any Price</option>
                      <option>Under $100</option>
                      <option>$100 - $150</option>
                      <option>Over $150</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredDoctors.length} Doctors Available
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
                <option>Best Match</option>
                <option>Highest Rated</option>
                <option>Lowest Price</option>
                <option>Earliest Available</option>
              </select>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Doctor Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${
                            doctor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {doctor.name}
                            </h3>
                            {doctor.isAvailable && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Available Now
                              </span>
                            )}
                          </div>
                          
                          <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span>({doctor.reviewsCount} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="h-4 w-4" />
                              <span>{doctor.experience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            {doctor.bio}
                          </p>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Languages:</span>
                            <div className="flex space-x-1">
                              {doctor.languages.map(lang => (
                                <span key={lang} className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {doctor.achievements.map(achievement => (
                              <span key={achievement} className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Next Available</h4>
                      <div className="space-y-2">
                        {doctor.availableSlots.slice(0, 3).map((slot, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{slot}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking */}
                    <div className="lg:col-span-1 text-right">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${doctor.consultationFee}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">per consultation</div>
                      </div>
                      
                      <button
                        disabled={!doctor.isAvailable}
                        className={`w-full mb-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          doctor.isAvailable
                            ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Video className="inline-block h-4 w-4 mr-2" />
                        {doctor.isAvailable ? 'Book Now' : 'Unavailable'}
                      </button>
                      
                      <button className="w-full px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredDoctors.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                Load More Doctors
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No doctors found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('');
                  setSelectedAvailability('');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default FindDoctorPage;