import React, { useState } from "react";
import { postData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderReport() {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchOrderReport = async () => {
        if (!startDate || !endDate) {
            toast.warn("⚠️ Please select both Start and End dates.");
            return;
        }

        setLoading(true);
        try {
            const ReqData = { start_date: startDate, end_date: endDate };
            const response = await postData("OrderProductReceipt", ReqData);

            if (response.Status === "OK") {
                setOrders(response.Result);
                toast.success("✅ Order report retrieved successfully!");
            } else {
                setOrders([]);
                toast.warning("⚠️ No orders found for the selected date range.");
            }
        } catch (error) {
            toast.error("❌ Error fetching order report.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        if (orders.length === 0) {
            toast.warning("⚠️ No data available to export!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Order Report");
        XLSX.writeFile(workbook, `Order_Report_${startDate}_to_${endDate}.xlsx`);

        toast.success("✅ Report exported to Excel!");
    };

    const exportToCSV = () => {
        if (orders.length === 0) {
            toast.warning("⚠️ No data available to export!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(orders);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Order_Report_${startDate}_to_${endDate}.csv`;
        link.click();

        toast.success("✅ Report exported to CSV!");
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow-lg" style={{ background: "#f8f9fa" }}>
            <h2 className="text-center text-uppercase fw-bold" style={{ color: "#005f5f" }}>
                📊 Order Report
            </h2>
            <hr />

            {/* Date Input Fields */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label fw-bold">Start Date:</label>
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">End Date:</label>
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button
                        className="btn btn-md w-100 fw-bold"
                        onClick={fetchOrderReport}
                        style={{ background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))", color: "white" }}
                    >
                        🔍 Search Orders
                    </button>
                </div>
                <div className="col-md-2 d-flex align-items-end gap-1">
                    <button
                        className="btn btn-success w-100 fw-bold"
                        onClick={exportToExcel}
                        disabled={orders.length === 0}
                    >
                        📥 Excel
                    </button>
                    <button
                        className="btn btn-primary w-100 fw-bold"
                        onClick={exportToCSV}
                        disabled={orders.length === 0}
                    >
                        📄 CSV
                    </button>
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && <p className="text-center text-primary fw-bold">🔄 Fetching orders...</p>}

            {/* Order Table */}
            {orders.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered mt-3 text-center align-middle shadow-sm">
                        <thead style={{ background: "linear-gradient(135deg, #005f5f,rgb(59, 117, 117))", color: "white" }}>
                            <tr>
                                <th>#</th>
                                <th>Order Product ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Total (₹)</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.OrderProduct_Id} style={{ background: index % 2 === 0 ? "#eef6f6" : "white" }}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td>{order.OrderProduct_Id}</td>
                                    <td>{order.ProductName}</td>
                                    <td>{order.Qty}</td>
                                    <td>₹{order.Price}</td>
                                    <td>₹{order.Qty * order.Price}</td>
                                    <td>{new Date(order.Order_Date).toLocaleDateString("en-GB")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && <p className="text-danger text-center fw-bold">⚠️ No Orders Found.</p>
            )}
        </div>
    );
}
