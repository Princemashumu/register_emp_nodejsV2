// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling cross-origin requests
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // Path to your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Initialize Firestore
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { token } = req.body; // Expecting a Firebase ID token from the client

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid; // Get user ID from the decoded token

    res.status(200).json({ message: 'Login successful', uid });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Add an employee to Firestore
app.post('/api/employees', async (req, res) => {
  const { name, position, email } = req.body; // Expecting employee details in the request body

  try {
    // Add employee data to Firestore
    const employeeRef = db.collection('employees').doc(); // Create a new document reference
    await employeeRef.set({
      name,
      position,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Add a timestamp
    });

    res.status(201).json({ message: 'Employee added successfully', id: employeeRef.id });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
