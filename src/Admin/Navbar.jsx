import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadingContext, UserContext } from "../App"; // ✅ Import UserContext
import { toast, ToastContainer } from "react-toastify";
import ChangeProfile from "./ChangeProfile";
import { getData } from "../APIConfig/ConfigAPI";
import ChangePassword from "./ChangePassword";

export default function Navbar() {
    const nav = useNavigate();
    const { userName, setUserName } = useContext(UserContext); // ✅ Get from Context
    const loadingPanel = useContext(loadingContext);

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Admin, setAdmin] = useState([]);
    const [initialValues, setInitialValues] = useState({
        txtF_Name: "",
        txtU_Name: "",
        txtEmail: "",
        txtContactNo: ""
    });

    const toggleDropdown = () => setIsProfileOpen(!isProfileOpen);
    const setNavOpen = () => document.body.classList.toggle("sb-sidenav-toggled");

    const handleLogout = () => {
        if (confirm("Are You Sure Want To Log-Out..!!")) {
            localStorage.removeItem("AdminId");
            localStorage.removeItem("UserName");
            setUserName(""); // ✅ Clear username from state
            nav("/Admin/Log_In");
        }
    };

    const FetchData = async () => {
        try {
            setLoading(true);
            const AdminId = localStorage.getItem("AdminId");

            if (!AdminId) {
                toast.error("Admin ID not found!");
                return;
            }

            const Response = await getData(`GetAdminById/Get/${AdminId}`);

            if (Response.Status === "OK") {
                const Data = Response.Result;
                setAdmin(Data);
                setInitialValues({
                    txtF_Name: Data.F_Name,
                    txtU_Name: Data.U_Name,
                    txtEmail: Data.Email,
                    txtContactNo: Data.ContactNo
                });

                localStorage.setItem("UserName", Data.U_Name);
                setUserName(Data.U_Name); // ✅ Update instantly
                setShow(true);
            } else {
                toast.error("Failed To Fetch Admin Data.");
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
                style={{
                    background: "linear-gradient(135deg,rgb(0, 124, 124),rgb(5, 177, 177))"
                }}>

                <a className="navbar-brand d-flex flex-column align-items-center mt-5" href="/Admin/Staff">
                    <img src="/assets/logo.png" alt="AM Logo" width="130" height="130" className="mt-3" />
                </a>
                <button onClick={setNavOpen} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                    id="sidebarToggle" style={{ "color": "white", width: "100%",textAlign:'left' }}>
                    <i className="fas fa-bars" style={{ "color": "white" }}></i>
                </button>
                <ul className="navbar-nav">
                    {/* User Profile Dropdown */}
                    <li className="nav-item dropdown">
                        <button onClick={toggleDropdown} className="nav-link dropdown-toggle">
                            <i className="fas fa-user fa-fw" style={{ "color": "white" }}></i>&nbsp;<strong style={{ "color": "white" }}>Welcome {userName}</strong>
                        </button>

                        <ul style={{ position: "absolute", right: 0, top: "100%" }}
                            className={isProfileOpen ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"}>
                            <li>
                                <Link to="/Admin/ChangeProfile" className="dropdown-item" onClick={FetchData}>
                                    <i className="fas fa-user-edit"></i> Change Profile
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => setShowPassword(true)}>
                                    <i className="fas fa-key"></i> Change Password
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

            {/* ✅ Pass setUserName so profile updates instantly */}
            <ChangeProfile loading={loading} setLoading={setLoading} show={show} setShow={setShow}
                initialValues={initialValues} setInitialValues={setInitialValues}
                Admin={Admin} setAdmin={setAdmin} setUserName={setUserName}
            />

            <ChangePassword showPassword={showPassword} setShowPassword={setShowPassword} />

            {loadingPanel}
            <ToastContainer />
        </>
    );
}
