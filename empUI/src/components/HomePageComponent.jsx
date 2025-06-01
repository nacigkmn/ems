import React from 'react';

const HomePageComponent = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Welcome to the Employee Management System</h1>
        <p className="lead">
          Easily manage your employees' records, pictures, and personal information.
        </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
          <a href="/employees" className="btn btn-outline-primary px-4 py-2">
            View Employees
          </a>
          <a href="/add-employee" className="btn btn-outline-primary px-4 py-2">
            Add New Employee
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default HomePageComponent;
