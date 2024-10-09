import React from 'react';

const DeletedEmployeeList = ({ deletedEmployees }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>ID Number</th>
            <th>Role</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {deletedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.age}</td>
              <td>{employee.idNumber}</td>
              <td>{employee.role}</td>
              <td>
                <img src={employee.photo} alt={employee.name} style={{ width: '50px', height: '50px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedEmployeeList;
