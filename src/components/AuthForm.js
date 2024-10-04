import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100%;
  border-radius: 25px;
  font-family: Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 15px;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background: black;
  }
  width: 100%;
  max-width: 200px;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    padding: 10px;
  }
`;

const AuthForm = ({ handleSubmit, formType, initialUsername }) => {
  const [username, setUsername] = useState(initialUsername || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Clear the inputs when the component mounts
    setUsername(initialUsername || '');
    setPassword('');
    setEmail('');
  }, [initialUsername]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(username, email, password);
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleFormSubmit}>
        <h2>{formType === 'signup' ? 'Sign Up' : 'Log In'}</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {formType === 'signup' && <Input type="password" placeholder="Confirm Password" required />}
        <Button type="submit">{formType === 'login' ? 'Login' : 'Sign Up'}</Button>
      </Form>
    </FormContainer>
  );
};

export default AuthForm;
