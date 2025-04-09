import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";
import StockDetails from "./StockDetails";
import TripReceiptReport from "./Popups/TripReceiptReport";
import OrdersView from "./OrdersView"; // 🔹 Import OrdersView Component
import TripOrder from "./TripOrder";

export default function TripDetails() {
    const { TripId } = useParams();
    const [tripData, setTripData] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await getData(`TripById/Get/${TripId}`);
                if (response.Status === "OK") {
                    setTripData(response.Result);
                } else {
                    toast.error("Failed to fetch trip details.");
                }
            } catch (error) {
                toast.error("Error fetching trip details.");
                console.error(error);
            }
        };

        fetchTripDetails();
    }, [TripId]);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB"); // Format as DD-MM-YYYY
    };

    if (!tripData) return <p className="text-center mt-4">Loading Trip Details...</p>;

    return (
        <main className="container-fluid px-4">
            <p className="text-right mt-3">
                <a style={{ textDecoration: "none" }} href="#">Home</a> / Trip Details
            </p>

            {/* 🔹 Card Wrapper */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center" style={{
                    background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))",
                    color: "white"
                }}>
                    <h5 className="mb-0">Trip Details</h5>
                    <a href="/Admin/Trip_Mst" className="btn btn-light">
                        <i className="fas fa-arrow-left"></i> Back to Trips
                    </a>
                </div>

                {/* 🔹 Tabs Inside the Card */}
                <div className="card-body">
                    <ul className="nav nav-tabs mb-3">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
                                <i className="fas fa-info-circle"></i> Overview
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "stock" ? "active" : ""}`} onClick={() => setActiveTab("stock")}>
                                <i className="fas fa-boxes"></i> Stock
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "receipt" ? "active" : ""}`} onClick={() => setActiveTab("receipt")}>
                                <i className="fas fa-receipt"></i> Trip Receipt Report
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
                                <i className="fas fa-shopping-cart"></i> Orders
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === "tripOrder" ? "active" : ""}`} onClick={() => setActiveTab("tripOrder")}>
                                <i className="fas fa-truck"></i> Trip Order
                            </button>
                        </li>

                    </ul>

                    {/* 🔹 Tab Content */}
                    <div className="p-3">
                        {/* ✅ Trip Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="card-title">Trip Information</h6>
                                            <p className="mb-1"><strong>Trip ID:</strong> {tripData.Trip_Id}</p>
                                            <p className="mb-1"><strong>Vehicle:</strong> {tripData.Vehicle_Name}</p>
                                            <p className="mb-1"><strong>Driver:</strong> {tripData.Driver_Name}</p>
                                            <p className="mb-1"><strong>Staff:</strong> {tripData.F_Name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="card-title">Trip Schedule</h6>
                                            <p className="mb-1"><strong>Start Date:</strong> {formatDate(tripData.Start_Date)}</p>
                                            <p className="mb-1"><strong>Finish Date:</strong> {formatDate(tripData.Finish_Date)}</p>
                                            <p className="mb-1"><strong>Status:</strong> <span className={`badge ${tripData.Status === "Active" ? "bg-success" : "bg-danger"}`}>{tripData.Status}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ✅ Stock Tab */}
                        {activeTab === "stock" && <StockDetails TripId={TripId} />}

                        {/* ✅ Trip Receipt Report Tab */}
                        {activeTab === "receipt" && <TripReceiptReport TripId={TripId} />}

                        {/* ✅ Orders Tab (NEW) */}
                        {activeTab === "orders" && <OrdersView TripId={TripId} />}

                        {activeTab === "tripOrder" && <TripOrder TripId={TripId} />}
                    </div>
                </div>
            </div>
        </main>
    );
}
