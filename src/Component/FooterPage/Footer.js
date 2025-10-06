import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      subject: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      subject: Yup.string().required("Subject is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("https://alpha-backend-lake.vercel.app/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          setShow(true); // ✅ Show modal success alert
          resetForm();
        }
      } catch (err) {
        console.error("Error submitting enquiry:", err);
      }
    },
  });

  return (
    <footer className="medi_foot_pg_footer py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Address Section */}
          <div className="col-lg-4 col-md-6 medi_foot_pg_address">
            <h5 className="fw-bold">AlphainGen Medical Coding Center</h5>
            <p>
              123, Main Road,
              <br />
              Chennai, Tamil Nadu - 600001
            </p>
            <p>Email: info@alphaingen.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>

          {/* Contact Form Section */}
          <div className="col-lg-4 col-md-6 medi_foot_pg_contact">
            <h5 className="fw-bold">Contact Us</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control medi_foot_pg_input"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger small">{formik.errors.username}</div>
                )}
              </div>

              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control medi_foot_pg_input"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger small">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control medi_foot_pg_input"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger small">{formik.errors.phone}</div>
                )}
              </div>

              <div className="mb-2">
                <textarea
                  rows="2"
                  name="subject"
                  placeholder="Subject"
                  className="form-control medi_foot_pg_input"
                  onChange={formik.handleChange}
                  value={formik.values.subject}
                ></textarea>
                {formik.touched.subject && formik.errors.subject && (
                  <div className="text-danger small">{formik.errors.subject}</div>
                )}
              </div>

              <button type="submit" className="btn btn-warning w-100 medi_foot_pg_btn">
                Submit
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="col-lg-4 col-md-12 medi_foot_pg_map">
            <h5 className="fw-bold">Find Us</h5>
            <iframe
              title="Alphaingen Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789!2d80.2406374!3d12.981489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b8f1a1e1e1%3A0x48188024511c3b88!2sAlphaingen%20Medical%20Coding%20and%20Billing%20Center!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <hr className="border-light my-4" />

        {/* Social Media */}
        <div className="text-center">
          <a href="#" className="medi_foot_pg_icon instagram">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="medi_foot_pg_icon youtube">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="#" className="medi_foot_pg_icon facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="medi_foot_pg_icon linkedin">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        <div className="text-center small mt-3 medi_foot_pg_copy">
          © 2024 AlphainGen. All rights reserved.
        </div>
      </div>

      {/* ✅ Success Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for submitting your enquiry. We will get back to you soon!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;
