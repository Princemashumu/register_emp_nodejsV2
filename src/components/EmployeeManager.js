import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from './EmployeeTable';
import DeletedEmployeeTable from './DeletedEmployeeTable';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees and listen for auth changes
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); // Adjust the URL based on your server
        setEmployees(response.data);
      } catch (err) {
        setError('Error fetching employees');
        console.error('Error fetching employees: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAdmin({ id: currentUser.uid });
      } else {
        setAdmin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Add or update employee
  const handleSave = async (newEmployee) => {
    const employeeWithAdmin = {
      ...newEmployee,
      adminId: admin ? admin.id : null,
    };

    try {
      if (editingEmployee) {
        if (!editingEmployee.id) {
          console.error('Error: Missing employee ID for update operation.');
          return;
        }

        await axios.put(`http://localhost:5000/api/employees/${editingEmployee.id}`, employeeWithAdmin);
        setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? { ...emp, ...employeeWithAdmin } : emp)));
      } else {
        const response = await axios.post('http://localhost:5000/api/employees', employeeWithAdmin);
        setEmployees([...employees, { id: response.data.id, ...employeeWithAdmin }]);
      }
    } catch (error) {
      console.error('Error saving employee: ', error);
    }

    setEditingEmployee(null);
    setShowModal(false);
  };

  // Edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  // Delete employee
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    const employeeToDelete = employees.find(employee => employee.id === id);
    if (employeeToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        setEmployees(employees.filter(employee => employee.id !== id));
        setDeletedEmployees([...deletedEmployees, employeeToDelete]);
      } catch (error) {
        setError('Error deleting employee');
        console.error('Error deleting employee: ', error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Employee not found in local state.');
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* Employee Table */}
      <EmployeeTable employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Button to add new employee */}
      <button onClick={() => setShowModal(true)}>Add Employee</button>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingEmployee={editingEmployee}
        />
      )}

      {/* Deleted Employees Table */}
      <DeletedEmployeeTable deletedEmployees={deletedEmployees} />
    </div>
  );
};

export default EmployeeManager;
