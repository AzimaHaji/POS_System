import { useFormik } from 'formik';
import React, { useState } from 'react';
import LoginSchema from '../Schema/LoginSchema';
import { postData } from '../APIConfig/ConfigAPI';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = useFormik({
        initialValues: {
            txtEmail: "",
            txtPasswrd: ""
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                
                console.log(values);

                const ReqData = {
                    Email: values.txtEmail,
                    Passwd: values.txtPasswrd
                };
                const response = await postData("Admin/Auth", ReqData);
                console.log(response.Result);
                if (response.Status === "OK") {

                    var Data = response.Result;
                    alert("Welcome " + Data.U_Name);
                    localStorage.setItem("AdminId", Data.A_Id);
                    localStorage.setItem("UserName", Data.U_Name);
                    toast.success("Log-In Successfully");
                    nav("/Admin/Dashboard");
                } else {
                    toast.error("Invalid Email or Password");
                }
            } catch (error) {
                console.error("Error", error);
                toast.error("Something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" style={{
            background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))"  
        }}>
            <div className="col-md-6 col-lg-4">
                <div className="card shadow-lg">
                    <div className="card-header text-center" style={{
                        background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))"
                    }}>
                        <h2 className='text-white'>Admin Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <b>Email</b>
                                <span className='text-danger'> * {errors.txtEmail && touched.txtEmail ? errors.txtEmail : null}</span>
                                <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.txtEmailEmail} id='txtEmail' name='txtEmail' className='form-control' placeholder="Enter Email" />
                            </div>
                            <div className="mb-3">
                                <b>Password</b>
                                <span className='text-danger'> *{errors.txtPasswrd && touched.txtPasswrd ? errors.txtPasswrd : null}</span>
                                <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.txtPasswrd} id='txtPasswrd' name='txtPasswrd' className='form-control' placeholder="Enter Password" />
                            </div>
                            <div className="d-grid">
                                <button type='submit' className='btn btn-lg' style={{
                                    background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))"
                                }}>Sign-In</button>
                                <ToastContainer />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
