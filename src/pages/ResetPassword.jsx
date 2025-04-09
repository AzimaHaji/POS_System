import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { postData } from "../APIConfig/ConfigAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password.length < 6) {
    errors.password = "*Must be at least 6 Characters";
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = "*Required";
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "*Passwords do not match";
  }
  return errors;
};

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await postData("ResetPassword", {
          token,
          password: values.password,
          password_confirmation: values.password_confirmation,
        });
        if (response.Status === "OK") {
          toast.success("Password reset successfully!", {
            onClose: () => navigate("/Staff/Log_In"),
          });
        } else {
          toast.error(response.message || "Something went wrong.");
        }
      } catch (error) {
        toast.error("Error resetting password.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.");
    }
  }, [token]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Reset Your Password</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 position-relative">
              <label className="form-label">New Password</label>
              {formik.errors.password && <span className="text-danger"> {formik.errors.password}</span>}
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter New Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span
                  className="input-group-text"
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </div>
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">Confirm Password</label>
              {formik.errors.password_confirmation && <span className="text-danger"> {formik.errors.password_confirmation}</span>}
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Confirm Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                />
                <span
                  className="input-group-text"
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn w-100"
                    style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", color: "white" }}>
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
