import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { postData, putData } from '../../APIConfig/ConfigAPI';
import ProductSchema from '../../Schema';
import { toast, ToastContainer } from 'react-toastify';

export default function ProductPopup({ setinitialValues, show, setShow, initialValues, loading, setLoading, ProductId, setProductId, getProduct }) {

    const { values, errors, setFieldValue, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: ProductSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            const ReqData = {
                P_Id: ProductId,
                Name: values.txtName,
                Weight: values.txtWeight,
                Unit: values.txtUnit,
                Price: values.txtPrice,
                Net_Qty: values.txtNet,
                FSSAI: values.txtFSSAI,
                Barcode: values.txtBarcode,
                Brand: values.txtBrand,
                HSN: values.txtHSN,
                GST: values.txtGST
            };

            try {

                let Response;

                if (ProductId == 0) {
                    Response = await postData("Add/Productmst", ReqData);
                }
                else {
                    Response = await putData("Update/Productmst", ReqData);
                }
                if (Response.Status === "OK") {
                    const toastId = toast.success("Saved Successfully", {
                        onClose: () => {
                            setProductId(0);
                            cancleForm();
                            setTimeout(() => {
                                setShow(false);
                            }, 1000);

                        }
                    });
                    getProduct();
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

    const onChangeHandler = (value) => {
        setFieldValue("txtUnit", value);
    }

    useEffect(() => {
        if (ProductId != 0) {
            document.getElementById("txtUnit").value = values.txtUnit;
        }

    }, [ProductId, values.txtUnit]);

    const cancleForm = () => {
        setinitialValues({
            txtName: "",
            txtWeight: "",
            txtUnit: "",
            txtPrice: "",
            txtNet: "",
            txtFSSAI: "",
            txtBarcode: "",
            txtBrand: "",
            txtHSN: "",
            txtGST: ""
        })
        setShow(false);
    }

    return (
        <>
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            <strong className="modal-title">Product Details</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <form className="row" method="post" onSubmit={handleSubmit}>
                                <div className="col-md-6 mb-2">
                                    <b>Brand</b><span className='text-danger'> * {errors.txtBrand}</span>
                                    <input type="text" name="txtBrand" className="form-control" placeholder="Enter Brand" onChange={handleChange} onBlur={handleBlur} value={values.txtBrand} />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <b>Name</b><span className='text-danger'> * {errors.txtName}</span>
                                    <input type="text" name="txtName" className="form-control" placeholder="Enter Product" onChange={handleChange} onBlur={handleBlur} value={values.txtName} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Weight</b><span className='text-danger'> * {errors.txtWeight}</span>
                                    <input type="text" name="txtWeight" className="form-control" placeholder="Enter Weight" onChange={handleChange} onBlur={handleBlur} value={values.txtWeight} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Unit</b><span className='text-danger'> * {errors.txtUnit}</span>
                                    <select value={values.txtUnit} onChange={(e) => onChangeHandler(e.target.value)} name="txtUnit" id='txtUnit' className="form-select" placeholder="Enter Unit">
                                        <option value="">Select Unit</option>
                                        <option value="Kg">Kg</option>
                                        <option value="grms">grms</option>
                                    </select>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Price</b>
                                    <span className="text-danger small" style={{ fontSize: "12px", marginLeft: "5px" }}>
                                        * {errors.txtPrice}
                                    </span>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="txtPrice"
                                            className="form-control"
                                            placeholder="Enter Price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.txtPrice}
                                        />
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </span>                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Quantity</b><span className='text-danger'> * {errors.txtNet}</span>
                                    <input type="text" name="txtNet" className="form-control" placeholder="Enter Net Quantity" onChange={handleChange} onBlur={handleBlur} value={values.txtNet} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>GST</b><span className='text-danger'> * {errors.txtGST}</span>
                                    <input type="text" name="txtGST" className="form-control" placeholder="Enter GST" onChange={handleChange} onBlur={handleBlur} value={values.txtGST} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>FSSAI</b><span className='text-danger'> * {errors.txtFSSAI}</span>
                                    <input type="text" name="txtFSSAI" className="form-control" placeholder="Enter FSSAI" onChange={handleChange} onBlur={handleBlur} value={values.txtFSSAI} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>Barcode</b><span className='text-danger'> * {errors.txtBarcode}</span>
                                    <input type="text" name="txtBarcode" id="txtBarcode" className="form-control" placeholder="Enter Barcode" onChange={handleChange} onBlur={handleBlur} value={values.txtBarcode} />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <b>HSN</b><span className='text-danger'> * {errors.txtHSN}</span>
                                    <input type="text" name="txtHSN" className="form-control" placeholder="Enter HSN" onChange={handleChange} onBlur={handleBlur} value={values.txtHSN} />
                                </div>

                                <div className="col-md-12">
                                    <button type="submit" disabled={loading ? true : false} className="btn btn-lg" style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                                    }}>{loading ? "Please Wait" : "Save"}</button>&nbsp;
                                    <button type="button" onClick={() => cancleForm()} className="btn btn-danger btn-lg" data-bs-dismiss="modal">Cancel</button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {show ? <div class="modal-backdrop show"></div> : null}
        </>
    )
}
