import React, { useState, useEffect,Link} from 'react';
import AddEmployeeModal from '../components/AddEmployeeModal';
// import EmployeeTable from '../pages/EmployeeTable';
import DeletedEmployeeTable from './DeletedEmployeeTable';
import HomeStyle from './HomeStyle.css';
import EmployeeDataStyle from './EmployeeDataStyle.css';


const EmployeeData =() => {
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
 

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const storedDeletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees')) || [];
    setEmployees(storedEmployees);
    setDeletedEmployees(storedDeletedEmployees);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleShow = () => setShow(true);

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEmployees = employees.filter(employee =>
    employee.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSave = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? newEmployee : emp)));
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
  };
  return (
    <>
    <div className="EmployeeDataNavBar">
    <div clasname="CompanyName">
      <a href="/Home"><h1>ERStaff</h1></a>
      
    </div>
        
        <div className="Button2">
          <a href='Login'>
          <button>LOG OUT</button>
          </a>
        

        </div>
        <a href="/Home">
        <div className="CompanyLogo"><img src="Applogo.png" alt=''></img></div>
        </a>
        
  </div>
    <div className="Wrapper">
    <div className="Header">
      <h2>WELCOME.</h2>
      <p>Design and Manage employees effeciently. </p>
    </div>
    <div className="MainChild">
      <div className="TopBar">
      <div className="container"></div>
      
      <div className="MiddleBar"></div>
      <div className="container">
      <DeletedEmployeeTable deletedEmployees={deletedEmployees} />
    </div>
      </div>
      </div>
      </div>
  </>
  
  );
}

export default EmployeeData

