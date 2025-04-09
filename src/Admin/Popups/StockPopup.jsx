import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getData, postData, putData } from '../../APIConfig/ConfigAPI';
import StockSchema from '../../Schema/StockSchema';
import { useFormik } from 'formik';

export default function StockPopup({ show, setShow, initialValues, setInitialValues, setLoading, loading, setStockId, StockId, getStock }) {
    const [Product, setProduct] = useState([]);
    const [Purchase, setPurchase] = useState([]);

    const FetchProduct = async () => {
        try {

            const response = await getData("Get/Productmst");
            if (response.Status == "OK") {
                setProduct(response.Result);
            } else {
                console.error("Failed to Fetch Product");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const FetchPurchase = async () => {
        try {

            const response = await getData("Vendors/GetPurVen");
            if (response.Status == "OK") {
                setPurchase(response.Result);
            } else {
                console.error("Failed to Fetch Purchase");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        FetchProduct();
        FetchPurchase();
    }, []);


    const cancelForm = () => {
        setInitialValues({
            txtP_Id: "",
            txtMFG_Date: "",
            txtExp_Date: "",
            txtNo_Of_Stock: "",
            txtCost_Price: "",
            txtInword_Date: ""
        });
        setStockId(0);
        resetForm();
        setShow(false);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues || {
            txtP_Id: "",
            txtMFG_Date: "",
            txtExp_Date: "",
            txtNo_Of_Stock: "",
            txtCost_Price: "",
            txtInword_Date: ""
        },
        validationSchema: StockSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);

            const formattedInword_Date = formatDate(values.txtInword_Date);

            const ReqData = {
                Stock_Id: StockId,
                P_Id: values.txtP_Id,
                Purchase_Id: values.txtPurchase_Id,
                MFG_Date: values.txtMFG_Date,
                Exp_Date: values.txtExp_Date,
                No_Of_Stock: values.txtNo_Of_Stock,
                Cost_Price: values.txtCost_Price,
                Inword_Date: formattedInword_Date
            };

            console.log("Submitting Data:", ReqData);

            try {
                let response;

                if (StockId == 0) {
                    response = await postData("Stock/Add", ReqData);
                } else {
                    response = await putData("Stock/Update", ReqData);
                }
                if (response.Status == "OK") {
                    toast.success("Saved Successfully", {
                        onClose: () => {
                            getStock();
                            setStockId(0);
                            cancelForm();
                            setShow(false);
                        }
                    });
                } else {
                    toast.error("Something Went Wrong");
                    console.log("Response:", response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });
    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Stock</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Product</b><span className="text-danger"> * {errors.txtP_Id}</span>
                                    <select name="txtP_Id" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtP_Id} >
                                        <option value="">Select Product</option>
                                        {Product.map((Product) => (
                                            <option key={Product.P_Id} value={Product.P_Id}>
                                                {Product.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Vendor</b><span className="text-danger"> * {errors.txtPurchase_Id}</span>
                                    <select name="txtPurchase_Id" className="form-select" onChange={handleChange} onBlur={handleBlur} value={values.txtPurchase_Id} >
                                        <option value="">Select Vendor</option>
                                        {Purchase.map((Purchase) => (
                                            <option key={Purchase.Purchase_Id} value={Purchase.Purchase_Id}>
                                               {Purchase.Bill_No} &nbsp; {Purchase.Business_Name} &nbsp; {new Date(Purchase.Bill_Date).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>MFG Date</b><span className='text-danger'> * {errors.txtMFG_Date}</span>
                                    <input type="date" name="txtMFG_Date" className="form-control" placeholder="Enter MFG_Date" onChange={handleChange} onBlur={handleBlur} value={values.txtMFG_Date} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Exp Date</b><span className='text-danger'> * {errors.txtExp_Date}</span>
                                    <input type="date" name="txtExp_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtExp_Date} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Inword Date</b><span className='text-danger'> * {errors.txtInword_Date}</span>
                                    <input type="date" name="txtInword_Date" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtInword_Date} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>No Of Stock</b><span className='text-danger'> * {errors.txtNo_Of_Stock}</span>
                                    <input type="text" name="txtNo_Of_Stock" className="form-control" placeholder="Enter No Of Stock" onChange={handleChange} onBlur={handleBlur} value={values.txtNo_Of_Stock} />
                                </div>
                                <div className="col-md-4 mb-2">
                                    <b>Price</b><span className="text-danger small"> * {errors.txtCost_Price}</span>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtCost_Price"
                                            className="form-control"
                                            placeholder="Enter Price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtCost_Price}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <b>Total Price</b>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtTotalPrice"
                                            className="form-control"
                                            placeholder="0000"
                                            value={values.txtNo_Of_Stock && values.txtCost_Price ?
                                                values.txtNo_Of_Stock * values.txtCost_Price : ""}
                                            readOnly
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
    )
}
