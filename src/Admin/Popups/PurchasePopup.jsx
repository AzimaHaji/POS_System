import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getData, postData, putData } from '../../APIConfig/ConfigAPI';
import { useFormik } from 'formik';
import PurchaseSchema from '../../Schema/PurchaseSchema';

export default function PurchasePopup({ show, setShow, loading, setLoading, getPurchase, setPurchaseId, PurchaseId, setInitialValues, initialValues }) {

    const [vendors, setVendors] = useState([]);

    const FetchVendors = async () => {
        try {
            const response = await getData("Vendors/Get");
            if (response.Status === "OK") {
                setVendors(response.Result);
            } else {
                console.error("Failed to fetch vendors");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues || {
            txtBill_No: "",
            txtGrossAmt: "",
            txtTotalAmt: "",
            txtV_Id: "",
            txtGST_Type: "",
            txtBill_Date: "",
            txtTotal: ""
        },
        validationSchema: PurchaseSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const formattedBillDate = formatDate(values.txtBill_Date);

            const ReqData = {
                Purchase_Id: PurchaseId,
                Bill_No: values.txtBill_No,
                V_Id: values.txtV_Id,
                GrossAmt: values.txtGrossAmt,
                TotalAmt: values.txtTotalAmt,
                GST_Type: values.txtGST_Type,
                Total: values.txtTotal,
                Bill_Date: formattedBillDate
            };

            console.log("Submitting Data:", ReqData);

            try {
                let response;

                if (PurchaseId === 0) {
                    response = await postData("Purchasemst/Add", ReqData);
                } else {
                    response = await putData("Purchasemst/Update", ReqData);
                }

                console.log(response.Result);
                if (response.Status === "OK") {
                    toast.success("Saved Successfully", {
                        onClose: () => {
                            getPurchase();
                            setPurchaseId(0);
                            cancelForm();
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something Went Wrong");
                    console.log("Response:", response.data);
                }
            } catch (error) {
                console.error("Error submitting purchase:", error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        FetchVendors();
        const grossAmt = parseFloat(values.txtGrossAmt) || 0;
        const gstAmt = parseFloat(values.txtTotalAmt) || 0;
        setFieldValue("txtTotal", grossAmt + gstAmt);
    }, [values.txtGrossAmt, values.txtTotalAmt, setFieldValue]);

    const cancelForm = () => {
        setInitialValues({
            txtBill_No: "",
            txtGrossAmt: "",
            txtTotalAmt: "",
            txtV_Id: "",
            txtGST_Type: "",
            txtBill_Date: "",
            txtTotal: ""
        });
        setPurchaseId(0);
        resetForm();
        setShow(false);
    };

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Purchase Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                <div className="col-md-12 mb-2">
                                    <b>Vendor</b><span className="text-danger" > * {errors.txtV_Id}</span>
                                    <select name="txtV_Id" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtV_Id} >
                                        <option value="">Select Vendor</option>
                                        {vendors.map((vendor) => (
                                            <option key={vendor.V_Id} value={vendor.V_Id}>
                                                {vendor.Business_Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Bill No</b><span className='text-danger'> * {errors.txtBill_No}</span>
                                    <input type="text" name="txtBill_No" className="form-control" placeholder="Enter Bill No" onChange={handleChange} onBlur={handleBlur} value={values.txtBill_No} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Bill Date</b><span className='text-danger'> * {errors.txtBill_Date}</span>
                                    <input type="date" name="txtBill_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtBill_Date} />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <b>Gross</b><span className='text-danger'> * {errors.txtGrossAmt}</span>
                                    <div className="input-group">
                                        <input type="text" name="txtGrossAmt" className="form-control" placeholder="Enter Gross" onChange={handleChange} onBlur={handleBlur} value={values.txtGrossAmt} />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>GST</b><span className="text-danger"> * {errors.txtTotalAmt}</span>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtTotalAmt"
                                            className="form-control"
                                            placeholder="Enter GST"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtTotalAmt}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>GST Type</b><span className='text-danger'> * {errors.txtGST_Type}</span>
                                    <select name="txtGST_Type" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtGST_Type}  >
                                        <option value="">Select GST Type</option>
                                        <option value="CGST & SGST">CGST & SGST</option>
                                        <option value="IGST">IGST</option>
                                    </select>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Total</b>
                                    <span className="text-danger small" style={{ fontSize: "14px", marginLeft: "5px" }}> * {errors.txtTotal}</span>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtTotal"
                                            className="form-control"
                                            placeholder="Enter Total"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtTotal}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <button type="submit" disabled={loading} className="btn btn-lg" style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
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
