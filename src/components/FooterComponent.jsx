import React from 'react';
import {  FaCar } from 'react-icons/fa';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-gradient-dark text-white">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <FaCar className="text-primary me-2" size={28} />
              <h4 className="mb-0 text-primary">Car Details</h4>
            </div>
            <p className="footer-description">
              Your premier destination for comprehensive vehicle information, automotive solutions, and expert car buying advice.
            </p>
          </div>
        </div>
        <div className="footer-bottom mt-4 pt-3 border-top border-light">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                &copy; {currentYear} Car Details Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;