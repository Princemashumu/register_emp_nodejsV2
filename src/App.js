import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import AddEmployeeModal from './components/AddEmployeeModal.js';
import EmployeeData from './components/EmployeeData.js';
import DeletedEmployeeTable from './components/DeletedEmployeeTable';
import DeletedEmployeeModal from './components/DeletedEmployeeModal';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const storedDeletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees')) || [];
    setEmployees(storedEmployees);
    setDeletedEmployees(storedDeletedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('deletedEmployees', JSON.stringify(deletedEmployees));
  }, [deletedEmployees]);

  const handleSave = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? newEmployee : emp)));
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const employeeToDelete = employees.find(employee => employee.id === id);
    if (employeeToDelete) {
      setEmployees(employees.filter(employee => employee.id !== id));
      setDeletedEmployees([...deletedEmployees, employeeToDelete]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={isAuthenticated ? <Navigate to="/home" /> : <Home handleLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/LoginPage" /> : <LoginPage handleSignup={handleSignup} />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/home" />}
        />
        <Route
          path="/employeedata"
          element={isAuthenticated ? <EmployeeData employees={employees} onEdit={handleEdit} onDelete={handleDelete} /> : <Navigate to="/login" />}
        />
        <Route
          path="/deletedemployees"
          element={isAuthenticated ? <DeletedEmployeeTable deletedEmployees={deletedEmployees} /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
