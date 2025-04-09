import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postData } from "../APIConfig/ConfigAPI";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Loader.css"; 

function Loader() {
  return (
    <div className="loader">
      <span className="loader-text">loading</span>
      <span className="load"></span>
    </div>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postData("Staff_mst/ForgotPassword", { email });
      if (response.Status === "OK") {
        toast.success("Reset Link Sent..!!Check Your Email.", {
          onClose: () => (window.location.href = "/Staff/Log_In"),
        });
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error Sending Reset Email.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))",
                color: "white",
              }}
              disabled={loading}
            >
              {loading ? <Loader /> : "Send Reset Link"}
            </button>
          </form>
          <div className="mt-3 text-center">
            <Link to="/Staff/Log_In" className="btn btn-danger">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
