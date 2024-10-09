"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import necessary modules
var express = require('express');

var cors = require('cors');

var admin = require('firebase-admin');

var multer = require('multer');

var _require = require('firebase-admin/firestore'),
    getFirestore = _require.getFirestore; // Initialize Firebase Admin SDK


var serviceAccount = require('./employee-registration-5087d-firebase-adminsdk-8yomy-ae692e51d1.json'); // service account key path


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'employee-registration-5087d.appspot.com' // Your actual bucket URL

});
var db = getFirestore();
var bucket = admin.storage().bucket(); // Firebase storage bucket
// Initialize Express app

var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors()); // Enable CORS for cross-origin requests

app.use(express.json()); // Parse JSON request bodies
// Initialize multer for file uploads (store files in memory before uploading to Firebase)

var upload = multer({
  storage: multer.memoryStorage()
}); // API Endpoints
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
}); // 2. POST a new employee (with photo upload)

app.post('/api/employees', upload.single('photo'), function _callee3(req, res) {
  var _req$body, name, position, email, file, fileName, fileUpload, stream;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, position = _req$body.position, email = _req$body.email;
          file = req.file; // Check if required fields are provided

          if (!(!name || !position || !email || !file)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'All fields (name, position, email, photo) are required'
          }));

        case 4:
          try {
            // Upload photo to Firebase Storage
            fileName = "".concat(Date.now(), "_").concat(file.originalname);
            fileUpload = bucket.file(fileName);
            stream = fileUpload.createWriteStream({
              metadata: {
                contentType: file.mimetype
              }
            });
            stream.on('error', function (err) {
              console.error('Error uploading file:', err);
              return res.status(500).json({
                message: 'Error uploading photo',
                error: err.message
              });
            });
            stream.on('finish', function _callee2() {
              var photoUrl, newEmployeeRef;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(fileUpload.makePublic());

                    case 2:
                      // Get the photo URL
                      photoUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(fileName); // Add employee with photo URL

                      _context2.next = 5;
                      return regeneratorRuntime.awrap(db.collection('employees').add({
                        name: name,
                        position: position,
                        email: email,
                        photoUrl: photoUrl,
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                      }));

                    case 5:
                      newEmployeeRef = _context2.sent;
                      res.status(201).json({
                        message: 'Employee added',
                        id: newEmployeeRef.id,
                        photoUrl: photoUrl
                      });

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            stream.end(file.buffer);
          } catch (error) {
            console.error('Error adding employee:', error.message);
            res.status(500).json({
              message: 'Error adding employee',
              error: error.message
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 3. PUT/PATCH to update an employee by ID (with optional photo update)

app.put('/api/employees/:id', upload.single('photo'), function _callee5(req, res) {
  var id, _req$body2, name, position, email, file, updateData, fileName, fileUpload, stream;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, position = _req$body2.position, email = _req$body2.email;
          file = req.file; // Check if required fields are provided

          if (!(!name || !position || !email)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'All fields (name, position, email) are required'
          }));

        case 5:
          _context5.prev = 5;
          updateData = {
            name: name,
            position: position,
            email: email
          };

          if (file) {
            // If a new photo is uploaded, upload it to Firebase Storage
            fileName = "".concat(Date.now(), "_").concat(file.originalname);
            fileUpload = bucket.file(fileName);
            stream = fileUpload.createWriteStream({
              metadata: {
                contentType: file.mimetype
              }
            });
            stream.on('error', function (err) {
              console.error('Error uploading file:', err);
              return res.status(500).json({
                message: 'Error uploading photo',
                error: err.message
              });
            });
            stream.on('finish', function _callee4() {
              var photoUrl;
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(fileUpload.makePublic());

                    case 2:
                      // Get the new photo URL
                      photoUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(fileName);
                      updateData.photoUrl = photoUrl; // Update the photo URL in Firestore

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
            stream.end(file.buffer);
          } // Update employee details in Firestore


          _context5.next = 10;
          return regeneratorRuntime.awrap(db.collection('employees').doc(id).update(updateData));

        case 10:
          res.status(200).json({
            message: 'Employee updated successfully'
          });
          _context5.next = 17;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](5);
          console.error('Error updating employee:', _context5.t0.message);
          res.status(500).json({
            message: 'Error updating employee',
            error: _context5.t0.message
          });

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 13]]);
}); // 4. DELETE an employee by ID

app["delete"]('/api/employees/:id', function _callee6(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(db.collection('employees').doc(id)["delete"]());

        case 4:
          res.status(200).json({
            message: 'Employee deleted successfully'
          });
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          console.error('Error deleting employee:', _context6.t0.message);
          res.status(500).json({
            message: 'Error deleting employee',
            error: _context6.t0.message
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Start the Express server

app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});