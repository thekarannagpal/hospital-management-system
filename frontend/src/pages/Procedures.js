import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Procedures() {
  const [procedures, setProcedures] = useState([]);
  const [formData, setFormData] = useState({
    procedureName: '',
    description: '',
    cost: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      const response = await axios.get(`${API_URL}/procedures`);
      setProcedures(response.data);
    } catch (error) {
      console.error('Error fetching procedures:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/procedures`, formData);
      setMessage('Procedure added successfully!');
      setFormData({ procedureName: '', description: '', cost: '' });
      fetchProcedures();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding procedure');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Procedure Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Procedure</h2>
          <div className="form-group">
            <label>Procedure Name *</label>
            <input type="text" name="procedureName" value={formData.procedureName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Cost</label>
            <input type="number" name="cost" value={formData.cost} onChange={handleChange} step="0.01" />
          </div>
          <button type="submit">Add Procedure</button>
        </form>
        
        <h2>Procedure List</h2>
        <table>
          <thead>
            <tr>
              <th>Procedure Name</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map(proc => (
              <tr key={proc._id}>
                <td>{proc.procedureName}</td>
                <td>{proc.description}</td>
                <td>${proc.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Procedures;
