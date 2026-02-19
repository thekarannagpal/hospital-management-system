import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://hospital-management-system-ysk6.onrender.com/api';


function Undergoes() {
  const [undergoes, setUndergoes] = useState([]);
  const [patients, setPatients] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    procedureId: '',
    doctorId: '',
    procedureDate: '',
    roomId: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUndergoes();
    fetchPatients();
    fetchProcedures();
    fetchDoctors();
    fetchRooms();
  }, []);

  const fetchUndergoes = async () => {
    try {
      const response = await axios.get(`${API_URL}/undergoes`);
      setUndergoes(response.data);
    } catch (error) {
      console.error('Error fetching undergoes:', error);
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

  const fetchProcedures = async () => {
    try {
      const response = await axios.get(`${API_URL}/procedures`);
      setProcedures(response.data);
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

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/undergoes`, formData);
      setMessage('Patient procedure record added successfully!');
      setFormData({
        patientId: '',
        procedureId: '',
        doctorId: '',
        procedureDate: '',
        roomId: ''
      });
      fetchUndergoes();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding record');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="page-container">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Patient Procedures</h1>
        
        {message && <div className="success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <h2>Record Patient Procedure</h2>
          <div className="form-row">
            <select name="patientId" value={formData.patientId} onChange={handleChange} required>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <select name="procedureId" value={formData.procedureId} onChange={handleChange} required>
              <option value="">Select Procedure</option>
              {procedures.map(proc => (
                <option key={proc._id} value={proc._id}>{proc.procedureName}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
            <input type="date" name="procedureDate" value={formData.procedureDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Room</label>
            <select name="roomId" value={formData.roomId} onChange={handleChange}>
              <option value="">Select Room</option>
              {rooms.map(r => (
                <option key={r._id} value={r._id}>{r.roomNumber} - {r.roomType}</option>
              ))}
            </select>
          </div>
          <button type="submit">Record Procedure</button>
        </form>
        
        <h2>Patient Procedure Records</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Procedure</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {undergoes.map(ug => (
              <tr key={ug._id}>
                <td>{ug.patientId?.name || 'N/A'}</td>
                <td>{ug.procedureId?.procedureName || 'N/A'}</td>
                <td>{ug.doctorId?.name || 'N/A'}</td>
                <td>{new Date(ug.procedureDate).toLocaleDateString()}</td>
                <td>{ug.roomId?.roomNumber || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Undergoes;
