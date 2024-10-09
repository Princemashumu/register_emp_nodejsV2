import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import AddEmployeeModal from '../components/AddEmployeeModal';
import DeletedEmployeeTable from './DeletedEmployeeTable';
import EmployeeTable from '../components/EmployeeTable'; // Import EmployeeTable
import './HomeStyle.css'; // Adjust based on your styles
import './EmployeeDataStyle.css';

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeCollection = collection(db, 'employees'); // Ensure this matches your Firestore collection name
      const employeeSnapshot = await getDocs(employeeCollection);
      const employeeList = employeeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched Employees:', employeeList); // Check fetched employees
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const handleDelete = async (id) => {
    try {
      const employeeToDelete = employees.find(employee => employee.id === id);
      if (employeeToDelete) {
        // Move employee to deletedEmployees collection
        const deletedEmployeeRef = doc(db, 'deleted_employees', id);
        await setDoc(deletedEmployeeRef, employeeToDelete); // Store deleted employee
        await deleteDoc(doc(db, 'employees', id)); // Delete from employees collection

        setEmployees(employees.filter(employee => employee.id !== id));
        setDeletedEmployees([...deletedEmployees, employeeToDelete]);
      }
    } catch (error) {
      console.error('Error deleting and moving employee:', error);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="EmployeeDataNavBar">
        <div className="CompanyName">
          <a href="/Home"><h1>ERStaff</h1></a>
        </div>
        
        <div className="Button2">
          <a href='Login'>
            <button>LOG OUT</button>
          </a>
        </div>
        
        <a href="/Home">
          <div className="CompanyLogo">
            <img src="Applogo.png" alt="Company Logo" />
          </div>
        </a>
      </div>

      <div className="Wrapper">
        <div className="Header">
          <h2>WELCOME.</h2>
          <p>Design and Manage employees efficiently.</p>
        </div>

        <div className="MainChild">
          <div className="TopBar">
            <div className="container">
              <input 
                type="text" 
                placeholder="Search by ID..." 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
            </div>
            <div className="MiddleBar"></div>
            <div className="container">
              <EmployeeTable 
                employees={filteredEmployees} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
              />
              <DeletedEmployeeTable deletedEmployees={deletedEmployees} />
            </div>
          </div>
        </div>

        {showModal && (
          <AddEmployeeModal 
            employee={editingEmployee} 
            onSave={handleSave} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </div>
    </>
  );
};

export default EmployeeData;
