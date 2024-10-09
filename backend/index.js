// Import necessary modules
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // Replace with your service account key path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// API Endpoints

// 1. GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employeesSnapshot = await db.collection('employees').get();
    const employees = employeesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// 2. POST a new employee
app.post('/api/employees', async (req, res) => {
  const { name, position, email } = req.body;

  // Check if required fields are provided
  if (!name || !position || !email) {
    return res.status(400).json({ message: 'All fields (name, position, email) are required' });
  }

  try {
    const newEmployeeRef = await db.collection('employees').add({
      name,
      position,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: 'Employee added', id: newEmployeeRef.id });
  } catch (error) {
    console.error('Error adding employee:', error.message);
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});

// 3. PUT/PATCH to update an employee by ID
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, position, email } = req.body;

  // Check if required fields are provided
  if (!name || !position || !email) {
    return res.status(400).json({ message: 'All fields (name, position, email) are required' });
  }

  try {
    await db.collection('employees').doc(id).update({
      name,
      position,
      email,
    });
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
});

// 4. DELETE an employee by ID
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('employees').doc(id).delete();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
