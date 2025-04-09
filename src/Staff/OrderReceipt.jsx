import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../APIConfig/ConfigAPI";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderReceipt() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await getData(`Ordermst/getOrderDetails/${orderId}`);
            if (response.Status === "OK" && response.Result) {
                setOrderDetails(response.Result);
            } else {
                console.error("Failed to fetch order details");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center">Loading order details...</p>;
    if (!orderDetails) return <p className="text-center text-danger">Order not found!</p>;

    const calculateFinalTotal = (item) => {
        const total = item?.Qty * item?.Price;
        const gst = (total * item?.GST) / 100;
        return total + gst;
    };

    const grandTotal = orderDetails?.details?.reduce((acc, item) => acc + calculateFinalTotal(item), 0) || 0;

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header text-white text-center" style={{
                    background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))"
                }}>
                    <h3 className="mb-0">Order Receipt</h3>
                </div>
                <div className="card-body">
                    {/* Company & Customer Info */}
                    <div className="row">
                        <div className="col-md-6">
                            <h5>From:</h5>
                            <strong>MA Logistics</strong>
                            <p>MA Business Street, Bharuch</p>
                            <p>Email: support@malogistics.com</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <h5>To:</h5>
                            <p><strong>{orderDetails?.details?.[0]?.Customer_Name || "Customer Name"}</strong></p>
                            <strong>Customer ID: {orderDetails.C_Id}</strong>
                            <p>Order Date: {new Date(orderDetails.Order_Date).toLocaleDateString()}</p>
                            <p>Reference No: {orderDetails.Ref_No}</p>
                        </div>
                    </div>

                    <hr />

                    {/* Order Table */}
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr className="text-center">
                                <th>#</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price (₹)</th>
                                <th>GST (%)</th>
                                <th>Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.details?.length > 0 ? (
                                orderDetails.details.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{index + 1}</td>
                                        <td>{`${item.Brand || ""} ${item.Name || ""}`}</td>
                                        <td>{item.Qty}</td>
                                        <td>{item.Price.toFixed(2)}</td>
                                        <td>{item.GST.toFixed(2)}</td>
                                        <td>{calculateFinalTotal(item).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-danger">No Products found in this order.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Footer Info */}
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h5>Payment Mode:</h5>
                            <p>{orderDetails.Payment_Mode || "N/A"}</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <h5>Advance Payment:</h5>
                            <p>₹{orderDetails.Advance_Payment?.toFixed(2) || "0.00"}</p>
                        </div>
                    </div>

                    {/* Grand Total */}
                    <div className="text-end mt-4">
                        <h4><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></h4>
                    </div>

                    <hr />

                    {/* Print Button */}
                    <div className="text-center no-print">
                        <button
                            className="btn"
                            onClick={() => window.print()}
                            style={{
                                background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))",
                                color: "white"
                            }}
                        >
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
