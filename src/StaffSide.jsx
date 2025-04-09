import React, { useEffect } from 'react'
import Footer from './Admin/Footer'
import { Link, useNavigate } from "react-router-dom";
import StaffNav from './Staff/StaffNav';


export default function StaffSide({ Component }) {
    const nav = useNavigate();
    useEffect(() => {
        const StaffId = localStorage.getItem("StaffId");
        if (!StaffId) {
            nav("/Staff/Log_In");
        }
    }, [nav]);


    return (
        <>
            <StaffNav />
            <div id="layoutSidenav" className='mt-2' >
                <div id="layoutSidenav_nav">
                    <nav
                        className="sb-sidenav accordion sb-sidenav-dark"
                        id="sidenavAccordion"
                    >
                        <div className="sb-sidenav-menu" style={{
                            background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))"
                        }}>
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading mt-5"></div>
                                <Link className="nav-link" to="/Staff/DashBoard" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt" style={{ "color": "white" }} />
                                    </div>
                                    <b>DashBoard</b>
                                </Link>
                                <Link className="nav-link" to="/Staff/LoadStock" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-boxes" style={{ "color": "white" }} />
                                    </div>
                                    <b>View Load Stock</b>
                                </Link>
                                <Link className="nav-link" to="/Staff/Customer" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-user-tie" style={{ "color": "white" }} />
                                    </div>
                                    <b>Manage Customer</b>
                                </Link>
                                <Link className="nav-link" to="/Staff/Invoice" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-file-invoice" style={{ "color": "white" }} />
                                    </div>
                                    <b>Manage Invoice</b>
                                </Link>
                                <Link className="nav-link" to="/Staff/OrderDetails" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-shopping-cart" style={{ "color": "white" }} /> {/* Order Icon */}
                                    </div>
                                    <b>Manage Orders</b>
                                </Link>
                                <Link className="nav-link" to="/Staff/Details" style={{ "color": "white" }}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-file-alt" style={{ "color": "white" }} /> {/* Order Icon */}
                                    </div>
                                    <b>View Orders</b>
                                </Link>
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

    )
}
