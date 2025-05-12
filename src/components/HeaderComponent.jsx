import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container-fluid">
          <h1 
            className="navbar-brand mb-0 h1 cursor-pointer" 
            onClick={() => navigate('/')}
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
          >
            <i className="fas fa-car me-2"></i>
            Car Details Platform
          </h1>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white"
                  onClick={() => navigate('/')}
                >
                  Home
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;