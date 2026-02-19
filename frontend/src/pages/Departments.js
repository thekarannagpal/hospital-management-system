import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    departmentName: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

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
      await axios.post(`${API_URL}/departments`, formData);
      setMessage('Department added successfully!');
      setFormData({ departmentName: '', description: '' });
      fetchDepartments();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding department');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Department Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Department</h2>
          <div className="form-group">
            <label>Department Name *</label>
            <input type="text" name="departmentName" value={formData.departmentName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
          </div>
          <button type="submit">Add Department</button>
        </form>
        
        <h2>Department List</h2>
        <table>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept._id}>
                <td>{dept.departmentName}</td>
                <td>{dept.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Departments;
