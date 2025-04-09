import React, { useContext, useState } from "react";
import { UserContext } from "../App"; 
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import ChangeProfileSchema from "../Schema/ChangeProfileSchema";
import { putData } from "../APIConfig/ConfigAPI";

export default function ChangeProfile({ show, setShow, initialValues, setInitialValues, loading, setLoading }) {
    const { setUserName } = useContext(UserContext); 
    const [AdminId] = useState(localStorage.getItem("AdminId") || 0);

    const formik = useFormik({
        initialValues: initialValues || {
            txtF_Name: "",
            txtU_Name: "",
            txtEmail: "",
            txtContactNo: ""
        },
        validationSchema: ChangeProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const ReqData = {
                A_Id: AdminId,
                F_Name: values.txtF_Name,
                U_Name: values.txtU_Name,
                Email: values.txtEmail,
                ContactNo: values.txtContactNo
            };

            try {
                const Response = await putData("Admin/Update", ReqData);
                console.log(Response);
                if (Response.Status == "OK") {
                    toast.success("Profile Updated Successfully!", {
                        onClose: () => {
                            localStorage.setItem("UserName", values.txtU_Name); // ✅ Update LocalStorage
                            setUserName(values.txtU_Name); // ✅ Update UserContext to reflect change instantly
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something went wrong..!!");
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null}>
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        <strong className="modal-title">Change Profile</strong>
                        <button type="button" onClick={() => setShow(false)} className="btn-close" />
                    </div>
                    <div className="modal-body">
                        <form className="row" onSubmit={formik.handleSubmit}>
                            <div className="col-md-6 mb-2">
                                <b>Full Name</b>
                                <input type="text" name="txtF_Name" className="form-control" placeholder="Enter Full Name"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtF_Name} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <b>User Name</b>
                                <input type="text" name="txtU_Name" className="form-control" placeholder="Enter User Name"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtU_Name} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <b>Email</b>
                                <input type="email" name="txtEmail" className="form-control" placeholder="Enter Email"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtEmail} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <b>Contact No</b>
                                <input type="text" name="txtContactNo" className="form-control" placeholder="Enter Contact No"
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.txtContactNo} />
                            </div>

                            <div className="col-md-12">
                                <button type="submit" disabled={loading} className="btn btn-lg" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                                    {loading ? "Please Wait" : "Update"}
                                </button>
                                &nbsp;
                                <button type="button" onClick={() => setShow(false)} className="btn btn-danger btn-lg">
                                    Cancel
                                </button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}
