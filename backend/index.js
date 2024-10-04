// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling cross-origin requests
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

    // Here, you can implement additional logic, such as checking user roles
    // For example, you could check if the user is an admin by comparing uid with your admin's uid

    res.status(200).json({ message: 'Login successful', uid });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
