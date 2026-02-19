import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    medicationName: '',
    type: '',
    dosage: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`${API_URL}/medications`);
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/medications`, formData);
      setMessage('Medication added successfully!');
      setFormData({ medicationName: '', type: '', dosage: '', price: '' });
      fetchMedications();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding medication');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Medication Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Medication</h2>
          <div className="form-row">
            <input type="text" name="medicationName" placeholder="Medication Name" value={formData.medicationName} onChange={handleChange} required />
            <input type="text" name="type" placeholder="Type (e.g., Tablet, Syrup)" value={formData.type} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="text" name="dosage" placeholder="Dosage" value={formData.dosage} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} step="0.01" />
          </div>
          <button type="submit">Add Medication</button>
        </form>
        
        <h2>Medication List</h2>
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Type</th>
              <th>Dosage</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {medications.map(med => (
              <tr key={med._id}>
                <td>{med.medicationName}</td>
                <td>{med.type}</td>
                <td>{med.dosage}</td>
                <td>${med.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medications;
