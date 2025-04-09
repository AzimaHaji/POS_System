import React, { useContext, useState } from "react";
import { loadingContext } from '../App';
import { toast, ToastContainer } from 'react-toastify'
import { useFormik } from "formik";
import { putData } from "../APIConfig/ConfigAPI";
import ChangePasswordSchema from "../Schema/ChangePasswordSchema";

export default function ChangePassword({ showPassword, setShowPassword }) {

    const [AdminId, setAdminId] = useState(localStorage.getItem("AdminId") || 0);

    const [initialValues, setInitialValues] = useState({
        txtEmail: "",
        txtOld: "",
        txtNew: "",
        txtConfirm: ""
    });
    const loadingPanel = useContext(loadingContext);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ChangePasswordSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const ReqData = {
                Email: values.txtEmail,
                OldPasswd: values.txtOld,
                NewPasswd: values.txtNew,
                C_Passwd: values.txtConfirm
            };

            console.log("Submitting Data:", ReqData);

            try {
                if (AdminId != 0) {
                    const Response = await putData("Admin/ChangePasswd", ReqData);

                    if (Response.Status == "OK") {
                        toast.success("Password Updated Successfully..!!", {
                            onClose: () => {
                                cancelForm();
                                setShowPassword(false);
                            }
                        });
                    } else {
                        toast.error(Response.Result || "Wrong Email or Password");
                    }
                } else {
                    toast.error("Admin ID is Missing..!!");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

    });

    const cancelForm = () => {
        setInitialValues({
            txtEmail: "",
            txtOld: "",
            txtNew: "",
            txtConfirm: ""
        });
        setShowPassword(false);
    };

    return (
        <>
            <div className={showPassword ? "modal show" : "modal"} style={showPassword ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Change Password</strong>
                            <button type="button" onClick={cancelForm} className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={formik.handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b className="text-left">Email</b>
                                    <span className='text-danger'> * {formik.touched.txtEmail && formik.errors.txtEmail}</span>
                                    <input type="email" name="txtEmail" className="form-control" placeholder="Enter Email"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtEmail} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Old Password</b>
                                    <span className='text-danger'> * {formik.touched.txtOld && formik.errors.txtOld}</span>
                                    <input type="password" name="txtOld" className="form-control" placeholder="Enter Old Password"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtOld} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>New Password</b>
                                    <span className='text-danger'> * {formik.touched.txtNew && formik.errors.txtNew}</span>
                                    <input type="password" name="txtNew" className="form-control" placeholder="Enter New Password"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtNew} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Confirm Password</b>
                                    <span className='text-danger'> * {formik.touched.txtConfirm && formik.errors.txtConfirm}</span>
                                    <input type="password" name="txtConfirm" className="form-control" placeholder="Enter Confirm Password"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtConfirm} />
                                </div>

                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btn btn-lg" style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                                    }}>
                                        {loading ? "Please Wait" : "Update"}
                                    </button>&nbsp;
                                    <button type="button" onClick={() => cancelForm()} className="btn btn-danger btn-lg" data-bs-dismiss="modal">
                                        Cancel
                                    </button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showPassword ? <div className="modal-backdrop show"></div> : null}
        </>
    )
}
