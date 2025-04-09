import React, { useEffect, useState } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductStockChart from "./ProductStockChart";
import MonthlySalesChart from "./MonthlySalesChart";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const checkAdminAccess = () => {
        const AdminId = localStorage.getItem("AdminId");

        if (!AdminId) {
            navigate("/Admin/Log_In");
        }
    };
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalStaff, setTotalStaff] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        fetchTotalVehicles();
        fetchTotalStaff();
        fetchTotalCustomer();
        fetchTotalOrder();
    }, []);

    const fetchTotalVehicles = async () => {
        try {
            const response = await getData(`Vehiclemst/GetVehicle`);
            setTotalVehicles(response.Result);
        } catch (error) {
            console.error("Error fetching total vehicles:", error);
        }
    };

    const fetchTotalStaff = async () => {
        try {
            const response = await getData(`Staff_mst/GetStaff`);
            setTotalStaff(response.Result);
        } catch (error) {
            console.error("Error fetching total staff:", error);
        }
    };

    const fetchTotalCustomer = async () => {
        try {
            const response = await getData(`Customer/GetTotalCustomer`);
            setTotalCustomer(response.Result);
        } catch (error) {
            console.error("Error fetching total customers:", error);
        }
    };

    const fetchTotalOrder = async () => {
        try {
            const response = await getData(`Ordermst/GetOrder`);
            setTotalOrder(response.Result);
        } catch (error) {
            console.error("Error fetching total orders:", error);
        }
    };
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center text-uppercase fw-bold text-dark">
                Dashboard
            </h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-center shadow-lg p-4 rounded border-0">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center mb-3 mx-auto"
                                style={{
                                    width: "80px", height: "80px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))"
                                }}>
                                <i className="fas fa-car text-white" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <h5 className="card-title text-dark fw-bold">Total Vehicles</h5>
                            <p className="display-4 fw-bold text-success">{totalVehicles}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-lg p-4 rounded border-0">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center mb-3 mx-auto"
                                style={{
                                    width: "80px", height: "80px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))"
                                }}>
                                <i className="fas fa-user text-white" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <h5 className="card-title text-dark fw-bold">Total Staff</h5>
                            <p className="display-4 fw-bold text-success">{totalStaff}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-lg p-4 rounded border-0">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center mb-3 mx-auto"
                                style={{
                                    width: "80px", height: "80px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))"
                                }}>
                                <i className="fas fa-user text-white" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <h5 className="card-title text-dark fw-bold">Total Customer</h5>
                            <p className="display-4 fw-bold text-success">{totalCustomer}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-lg p-4 rounded border-0">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center mb-3 mx-auto"
                                style={{
                                    width: "80px", height: "80px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))"
                                }}>
                                <i className="fas fa-clipboard-list text-white" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <h5 className="card-title text-dark fw-bold">Total Order</h5>
                            <p className="display-4 fw-bold text-success">{totalOrder}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Stock Chart */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <ProductStockChart />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <MonthlySalesChart />
                </div>
            </div>

        </div>
    );
}
