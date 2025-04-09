import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useFormik } from 'formik';
import ProductSchema from '../Schema';
import { getData, postData } from '../APIConfig/ConfigAPI';
import { toast, ToastContainer } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { date } from 'yup';


export default function Home() {
    const [Product, setProduct] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [ProductId , setProductId] = useState(0);

    const initialValues = {
        txtName: "",
        txtWeight: "",
        txtUnit: "",
        txtPrice: "",
        txtFSSAI: "",
        txtBarcode: "",
        txtBrand: "",
        txtHSN: "",
        txtGST: ""
    };

    const { values, errors, resetForm, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ProductSchema,
        onSubmit: async (values, { resetForm }) => {
            const ReqData = {
                P_Id : ProductId,
                Name: values.txtName,
                Weight: values.txtWeight,
                Unit: values.txtUnit,
                Price: values.txtPrice,
                FSSAI: values.txtFSSAI,
                Barcode: values.txtBarcode,
                Brand: values.txtBrand,
                HSN: values.txtHSN,
                GST: values.txtGST
            };
            try {
                const Response = await postData("AddProductmst", ReqData);

                if (Response.Status === "OK") {
                    toast.success("Saved Successfully");
                    resetForm();
                }
                else {
                    toast.error("Something Went Wrong");
                }
            }
            catch (error) {
                console.error("Error", error);
            }
            console.log(ReqData);
        }

    });

    const getProduct = async () => {
        try {
            const Response = await getData("GetProductmst");
            setProduct(Response.Result);
            setShowTable(true);
        }
        catch (error) {
            console.error("Error", error);
        }
    }

    const deleteProduct = async (Id) => {
        if(window.confirm("Are You Sure Want To Delete..!!"))
        {
            try
            {
                const Response = await deleteData("DeleteProductmst" + Id);
                if(Response.Status == "OK"){
                    toast.success("sccessfully Deleted");
                    getProduct();
                }
            }
            catch(error){
                console.error("Error", error);
            }
        }
    }
    return (
        <>

            <ToastContainer />
            <div className="container mt-3">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryModal">
                    Open Form
                </button>&nbsp;&nbsp;

                <div className="modal fade" id="categoryModal">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Products</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <b>Name</b><span className='text-danger'> * {errors.txtName}</span>
                                            <input type="text" name="txtName" className="form-control" placeholder="Enter Product" onChange={handleChange} onBlur={handleBlur} value={values.txtName} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>Weight</b><span className='text-danger'> * {errors.txtWeight}</span>
                                            <input type="text" name="txtWeight" className="form-control" placeholder="Enter Weight" onChange={handleChange} onBlur={handleBlur} value={values.txtWeight} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>Unit</b><span className='text-danger'> * {errors.txtUnit}</span>
                                            <input type="text" name="txtUnit" className="form-control" placeholder="Enter Unit" onChange={handleChange} onBlur={handleBlur} value={values.txtUnit} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>Price</b><span className='text-danger'> * {errors.txtPrice}</span>
                                            <input type="text" name="txtPrice" className="form-control" placeholder="Enter Price" onChange={handleChange} onBlur={handleBlur} value={values.txtPrice} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>FSSAI</b><span className='text-danger'> * {errors.txtFSSAI}</span>
                                            <input type="text" name="txtFSSAI" className="form-control" placeholder="Enter FSSAI" onChange={handleChange} onBlur={handleBlur} value={values.txtFSSAI} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>Barcode</b><span className='text-danger'> * {errors.txtBarcode}</span>
                                            <input type="text" name="txtBarcode" className="form-control" placeholder="Enter Barcode" onChange={handleChange} onBlur={handleBlur} values={values.txtBarcode} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>Brand</b><span className='text-danger'> * {errors.txtBrand}</span>
                                            <input type="text" name="txtBrand" className="form-control" placeholder="Enter Brand" onChange={handleChange} onBlur={handleBlur} value={values.txtBrand} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>HSN</b><span className='text-danger'> * {errors.txtHSN}</span>
                                            <input type="text" name="txtHSN" className="form-control" placeholder="Enter HSN" onChange={handleChange} onBlur={handleBlur} value={values.txtHSN} />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <b>GST</b><span className='text-danger'> * {errors.txtGST}</span>
                                            <input type="text" name="txtGST" className="form-control" placeholder="Enter GST" onChange={handleChange} onBlur={handleBlur} value={values.txtGST} />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        <button className="btn btn-success" onClick={getProduct} data-bs-toggle="modal" data-bs-target="#productTableModal">
                                            Show Products
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal fade" id="productTableModal">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Product List</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: "none", overflow: "visible" }}>
                                <DataTable value={Product} paginator rows={5} tableStyle={{ minWidth: '100%' }}>
                                    <Column field="Name" sortable header="Name"></Column>
                                    <Column field="Weight" sortable header="Weight"></Column>
                                    <Column field="Unit" sortable header="Unit"></Column>
                                    <Column field="Price" sortable header="Price"></Column>
                                    <Column field="FSSAI" header="FSSAI"></Column>
                                    <Column field="Barcode" header="Barcode"></Column>
                                    <Column field="Brand" header="Brand"></Column>
                                    <Column field="HSN" header="HSN"></Column>
                                    <Column field="GST" header="GST"></Column>
                                    <Column body={() => (
                                        <button className="btn btn-danger btn-sm">
                                            <i className="fas fa-trash" onClick={(data) => deleteProduct(data.ProductId)}></i>
                                        </button>
                                    )} />

                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
