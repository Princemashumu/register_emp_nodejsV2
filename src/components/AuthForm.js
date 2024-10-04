import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import styled from 'styled-components';

// Styled Paper component for form background
const FormContainer = styled(Paper)`
  padding: 20px;
  max-width: 400px;
  margin: auto;
  margin-top: 70px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AuthForm = ({ handleSubmit, formType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password); // Pass email and password to the handleSubmit function
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        {formType === 'login' ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              {formType === 'login' ? 'Login' : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
