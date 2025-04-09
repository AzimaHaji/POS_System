import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loadingContext, UserContext } from "../App";
import { toast, ToastContainer } from "react-toastify";
import { getData } from "../APIConfig/ConfigAPI";
import ChangeStaffProfile from "./ChangeStaffProfile";


export default function StaffNav() {
    const { staffName, setStaffName } = useContext(UserContext);
    const loadingPanel = useContext(loadingContext);
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false); // ✅ Control the ChangeProfile modal
    const [staffData, setStaffData] = useState(null); // ✅ Store staff data

    const setNavOpen = () => document.body.classList.toggle("sb-sidenav-toggled");

    const handleLogout = () => {
        if (confirm("Are You Sure Want To Log-Out..!!")) {
            localStorage.removeItem("StaffId");
            localStorage.removeItem("StaffName");
            window.location.href = "/Staff/Log_In"; // ✅ Redirect after logout
        }
    };

    const toggleDropdown = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const FetchProfile = async () => {
        try {
            setLoading(true);
            const StaffId = localStorage.getItem("StaffId");

            if (!StaffId) {
                toast.error("Staff ID not found!");
                return;
            }

            const Response = await getData(`StaffById/Get/${StaffId}`);

            if (Response.Status === "OK") {
                setStaffData(Response.Result); // ✅ Store staff data
                setShowProfile(true); // ✅ Open ChangeProfile popup
            } else {
                toast.error("Failed To Fetch Staff Data.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark"
                style={{ background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))" }}>

                <a className="navbar-brand d-flex flex-column align-items-center mt-5" href="/Staff">
                    <img src="/assets/logo.png" alt="AM Logo" width="130" height="130" className="mt-3" />
                </a>

                <button onClick={setNavOpen} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                    id="sidebarToggle" style={{"color" : "white", width: "100%",textAlign:'left'}}>
                    <i className="fas fa-bars" style={{"color" : "white"}}></i>
                </button>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <button onClick={toggleDropdown} className="nav-link dropdown-toggle" style={{"color" : "white"}}> 
                            <i className="fas fa-user fa-fw"></i>&nbsp;<strong style={{"color" : "white"}}>Welcome {staffName}</strong>
                        </button>

                        <ul style={{ position: "absolute", right: 0, top: "100%" }}
                            className={isProfileOpen ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"}>
                            <li>
                                <button onClick={FetchProfile} className="dropdown-item">
                                    <i className="fas fa-user-edit"></i> View Profile
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Log-out
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {loadingPanel}
            <ToastContainer />

            {/* ✅ ChangeProfile Popup (Opens when showProfile is true) */}
            {showProfile && staffData && (
                <ChangeStaffProfile
                    show={showProfile}
                    setShow={setShowProfile}
                    staffData={staffData} // ✅ Pass staff data
                />
            )}
        </>
    );
}
