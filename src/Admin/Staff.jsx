import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { getData } from "../APIConfig/ConfigAPI";
import StaffPopup from "./Popups/StaffPopup";
import { loadingContext } from "../App";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

export default function Staff() {
    const [show, setShow] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [staffId, setStaffId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [panelLoading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("Active"); // ✅ Default: Show Active Staff

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters({
            ...filters,
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        });
    };

    const [initialValues, setInitialValues] = useState({
        txtF_Name: "",
        txtGender: "",
        txtDOB: "",
        txtContactNo: "",
        txtAddress: "",
        txtAdhar_No: "",
        txtDriving_Licence: "",
        txtDOJ: "",
        txtEmail: "",
        txtStatus: ""
    });

    // ✅ **Fetch & Filter Staff Based on Status**
    const getStaff = useCallback(async () => {
        try {
            setPanelLoading(true);
            const response = await getData("Staff_mst/Get");

            if (response.Status === "OK") {
                // ✅ Filter staff based on selected status
                const filteredStaff = response.Result.filter(staff => {
                    if (statusFilter === "All") return true;
                    return staff.Status === statusFilter;
                });
                setStaffList(filteredStaff);
            } else {
                toast.error("Error fetching staff list.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    }, [statusFilter]);

    const FetchStaff = useCallback(async (Id) => {
        try {
            setPanelLoading(true);
            const response = await getData(`StaffById/Get/${Id}`);

            if (response.Status === "OK") {
                const data = response.Result;

                setInitialValues({
                    txtF_Name: data.F_Name,
                    txtGender: data.Gender,
                    txtDOB: data.DOB,
                    txtContactNo: data.ContactNo,
                    txtAddress: data.Address,
                    txtAdhar_No: data.Adhar_No,
                    txtDriving_Licence: data.Driving_Licence,
                    txtDOJ: data.DOJ,
                    txtEmail: data.Email,
                    txtStatus: data.Status
                });

                setStaffId(data.Staff_Id);
                setShow(true);
            } else {
                toast.error("Error fetching staff data.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    }, []);


    useEffect(() => {
        getStaff();
    }, [getStaff]);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB");
    };

    const editTemplate = (rowData) => (
        <button onClick={() => FetchStaff(rowData.Staff_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    );

    return (
        <main>
            <div className="container-fluid px-4">
                <p className="text-right mt-3">
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Staff
                </p>
                <div className="card mb-2">
                    <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        Staff
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* 🔹 Global Search Input */}
                            <div className="col-md-4 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Staff.."
                                    className="form-control border-0"
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        padding: "10px",
                                        background: "#f8f9fa",
                                        borderRadius: "8px"
                                    }}
                                />
                            </div>

                            {/* 🔹 Status Dropdown */}
                            <div className="col-md-4 mb-2">
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        padding: "10px",
                                        background: "#f8f9fa",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <option value="Active">Active Staff</option>
                                    <option value="Not-Active">Not Active Staff</option>
                                    <option value="All">All Staff</option>
                                </select>
                            </div>

                            {/* 🔹 New Staff Button */}
                            <div className="col-md-4 text-end mb-2">
                                <button
                                    type="button"
                                    className="btn btn-md text-white"
                                    style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
                                    onClick={() => {
                                        setInitialValues({
                                            txtF_Name: "",
                                            txtGender: "",
                                            txtDOB: "",
                                            txtContactNo: "",
                                            txtAddress: "",
                                            txtAdhar_No: "",
                                            txtDriving_Licence: "",
                                            txtDOJ: "",
                                            txtEmail: "",
                                            txtStatus: "Active"
                                        });
                                        setShow(true);
                                    }}
                                >
                                    <i className="fas fa-user-plus"></i> New Staff
                                </button>
                            </div>

                            {/* 🔹 Staff Table */}
                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={staffList}
                                    filters={filters}
                                    globalFilter={globalFilter}
                                    filterDisplay="menu"
                                    showGridlines
                                    stripedRows
                                    size="small"
                                    paginator
                                    rows={5}
                                    tableStyle={{ minWidth: "100%" }}
                                >
                                    <Column field="F_Name" sortable header="Name"></Column>
                                    <Column field="Gender" sortable header="Gender"></Column>
                                    <Column field="DOB" header="DOB" body={(rowData) => formatDate(rowData.DOB)}></Column>
                                    <Column field="Email" header="Email"></Column>
                                    <Column field="ContactNo" sortable header="Contact No"></Column>
                                    <Column field="Address" header="Address"></Column>
                                    <Column field="Adhar_No" header="Adhar No"></Column>
                                    <Column field="Driving_Licence" header="Driving Licence"></Column>
                                    <Column field="DOJ" header="DOJ" body={(rowData) => formatDate(rowData.DOJ)}></Column>
                                    <Column field="Status" header="Status"></Column>
                                    <Column className="text-center" body={editTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StaffPopup
                loading={loading}
                setLoading={setLoading}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                getStaff={getStaff}
                StaffId={staffId}
                setStaffId={setStaffId}
                show={show}
                setShow={setShow}
            />

            {panelLoading ? loadingPanel : null}
        </main>
    );
}
