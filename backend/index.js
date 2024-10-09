// Import necessary modules
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // service account key path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'employee-registration-5087d.appspot.com', // Your actual bucket URL
});

const db = getFirestore();
const bucket = admin.storage().bucket(); // Firebase storage bucket

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Initialize multer for file uploads (store files in memory before uploading to Firebase)
const upload = multer({ storage: multer.memoryStorage() });

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

// 2. POST a new employee (with photo upload)
app.post('/api/employees', upload.single('photo'), async (req, res) => {
  const { name, position, email } = req.body;
  const file = req.file;

  // Check if required fields are provided
  if (!name || !position || !email || !file) {
    return res.status(400).json({ message: 'All fields (name, position, email, photo) are required' });
  }

  try {
    // Upload photo to Firebase Storage
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Error uploading photo', error: err.message });
    });

    stream.on('finish', async () => {
      // Make the photo publicly accessible
      await fileUpload.makePublic();

      // Get the photo URL
      const photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Add employee with photo URL
      const newEmployeeRef = await db.collection('employees').add({
        name,
        position,
        email,
        photoUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(201).json({ message: 'Employee added', id: newEmployeeRef.id, photoUrl });
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error('Error adding employee:', error.message);
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});

// 3. PUT/PATCH to update an employee by ID (with optional photo update)
app.put('/api/employees/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, position, email } = req.body;
  const file = req.file;

  // Check if required fields are provided
  if (!name || !position || !email) {
    return res.status(400).json({ message: 'All fields (name, position, email) are required' });
  }

  try {
    let updateData = { name, position, email };

    if (file) {
      // If a new photo is uploaded, upload it to Firebase Storage
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (err) => {
        console.error('Error uploading file:', err);
        return res.status(500).json({ message: 'Error uploading photo', error: err.message });
      });

      stream.on('finish', async () => {
        // Make the new photo publicly accessible
        await fileUpload.makePublic();

        // Get the new photo URL
        const photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        updateData.photoUrl = photoUrl; // Update the photo URL in Firestore
      });

      stream.end(file.buffer);
    }

    // Update employee details in Firestore
    await db.collection('employees').doc(id).update(updateData);
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
