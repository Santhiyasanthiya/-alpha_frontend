import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="medi_foot_footer bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Left Section */}
          <div className="col-lg-4 col-md-6 medi_foot_about">
            <h5 className="fw-bold medi_foot_title">
              <i className="bi bi-stethoscope me-2"></i>
              AlphainGen Medical Coding <br /> And Billing Center
            </h5>
            <p className="small medi_foot_subtitle">
              Professional Medical Coding Education
            </p>
            <p className="medi_foot_text">
              Empowering medical coding professionals with comprehensive
              education, vibrant community, and cutting-edge industry insights
              to advance your healthcare career.
            </p>
          </div>

          {/* Platform */}
          <div className="col-lg-4 col-md-6 medi_foot_col">
            <h6 className="fw-bold medi_foot_head">Platform</h6>
            <ul className="list-unstyled medi_foot_list">
              <li><a href="#" className="medi_foot_link">Q&A Forums</a></li>
              <li><a href="#" className="medi_foot_link">Guidelines</a></li>
              <li><a href="#" className="medi_foot_link">News & Updates</a></li>
              <li><a href="#" className="medi_foot_link">Community</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-4 col-md-6 medi_foot_col">
            <h6 className="fw-bold medi_foot_head">Resources</h6>
            <ul className="list-unstyled medi_foot_list">
              <li><a href="#" className="medi_foot_link">Coding Standards</a></li>
              <li><a href="#" className="medi_foot_link">Documentation</a></li>
              <li><a href="#" className="medi_foot_link">Training Materials</a></li>
              <li><a href="#" className="medi_foot_link">Best Practices</a></li>
            </ul>
          </div>

          {/* Support */}
          {/* <div className="col-lg-3 col-md-6 medi_foot_col">
            <h6 className="fw-bold medi_foot_head">Support</h6>
            <ul className="list-unstyled medi_foot_list">
              <li><a href="#" className="medi_foot_link">Help Center</a></li>
              <li><a href="#" className="medi_foot_link">Contact Us</a></li>
              <li><a href="#" className="medi_foot_link">Privacy Policy</a></li>
              <li><a href="#" className="medi_foot_link">Terms of Service</a></li>
            </ul>
          </div> */}
        </div>

        <hr className="border-light my-4" />

        <div className="text-center small medi_foot_copy">
          © 2024 MedCode Hub. All rights reserved. | Advancing Medical Coding Excellence
        </div>
      </div>
    </footer>
  );
};

export default Footer;
