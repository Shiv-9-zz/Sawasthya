import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ChevronDown, ChevronUp, Calendar, Activity, Heart, Droplets } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import healthReportSvg from '../assets/images/health-report.svg';

interface Report {
  id: string;
  title: string;
  date: string;
  doctor: string;
  type: string;
  status: 'normal' | 'abnormal' | 'critical';
  summary: string;
}

interface VitalRecord {
  date: string;
  bloodPressure: string;
  heartRate: number;
  bloodSugar: number;
  cholesterol: number;
}

const HealthReportsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('reports');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  // Sample reports data
  const reports: Report[] = [
    {
      id: 'rep-001',
      title: 'Annual Physical Examination',
      date: '2023-10-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Physical Examination',
      status: 'normal',
      summary: 'Overall health is good. Blood pressure and cholesterol levels are within normal range. Recommended to maintain current diet and exercise routine.'
    },
    {
      id: 'rep-002',
      title: 'Blood Test Results',
      date: '2023-09-22',
      doctor: 'Dr. Michael Chen',
      type: 'Laboratory',
      status: 'abnormal',
      summary: 'Vitamin D levels are below normal range. Recommended to start vitamin D supplements and increase sun exposure. Follow-up test recommended in 3 months.'
    },
    {
      id: 'rep-003',
      title: 'Cardiac Stress Test',
      date: '2023-08-05',
      doctor: 'Dr. Emily Rodriguez',
      type: 'Cardiology',
      status: 'normal',
      summary: 'Heart function appears normal under stress. No signs of coronary artery disease. Recommended to continue regular cardiovascular exercise.'
    },
    {
      id: 'rep-004',
      title: 'Allergy Panel Test',
      date: '2023-07-12',
      doctor: 'Dr. James Wilson',
      type: 'Immunology',
      status: 'abnormal',
      summary: 'Positive reactions to pollen and dust mites. Recommended to start antihistamine medication during high pollen seasons and implement dust control measures at home.'
    },
  ];

  // Sample vitals data
  const vitals: VitalRecord[] = [
    { date: '2023-10-15', bloodPressure: '120/80', heartRate: 72, bloodSugar: 95, cholesterol: 180 },
    { date: '2023-09-22', bloodPressure: '118/78', heartRate: 70, bloodSugar: 92, cholesterol: 185 },
    { date: '2023-08-05', bloodPressure: '122/82', heartRate: 75, bloodSugar: 98, cholesterol: 175 },
    { date: '2023-07-12', bloodPressure: '125/85', heartRate: 78, bloodSugar: 100, cholesterol: 190 },
  ];

  const toggleReportExpansion = (reportId: string) => {
    if (expandedReport === reportId) {
      setExpandedReport(null);
    } else {
      setExpandedReport(reportId);
    }
  };

  const getStatusColor = (status: 'normal' | 'abnormal' | 'critical') => {
    switch (status) {
      case 'normal':
        return isDark ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800';
      case 'abnormal':
        return isDark ? 'bg-yellow-800 text-yellow-100' : 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="w-24 h-24 mb-4">
            <img src={healthReportSvg} alt="Health Reports" className="w-full h-full" />
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Health Reports & Vitals
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your health metrics and medical reports in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className={`inline-flex rounded-lg p-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'reports' 
                ? isDark 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'}`}
            >
              Medical Reports
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'vitals' 
                ? isDark 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'}`}
            >
              Vital Records
            </button>
          </div>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Your Medical Reports
              </h2>
              <button 
                className={`flex items-center gap-2 py-2 px-4 rounded-lg ${isDark 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FileText className="h-4 w-4" />
                <span>Upload New Report</span>
              </button>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <motion.div 
                  key={report.id}
                  variants={itemVariants}
                  className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <div 
                    className={`p-4 cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                    onClick={() => toggleReportExpansion(report.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <img src={healthReportSvg} alt="Report" className={`h-5 w-5`} />
                        </div>
                        <div>
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{report.title}</h3>
                          <div className="flex items-center text-sm">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{report.date}</span>
                            <span className="mx-2">•</span>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{report.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        {expandedReport === report.id ? (
                          <ChevronUp className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        ) : (
                          <ChevronDown className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedReport === report.id && (
                    <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Summary</h4>
                        <p className={isDark ? 'text-white' : 'text-gray-800'}>{report.summary}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`inline-block px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                            {report.type}
                          </span>
                        </div>
                        <button 
                          className={`flex items-center gap-1 py-1.5 px-3 rounded-lg text-sm ${isDark 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Vitals Tab */}
        {activeTab === 'vitals' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Your Vital Records
              </h2>
              <button 
                className={`flex items-center gap-2 py-2 px-4 rounded-lg ${isDark 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'}`}
              >
                <Activity className="h-4 w-4" />
                <span>Add New Reading</span>
              </button>
            </div>

            {/* Vitals cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div 
                variants={itemVariants}
                className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Blood Pressure</h3>
                  <div className={`p-2 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <Activity className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vitals[0].bloodPressure}</span>
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>mmHg</span>
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last updated: {vitals[0].date}
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Heart Rate</h3>
                  <div className={`p-2 rounded-full ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
                    <Heart className={`h-4 w-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vitals[0].heartRate}</span>
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>bpm</span>
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last updated: {vitals[0].date}
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Blood Sugar</h3>
                  <div className={`p-2 rounded-full ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <Droplets className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vitals[0].bloodSugar}</span>
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>mg/dL</span>
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last updated: {vitals[0].date}
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Cholesterol</h3>
                  <div className={`p-2 rounded-full ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                    <Activity className={`h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vitals[0].cholesterol}</span>
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>mg/dL</span>
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last updated: {vitals[0].date}
                </div>
              </motion.div>
            </div>

            {/* Vitals history table */}
            <motion.div 
              variants={itemVariants}
              className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDark ? 'bg-gray-750' : 'bg-gray-50'}>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Date</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Blood Pressure</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Heart Rate</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Blood Sugar</th>
                      <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>Cholesterol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}">
                    {vitals.map((record, index) => (
                      <tr key={index} className={isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                        <td className={`px-4 py-3 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          <div className="flex items-center">
                            <Calendar className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            {record.date}
                          </div>
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-800'}`}>{record.bloodPressure} mmHg</td>
                        <td className={`px-4 py-3 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-800'}`}>{record.heartRate} bpm</td>
                        <td className={`px-4 py-3 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-800'}`}>{record.bloodSugar} mg/dL</td>
                        <td className={`px-4 py-3 whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-800'}`}>{record.cholesterol} mg/dL</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HealthReportsPage;