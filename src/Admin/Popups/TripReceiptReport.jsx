import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getData } from "../../APIConfig/ConfigAPI";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TripReceiptReport({ TripId }) {
    const [receiptData, setReceiptData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTripReceiptReport();
    }, [TripId]);

    const fetchTripReceiptReport = async () => {
        setLoading(true);
        try {
            const tripId = TripId || localStorage.getItem("TripId"); 
            if (!tripId) {
                console.error("Trip ID is missing.");
                setLoading(false);
                return;
            }

            const response = await getData(`Trip_mst/trip-receipts/${tripId}`);
            if (response.Status === "OK") {
                setReceiptData(response.Result);
            } else {
                console.error("No data available.");
            }
        } catch (error) {
            console.error("Error fetching trip receipt report:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    // 📤 Export to Excel
    const exportToExcel = () => {
        const headers = [
            ["Trip Receipt Report"],
            ["#", "Invoice ID", "Trip ID", "Customer Name", "Email", "Contact No", "GST No", "Total Gross (₹)", "GST (%)", "GST Type", "Grand Total (₹)", "Receipt Date"]
        ];

        const rows = receiptData.map((receipt, index) => [
            index + 1,
            receipt.Invoice_Id,
            receipt.Trip_Id,
            receipt.Customer_Name,
            receipt.Email,
            receipt.ContactNo,
            receipt.GST_No,
            receipt.Total_Gross.toFixed(2),
            `${receipt.GST}%`,
            receipt.GST_Type,
            receipt.Grand_Total.toFixed(2),
            formatDate(receipt.Rec_Date)
        ]);

        const sheetData = [...headers, ...rows];

        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Trip Receipts");

        const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        saveAs(blob, "Trip_Receipt_Report.xlsx");
    };

    // 📄 Export to CSV
    const exportToCSV = () => {
        const headers = [
            ["Trip Receipt Report"],
            ["#", "Invoice ID", "Trip ID", "Customer Name", "Email", "Contact No", "GST No", "Total Gross (₹)", "GST (%)", "GST Type", "Grand Total (₹)", "Receipt Date"]
        ];

        const rows = receiptData.map((receipt, index) => [
            index + 1,
            receipt.Invoice_Id,
            receipt.Trip_Id,
            receipt.Customer_Name,
            receipt.Email,
            receipt.ContactNo,
            receipt.GST_No,
            receipt.Total_Gross.toFixed(2),
            `${receipt.GST}%`,
            receipt.GST_Type,
            receipt.Grand_Total.toFixed(2),
            formatDate(receipt.Rec_Date)
        ]);

        const csvData = [...headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(csvData);
        const csv = XLSX.utils.sheet_to_csv(ws);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "Trip_Receipt_Report.csv");
    };

    return (
        <div className="container p-4 border rounded shadow-lg" style={{ background: "#f8f9fa" }}>
            <h2 className="text-center text-uppercase fw-bold" style={{ color: "#005f5f" }}>
                🧾 Trip Receipt Report
            </h2>
            <hr />

            {loading && <p className="text-center text-primary fw-bold">Loading Report...</p>}

            {receiptData.length > 0 ? (
                <>
                    {/* 🔹 Export Buttons */}
                    <div className="d-flex gap-2 justify-content-end mb-3">
                        <button className="btn btn-success" onClick={exportToExcel}>
                            📥 Export to Excel
                        </button>
                        <button className="btn btn-primary" onClick={exportToCSV}>
                            📄 Export to CSV
                        </button>
                    </div>

                    {/* 🔹 Report Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered mt-3 text-center align-middle shadow-sm">
                            <thead style={{
                                background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))",
                                color: "white",
                                textAlign: "center"
                            }}>
                                <tr>
                                    <th>#</th>
                                    <th>Invoice ID</th>
                                    <th>Trip ID</th>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>GST No</th>
                                    <th>Total Gross (₹)</th>
                                    <th>GST (%)</th>
                                    <th>GST Type</th>
                                    <th>Grand Total (₹)</th>
                                    <th>Receipt Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptData.map((receipt, index) => (
                                    <tr key={receipt.Invoice_Id} style={{ background: index % 2 === 0 ? "#eef6f6" : "white" }}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>{receipt.Invoice_Id}</td>
                                        <td>{receipt.Trip_Id}</td>
                                        <td>{receipt.Customer_Name}</td>
                                        <td>{receipt.Email}</td>
                                        <td>{receipt.ContactNo}</td>
                                        <td>{receipt.GST_No}</td>
                                        <td>₹{receipt.Total_Gross.toFixed(2)}</td>
                                        <td>{receipt.GST}%</td>
                                        <td>{receipt.GST_Type}</td>
                                        <td className="fw-bold">₹{receipt.Grand_Total.toFixed(2)}</td>
                                        <td>{formatDate(receipt.Rec_Date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                !loading && <p className="text-danger text-center fw-bold">⚠️ No Trip Receipts Found.</p>
            )}
        </div>
    );
}
