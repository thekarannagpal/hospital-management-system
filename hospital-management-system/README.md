# 🏥 Hospital Management System

A comprehensive full-stack web application for managing hospital operations including patient records, doctor schedules, appointments, departments, and medical procedures.

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Patient Management
![Patients](./screenshots/patients.png)

## ✨ Features

- **Patient Management** - Complete patient record system with personal and medical information
- **Doctor Management** - Manage doctor profiles, specializations, and departments
- **Appointment Scheduling** - Book and track patient-doctor appointments
- **Department Management** - Organize hospital departments and staff
- **Nurse Management** - Staff management with shift tracking
- **Room Management** - Track room availability and assignments
- **Medication Inventory** - Manage medicine stock and pricing
- **Medical Procedures** - Catalog of medical procedures with costs
- **Prescription System** - Digital prescription management
- **Procedure Tracking** - Record patient procedures and treatments
- **Real-time Statistics** - Live dashboard with hospital metrics

## 🛠️ Tech Stack

### Frontend
- React.js 18.2.0
- React Router DOM 6.10.0
- Axios for API calls
- Modern CSS3 with animations

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation & Setup

### 1. Clone the repository
git clone https://github.com/thekarannagpal/hospital-management-system.git
cd hospital-management-system

### 2. Backend Setup
cd backend
npm install
npm start
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
cd frontend
npm install
npm start
Frontend runs on `http://localhost:3000`

### 4. Database Setup

#### Option A: Local MongoDB
Start MongoDB
mongod

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `backend/config/db.js` with your connection string



