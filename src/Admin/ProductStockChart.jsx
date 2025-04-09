import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getData } from "../APIConfig/ConfigAPI";

Chart.register(...registerables);

export default function ProductStockChart() {
    const [productNames, setProductNames] = useState([]);
    const [stockQuantities, setStockQuantities] = useState([]);

    useEffect(() => {
        fetchProductStock();
    }, []);

    const fetchProductStock = async () => {
        try {
            const response = await getData(`Get/GetProductStock`);
            const stockData = response.Result;

            const names = stockData.map(product => product.Name); // Get product names
            const stocks = stockData.map(product => product.TotalStock); // Get total stock

            setProductNames(names);
            setStockQuantities(stocks);
        } catch (error) {
            console.error("Error fetching product stock:", error);
        }
    };

    const data = {
        labels: productNames,
        datasets: [
            {
                label: "Total Stock",
                data: stockQuantities,
                backgroundColor: "#008080",
                borderColor: "#333",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="card shadow-lg p-4 rounded border-0 mt-4">
            <h4 className="text-center fw-bold text-dark">Product Stock Chart</h4>
            <div style={{ height: "400px", width: "100%" }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
