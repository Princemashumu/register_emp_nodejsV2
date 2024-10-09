"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import necessary modules
var express = require('express');

var cors = require('cors');

var admin = require('firebase-admin');

var _require = require('firebase-admin/firestore'),
    getFirestore = _require.getFirestore; // Initialize Firebase Admin SDK


var serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // Replace with your service account key path


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = getFirestore(); // Initialize Express app

var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors()); // Enable CORS for cross-origin requests

app.use(express.json()); // Parse JSON request bodies
// API Endpoints
// 1. GET all employees

app.get('/api/employees', function _callee(req, res) {
  var employeesSnapshot, employees;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection('employees').get());

        case 3:
          employeesSnapshot = _context.sent;
          employees = employeesSnapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          res.status(200).json(employees);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching employees:', _context.t0.message);
          res.status(500).json({
            message: 'Error fetching employees',
            error: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // 2. POST a new employee

app.post('/api/employees', function _callee2(req, res) {
  var _req$body, name, position, email, newEmployeeRef;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, position = _req$body.position, email = _req$body.email; // Check if required fields are provided

          if (!(!name || !position || !email)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'All fields (name, position, email) are required'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(db.collection('employees').add({
            name: name,
            position: position,
            email: email,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          }));

        case 6:
          newEmployeeRef = _context2.sent;
          res.status(201).json({
            message: 'Employee added',
            id: newEmployeeRef.id
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.error('Error adding employee:', _context2.t0.message);
          res.status(500).json({
            message: 'Error adding employee',
            error: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // 3. PUT/PATCH to update an employee by ID

app.put('/api/employees/:id', function _callee3(req, res) {
  var id, _req$body2, name, position, email;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, position = _req$body2.position, email = _req$body2.email; // Check if required fields are provided

          if (!(!name || !position || !email)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'All fields (name, position, email) are required'
          }));

        case 4:
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(db.collection('employees').doc(id).update({
            name: name,
            position: position,
            email: email
          }));

        case 7:
          res.status(200).json({
            message: 'Employee updated successfully'
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](4);
          console.error('Error updating employee:', _context3.t0.message);
          res.status(500).json({
            message: 'Error updating employee',
            error: _context3.t0.message
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 10]]);
}); // 4. DELETE an employee by ID

app["delete"]('/api/employees/:id', function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(db.collection('employees').doc(id)["delete"]());

        case 4:
          res.status(200).json({
            message: 'Employee deleted successfully'
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          console.error('Error deleting employee:', _context4.t0.message);
          res.status(500).json({
            message: 'Error deleting employee',
            error: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Start the Express server

app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});