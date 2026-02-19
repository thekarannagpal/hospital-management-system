import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';


// Define themes
const themes = {
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ocean: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  dark: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)',
  royal: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
};

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    departments: 0
  });
  
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    fetchStats();
    // Load saved theme
    const savedTheme = localStorage.getItem('dashboardTheme') || 'purple';
    setCurrentTheme(savedTheme);
  }, []);

  const fetchStats = async () => {
    try {
      const [patients, doctors, appointments, departments] = await Promise.all([
        axios.get(`${API_URL}/patients`),
        axios.get(`${API_URL}/doctors`),
        axios.get(`${API_URL}/appointments`),
        axios.get(`${API_URL}/departments`)
      ]);
      
      setStats({
        patients: patients.data.length,
        doctors: doctors.data.length,
        appointments: appointments.data.length,
        departments: departments.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('dashboardTheme', theme);
  };

  const menuItems = [
    { path: '/patients', icon: '👨‍⚕️', title: 'Manage Patients', description: 'Add, view and manage patient records', color: '#4facfe', count: stats.patients },
    { path: '/doctors', icon: '👨‍⚕️', title: 'Manage Doctors', description: 'Manage doctor information', color: '#00f2fe', count: stats.doctors },
    { path: '/appointments', icon: '📅', title: 'Appointments', description: 'Schedule and track appointments', color: '#43e97b', count: stats.appointments },
    { path: '/departments', icon: '🏢', title: 'Departments', description: 'Hospital department management', color: '#38f9d7', count: stats.departments },
    { path: '/nurses', icon: '👩‍⚕️', title: 'Nurses', description: 'Manage nursing staff', color: '#fa709a' },
    { path: '/rooms', icon: '🛏️', title: 'Rooms', description: 'Room allocation and status', color: '#fee140' },
    { path: '/medications', icon: '💊', title: 'Medications', description: 'Medication inventory', color: '#30cfd0' },
    { path: '/procedures', icon: '🔬', title: 'Procedures', description: 'Medical procedures catalog', color: '#a8edea' },
    { path: '/prescriptions', icon: '📝', title: 'Prescriptions', description: 'Patient prescriptions', color: '#ff9a9e' },
    { path: '/undergoes', icon: '📋', title: 'Patient Procedures', description: 'Track patient procedures', color: '#fad0c4' }
  ];

  return (
    <div className="dashboard-wrapper" style={{ background: themes[currentTheme] }}>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <span className="logo-icon">🏥</span>
                <div>
                  <h1>Hospital Management System</h1>
                  <p className="subtitle">Comprehensive Healthcare Management Solution</p>
                </div>
              </div>
            </div>
            <div className="header-right">
              <div className="theme-switcher">
                <span style={{ marginRight: '10px', fontSize: '0.9em', color: '#666' }}>Theme:</span>
                {Object.keys(themes).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => changeTheme(theme)}
                    className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
                    style={{ background: themes[theme] }}
                    title={theme.charAt(0).toUpperCase() + theme.slice(1)}
                  />
                ))}
              </div>
              <div className="current-date">
                <span className="date-icon">📆</span>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        <div className="stats-container">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.patients}</h3>
              <p>Total Patients</p>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-content">
              <h3>{stats.doctors}</h3>
              <p>Doctors</p>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.appointments}</h3>
              <p>Appointments</p>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3>{stats.departments}</h3>
              <p>Departments</p>
            </div>
          </div>
        </div>
        
        <div className="section-header">
          <h2>Quick Access</h2>
          <p>Select a module to manage hospital operations</p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Link 
              to={item.path} 
              className="menu-card" 
              key={index}
              style={{ '--card-color': item.color }}
            >
              <div className="card-background"></div>
              <div className="card-content">
                <div className="card-icon">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
                {item.count !== undefined && (
                  <div className="card-count">
                    <span className="count-badge">{item.count}</span>
                  </div>
                )}
                <div className="card-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
