import React, { useEffect, useState } from 'react'
import Navbar from './Admin/Navbar'
import Footer from './Admin/Footer'
import { Link, useNavigate } from "react-router-dom";

export default function Demo({ Component }) {
    const nav = useNavigate();
    const [isCurrent, setCurrent] = useState(null);

    const setCurrentPage = (pageName) => {
        setCurrent((prev) => (prev === pageName ? null : pageName));
    };

    useEffect(() => {
        const AdminId = localStorage.getItem("AdminId");
        if (!AdminId) {
            nav("/Admin/Log_In");
        }
    }, [nav]);

    return (
        <>
            <div style={{ textAlign: "right", width: "100%" }}>
                <Navbar />
            </div>

            <div id="layoutSidenav" className='mt-5'>
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu" style={{ background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))" }}>
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading"></div><br /><br />
                                <Link className="nav-link" to="/Admin/DashBoard" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt" style={{ "color": "white" }} />
                                    </div>
                                    <b>DashBoard</b>
                                </Link>
                                <Link className="nav-link" to="/Admin/Staff" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-user-tie" style={{ "color": "white" }} /></div>
                                    <b>Manage Staff</b>
                                </Link>

                                {/* Purchasing Dropdown */}
                                <a onClick={() => setCurrentPage("Purchasing")} className="nav-link" href="#">
                                    <div className="sb-nav-link-icon"><i className="fas fa-shopping-cart" style={{ "color": "white" }} /></div>
                                    <b style={{ "color": "white" }}>Purchasing</b>
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className={`collapse ${isCurrent === "Purchasing" ? "show" : ""}`}>
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="/Admin/Vendors" style={{ "color": "white" }}>
                                            <i className="fas fa-user-tie me-2" style={{ "color": "white" }}></i> Manage Vendors
                                        </Link>
                                        <Link className="nav-link" to="/Admin/Purchase" style={{ "color": "white" }}>
                                            <i className="fas fa-shopping-bag me-2" style={{ "color": "white" }}></i> Manage Purchase
                                        </Link>
                                        <Link className="nav-link" to="/Admin/Stock" style={{ "color": "white" }}>
                                            <i className="fas fa-clipboard-list me-2" style={{ "color": "white" }}></i> Manage Purchase Details
                                        </Link>
                                        <Link className="nav-link" to="/Admin/Bill_Payment" style={{ "color": "white" }}>
                                            <i className="fas fa-indian-rupee-sign me-2" style={{ "color": "white" }}></i> Manage Bill Payment
                                        </Link>
                                        <Link className="nav-link" to="/Admin/Products" style={{ "color": "white" }}>
                                            <i className="fas fa-box me-2" style={{ "color": "white" }}></i> Manage Products
                                        </Link>
                                    </nav>
                                </div>

                                {/* Customer Management Dropdown */}
                                <a onClick={() => setCurrentPage("CustomerManagement")} className="nav-link" href="#">
                                    <div className="sb-nav-link-icon"><i className="fas fa-users" style={{ "color": "white" }} /></div>
                                    <b style={{ "color": "white" }}>Customer</b>
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className={`collapse ${isCurrent === "CustomerManagement" ? "show" : ""}`}>
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="/Admin/Customer" style={{ "color": "white" }}>
                                            <i className="fas fa-user me-2" style={{ "color": "white" }}></i> Manage Customer
                                        </Link>

                                    </nav>
                                </div>

                                {/* Logistics Dropdown */}
                                <a onClick={() => setCurrentPage("Logistics")} className="nav-link" href="#">
                                    <div className="sb-nav-link-icon"><i className="fas fa-truck" style={{ "color": "white" }} /></div>
                                    <b style={{ "color": "white" }}>Logistics</b>
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className={`collapse ${isCurrent === "Logistics" ? "show" : ""}`}>
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="/Admin/Vehicle" style={{ "color": "white" }}>
                                            <i className="fas fa-truck me-2" style={{ "color": "white" }}></i> Manage Vehicle
                                        </Link>
                                        <Link className="nav-link" to="/Admin/Trip_Mst" style={{ "color": "white" }}>
                                            <i className="fas fa-bus me-2" style={{ "color": "white" }}></i> Manage Trip
                                        </Link>
                                    </nav>
                                </div>
                                <a onClick={() => setCurrentPage("Reports")} className="nav-link" href="#">
                                    <div className="sb-nav-link-icon"><i className="fas fa-file-alt" style={{ "color": "white" }} /></div>
                                    <b style={{ "color": "white" }}>Reports</b>
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className={`collapse ${isCurrent === "Reports" ? "show" : ""}`}>
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className="nav-link" to="/Admin/OrderReceiptByDate" style={{ "color": "white" }}>
                                            <i className="fas fa-chart-line me-2" style={{ "color": "white" }}></i> Order Report
                                        </Link>
                                        <Link className="nav-link" to="/Admin/OrderProductReceiptByDate" style={{ "color": "white" }}>
                                            <i className="fas fa-chart-line me-2" style={{ "color": "white" }}></i> Order Product Report
                                        </Link>
                                        <Link className="nav-link" to="/Admin/StockReport" style={{ "color": "white" }}>
                                            <i className="fas fa-warehouse me-2" style={{ "color": "white" }}></i> Inventory Report
                                        </Link>
                                        <Link className="nav-link" to="/Admin/TripReport" style={{ "color": "white" }}>
                                            <i className="fas fa-route me-2" style={{ "color": "white" }}></i> Trip Report
                                        </Link>


                                    </nav>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    {Component}
                    <Footer />
                </div>
            </div>
        </>
    );
}
