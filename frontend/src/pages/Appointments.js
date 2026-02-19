import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';


function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'Scheduled'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/appointments`, formData);
      setMessage('Appointment scheduled successfully!');
      setFormData({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        status: 'Scheduled'
      });
      fetchAppointments();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error scheduling appointment');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Appointment Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Schedule Appointment</h2>
          <div className="form-row">
            <select name="patientId" value={formData.patientId} onChange={handleChange} required>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.name} - {d.specialization}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
            <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
          </div>
          <button type="submit">Schedule Appointment</button>
        </form>
        
        <h2>Appointment List</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt._id}>
                <td>{apt.patientId?.name || 'N/A'}</td>
                <td>{apt.doctorId?.name || 'N/A'}</td>
                <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                <td>{apt.appointmentTime}</td>
                <td>{apt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
