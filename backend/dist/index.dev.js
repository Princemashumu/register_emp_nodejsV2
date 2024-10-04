"use strict";

// Import necessary modules
var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors'); // For handling cross-origin requests


var admin = require('firebase-admin'); // Initialize Firebase Admin SDK


var serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // Path to your service account key


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore(); // Initialize Firestore

var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors()); // Enable CORS

app.use(bodyParser.json()); // Parse JSON bodies
// Login endpoint

app.post('/api/login', function _callee(req, res) {
  var token, decodedToken, uid;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.body.token; // Expecting a Firebase ID token from the client

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(admin.auth().verifyIdToken(token));

        case 4:
          decodedToken = _context.sent;
          uid = decodedToken.uid; // Get user ID from the decoded token

          res.status(200).json({
            message: 'Login successful',
            uid: uid
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error('Error verifying token:', _context.t0);
          res.status(401).json({
            message: 'Invalid token'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // Add an employee to Firestore

app.post('/api/employees', function _callee2(req, res) {
  var _req$body, name, position, email, employeeRef;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, position = _req$body.position, email = _req$body.email; // Expecting employee details in the request body

          _context2.prev = 1;
          // Add employee data to Firestore
          employeeRef = db.collection('employees').doc(); // Create a new document reference

          _context2.next = 5;
          return regeneratorRuntime.awrap(employeeRef.set({
            name: name,
            position: position,
            email: email,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // Add a timestamp

          }));

        case 5:
          res.status(201).json({
            message: 'Employee added successfully',
            id: employeeRef.id
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error('Error adding employee:', _context2.t0);
          res.status(500).json({
            message: 'Error adding employee'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Start server

app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});