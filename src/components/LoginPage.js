import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthForm from './AuthForm';

// Styled components for the layout
const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: red;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 80%;
`;

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
  z-index: 1000; /* Ensures the NavBar stays on top of other content */
`;

const CompanyName = styled.div`
  color: red;
  font-size: 1.5em;
  font-weight: bold;
`;

const CompanyLogo = styled.div`
  img {
    height: 50px;
    width: auto;
  }
`;
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  margin-top: 55px; /* Add a top margin to avoid content being hidden under the fixed NavBar */
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

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

const SocMedContainer = styled.p`
  text-align: center;
  margin: 20px 0;

  a {
    margin: 0 10px;
    display: inline-block;
  }

  img {
    vertical-align: middle;
  }
`;

const LOGIN_CREDENTIALS = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'password123'
};

const LoginPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, email, password) => {
    console.log('Attempting login with:', { username, email, password }); // Log values for debugging

    if (
      username === LOGIN_CREDENTIALS.username &&
      email === LOGIN_CREDENTIALS.email &&
      password === LOGIN_CREDENTIALS.password
    ) {
      alert('Login successful!');
      navigate('/home'); // Redirect to home page after successful login
    } else {
      console.log('Login failed'); // Log if login fails
      setLoginFailed(true);
      setTimeout(() => setLoginFailed(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <>
      <NavBar>
        <CompanyName>ERStaff</CompanyName>
        <CompanyLogo>
          <img src="Applogo.png" alt="Company Logo" />
        </CompanyLogo>
      </NavBar>
      <LoginWrapper>
        <Header>
        <h2>
  FAST <span style={{ color: 'red' }}>EASY</span> EFFECTIVE.
</h2>
          <p>Way To Design and Manage employees Efficiently.</p>
        </Header>
        <div>
          {loginFailed && (
            <AlertOverlay>
              <Alert>Invalid username, email, or password</Alert>
            </AlertOverlay>
          )}
          <AuthForm handleSubmit={handleLogin} formType="login" initialUsername="admin" />
        </div>
        <Footer>
          <p>Media and Graphics Prince Mashumu 2024</p>
        </Footer>
      </LoginWrapper>
      <SocMedContainer>
        <a href="https://www.facebook.com/eTvStaff/">
          <img id="fb-img" width="25" src="https://i.imgur.com/6ye5lwf.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/eTvStaff/">
          <img id="ig-img" width="25" src="https://i.imgur.com/SEsRzFL.png" alt="Instagram" />
        </a>
        <a href="https://www.twitter.com/eTvStaff/">
          <img id="twitter-img" width="25" src="https://i.imgur.com/y8o23cc.png" alt="Twitter" />
        </a>
      </SocMedContainer>
    </>
  );
};

export default LoginPage;
