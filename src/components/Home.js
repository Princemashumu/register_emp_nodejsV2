import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import EmployeeManager from './EmployeeManager';

// Styled Components
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
  font-size: 1.5em;
  font-weight: bold;
  color: red;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

const Wrapper = styled.div`
  margin-top: 80px;  // Adjusted margin to account for fixed NavBar
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login or home page after sign-out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <NavBar>
        <CompanyName>
          <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>ERStaff</h1>
          </Link>
        </CompanyName>
        <LogoutButton onClick={handleLogout}>
          LOGOUT
        </LogoutButton>
      </NavBar>

      <Wrapper>
        <Header>
          <h2>WELCOME</h2>
          <p>Design and manage employees efficiently.</p>
        </Header>

        {/* EmployeeManager will handle all employee CRUD operations */}
        <EmployeeManager />

        <MainFooter>
          <p>Media and Graphics Prince Mashumu 2024</p>
        </MainFooter>
      </Wrapper>
    </>
  );
};

export default Home;
