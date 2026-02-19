import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    departmentId: '',
    contact: '',
    shift: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNurses();
    fetchDepartments();
  }, []);

  const fetchNurses = async () => {
    try {
      const response = await axios.get(`${API_URL}/nurses`);
      setNurses(response.data);
    } catch (error) {
      console.error('Error fetching nurses:', error);
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
      await axios.post(`${API_URL}/nurses`, formData);
      setMessage('Nurse added successfully!');
      setFormData({ name: '', departmentId: '', contact: '', shift: '' });
      fetchNurses();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding nurse');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Nurse Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Nurse</h2>
          <div className="form-row">
            <input type="text" name="name" placeholder="Nurse Name" value={formData.name} onChange={handleChange} required />
            <select name="departmentId" value={formData.departmentId} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept._id}>{dept.departmentName}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} />
            <select name="shift" value={formData.shift} onChange={handleChange}>
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>
          <button type="submit">Add Nurse</button>
        </form>
        
        <h2>Nurse List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {nurses.map(nurse => (
              <tr key={nurse._id}>
                <td>{nurse.name}</td>
                <td>{nurse.departmentId?.departmentName || 'N/A'}</td>
                <td>{nurse.contact}</td>
                <td>{nurse.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nurses;
