import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../Contex/UserContext";
import "./MediRegister.css";
import { toast } from "react-toastify";





const MediLogin = () => {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
  // inside onSubmit:
try {
  const res = await axios.post("https://alpha-backend-lake.vercel.app/login", values);
  if (res.status === 200) {
    localStorage.setItem("zuppaToken", res.data.zuppa);
    localStorage.setItem("username", res.data.username);
    setUsername(res.data.username);
    toast.success(res.data.message);
    navigate("/signin");
  }
} catch (err) {
  if (err.response?.data?.message) {
    toast.error(err.response.data.message);
      toast.error(err.response?.data?.message || "Login failed");
  } else {
    toast.error("Login failed. Try again.");
  }

      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container medi_register_container mt-5">
      <div className="card p-4 shadow medi_register_card">
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={formik.handleSubmit}>
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

          <button type="submit" className="btn btn-success w-100" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/alpha_register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MediLogin;
