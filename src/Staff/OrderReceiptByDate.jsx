import React, { useState } from "react";
import { postData } from "../APIConfig/ConfigAPI";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderReceiptByDate() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [invoiceData, setInvoiceData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReceiptsByDate = async () => {
        if (!fromDate || !toDate) {
            toast.error("Please select both From and To dates!");
            return;
        }

        setLoading(true);
        try {
            const ReqData = { FromDate: fromDate, ToDate: toDate };
            const response = await postData("receipts", ReqData);

            if (response.Status === "OK") {
                toast.success("Receipts retrieved successfully!");
                setInvoiceData(response.Result);
            } else {
                setInvoiceData([]);
                toast.warning("No receipts found for the selected date range.");
            }
        } catch (error) {
            toast.error("Error fetching receipts. Please try again!");
            console.error("Error fetching receipts:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        if (invoiceData.length === 0) {
            toast.warning("⚠️ No data available to export!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(invoiceData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Order Report");
        XLSX.writeFile(workbook, `Order_Report_${fromDate}_to_${toDate}.xlsx`);

        toast.success("Excel exported successfully!");
    };

    const exportToCSV = () => {
        if (invoiceData.length === 0) {
            toast.warning("⚠️ No data available to export!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(invoiceData);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Order_Report_${fromDate}_to_${toDate}.csv`;
        link.click();

        toast.success("CSV exported successfully!");
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow-lg" style={{ background: "#f8f9fa" }}>
            <ToastContainer />
            <h2 className="text-center text-uppercase fw-bold" style={{ color: "#005f5f" }}>
                🧾 Order Report
            </h2>
            <hr />

            {/* Date Inputs */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="form-label fw-bold">From Date:</label>
                    <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-bold">To Date:</label>
                    <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                    <button
                        className="btn btn-md w-100 fw-bold"
                        onClick={fetchReceiptsByDate}
                        style={{ background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))", color: "white" }}
                    >
                        🔍 Search Receipts
                    </button>
                </div>

                {/* Export Buttons */}
                <div className="col-md-3 d-flex align-items-end gap-1">
                    <button className="btn btn-success fw-bold w-100" onClick={exportToExcel} disabled={invoiceData.length === 0}>
                        📥 Excel
                    </button>
                    <button className="btn btn-primary fw-bold w-100" onClick={exportToCSV} disabled={invoiceData.length === 0}>
                        📄 CSV
                    </button>
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && <p className="text-center text-primary fw-bold">Loading Receipts...</p>}

            {/* Receipt Table */}
            {invoiceData.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered mt-3 text-center align-middle shadow-sm">
                        <thead style={{ background: "linear-gradient(135deg, #005f5f,rgb(59, 117, 117))", color: "white" }}>
                            <tr>
                                <th>#</th>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Receipt Date</th>
                                <th>Total Amount (₹)</th>
                                <th>GST</th>
                                <th>GST Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.map((receipt, index) => (
                                <tr key={receipt.Invoice_Id} style={{ background: index % 2 === 0 ? "#eef6f6" : "white" }}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td>{receipt.Customer_Name || "N/A"}</td>
                                    <td>{receipt.Email || "N/A"}</td>
                                    <td>{receipt.ContactNo || "N/A"}</td>
                                    <td>{receipt.Rec_Date ? new Date(receipt.Rec_Date).toLocaleDateString() : "N/A"}</td>
                                    <td>₹{receipt.Total_Gross || "0.00"}</td>
                                    <td>{receipt.GST || "0%"}</td>
                                    <td>{receipt.GST_Type || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && <p className="text-danger text-center fw-bold">⚠️ No Receipts Found.</p>
            )}
        </div>
    );
}
