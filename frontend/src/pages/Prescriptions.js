import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';


function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    medicationId: '',
    prescriptionDate: '',
    dosage: '',
    instructions: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPrescriptions();
    fetchPatients();
    fetchDoctors();
    fetchMedications();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/prescriptions`);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`${API_URL}/medications`);
      setMedications(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/prescriptions`, formData);
      setMessage('Prescription added successfully!');
      setFormData({
        doctorId: '',
        patientId: '',
        medicationId: '',
        prescriptionDate: '',
        dosage: '',
        instructions: ''
      });
      fetchPrescriptions();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding prescription');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Prescription Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Prescription</h2>
          <div className="form-row">
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
            <select name="patientId" value={formData.patientId} onChange={handleChange} required>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <select name="medicationId" value={formData.medicationId} onChange={handleChange} required>
              <option value="">Select Medication</option>
              {medications.map(m => (
                <option key={m._id} value={m._id}>{m.medicationName}</option>
              ))}
            </select>
            <input type="date" name="prescriptionDate" value={formData.prescriptionDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Dosage</label>
            <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Instructions</label>
            <textarea name="instructions" value={formData.instructions} onChange={handleChange} rows="3"></textarea>
          </div>
          <button type="submit">Add Prescription</button>
        </form>
        
        <h2>Prescription List</h2>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Medication</th>
              <th>Date</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(pres => (
              <tr key={pres._id}>
                <td>{pres.doctorId?.name || 'N/A'}</td>
                <td>{pres.patientId?.name || 'N/A'}</td>
                <td>{pres.medicationId?.medicationName || 'N/A'}</td>
                <td>{new Date(pres.prescriptionDate).toLocaleDateString()}</td>
                <td>{pres.dosage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prescriptions;
