import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/EmployeeService';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfEmployment, setDateOfEmployment] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [imagePath, setImagePath] = useState(null); // dikkat!

  const navigator = useNavigate();

  const saveEmployee = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !imagePath) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Enter a valid e-mail');
      return;
    }

    const formData = new FormData();
    formData.append(
      'employee',
      JSON.stringify({ firstName, lastName, email, dateOfEmployment, dateOfBirth })
    );
    formData.append('image', imagePath);

    createEmployee(formData)
      .then((response) => {
        console.log('Employee created:', response.data);
        navigator('/employees');
      })
      .catch((error) => {
        alert('Creation failed');
        console.error(error);
      });
  };

  return (
    <div className="container mb-4 mt-4">
      <div className="card col-md-6 offset-md-3">
        <h2>Add Employee</h2>
        <div className="card-body">
          <form onSubmit={saveEmployee}>
            <div className="form-group mb-2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                value={firstName}
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                value={lastName}
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email</label>
              <input
                type="text"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Date of Employment</label>
              <input
                type="date"
                value={dateOfEmployment}
                className="form-control"
                onChange={(e) => setDateOfEmployment(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                className="form-control"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImagePath(e.target.files[0])}
              />
            </div>
           <div className="d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigator('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
