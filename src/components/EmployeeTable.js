import React from 'react';
import styled from 'styled-components';

// Styled container for the table
const TableContainer = styled.div`
  margin: 20px;
`;

// Styled table
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

// Styled table header
const TableHeader = styled.thead`
  background-color: #f4f4f4;
  color: #333;
`;

// Styled table headers
const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

// Styled table body
const TableBody = styled.tbody``;

// Styled table rows
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

// Styled table cells
const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  img {
    border-radius: 50%;
  }
`;

// Styled action buttons
const ActionButton = styled.button`
  background-color: #4caf50; /* Green color */
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-right: 5px;

  &:hover {
    background-color: #388e3c; /* Darker green on hover */
  }
`;

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => {
  return (
    <TableContainer>
      <h2>Employees</h2>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell><img src={employee.image} alt="Employee" width="50" /></TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(employee)}>Edit</ActionButton>
                <ActionButton onClick={() => handleDelete(employee.id)}>Delete</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
