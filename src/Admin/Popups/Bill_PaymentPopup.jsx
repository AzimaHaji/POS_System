import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { postData } from "../../APIConfig/ConfigAPI";
import Bill_PaymentSchema from "../../Schema/Bill_PaymentSchema";

export default function Bill_PaymentPopup({ show, setShow, initialValues, setInitialValues, getBill, B_Id, setB_Id, setPurchase_Id, Purchase_Id, loading, setLoading }) {

    const [isCash, setIsCash] = useState(initialValues.txtPayment_Mode === "Cash");
    const [duesAmt, setDuesAmt] = useState(initialValues.txtAmount);
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: Bill_PaymentSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            const ReqData = {
                Purchase_Id: Purchase_Id,
                Amount: values.txtAmount,
                Payment_Mode: values.txtPayment_Mode,
                Ref_No: values.txtRef_No,
                Payment_Date: values.txtPayment_Date
            };
            console.log(ReqData);
            try {

                if (values.txtAmount >= initialValues.txtAmount) {
                    toast.error(`Amount Can't be Greater than ₹${initialValues.txtAmount}`);
                }
                else {
                    let Response;
                    Response = await postData("Bill_Payment/Add", ReqData);
                    console.log(Response.Result);
                    if (Response.Status === "OK") {
                        toast.success("Bill Payment Saved Successfully..!", {
                            onClose: () => {
                                getBill();
                                resetForm();
                                setShow(false);
                            }
                        });
                    } else {
                        toast.error("Something Went Wrong");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Error Saving Bill Payment");
            } finally {
                setLoading(false);
            }
        }
    });

    const handlePaymentModeChange = (e) => {
        handleChange(e);
        setIsCash(e.target.value === "Cash");
    };

    const cancelForm = () => {
        setInitialValues({
            txtBill_No: "",
            txtAmount: "",
            txtPayment_Mode: "",
            txtRef_No: "",
            txtPayment_Date: ""
        });
        setB_Id(0);
        resetForm();
        setShow(false);
    };

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                            <strong className="modal-title">Bill Payment</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                {/* Amount with Rupee Icon */}
                                <div className="col-md-6 mb-2">
                                    <b>Amount</b>
                                    <span className="text-danger small"> * {touched.txtAmount && errors.txtAmount}</span>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtAmount"
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtAmount}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>
                                    </div>
                                </div>

                                {/* Payment Mode Dropdown */}
                                <div className="col-md-6 mb-2">
                                    <b>Payment Mode</b>
                                    <span className="text-danger"> * {touched.txtPayment_Mode && errors.txtPayment_Mode}</span>
                                    <select
                                        name="txtPayment_Mode"
                                        className="form-control"
                                        onChange={handlePaymentModeChange} // ✅ Use custom function
                                        onBlur={handleBlur}
                                        value={values.txtPayment_Mode}
                                    >
                                        <option value="">Select Payment Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Net Banking">Net Banking</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>

                                {/* Ref No - Hidden When "Cash" is Selected */}
                                {!isCash && (
                                    <div className="col-md-6 mb-2">
                                        <b>Ref No</b>
                                        <span className="text-danger"> * {touched.txtRef_No && errors.txtRef_No}</span>
                                        <input
                                            type="text"
                                            name="txtRef_No"
                                            className="form-control"
                                            placeholder="Enter Ref No"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtRef_No}
                                        />
                                    </div>
                                )}

                                {/* Payment Date */}
                                <div className="col-md-6 mb-2">
                                    <b>Payment Date</b>
                                    <span className="text-danger"> * {touched.txtPayment_Date && errors.txtPayment_Date}</span>
                                    <input
                                        type="date"
                                        name="txtPayment_Date"
                                        className="form-control"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.txtPayment_Date}
                                    />
                                </div>

                                {/* Save & Cancel Buttons */}
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-lg"
                                        style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                                        Save
                                    </button>&nbsp;
                                    <button type="reset" onClick={cancelForm} className="btn btn-danger btn-lg">
                                        Cancel
                                    </button>
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
