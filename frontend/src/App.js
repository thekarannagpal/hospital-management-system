import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Departments from './pages/Departments';
import Nurses from './pages/Nurses';
import Rooms from './pages/Rooms';
import Medications from './pages/Medications';
import Procedures from './pages/Procedures';
import Prescriptions from './pages/Prescriptions';
import Undergoes from './pages/Undergoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/nurses" element={<Nurses />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/procedures" element={<Procedures />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/undergoes" element={<Undergoes />} />
      </Routes>
    </Router>
  );
}

export default App;
