"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

// Import Firestore
// Import Storage
var firebaseConfig = {
  apiKey: "AIzaSyA-_Ia7EhtiGzK6Cd9s7NVbBGgVpyhYQYw",
  authDomain: "employee-registration-5087d.firebaseapp.com",
  projectId: "employee-registration-5087d",
  storageBucket: "employee-registration-5087d.appspot.com",
  messagingSenderId: "1082786057643",
  appId: "1:1082786057643:web:f51a7d951eaf194a1f56ee",
  measurementId: "G-0BDECXS3LL"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig); // Initialize Firebase Auth

var auth = (0, _auth.getAuth)(app); // Initialize Firestore

exports.auth = auth;
var db = (0, _firestore.getFirestore)(app); // Initialize Firestore
// Initialize Firebase Storage

exports.db = db;
var storage = (0, _storage.getStorage)(app); // Initialize Storage
// Export auth, db, and storage

exports.storage = storage;