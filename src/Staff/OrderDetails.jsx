import React, { useState, useEffect } from "react";
import { getData, postData } from "../APIConfig/ConfigAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import CustPopup from "./CustPopup"; // Ensure this is correctly imported
import ProductInvoicePopup from "./ProductInvoicePopup"; // Ensure this is correctly imported
import { ToastContainer } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { orderValidationSchema } from "../Schema/paymentValidationSchema";
import { useNavigate } from "react-router-dom";


export default function OrderDetails() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [show, setShow] = useState(false);
    const [showInvoicePopup, setShowInvoicePopup] = useState(false); // Missing state added
    const [loading, setLoading] = useState(false);
    const [invoiceProducts, setInvoiceProducts] = useState([]);

    const [AdvanceAmount, setAdvanceAmount] = useState();
    const [PaymentMode, setPaymentMode] = useState();
    const [RefNo, setRefNo] = useState("");
    const [OrderDate, setOrderDate] = useState("");

    // Order Date State
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    const [initialValues, setInitialValues] = useState({
        txtC_Name: "",
        txtEmail: "",
        txtContactNo: "",
        txtGST_No: "",
    });
    const [paymentData, setPaymentData] = useState([]);

    const [paymentForm, setPaymentForm] = useState({
        amount: "",
        paymentMode: "",
        refNo: "",
        receiptDate: currentDate,
    });

    const handlePaymentSubmit = (values, { resetForm }) => {
        setPaymentData((prev) => [...prev, values]);

        Swal.fire({
            icon: "success",
            title: "Payment Saved",
            text: "Payment data has been successfully saved!",
            timer: 2000,
            showConfirmButton: false,
        });
        console.log(paymentData);
        resetForm();
    };

    useEffect(() => {
        getCustomer();
    }, []);

    // Fetch customers from API
    const getCustomer = async () => {
        try {
            const response = await getData("Customer/Get");
            if (response.Status === "OK") {
                setCustomers(response.Result);
            } else {
                console.error("Failed to fetch customers");
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    // Handle dropdown change
    const handleCustomerChange = (event) => {
        const customerId = event.target.value;
        const selected = customers.find((c) => c.C_Id.toString() === customerId);
        setSelectedCustomer(selected);
    };

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

    const handleQuantityChange = (productId, newQty) => {
        const qty = parseInt(newQty, 10) || 1;

        setInvoiceProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.LoadStock_Id === productId
                    ? {
                        ...product,
                        Quantity: qty > product.maxqty ? product.maxqty : qty, // Restrict to maxqty
                        Total: (qty > product.maxqty ? product.maxqty : qty) * product.Price,
                        Total_GST: (qty > product.maxqty ? product.maxqty : qty) * product.GST_perUnit,
                    }
                    : product
            )
        );
    };


    const Sava = async () => {
        const receiptData = {
            C_Id: document.getElementById("drpCustomer").value,
            Total_Gross: invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0).toFixed(2),
            GST: invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0).toFixed(2),
            Grand_Total: (invoiceProducts.reduce((acc, item) => acc + item.Price * item.Quantity, 0) + invoiceProducts.reduce((acc, item) => acc + item.Total_GST, 0)).toFixed(2),
            Rec_Date: currentDate,
            invoiceProducts: invoiceProducts,
            paymentData: paymentData,
            AdvanceAmount: AdvanceAmount,
            PaymentMode: PaymentMode,
            RefNo: RefNo,
            OrderDate: OrderDate
        };

        console.log("Submitting Data:", receiptData);


        try {
            let response = await postData("Ordermst/Add", receiptData);
            console.log(response.Result);

            if (response.Status == "OK") {
                const orderId = response.Result; // Get the Invoice ID from API response

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
                        navigate(`/print-OrderReceipt/${orderId}`); // Navigate to receipt page
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

    return (
        <div className="container mt-4 p-4 border rounded shadow">
            <h2 className="text-center">Order Details</h2>
            <hr />

            {/* Customer Dropdown & Add Button */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="customerDropdown" className="form-label">
                        Select Customer:
                    </label>
                    <select
                        id="drpCustomer"
                        className="form-select"
                        onChange={handleCustomerChange}
                    >
                        <option value="">-- Select Customer --</option>
                        {customers.map((customer) => (
                            <option key={customer.C_Id} value={customer.C_Id}>
                                {customer.Customer_Name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add Customer Button */}
                <div className="col-md-2 d-flex align-items-end">
                    <button
                        className="btn btn-success"
                        onClick={() => setShow(true)}
                        style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
                    >
                        <i className="fas fa-user-plus"></i>
                    </button>
                </div>

                {/* Date Input Field */}
                <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <div className="d-flex flex-column">
                        <b>Order Date</b>
                        <input
                            type="date"
                            className="form-control"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Product Button */}
            <div className="row mt-2">
                <div className="col-md-10"></div>
                <div className="col-md-2 d-flex justify-content-end">
                    <button
                        className="btn"
                        style={{
                            background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))",
                            color: "white",
                        }}
                        onClick={() => setShowInvoicePopup(true)} // Open Product Invoice Popup
                    >
                        <i className="fas fa-plus"></i> Product
                    </button>
                </div>
            </div>

            {/* Display Selected Customer Details */}
            {selectedCustomer && (
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
                            <tr>
                                <td>{selectedCustomer.Customer_Name}</td>
                                <td>{selectedCustomer.Email}</td>
                                <td>{selectedCustomer.ContactNo}</td>
                                <td>{selectedCustomer.GST_No}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <br />
            <hr />
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
                            <Column
                                header="Qty"
                                body={(rowData) => (
                                    <input
                                        type="number"
                                        value={rowData.Quantity}
                                        min="1"
                                        max={rowData.maxqty} // Prevent exceeding stock
                                        className="form-control text-center"
                                        style={{ width: "70px" }}
                                        onChange={(e) => handleQuantityChange(rowData.LoadStock_Id, e.target.value)}
                                    />
                                )}
                            />
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

            {invoiceProducts.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h4 className="text-center mb-3">Advance Payment</h4>
                        <div className="row mb-3">
                            {/* Amount Input */}
                            <div className="col-md-2">
                                <label className="form-label">Amount (₹)</label>
                                <input
                                    type="text"
                                    value={AdvanceAmount}
                                    onChange={(e) => setAdvanceAmount(e.target.value)}
                                    className="form-control"
                                    placeholder="00.00"
                                />
                            </div>

                            {/* Payment Mode Dropdown */}
                            <div className="col-md-2">
                                <label className="form-label">Payment Mode</label>
                                <select
                                    value={PaymentMode}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                    className="form-control"
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

                            {/* Ref No Input */}
                            <div className="col-md-2">
                                <label className="form-label">Ref No</label>
                                <input
                                    type="text"
                                    value={RefNo}
                                    onChange={(e) => setRefNo(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Ref No"
                                />
                            </div>

                            {/* Order Date Input */}
                            <div className="col-md-2">
                                <label className="form-label">Order Date</label>
                                <input
                                    type="date"
                                    value={OrderDate}
                                    onChange={(e) => setOrderDate(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" onClick={Sava} className="btn" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", "color": "white" }}>
                                    Generate Receipt
                                </button>
                            </div>
                        </div>
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
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData.map((pay, index) => (
                                    <tr key={index}>
                                        <td>₹{pay.amount}</td>
                                        <td>{pay.paymentMode}</td>
                                        <td>{pay.refNo}</td>
                                        <td>
                                            {new Date(pay.OrderDate)
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
            {/* Customer Popup Modal */}
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

            {/* Product Invoice Popup */}
            <ProductInvoicePopup
                invoiceProducts={invoiceProducts}
                show={showInvoicePopup}
                setShow={setShowInvoicePopup}
                setInvoiceProducts={setInvoiceProducts}
            />

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
