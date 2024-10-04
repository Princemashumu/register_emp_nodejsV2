// src/components/DeletedEmployeeModal.js
import React from 'react';
import '../components/DeletedEmployeeModal';

const DeletedEmployeeModal = ({ onClose, deletedEmployees }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Deleted Employees</h2>
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {deletedEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td><img src={employee.image} alt="Employee" width="50" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedEmployeeModal;
