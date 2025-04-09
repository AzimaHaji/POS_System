import React, { useState, useEffect } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Chart.js Imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to format date as dd-mm-yyyy
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' formats as dd/mm/yyyy
};

export default function StockReport() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStockReport();
    }, []);

    const fetchStockReport = async () => {
        setLoading(true);
        try {
            const response = await getData("stock-report");
            if (response.Status === "OK") {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Stock Report Retrieved Successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
                setStockData(response.Result);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "No Stock Data!",
                    text: "No Stock Data Available.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error fetching stock report.",
                timer: 2500,
                showConfirmButton: false,
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // 📊 Chart Data
    const chartData = {
        labels: stockData.map(stock => stock.Name),
        datasets: [
            {
                label: "Stock Quantity",
                data: stockData.map(stock => stock.No_Of_Stock),
                backgroundColor: "rgba(0, 128, 128, 0.7)",
                borderColor: "rgba(0, 128, 128, 1)",
                borderWidth: 1,
            }
        ],
    };

    // 📤 Export to Excel
    const exportToExcel = () => {
        const customHeader = [
            ["POS"],
            ["Available Stock"],
            ["#", "Product Name", "Stock", "Price (₹)", "MFG Date", "EXP Date", "Inward Date"]
        ];

        const stockRows = stockData.map((stock, index) => [
            index + 1,
            stock.Name,
            stock.No_Of_Stock,
            stock.Price.toFixed(2),
            formatDate(stock.MFG_Date),
            formatDate(stock.Exp_Date),
            formatDate(stock.Inword_Date)
        ]);

        const finalSheetData = [...customHeader, ...stockRows];

        const ws = XLSX.utils.aoa_to_sheet(finalSheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Stock Report");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Stock_Report.xlsx");
    };

    // 📄 Export to CSV
    const exportToCSV = () => {
        if (stockData.length === 0) return;

        const customHeader = [
            ["POS"],
            ["Available Stock"],
            ["#", "Product Name", "Stock", "Price (₹)", "MFG Date", "EXP Date", "Inward Date"]
        ];

        const stockRows = stockData.map((stock, index) => [
            index + 1,
            stock.Name,
            stock.No_Of_Stock,
            stock.Price.toFixed(2),
            formatDate(stock.MFG_Date),
            formatDate(stock.Exp_Date),
            formatDate(stock.Inword_Date)
        ]);

        const finalCSVData = [...customHeader, ...stockRows];

        const worksheet = XLSX.utils.aoa_to_sheet(finalCSVData);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "Stock_Report.csv");
    };

    return (
        <div className="container p-4 border rounded shadow-lg" style={{ background: "#f8f9fa" }}>
            <h2 className="text-center text-uppercase fw-bold" style={{ color: "#005f5f" }}>
                📦 Stock Report
            </h2>
            <hr />

            {loading && <p className="text-center text-primary fw-bold">Loading Stock Report...</p>}

            {stockData.length > 0 ? (
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

                    {/* 🔹 Stock Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered mt-3 text-center align-middle shadow-sm">
                            <thead style={{
                                background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))",
                                color: "white"
                            }}>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Stock</th>
                                    <th>Price (₹)</th>
                                    <th>MFG Date</th>
                                    <th>EXP Date</th>
                                    <th>Inward Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.map((stock, index) => (
                                    <tr key={stock.P_Id} style={{ background: index % 2 === 0 ? "#eef6f6" : "white" }}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>{stock.Name}</td>
                                        <td className="fw-bold">{stock.No_Of_Stock}</td>
                                        <td>₹{stock.Price.toFixed(2)}</td>
                                        <td>{formatDate(stock.MFG_Date)}</td>
                                        <td>{formatDate(stock.Exp_Date)}</td>
                                        <td>{formatDate(stock.Inword_Date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 📊 Stock Chart */}
                    <div className="mt-4 p-3 bg-white shadow rounded text-center">
                        <h5 className="fw-bold" style={{ color: "#005f5f" }}>📊 Stock Overview</h5>
                        <div style={{ width: "60%", height: "300px", margin: "auto" }}>
                            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </>
            ) : (
                !loading && <p className="text-danger text-center fw-bold">⚠️ No stock records found.</p>
            )}
        </div>
    );
}
