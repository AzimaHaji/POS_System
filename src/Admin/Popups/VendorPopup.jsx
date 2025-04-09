import React from 'react';
import { useFormik } from 'formik';
import { postData, putData } from '../../APIConfig/ConfigAPI';
import { toast, ToastContainer } from 'react-toastify';
import VendorSchema from '../../Schema/VendorSchema';

export default function VendorPopup({
    show,
    setShow,
    VendorId,
    setVendorId,
    loading,
    setLoading,
    getVendors,
    initialValues,
    setInitialValues
}) {
    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm
    } = useFormik({
        initialValues,
        validationSchema: VendorSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            const ReqData = {
                V_Id: VendorId,
                Business_Name: values.txtBusiness_Name,
                Contact_Person: values.txtContact_Person,
                Address: values.txtAddress,
                ContactNo: values.txtContactNo,
                Alter_ContactNo: values.txtAlter_ContactNo,
                GST_In: values.txtGST_In
            };


            console.log(ReqData);
            try {
                let Response;
                if (VendorId === 0) {
                    Response = await postData("Vendors/Add", ReqData);
                } else {
                    Response = await putData("Vendors/Update", ReqData);
                }

                if (Response.Status == "OK") {
                    toast.success("Saved Successfully.", {
                        onClose: () => {
                            getVendors();
                            setVendorId(0);
                            cancelForm();
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something went wrong.");
                }
            } catch (error) {
                toast.error("Error occurred while saving.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    const cancelForm = () => {
        setInitialValues({
            txtBusiness_Name: "",
            txtContact_Person: "",
            txtAddress: "",
            txtContactNo: "",
            txtAlter_ContactNo: "",
            txtGST_In: ""
        });
        setVendorId(0);
        resetForm();
        setShow(false);
    };

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))" }}>
                            <strong className="modal-title">Vendor Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" />
                        </div>
                        <div className="modal-body">
                            <form className="row" onSubmit={handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Business Name</b> <span className='text-danger'>* {errors.txtBusiness_Name}</span>
                                    <input type="text" name="txtBusiness_Name" className="form-control" placeholder="Enter Business Name" onChange={handleChange} onBlur={handleBlur} value={values.txtBusiness_Name} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Contact Person</b> <span className='text-danger'>* {errors.txtContact_Person}</span>
                                    <input type="text" name="txtContact_Person" className="form-control" placeholder="Enter Contact Person" onChange={handleChange} onBlur={handleBlur} value={values.txtContact_Person} />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <b>Address</b> <span className='text-danger'>* {errors.txtAddress}</span>
                                    <textarea name="txtAddress" className="form-control" placeholder="Enter Address" onChange={handleChange} onBlur={handleBlur} value={values.txtAddress} />
                                </div>
                                <div className="col-md-4 mb-2">
                                    <b>Contact No</b> <span className='text-danger'>* {errors.txtContactNo}</span>
                                    <input type="text" name="txtContactNo" className="form-control" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.txtContactNo} />
                                </div>
                                <div className="col-md-4 mb-2">
                                    <b>Alt. Contact No</b>
                                    <input type="text" name="txtAlter_ContactNo" className="form-control" placeholder="Enter Alternate Contact No" onChange={handleChange} onBlur={handleBlur} value={values.txtAlter_ContactNo} />
                                </div>
                                <div className="col-md-4 mb-2">
                                    <b>GST IN</b> <span className='text-danger'>* {errors.txtGST_In}</span>
                                    <input type="text" name="txtGST_In" className="form-control" placeholder="Enter GST IN" onChange={handleChange} onBlur={handleBlur} value={values.txtGST_In} />
                                </div>
                                <div className="col-md-12 mt-2">
                                    <button type="submit" disabled={loading} className="btn btn-lg" style={{ background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))" }}>
                                        {loading ? "Please Wait..." : "Save"}
                                    </button>
                                    &nbsp;
                                    <button type="reset" onClick={cancelForm} className="btn btn-danger btn-lg">Cancel</button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop show"></div>}
        </>
    );
}
