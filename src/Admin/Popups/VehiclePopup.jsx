import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { postData, putData } from '../../APIConfig/ConfigAPI';
import { toast, ToastContainer } from 'react-toastify';
import VehicleSchema from '../../Schema/VehicleSchema';

export default function VehiclePopup({ loading, setLoading, initialValues, setInitialValues, getVehicle, VehicleId, setVehicleId, show, setShow }) {

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: VehicleSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const formattedPUCExpiry = values.txtPUC_Expiry ? new Date(values.txtPUC_Expiry).toISOString().split("T")[0] : "";

            const ReqData = {
                Vehicle_Id: VehicleId,
                Driver_Name: values.txtDriver_Name,
                PUC_No: values.txtPUC_No,
                PUC_Expiry: formattedPUCExpiry,
                Vehicle_No: values.txtVehicle_No,
                Vehicle_Name: values.txtVehicle_Name,
                Fual_Type: values.txtFuel_Type,
                Driving_Licences_No: values.txtDriving_Licences_No,
                Status: values.txtStatus,
            };

            try {
                let Response;
                if (VehicleId === 0) {
                    Response = await postData("Vehiclemst/Add", ReqData);
                } else {
                    Response = await putData("Vehiclemst/Update", ReqData);
                }

                console.log(Response);

                alert(Response.Result);
                if (Response.Status === "OK") {
                    toast.success("Saved Successfully", {
                        onClose: () => {
                            getVehicle();
                            setVehicleId(0);
                            cancelForm();
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something Went Wrong");
                }
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        }
    });

    const checkChange = () => {
        if (document.getElementById("txtStatus").checked) {
            setFieldValue("txtStatus", "Active");
        }
        else {
            setFieldValue("txtStatus", "Not-Active");
        }
    };

    useEffect(() => {
        if (VehicleId != 0) {
            if (values.txtStatus == "Active") {
                document.getElementById("txtStatus").checked = true;
            }
            else {
                document.getElementById("txtStatus").checked = false;
            }
        }
    }, [VehicleId]);

    const cancelForm = () => {
        setInitialValues({
            txtDriver_Name: "",
            txtPUC_No: "",
            txtPUC_Expiry: "",
            txtVehicle_No: "",
            txtVehicle_Name: "",
            txtFuel_Type: "",
            txtDriving_Licences_No: "",
            txtStatus: "",  // Default status to Active
        });
        setVehicleId(0);
        resetForm();
        setShow(false);
    };

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                            <strong className="modal-title">Vehicle Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Driver Name</b><span className='text-danger'> * {errors.txtDriver_Name}</span>
                                    <input type="text" name="txtDriver_Name" className="form-control" placeholder="Enter Name" onChange={handleChange} onBlur={handleBlur} value={values.txtDriver_Name} />
                                </div>

                                <div className="col-md-6 mb-2">
                                    <b>PUC No</b><span className='text-danger'> * {errors.txtPUC_No}</span>
                                    <input type="text" name="txtPUC_No" className="form-control" placeholder="Enter PUC No" onChange={handleChange} onBlur={handleBlur} value={values.txtPUC_No} />
                                </div>

                                <div className="col-md-4 mb-2">
                                    <b>Vehicle No</b><span className='text-danger'> * {errors.txtVehicle_No}</span>
                                    <input type="text" name="txtVehicle_No" className="form-control" placeholder="Enter Vehicle No" onChange={handleChange} onBlur={handleBlur} value={values.txtVehicle_No} />
                                </div>

                                <div className="col-md-4 mb-2">
                                    <b>Vehicle Name</b><span className='text-danger'> * {errors.txtVehicle_Name}</span>
                                    <input type="text" name="txtVehicle_Name" className="form-control" placeholder="Enter Vehicle Name" onChange={handleChange} onBlur={handleBlur} value={values.txtVehicle_Name} />
                                </div>

                                <div className="col-md-4 mb-2">
                                    <b>PUC Expiry</b><span className='text-danger'> * {errors.txtPUC_Expiry}</span>
                                    <input type="date" name="txtPUC_Expiry" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtPUC_Expiry} />
                                </div>

                                <div className="col-md-4 mb-2">
                                    <b>Fuel Type</b><span className='text-danger'> * {errors.txtFuel_Type}</span>
                                    <select name="txtFuel_Type" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtFuel_Type} >
                                        <option value="">Select Fuel Type</option>
                                        <option value="CNG">CNG</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <b>Driving Licences No</b><span className='text-danger'> * {errors.txtDriving_Licences_No}</span>
                                    <input type="text" name="txtDriving_Licences_No" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtDriving_Licences_No} />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <b>Status</b><span className='text-danger'> * {errors.txtStatus}</span>
                                    <div className="form-control">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input onChange={checkChange} checked={values.txtStatus === "Active"} className="form-check-input" type="checkbox" id='txtStatus' name="txtStatus" />
                                                Active
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btn btn-lg" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                                        {loading ? "Please Wait" : "Save"}
                                    </button>&nbsp;
                                    <button type="reset" onClick={cancelForm} className="btn btn-danger btn-lg">Cancel</button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
