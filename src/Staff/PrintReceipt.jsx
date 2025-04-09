import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../APIConfig/ConfigAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const PrintReceipt = () => {
    const { invoiceId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await getData(`Receiptmst/receiptDetails/${invoiceId}`);
                if (response.Status === "OK") {
                    console.log(response.Result);
                    setInvoiceData(response.Result);
                } else {
                    console.error("Failed to fetch invoice data");
                }
            } catch (error) {
                console.error("Error fetching invoice:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [invoiceId]);

    useEffect(() => {
        if (invoiceData) {
            setTimeout(() => {
                window.print();
            }, 5000);
        }
    }, [invoiceData]);

    if (loading) {
        return <p>Loading receipt...</p>;
    }

    if (!invoiceData) {
        return <p>No receipt data available.</p>;
    }

    return (
        <>
            <div className="container mt-4 p-4 border rounded shadow">
                <h2 className="text-center">Receipt</h2>
                <hr />

                {/* Customer Details */}
                <h5>Customer Details</h5>
                <p><strong>Name:</strong> {invoiceData.Customer_Name}</p>
                <p><strong>Email:</strong> {invoiceData.Email}</p>
                <p><strong>Contact No:</strong> {invoiceData.ContactNo}</p>
                <p><strong>GST No:</strong> {invoiceData.GST_No || "N/A"}</p>

                {/* Invoice Details Table */}
                <table className="table table-bordered mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Rate (₹)</th>
                            <th>GST (%)</th>
                            <th>Total (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.InvoiceDetail.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Name}</td>
                                <td>{item.Qty}</td>
                                <td>₹{parseFloat(item.Rate).toFixed(2)}</td>
                                <td>{item.GST}%</td>
                                <td>₹{parseFloat(item.Total).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Grand Total & GST Type */}
                <div className="text-end fw-bold">
                    <p><strong>GST Type:</strong> {invoiceData.GST_Type}</p>
                    <p><strong>Grand Total:</strong> ₹{invoiceData.Grand_Total.toFixed(2)}</p>
                </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/Staff/Invoice")}
                >
                    Back to Invoice
                </button>
            </div>
        </>
    );
};

export default PrintReceipt;
