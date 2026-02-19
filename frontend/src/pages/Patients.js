import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: '',
    address: '',
    contact: '',
    email: '',
    bloodGroup: '',
    admissionDate: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/patients`, formData);
      setMessage('Patient added successfully!');
      setFormData({
        name: '',
        fatherName: '',
        dob: '',
        gender: '',
        address: '',
        contact: '',
        email: '',
        bloodGroup: '',
        admissionDate: ''
      });
      fetchPatients();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding patient');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`${API_URL}/patients/${id}`);
        fetchPatients();
        setMessage('Patient deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting patient');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back to Dashboard</Link>
        <h1>Patient Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Patient</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Father's Name</label>
              <input 
                type="text" 
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Contact Number *</label>
              <input 
                type="text" 
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Blood Group</label>
              <select 
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Admission Date *</label>
              <input 
                type="date" 
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          
          <button type="submit">Add Patient</button>
        </form>
        
        <h2>Patient List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Blood Group</th>
              <th>Admission Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.bloodGroup}</td>
                <td>{new Date(patient.admissionDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(patient._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
