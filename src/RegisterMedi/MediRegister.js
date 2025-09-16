import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../Contex/UserContext";
import "./MediRegister.css";
import { toast } from "react-toastify";

const MediRegister = () => {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
   try {
  const res = await axios.post("https://alpha-backend-lake.vercel.app/signup", values);
  if (res.data.statusCode === 200) {
    toast.success(res.data.message);
    setUsername(values.username);
    resetForm();
    navigate("/login");
  }
} catch (err) {
  if (err.response?.data?.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error("Registration failed. Try again.");
  }

      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container medi_register_container mt-5">
      <div className="card p-4 shadow medi_register_card">
        <h3 className="text-center mb-3">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className={`form-control ${
                formik.touched.username && formik.errors.username ? "is-invalid" : ""
              }`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MediRegister;
