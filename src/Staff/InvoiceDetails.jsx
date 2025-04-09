import React, { useEffect, useState } from "react";
import { getData, postData } from "../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import CustPopup from "./CustPopup";
import ProductInvoicePopup from "./ProductInvoicePopup";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { paymentInvoiceValidationSchema } from "../Schema/paymentValidationSchema";

export default function InvoiceDetails() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const [showInvoicePopup, setShowInvoicePopup] = useState(false);

    const [initialValues, setInitialValues] = useState({
        txtC_Name: "",
        txtEmail: "",
        txtContactNo: "",
        txtGST_No: "",
    });

    // Payment form state
    const [payment, setPayment] = useState({
        recNo: "",
        cId: "",
        totalGross: 0,
        gstAmount: 0,
        gstType: "",
        grandTotal: 0,
        recDate: "",
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rate, setRate] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [maxqty, setMaxQty] = useState(0);
    const [gstPerUnit, setGstPerUnit] = useState(0);
    const [gstTotal, setGstTotal] = useState(0);

    useEffect(() => {
        getCustomer();
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setCurrentDate(formattedDate);
        setPayment((prev) => ({ ...prev, recDate: formattedDate }));
    }, []);

    const getCustomer = async () => {
        try {
            const response = await getData("Customer/Get");
            if (response.Status === "OK") {
                setCustomers(response.Result);
            } else {
                console.error("Failed to Fetch Customers");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCustomerChange = (event) => {
        const customerId = parseInt(event.target.value, 10);
        const selected = customers.find((c) => c.C_Id === customerId);
        setSelectedCustomer(selected);
        // Also update payment cId if needed
        setPayment((prev) => ({ ...prev, cId: selected ? selected.C_Id : "" }));
    };

    // Custom body template for the Quantity column in the DataTable
    const quantityBodyTemplate = (rowData) => {
        return (
            <input
                type="number"
                className="form-control text-center"
                value={rowData.Quantity}
                min="1"
                max={rowData.maxqty}
                onChange={(e) =>
                    handleInvoiceProductQuantityChange(rowData, e.target.value)
                }
                style={{ width: "70px" }}
            />
        );
    };

    const handleInvoiceProductQuantityChange = (invoiceItem, newQty) => {
        let qty = parseInt(newQty, 10) || 1;

        if (qty < 1) {
            Swal.fire({
                icon: "error",
                title: "Invalid Quantity",
                text: "Quantity must be at least 1.",
            });
            qty = 1;
        }

        // Enforce max quantity if defined
        if (invoiceItem.maxqty && qty > invoiceItem.maxqty) {
            Swal.fire({
                icon: "error",
                title: "Quantity Limit Exceeded",
                text: `Quantity can't exceed ${invoiceItem.maxqty}.`,
            });
            qty = invoiceItem.maxqty;
        }

        setInvoiceProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item.LoadStock_Id === invoiceItem.LoadStock_Id) {
                    const updatedTotal = item.Price * qty;
                    const updatedGSTTotal = item.GST_perUnit * qty;
                    const updatedRate = (item.Price - item.GST_perUnit).toFixed(2);
                    return {
                        ...item,
                        Quantity: qty,
                        Total: updatedTotal,
                        Total_GST: updatedGSTTotal,
                        Rate: updatedRate
                    };
                }
                return item;
            })
        );
    };

    // Delete facility: remove the invoice product from the state
    const handleDeleteInvoiceProduct = (invoiceItem) => {
        setInvoiceProducts((prevProducts) =>
            prevProducts.filter((item) => item.LoadStock_Id !== invoiceItem.LoadStock_Id)
        );
        Swal.fire({
            icon: "success",
            title: "Product Removed",
            text: `"${invoiceItem.Name}" has been removed from the invoice.`,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // handleSave in the popup (update existing record if exists)
    const handleSave = () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }
        if (quantity < 1) {
            toast.error("Quantity must be at least 1.");
            return;
        }
        if (quantity > maxqty) {
            toast.error(`Quantity can't exceed ${maxqty}.`);
            return;
        }

        const existingIndex = invoiceProducts.findIndex(
            (item) => item.LoadStock_Id === selectedProduct.LoadStock_Id
        );

        if (existingIndex !== -1) {
            // Update existing record
            const existingItem = invoiceProducts[existingIndex];
            let newQty = existingItem.Quantity + quantity;
            if (newQty > maxqty) {
                toast.error(`Total quantity cannot exceed ${maxqty}.`);
                newQty = maxqty;
            }
            const updatedTotal = rate * newQty;
            const updatedGSTTotal = gstPerUnit * newQty;
            const updatedItem = {
                ...existingItem,
                Quantity: newQty,
                Total: updatedTotal,
                Total_GST: updatedGSTTotal,
            };
            setInvoiceProducts((prev) =>
                prev.map((item, idx) => (idx === existingIndex ? updatedItem : item))
            );
            toast.success(`"${selectedProduct.Name}" Updated in Invoice!`, {
                onClose: () => setShow(false),
            });
        } else {
            // Add new product
            const newInvoiceItem = {
                LoadStock_Id: selectedProduct.LoadStock_Id,
                Brand: selectedProduct.Brand,
                Name: selectedProduct.Name,
                MFG_Date: selectedProduct.MFG_Date,
                Exp_Date: selectedProduct.Exp_Date,
                GST: selectedProduct.GST,
                Price: rate,
                Quantity: quantity,
                Total: total,
                GST_perUnit: gstPerUnit,
                Total_GST: gstTotal,
                maxqty: maxqty,
            };
            setInvoiceProducts((prev) => [...prev, newInvoiceItem]);
            toast.success(`"${selectedProduct.Name}" added! Total: ₹${total}`, {
                onClose: () => setShow(false),
            });
        }
        // Reset popup state
        setSelectedProduct(null);
        setRate(0);
        setQuantity(1);
        setTotal(0);
        setMaxQty(0);
        setGstPerUnit(0);
        setGstTotal(0);
    };

    const sendEmail = async (customerEmail, receiptData) => {
        try {
            let emailResponse = await postData("Receiptmst/SendEmail", {
                email: customerEmail,
                receipt: receiptData,
            });

            if (emailResponse.Status === "OK") {
                Swal.fire({
                    title: "Email Sent!",
                    text: "The receipt has been emailed to the customer.",
                    icon: "success",
                    confirmButtonColor: "#008080",
                });
            } else {
                Swal.fire({
                    title: "Email Failed!",
                    text: "Could not send the email.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (error) {
            console.error("Email Error:", error);
        }
    };

    const Sava = async () => {
       const Trip_Id =  localStorage.getItem("TripId");
        const receiptData = {
            C_Id: document.getElementById("drpCustomer").value,
            GST_Type: document.getElementById("txtGST_Type").value,
            Total_Gross: invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0).toFixed(2),
            GST: invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0).toFixed(2),
            Grand_Total: (invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0) + invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0)).toFixed(2),
            Rec_Date: currentDate,
            invoiceProducts: invoiceProducts,
            paymentData: paymentData,
            Trip_Id : Trip_Id
        };

        console.log("Submitting Data:", receiptData);

        try {
            let response = await postData("Receiptmst/Add", receiptData);
            console.log(response.Result);

            if (response.Status == "OK") {
                const invoiceId = response.Result; // Get the Invoice ID from API response

                Swal.fire({
                    title: "Receipt Generated!",
                    text: "The receipt has been saved successfully.",
                    icon: "success",
                    confirmButtonColor: "#008080",
                    showCancelButton: true,
                    cancelButtonText: "Close",
                    confirmButtonText: "View & Print",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/print-receipt/${invoiceId}`);
                    }
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while saving.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                console.log("Response:", response.data);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Failed!",
                text: "An error occurred while saving the receipt.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };


    const [paymentForm, setPaymentForm] = useState({
        amount: "",
        paymentMode: "",
        refNo: "",
        receiptDate: currentDate,
    });
    const [paymentData, setPaymentData] = useState([]);


    const handlePaymentSubmit = (values, { resetForm }) => {
        setPaymentData((prev) => [...prev, values]);

        Swal.fire({
            icon: "success",
            title: "Payment Saved",
            text: "Payment data has been successfully saved!",
            timer: 2000,
            showConfirmButton: false,
        });

        resetForm();
    };

    const testJSON = () => {
        const receiptData = {
            "C_Id": document.getElementById("drpCustomer").value,
            "GST_Type": document.getElementById("txtGST_Type").value,
            "Total_Gross": invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0).toFixed(2),
            "GST": invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0).toFixed(2),
            "Grand_Total": invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0) + invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0).toFixed(2),
            "Rec_Date": currentDate,
            "invoiceProducts": invoiceProducts,
            "paymentData": paymentData
        };

        console.log(receiptData);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h4 className="text-center mb-3">Invoice Details</h4>

                {/* Customer Selection with Add Button */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <b>Select Customer</b>
                        <span className="text-danger"> * </span>
                        <select id="drpCustomer" className="form-select" onChange={handleCustomerChange}>
                            <option value="">-- Choose Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer.C_Id} value={customer.C_Id}>
                                    {customer.Customer_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            className="btn btn-success"
                            onClick={() => setShow(true)}
                            style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
                        >
                            <i className="fas fa-user-plus"></i>
                        </button>
                    </div>
                    <div className="col-md-4"></div>
                    {/* Date Input Field */}
                    <div className="col-md-2 text-end">
                        <b>Date</b>
                        <input
                            type="date"
                            className="form-control"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-10"></div>
                    <div className="col-md-2 d-flex justify-content-end">
                        {/* Button to open the Product Invoice Popup */}
                        <button
                            className="btn"
                            style={{
                                background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))",
                                color: "white",
                            }}
                            onClick={() => setShowInvoicePopup(true)}
                        >
                            <i className="fas fa-plus"></i> Product
                        </button>
                    </div>
                </div>
                {/* Customer Details Table */}
                <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>GST No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer && (
                                <tr>
                                    <td>{selectedCustomer.Customer_Name}</td>
                                    <td>{selectedCustomer.Email}</td>
                                    <td>{selectedCustomer.ContactNo}</td>
                                    <td>{selectedCustomer.GST_No}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <br />
                <hr />
                {/* Invoice Products Table */}
                <div className="col-md-12">
                    {invoiceProducts.length > 0 && (
                        <>
                            <DataTable value={invoiceProducts} className="p-datatable-striped mt-3">
                                {/* Sr No. Column */}
                                <Column
                                    header="No."
                                    body={(rowData, options) => options.rowIndex + 1}
                                    style={{ width: "70px" }}
                                />
                                {/* Merged Product Column */}
                                <Column
                                    header="Product"
                                    body={(rowData) => `${rowData.Brand} ${rowData.Name}`}
                                />
                                <Column
                                    field="MFG_Date"
                                    header="MFG Date"
                                    body={(rowData) =>
                                        new Date(rowData.MFG_Date).toLocaleDateString("en-GB", {
                                            month: "short",
                                            year: "numeric",
                                        })
                                    }
                                ></Column>
                                <Column
                                    field="Exp_Date"
                                    header="Exp Date"
                                    body={(rowData) =>
                                        new Date(rowData.Exp_Date).toLocaleDateString("en-GB", {
                                            month: "short",
                                            year: "numeric",
                                        })
                                    }
                                ></Column>
                                <Column field="GST" header="GST %"></Column>
                                <Column
                                    field="GST_perUnit"
                                    header="GST per Unit (₹)"
                                    body={(rowData) => Number(rowData.GST_perUnit).toFixed(2)}
                                ></Column>
                                <Column
                                    header="Net Rate"
                                    body={(rowData) =>
                                        Number(rowData.Price - rowData.GST_perUnit).toFixed(2)
                                    }
                                ></Column>
                                <Column field="Price" header="Amount (₹)"></Column>
                                <Column field="Quantity" header="Qty" body={quantityBodyTemplate}></Column>
                                <Column field="Total" header="Total (₹)"></Column>
                                {/* Delete Button Column */}
                                <Column
                                    header=""
                                    body={(rowData) => (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteInvoiceProduct(rowData)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    )}
                                ></Column>
                            </DataTable>
                            {/* Summary Totals aligned to the right */}
                            <div className="row mt-3">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Gross Total (₹)</th>
                                                <td>
                                                    {invoiceProducts
                                                        .reduce((acc, item) => acc + item.Price * item.Quantity, 0)
                                                        .toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>GST Total (₹)</th>
                                                <td>
                                                    {invoiceProducts
                                                        .reduce((acc, item) => acc + item.Total_GST, 0)
                                                        .toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Total Amount (₹)</th>
                                                <td>
                                                    {(
                                                        invoiceProducts.reduce(
                                                            (acc, item) => acc + item.Price * item.Quantity,
                                                            0
                                                        ) +
                                                        invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0)
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* Payment Form */}
                {invoiceProducts.length > 0 && (
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <h4 className="text-center mb-3">Payment</h4>
                            <Formik
                                initialValues={{
                                    amount: "",
                                    paymentMode: "",
                                    refNo: "",
                                    receiptDate: ""
                                }}
                                validationSchema={paymentInvoiceValidationSchema}
                                onSubmit={handlePaymentSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="row mb-3">
                                            <div className="col-md-2">
                                                <label className="form-label">Amount (₹)</label>
                                                <ErrorMessage name="amount" component="span" className="text-danger" />
                                                <Field type="text" name="amount" className="form-control" placeholder="00.00" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Payment Mode</label>
                                                <ErrorMessage name="paymentMode" component="span" className="text-danger" />
                                                <Field as="select" name="paymentMode" className="form-control">
                                                    <option value="">Select Payment Mode</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Credit Card">Credit Card</option>
                                                    <option value="Debit Card">Debit Card</option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="Net Banking">Net Banking</option>
                                                    <option value="Cheque">Cheque</option>
                                                </Field>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Ref No</label>
                                                <ErrorMessage name="refNo" component="span" className="text-danger" />
                                                <Field type="text" name="refNo" className="form-control" placeholder="Enter Ref No" />
                                            </div>

                                            <div className="col-md-2">
                                                <label className="form-label">Receipt Date</label>
                                                <ErrorMessage name="receiptDate" component="span" className="text-danger" />
                                                <Field type="date" name="receiptDate" className="form-control" defaultValue={new Date().toISOString().split("T")[0]} />
                                            </div>
                                            <div className="col-md-2 d-flex align-items-end">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", color: "white" }}
                                                    disabled={isSubmitting}
                                                >
                                                    Payment
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}


                {paymentData.length > 0 && (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h5>Stored Payment Data</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Amount (₹)</th>
                                        <th>Payment Mode</th>
                                        <th>Ref No</th>
                                        <th>Reciept Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentData.map((pay, index) => (
                                        <tr key={index}>
                                            <td>₹{pay.amount}</td>
                                            <td>{pay.paymentMode}</td>
                                            <td>{pay.refNo}</td>
                                            <td>
                                                {new Date(pay.receiptDate)
                                                    .toLocaleDateString('en-GB')
                                                    .replace(/\//g, '-')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="col-md-3 mb-2">
                    <label className="form-label">GST Type</label><span className='text-danger'> *</span>
                    <select id="txtGST_Type" name="txtGST_Type" className="form-control" >
                        <option value="">Select GST Type</option>
                        <option value="CGST & SGST">CGST & SGST</option>
                        <option value="IGST">IGST</option>
                    </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" onClick={Sava} className="btn" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", "color": "white" }}>
                        Generate Receipt
                    </button>
                </div>
            </div>

            <CustPopup
                show={show}
                setShow={setShow}
                CustId={0} // Always insert a new customer
                setCustId={() => { }} // No updates needed
                loading={loading}
                setLoading={setLoading}
                getCustomer={getCustomer} // Refresh list after adding
                initialValues={initialValues}
                setInitialValues={setInitialValues}
            />

            <ProductInvoicePopup
                invoiceProducts={invoiceProducts}
                show={showInvoicePopup}
                setShow={setShowInvoicePopup}
                setInvoiceProducts={setInvoiceProducts}
            />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
