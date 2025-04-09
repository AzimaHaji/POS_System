import React, { useState, useEffect } from "react";
import { getData, postData, putData } from "../APIConfig/ConfigAPI"; // Ensure you have a getData function
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesReportChart() {
    const navigate = useNavigate();

    const checkAdminAccess = () => {
        const StaffId = localStorage.getItem("StaffId");

        if (!StaffId) {
            navigate("/Staff/Log_In");
        }
    };
    const [salesData, setSalesData] = useState([]); // Product-wise sales
    const [monthlySales, setMonthlySales] = useState([]); // Monthly sales
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [finishDate, setFinishDate] = useState(""); // Finish Date State

    useEffect(() => {
        fetchTrip();
        fetchMonthlySales();
    }, []);

    const fetchTrip = async () => {
        try {
            const StaffId = localStorage.getItem("StaffId");
            if (!StaffId) {
                toast.error("Staff ID not found!");
                setLoading(false);
                return;
            }

            const Response = await getData(`GetStaffTripById/Get/${StaffId}`);
            if (Response.Status === "OK") {
                setTrip(Response.Result);
                console.log(Response.Result);
                localStorage.setItem("TripId", Response.Result.Trip_Id);
                fetchSalesReport(Response.Result.Trip_Id);
            } else {
                toast.error("Failed to fetch trip details.");
                toast.success("Trip Closed Successfully!");
                navigate("/Staff/Log_In");
            }
        } catch (error) {
            toast.error("Error fetching trip details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalesReport = async (tripId) => {
        try {
            const response = await getData(`Trip_mst/getSalesReport/${tripId}`);
            if (response.Status === "OK") {
                setSalesData(response.Result);
            } else {
                console.error("No sales data available");
            }
        } catch (error) {
            console.error("Error fetching sales report:", error);
        }
    };

    const fetchMonthlySales = async () => {
        try {
            const response = await getData(`Receiptmst/GetMonthSales`);
            if (response.Status == "OK") {
                setMonthlySales(response.Result);
            } else {
                console.error("No monthly sales data available.");
            }
        } catch (error) {
            console.error("Error fetching monthly sales:", error);
        }
    };

    const updateFinishDate = async () => {
        try {
            const tripId = localStorage.getItem("TripId");
            const response = await putData(`Trip_mst/Update`, {
                Trip_Id: tripId,
                Finish_Date: finishDate,
            });

            if (response.Status === "OK") {
                toast.success("Finish date updated successfully!");
                fetchTrip();
            } else {
                toast.error("Failed to update finish date.");
            }
        } catch (error) {
            toast.error("Error updating finish date.");
            console.error(error);
        }
    };

    const totalSales = salesData.reduce((sum, sale) => sum + sale.Total_Cost, 0);
    const productChartData = {
        labels: salesData.map((sale) => sale.Product_Name),
        datasets: [
            {
                label: "Sales Percentage",
                data: salesData.map((sale) => ((sale.Total_Cost / totalSales) * 100).toFixed(2)),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
                ],
                borderWidth: 1,
            },
        ],
    };


    const monthlyChartData = {
        labels: monthlySales.map((sale) => sale.Month_Name),
        datasets: [
            {
                label: "Total Monthly Sales (₹)",
                data: monthlySales.map((sale) => sale.Total_Sales),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    // const CloseTrip = async () => {
    //     try {
    //         const ReqData = {
    //             Start_Date: trip ? trip.Start_Date : "",
    //             Finish_Date: finishDate
    //         };

    //         console.log("Submitting Data:", ReqData);

    //         const response = await postData(`Admin/CloseTrip`, ReqData);
    //         if (response.Status == "OK") {
    //             toast.error("Trip is not Closed Yet.");
    //             navigate("/Staff/DashBoard");
    //         } else {
    //             toast.success("Trip Closed Successfully!");
    //             navigate("/Staff/Log_In");
    //         }
    //     } catch (error) {
    //         toast.error("Error Closing Trip.");
    //         console.error(error);
    //     }
    // };


    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 text-center text-uppercase fw-bold text-dark">
                DASHBOARD
            </h2>

            {loading ? (
                <p className="text-center text-primary fw-bold">Loading trip details...</p>
            ) : trip ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {/* 🚗 Trip Information */}
                    <div className="col">
                        <div className="card shadow-lg border-0 rounded bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-dark fw-bold">Trip Information</h5>
                                <p><strong>Trip ID : </strong> {trip.Trip_Id}</p>
                                <p><strong>Vehicle : </strong> {trip.Vehicle_Name}</p>
                                <p><strong>Driver : </strong> {trip.Driver_Name}</p>
                                <p><strong>Staff : </strong> {trip.F_Name}</p>
                            </div>
                        </div>
                    </div>

                    {/* 📅 Trip Schedule */}
                    <div className="col">
                        <div className="card shadow-lg border-0 rounded bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-dark fw-bold">📅 Trip Schedule</h5>
                                <p><strong>Start Date : </strong> {formatDate(trip.Start_Date)}</p>
                                <p>
                                    <strong>Status : </strong>
                                    <span className={`badge ms-2 ${trip.Status === "Active" ? "bg-success" : "bg-danger"}`}>
                                        {trip.Status}
                                    </span>
                                </p>

                                {/* 🏁 Finish Date Input & Button */}
                                <div className="mt-3">
                                    <label className="form-label fw-bold">Finish Date : </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={finishDate}
                                        onChange={(e) => setFinishDate(e.target.value)}
                                        style={{ width: "30%" }}
                                        name="txtFinishDate"
                                        id="txtFinishDate"
                                    />
                                    <button
                                        className="btn mt-3"
                                        onClick={updateFinishDate}
                                        style={{ background: "linear-gradient(135deg, #008080,rgb(63, 70, 76))", color: "white" }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-danger fw-bold">⚠️ No trip details available.</p>
            )}
            {(salesData.length > 0 || monthlySales.length > 0) && (
                <div className="container p-4 mt-4">
                    <div className="row">
                        {/* 📊 Product Sales Chart */}
                        {salesData.length > 0 && (
                            <div className="col-md-6">
                                <div className="card shadow-lg border-0 rounded bg-white p-3">
                                    <h3 className="text-center text-uppercase fw-bold text-primary">
                                        📊 Product Sales Overview
                                    </h3>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <div style={{ width: "80%", height: "350px" }}>
                                            <Pie data={productChartData} options={{ maintainAspectRatio: false }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 📊 Monthly Sales Chart */}
                        {monthlySales.length > 0 && (
                            <div className="col-md-6">
                                <div className="card shadow-lg border-0 rounded bg-white p-3">
                                    <h3 className="text-center text-uppercase fw-bold text-success">
                                        📊 Monthly Sales Overview
                                    </h3>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <div style={{ width: "80%", height: "350px" }}>
                                            <Bar data={monthlyChartData} options={{ maintainAspectRatio: false }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}


        </div>
    );
}
