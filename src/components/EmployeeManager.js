import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc ,getDoc} from 'firebase/firestore';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import DeletedEmployeeList from './DeletedEmployeeList'; // Import the new component
import { db } from '../firebaseConfig';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]); // State for deleted employees
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    const employeesCollection = collection(db, 'employees');
    const snapshot = await getDocs(employeesCollection);
    const employeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEmployees(employeesData);
  };

  const fetchDeletedEmployees = async () => {
    const deletedEmployeesCollection = collection(db, 'deletedemployees');
    const snapshot = await getDocs(deletedEmployeesCollection);
    const deletedEmployeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDeletedEmployees(deletedEmployeesData);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDeletedEmployees(); // Fetch deleted employees
  }, []);

  const handleEmployeeSubmit = async (employeeData) => {
    if (editingEmployee) {
      const employeeRef = doc(db, 'employees', editingEmployee.id);
      await updateDoc(employeeRef, employeeData);
      setEditingEmployee(null);
    } else {
      await addDoc(collection(db, 'employees'), employeeData);
    }
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (id) => {
    try {
      const employeeRef = doc(db, 'employees', id);
      const employeeSnapshot = await getDoc(employeeRef); // Get the employee data
      const employeeData = { id: employeeSnapshot.id, ...employeeSnapshot.data() };
  
      // Add employee to deletedemployees collection
      await addDoc(collection(db, 'deletedemployees'), employeeData);
  
      // Then delete from employees collection
      await deleteDoc(employeeRef);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  

  return (
    <div>
      <h2>Employee Manager</h2>
      <EmployeeForm 
        onSubmit={handleEmployeeSubmit} 
        editingEmployee={editingEmployee} 
        setEditingEmployee={setEditingEmployee} 
      />
      <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <h2>Deleted Employees</h2>
      <DeletedEmployeeList deletedEmployees={deletedEmployees} /> {/* Display deleted employees */}
    </div>
  );
};

export default EmployeeManager;
