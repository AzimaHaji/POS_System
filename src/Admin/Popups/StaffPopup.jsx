import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { postData, putData } from '../../APIConfig/ConfigAPI';
import { toast, ToastContainer } from 'react-toastify';
import StaffSchema from '../../Schema/StaffSchema';

export default function StaffPopup({ show, setShow, StaffId, setStaffId, loading, setLoading, getStaff, initialValues, setInitialValues }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Ensures YYYY-MM-DD format
    };

    const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: StaffSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            const formattedDOB = formatDate(values.txtDOB);
            const formattedDOJ = formatDate(values.txtDOJ);

            const ReqData = {
                Staff_Id: StaffId,
                F_Name: values.txtF_Name,
                Gender: values.txtGender,
                DOB: formattedDOB,
                Email: values.txtEmail,
                ContactNo: values.txtContactNo,
                Address: values.txtAddress,
                Adhar_No: values.txtAdhar_No,
                Driving_Licence: values.txtDriving_Licence,
                DOJ: formattedDOJ,
                Status: values.txtStatus
            };

            console.log(ReqData);

            try {

                let Response;

                if (StaffId == 0) {
                    Response = await postData("Staff_mst/Add", ReqData);
                }
                else {
                    Response = await putData("Staff_mst/Update", ReqData);
                }
                if (Response.Status == "OK") {
                    const toastId = toast.success("Saved Successfully.Email Sent to Staff.", {
                        onClose: () => {
                            getStaff();
                            setStaffId(0);
                            cancleForm();
                            setShow(false);

                        }
                    });

                }
                else {
                    toast.error("Something Went Wrong");
                    console.log(Response.data);
                }
            }
            catch (error) {
                console.error("Error", error);
            }
            finally {
                setLoading(false);
            }
        }
    });

    const cancleForm = () => {
        setInitialValues({
            txtF_Name: "",
            txtGender: "",
            txtDOB: "",
            txtContactNo: "",
            txtAddress: "",
            txtAdhar_No: "",
            txtDriving_Licence: "",
            txtDOJ: "",
            txtStatus: ""
        });
        setStaffId(0);
        resetForm();
        setShow(false);

    };

    const checkChange = () => {
        if (document.getElementById("txtStatus").checked) {
            setFieldValue("txtStatus", "Active");
        }
        else {
            setFieldValue("txtStatus", "Not-Active");
        }
    }

    useEffect(() => {
        if (StaffId != 0) {
            if (values.txtStatus == "Active") {
                document.getElementById("txtStatus").checked = true;
            }
            else {
                document.getElementById("txtStatus").checked = false;
            }
        }

        console.log("UpdateData: ", initialValues);

    }, [StaffId, values.txtStatus]);

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Staff Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Full Name</b><span className='text-danger'> * {errors.txtF_Name}</span>
                                    <input type="text" name="txtF_Name" className="form-control" placeholder="Enter Name" onChange={handleChange} onBlur={handleBlur} value={values.txtF_Name} />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <b>Address</b><span className='text-danger'> * {errors.txtAddress}</span>
                                    <textarea name="txtAddress" className="form-control" placeholder="Enter Address" onChange={handleChange} onBlur={handleBlur} value={values.txtAddress} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Email</b><span className='text-danger'> * {errors.txtEmail}</span>
                                    <input type="text" name="txtEmail" className="form-control" placeholder="Enter Email" onChange={handleChange} onBlur={handleBlur} value={values.txtEmail} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Contact No</b><span className='text-danger'> * {errors.txtContactNo}</span>
                                    <input type="text" name="txtContactNo" className="form-control" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.txtContactNo} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Aadhar No</b><span className='text-danger'> * {errors.txtAdhar_No}</span>
                                    <input type="text" name="txtAdhar_No" className="form-control" placeholder="Enter Aadhar No" onChange={handleChange} onBlur={handleBlur} value={values.txtAdhar_No} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Gender</b><span className='text-danger'> * {errors.txtGender}</span>
                                    <select name="txtGender" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtGender} >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>DOB</b><span className='text-danger'> * {errors.txtDOB}</span>
                                    <input type="date" name="txtDOB" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtDOB} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Driving Licence</b><span className='text-danger'> * {errors.txtDriving_Licence}</span>
                                    <input type="text" name="txtDriving_Licence" className="form-control" placeholder="Enter Driving Licence" onChange={handleChange} onBlur={handleBlur} value={values.txtDriving_Licence} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>DOJ</b><span className='text-danger'> * {errors.txtDOJ}</span>
                                    <input type="date" name="txtDOJ" id="txtDOJ" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtDOJ} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Status</b><span className='text-danger'> * {errors.txtStatus}</span>
                                    <div className="form-control">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input onChange={() => checkChange()} className="form-check-input" type="checkbox" id='txtStatus' name="txtStatus" />
                                                Active</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" disabled={loading ? true : false} className="btn btn-lg" style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                                    }}>{loading ? "Please Wait" : "Save"}</button>&nbsp;
                                    <button type="reset" onClick={() => cancleForm()} className="btn btn-danger btn-lg">Cancel</button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {show ? <div className="modal-backdrop show"></div> : null}
        </>
    );
}