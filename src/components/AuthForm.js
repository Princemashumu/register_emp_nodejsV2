import React, { useState } from 'react';

const AuthForm = ({ handleSubmit, formType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password); // Pass email and password to the handleSubmit function
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
