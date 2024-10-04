import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5em;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: red;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #388e3c;
  }
`;

const ModalHeader = styled.h2`
  margin: 0;
`;

// AddEmployeeModal component
const AddEmployeeModal = ({ onClose, onSave, editingEmployee }) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingEmployee) {
      setId(editingEmployee.id);
      setFirstName(editingEmployee.firstName);
      setLastName(editingEmployee.lastName);
      setEmail(editingEmployee.email);
      setPosition(editingEmployee.position);
      setImage(editingEmployee.image);
    } else {
      // Generate new ID here or get from props if available
      // This example assumes nextId is passed from the parent
      setId(''); // ID is empty for new employee, set it from parent if required
      setFirstName('');
      setLastName('');
      setEmail('');
      setPosition('');
      setImage(null);
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      position,
      image,
    };
    onSave(newEmployee);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <Label>
            Employee ID:
            <Input type="text" value={id} readOnly />
          </Label>
          <Label>
            First Name:
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Label>
          <Label>
            Last Name:
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Label>
          <Label>
            Position:
            <Input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </Label>
          <Label>
            Upload Image:
            <Input type="file" onChange={handleImageChange} />
            {image && <ImagePreview src={image} alt="Employee" />}
          </Label>
          <SubmitButton type="submit">
            {editingEmployee ? 'Save Changes' : 'Save'}
          </SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddEmployeeModal;
