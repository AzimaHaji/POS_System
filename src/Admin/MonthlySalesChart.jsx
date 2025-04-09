import React, { useState, useEffect } from "react";
import { getData } from "../APIConfig/ConfigAPI"; // Fetch data function
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlySalesChart() {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        fetchMonthlySales();
    }, []);

    const fetchMonthlySales = async () => {
        try {
            const response = await getData(`Receiptmst/GetMonthSales`);
            if (response.Status === "OK") {
                setSalesData(response.Result);
            } else {
                toast.error("No sales data available.");
            }
        } catch (error) {
            toast.error("Error fetching sales data.");
            console.error("Error:", error);
        }
    };

    // 📊 Prepare Chart Data
    const chartData = {
        labels: salesData.map((sale) => sale.Month_Name), // Month Names (January, February, etc.)
        datasets: [
            {
                label: "Total Sales (₹)",
                data: salesData.map((sale) => sale.Total_Sales),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container p-4 mt-4 border rounded shadow-lg bg-white">
            <h3 className="text-center text-uppercase fw-bold text-primary">
                📈 Monthly Sales Overview
            </h3>
            <hr />
            {salesData.length > 0 ? (
                <div className="d-flex justify-content-center">
                    <div style={{ width: "80%", height: "350px" }}>
                        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            ) : (
                <p className="text-center text-warning fw-bold mt-4">⚠️ No sales data available.</p>
            )}
        </div>
    );
}
