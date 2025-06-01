import React from 'react';

const HeaderComponent = () => {
  return (
    <header className="bg-dark py-3 shadow-sm mb-0">
      <nav className="navbar navbar-dark bg-dark fixed-top">
         <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-white fw-bold" href="#">
          EMS
        </a>
        <h3 className="text-white m-0">Employee Management System</h3>
      </div>

      </nav>
    </header>
  );
};

export default HeaderComponent;
