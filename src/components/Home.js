import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTable from './EmployeeTable';
import DeletedEmployeeTable from './DeletedEmployeeTable';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import auth

// Styled components for the layout
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
`;

const CompanyName = styled.div`
  color: red;
  font-size: 1em;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background-color: #f44336; /* Red color */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828; /* Darker red on hover */
  }
`;

const Wrapper = styled.div`
  margin-top: 100px; /* Adjusted for fixed NavBar */
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h2 {
    color: #004d40;
    font-size: 2em;
  }

  p {
    color: #555;
    font-size: 1.2em;
  }
`;

const MainFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const buttonStyle = {
  backgroundColor: '#4caf50', /* Green color */
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  fontSize: '1em',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  margin: '10px', /* Optional: add some margin */
};

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [admin, setAdmin] = useState(null); // Set initial admin to null

  useEffect(() => {
    // Fetch employees from Firestore on mount
    const fetchEmployees = async () => {
      // Fetch employees from Firestore and update state here
    };

    fetchEmployees();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Optionally fetch admin details if needed
        setAdmin({ id: currentUser.uid }); // Set admin with user id
      } else {
        setAdmin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (newEmployee) => {
    const employeeWithAdmin = { 
      ...newEmployee, 
      id: nextId, 
      adminId: admin ? admin.id : null // Ensure adminId is set to null if admin is not defined
    };

    try {
      // Add the new employee to Firestore
      await addDoc(collection(db, 'employees'), employeeWithAdmin);
      setEmployees([...employees, employeeWithAdmin]);
      setNextId(nextId + 1);
    } catch (error) {
      console.error('Error adding document: ', error); // Log any errors
    }

    if (editingEmployee) {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? employeeWithAdmin : emp)));
      setEditingEmployee(null);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar>
        <CompanyName>
          <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>ERStaff</h1>
          </Link>
        </CompanyName>

        <LogoutButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            LOGOUT
          </Link>
        </LogoutButton>
      </NavBar>

      <Wrapper>
        <Header>
          <h2>WELCOME.</h2>
          <p>Design and Manage employees efficiently.</p>
        </Header>

        <div className="MainChild">
          <div className="TopBar">
            <div className="container">
              <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control mt-3 mb-3"
              />
            </div>

            <EmployeeTable employees={filteredEmployees} handleEdit={handleEdit} handleDelete={handleDelete} />
            <button
              style={buttonStyle}
              onClick={() => setShowModal(true)}
            >
              Add Employee
            </button>
            {showModal && (
              <AddEmployeeModal
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                editingEmployee={editingEmployee}
              />
            )}

            <div>
              <DeletedEmployeeTable deletedEmployees={deletedEmployees} />
            </div>
          </div>

          <MainFooter>
            <p>Media and Graphics Prince Mashumu 2024</p>
          </MainFooter>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
