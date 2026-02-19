import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    status: 'Available',
    floor: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/rooms`, formData);
      setMessage('Room added successfully!');
      setFormData({ roomNumber: '', roomType: '', status: 'Available', floor: '' });
      fetchRooms();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding room');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Room Management</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Add New Room</h2>
          <div className="form-row">
            <input type="text" name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} required />
            <select name="roomType" value={formData.roomType} onChange={handleChange}>
              <option value="">Select Room Type</option>
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Private">Private</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div className="form-row">
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <input type="number" name="floor" placeholder="Floor Number" value={formData.floor} onChange={handleChange} />
          </div>
          <button type="submit">Add Room</button>
        </form>
        
        <h2>Room List</h2>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Status</th>
              <th>Floor</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>{room.status}</td>
                <td>{room.floor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rooms;
