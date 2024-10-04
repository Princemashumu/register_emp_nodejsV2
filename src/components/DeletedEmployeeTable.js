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

const DeletedEmployeeTable = ({ deletedEmployees }) => {
  return (
    <TableContainer>
      <h2>Former Employees</h2>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>Image</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {deletedEmployees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell><img src={employee.image} alt="Employee" width="50" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeletedEmployeeTable;
