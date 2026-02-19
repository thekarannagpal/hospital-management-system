import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    departmentId: '',
    contact: '',
    email: '',
    gender: 'Male',
    bloodGroup: '',
    dateOfJoining: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/doctors`, formData);
      setMessage('Doctor added successfully!');
      setFormData({
        name: '',
        specialization: '',
        departmentId: '',
        contact: '',
        email: '',
        gender: 'Male',
        bloodGroup: '',
        dateOfJoining: ''
      });
      fetchDoctors();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding doctor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`${API_URL}/doctors/${id}`);
        fetchDoctors();
        setMessage('Doctor deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting doctor');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Doctor Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Doctor</h2>
          <div className="form-row">
            <input 
              type="text" 
              name="name" 
              placeholder="Doctor Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              name="specialization" 
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-row">
            <select 
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept._id}>{dept.departmentName}</option>
              ))}
            </select>
            <input 
              type="text" 
              name="contact" 
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-row">
            <select 
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Blood Group</option>
              <option value="A+">A+</option>
              <option value="O+">O+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
            </select>
            <input 
              type="date" 
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit">Add Doctor</button>
        </form>
        
        <h2>Doctor List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.departmentId?.departmentName || 'N/A'}</td>
                <td>{doctor.contact}</td>
                <td>{doctor.email}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(doctor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;
