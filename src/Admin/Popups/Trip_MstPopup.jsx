import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getData, postData, putData } from '../../APIConfig/ConfigAPI';
import { useFormik } from 'formik';
import TripSchema from '../../Schema/TripSchema';

export default function Trip_MstPopup({ getTrip, show, setShow, loading, setLoading, TripId, setTripId, setInitialValues, initialValues }) {

    const [vehicleData, setVehicleData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    const FetchStaff = async () => {
        try {
            const response = await getData("Staff_mst/Get");
            if (response.Status === "OK") {
                setStaffData(response.Result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const FetchVehicle = async () => {
        try {
            const response = await getData("Vehiclemst/Get");
            if (response.Status === "OK") {
                const activeVehicles = response.Result.filter(vehicle => vehicle.Status === "Active");
                setVehicleData(activeVehicles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        FetchStaff();
        FetchVehicle();
    }, []);

    const formatDate = (Data) => {
        if (!Data) return "";
        const date = new Date(Data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const todayDate = new Date().toISOString().split("T")[0];

    const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues || {
            txtVehicle_Id: "",
            txtStaff_Id: "",
            txtStart_Date: todayDate,
        },
        validationSchema: TripSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            const ReqData = {
                Trip_Id: TripId,
                Vehicle_Id: values.txtVehicle_Id,
                Staff_Id: values.txtStaff_Id,
                Start_Date: formatDate(values.txtStart_Date),
            };

            console.log("Submitting Data:", ReqData);

            try {
                let response;
                if (TripId === 0) {
                    response = await postData("Trip_mst/Add", ReqData);
                } else {
                    response = await putData("Trip/Update", ReqData);
                }

                if (response.Status === "OK") {
                    toast.success("Saved Successfully", {
                        onClose: () => {
                            getTrip();
                            setTripId(0);
                            cancelForm();
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something Went Wrong");
                }
            } catch (error) {
                console.error("Error submitting trip:", error);
            } finally {
                setLoading(false);
            }
        }
    });

    const cancelForm = () => {
        setInitialValues({
            txtVehicle_Id: "",
            txtStaff_Id: "",
            txtStart_Date: todayDate,
        });
        setTripId(0);
        resetForm();
        setShow(false);
    };

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Trip Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                {/* Vehicle Dropdown */}
                                <div className="col-md-6 mb-2">
                                    <b>Vehicle Name</b><span className="text-danger"> * {errors.txtVehicle_Id}</span>
                                    <select name="txtVehicle_Id" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtVehicle_Id} >
                                        <option value="">Select Vehicle</option>
                                        {vehicleData.map((vehicle) => (
                                            <option key={vehicle.Vehicle_Id} value={vehicle.Vehicle_Id}>
                                                {vehicle.Vehicle_Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Staff Dropdown */}
                                <div className="col-md-6 mb-2">
                                    <b>Staff Name</b><span className="text-danger"> * {errors.txtStaff_Id}</span>
                                    <select name="txtStaff_Id" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtStaff_Id} >
                                        <option value="">Select Staff</option>
                                        {staffData.map((staffMember) => (
                                            <option key={staffMember.Staff_Id} value={staffMember.Staff_Id}>
                                                {staffMember.F_Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Start Date */}
                                <div className="col-md-4 mb-2">
                                    <b>Start Date</b><span className='text-danger'> * </span>
                                    <input type="date" name="txtStart_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtStart_Date || todayDate} />
                                </div>

                                {/* Finish Date */}
                                {/* <div className="col-md-4 mb-2">
                                    <b>Finish Date</b><span className='text-danger'> * {errors.txtFinish_Date}</span>
                                    <input type="date" name="txtFinish_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtFinish_Date} />
                                </div> */}

                                {/* Entry Date
                                <div className="col-md-4 mb-2">
                                    <b>Entry Date</b><span className='text-danger' style={{ fontSize: "12px", marginLeft: "5px" }}> * {errors.txtEntry_Date}</span>
                                    <input type="date" name="txtEntry_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtEntry_Date} />
                                </div> */}

                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btn btn-lg" style={{
                                        background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))"
                                    }}>
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
            {show ? <div className="modal-backdrop show"></div> : null}
        </>
    );
}
