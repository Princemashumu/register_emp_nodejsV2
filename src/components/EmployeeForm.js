import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const EmployeeForm = ({ onSubmit, editingEmployee, setEditingEmployee }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setSurname(editingEmployee.surname);
      setAge(editingEmployee.age);
      setIdNumber(editingEmployee.idNumber);
      setRole(editingEmployee.role);
    } else {
      setName('');
      setSurname('');
      setAge('');
      setIdNumber('');
      setRole('');
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, surname, age, idNumber, role, photo });
    setName('');
    setSurname('');
    setAge('');
    setIdNumber('');
    setRole('');
    setEditingEmployee(null);
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="Surname" 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)} 
          required 
        />
        <Input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="ID Number" 
          value={idNumber} 
          onChange={(e) => setIdNumber(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="Role in Company" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          required 
        />
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <Button type="submit">
          {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default EmployeeForm;
