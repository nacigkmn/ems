import React, { useState, useEffect } from 'react';
import { deleteEmployee, getEmployee, listOfEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const navigator = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleShowDetails = (id) => {
    getEmployee(id)
      .then((res) => setSelectedEmployee(res.data))
      .catch((err) => alert('Employee not found'));
  };

  useEffect(() => {
    listOfEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleDeleteEmployee = (id) => {
  if (window.confirm("Are you sure?")) {
    deleteEmployee(id)
      .then(() => {
        alert("Employee deleted successfully");
        setEmployees(employees.filter(e => e.id !== id));
        navigator('/employees');
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Employees</h2>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Employment</th>
            <th>Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.dateOfEmployment}</td>
              <td>{emp.dateOfBirth}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => handleShowDetails(emp.id)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary mb-4" onClick={() => navigator('/')}>
        Back to Home Page
      </button>

   {selectedEmployee && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
  >
    <div
      className="bg-white rounded shadow p-4 d-flex justify-content-between"
      style={{ width: '700px' }}
    >
      <div className="employee-info" style={{ flex: 1 }}>
        <h4 className='mb-3'>Employee Details</h4>
        <p><strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
        <h5><strong>Email:</strong> {selectedEmployee.email}</h5>
        <p><strong>Employment Date:</strong> {selectedEmployee.dateOfEmployment}</p>
        <p><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth}</p>
      </div>

      <div className="employee-photo text-center" style={{ width: '250px' }}>
        <img
          src={`http://localhost:8080/${selectedEmployee.imagePath}`}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '2px solid #dee2e6'
          }}
        />
        <h5 className="mt-3">{selectedEmployee.firstName} {selectedEmployee.lastName}</h5>

        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
    <button
      className="btn btn-warning"
      onClick={() => navigator(`/edit-employee/${selectedEmployee.id}`)}
    >
      Update
    </button>

    <button
      className="btn btn-danger"
      onClick={() => handleDeleteEmployee(selectedEmployee.id)}
    >
      Delete
    </button>

    <button
      className="btn btn-secondary"
      onClick={() => setSelectedEmployee(null)}
    >
      Back
    </button>
  </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ListEmployeeComponent;
