import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { putData } from "../APIConfig/ConfigAPI";
import ChangeStaffProfileSchema from "../Schema/ChangeStaffProfileSchema";

export default function ChangeStaffProfile({ show, setShow, staffData }) {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            txtF_Name: staffData.F_Name,
            txtGender: staffData.Gender,
            txtDOB: staffData.DOB,
            txtContactNo: staffData.ContactNo,
            txtAddress: staffData.Address,
            txtAdhar_No: staffData.Adhar_No,
            txtDriving_Licence: staffData.Driving_Licence,
            txtDOJ: staffData.DOJ,
            txtEmail: staffData.Email,
        },
        validationSchema: ChangeStaffProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const ReqData = {
                Staff_Id: staffData.Staff_Id,
                F_Name: values.txtF_Name,
                Gender: values.txtGender,
                DOB: values.txtDOB,
                ContactNo: values.txtContactNo,
                Address: values.txtAddress,
                Adhar_No: values.txtAdhar_No,
                Driving_Licence: values.txtDriving_Licence,
                DOJ: values.txtDOJ,
                Email: values.txtEmail,
            };

            console.log(ReqData);
            try {
                const Response = await putData("Staff_mst/UpdateStaffById_mst", ReqData);
                console.log(Response);

                if (Response.Status === "OK") {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Profile Updated Successfully!",
                        timer: 3000,
                        showConfirmButton: false
                    });

                    setShow(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: "Something went wrong..!!",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.message,
                });
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        show && (
            <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                            <strong className="modal-title">Change Profile</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" />
                        </div>
                        <div className="modal-body">
                            <form className="row" onSubmit={formik.handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Full Name</b>
                                    <input type="text" name="txtF_Name" className="form-control" value={formik.values.txtF_Name} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Gender</b>
                                    <input type="text" name="txtGender" className="form-control" value={formik.values.txtGender} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>DOB</b>
                                    <input type="date" name="txtDOB" className="form-control" value={formik.values.txtDOB} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Contact No</b>
                                    <input type="text" name="txtContactNo" className="form-control" onChange={formik.handleChange} value={formik.values.txtContactNo} />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <b>Address</b>
                                    <textarea name="txtAddress" className="form-control" value={formik.values.txtAddress} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Aadhar No</b>
                                    <input type="text" name="txtAdhar_No" className="form-control" value={formik.values.txtAdhar_No} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Driving Licence</b>
                                    <input type="text" name="txtDriving_Licence" className="form-control" value={formik.values.txtDriving_Licence} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>DOJ</b>
                                    <input type="date" name="txtDOJ" className="form-control" value={formik.values.txtDOJ} readOnly />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Email</b>
                                    <input type="email" name="txtEmail" className="form-control" onChange={formik.handleChange} value={formik.values.txtEmail} />
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
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
