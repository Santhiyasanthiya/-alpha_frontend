import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="medi_about_section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side Image */}
          <div className="col-lg-6 col-md-6 col-sm-12 text-center medi_about_imageWrapper">
            <img
              src="https://res.cloudinary.com/dk50cmtps/image/upload/v1757326623/medical-coding-concept-illustration_114360-8772_gjmkau.avif"
              alt="Medical Coding"
              className="img-fluid medi_about_image"
            />
          </div>

          {/* Right Side Content */}
          <div className="col-lg-6 col-md-6 col-sm-12 medi_about_content">
            <h2 className="medi_about_title mb-4">About Alphaingen Medical Coding</h2>
            <p className="medi_about_text">
              At <strong>Alphaingen</strong>, we specialize in delivering accurate and reliable medical coding
              services. Our mission is to empower healthcare providers with streamlined coding solutions that
              reduce errors, ensure compliance, and improve reimbursement outcomes.
            </p>
            <p className="medi_about_text">
              With a dedicated team of certified professionals, we bring expertise in
              <em> ICD-10-CM, CPT, DRG, Modifiers, and Compliance </em>.
              We believe in quality, precision, and continuous learning to support the evolving healthcare industry.
            </p>
            <p className="medi_about_text">
              Our vision is to become a trusted global partner in healthcare documentation, audit support,
              and coding excellence, enabling providers to focus on patient care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
