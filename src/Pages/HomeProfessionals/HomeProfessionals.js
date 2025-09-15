import React from "react";
import "./HomeProfessionals.css";

const HomeProfessionals = () => {
  return (
    <section className="medi_proff_section text-center py-5">
      <div className="container">
        {/* Title */}
        <h2 className="medi_proff_title mb-3">
          Trusted by Medical Coding Professionals
        </h2>
        <p className="medi_proff_subtitle mb-5">
          Join thousands of professionals who trust Alphaignen for their coding education
        </p>

        {/* Stats Row */}
        <div className="row g-4">
          <div className="col-6 col-md-3">
            <div className="medi_proff_card shadow-sm">
              <h3 className="medi_proff_number">5,000+</h3>
              <p className="medi_proff_label">Active Members</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="medi_proff_card shadow-sm">
              <h3 className="medi_proff_number">15,000+</h3>
              <p className="medi_proff_label">Questions Answered</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="medi_proff_card shadow-sm">
              <h3 className="medi_proff_number">500+</h3>
              <p className="medi_proff_label">Guidelines Available</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="medi_proff_card shadow-sm">
              <h3 className="medi_proff_number">24/7</h3>
              <p className="medi_proff_label">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProfessionals;
