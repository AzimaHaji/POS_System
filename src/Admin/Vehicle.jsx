import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { getData } from "../APIConfig/ConfigAPI";
import { loadingContext } from "../App";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import VehiclePopup from "./Popups/VehiclePopup";

export default function Vehicle() {
    const [show, setShow] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [panelLoading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [vehicleId, setVehicleId] = useState(0);
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("Active"); // ✅ Default: Show Active Vehicles

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
        txtDriver_Name: "",
        txtPUC_No: "",
        txtVehicle_No: "",
        txtVehicle_Name: "",
        txtPUC_Expiry: "",
        txtFuel_Type: "",
        txtDriving_Licences_No: "",
        txtStatus: ""
    });

    // ✅ **Fetch & Filter Vehicles Based on Status**
    const getVehicle = useCallback(async () => {
        try {
            setPanelLoading(true);
            const response = await getData("Vehiclemst/Get");

            if (response.Status === "OK") {
                // ✅ Filter vehicles based on selected status
                const filteredVehicles = response.Result.filter(vehicle => {
                    if (statusFilter === "All") return true;
                    return vehicle.Status === statusFilter;
                });
                setVehicleList(filteredVehicles);
            } else {
                toast.error("Error Fetching Vehicle list.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    }, [statusFilter]); // ✅ Runs whenever `statusFilter` changes

    // ✅ **Fetch Vehicle Data for Editing**
    const FetchVehicle = useCallback(async (Id) => {
        try {
            setPanelLoading(true);
            const response = await getData(`GetVehicleById/Get/${Id}`);

            if (response.Status === "OK") {
                const data = response.Result;

                setInitialValues({
                    txtDriver_Name: data.Driver_Name,
                    txtPUC_No: data.PUC_No,
                    txtPUC_Expiry: data.PUC_Expiry,
                    txtVehicle_No: data.Vehicle_No,
                    txtVehicle_Name: data.Vehicle_Name,
                    txtFuel_Type: data.Fual_Type,
                    txtDriving_Licences_No: data.Driving_Licences_No,
                    txtStatus: data.Status
                });

                setVehicleId(data.Vehicle_Id);
                setShow(true);
            } else {
                toast.error("Error fetching vehicle data.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    }, []);

    // ✅ **Re-fetch vehicles when status filter changes**
    useEffect(() => {
        getVehicle();
    }, [getVehicle]);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB"); // Format as DD-MM-YYYY
    };

    const editTemplate = (rowData) => (
        <button onClick={() => FetchVehicle(rowData.Vehicle_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    );

    return (
        <main>
            <div className="container-fluid px-4">
                <p className="text-right mt-3">
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Vehicle
                </p>
                <div className="card mb-2">
                    <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        Vehicle
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* 🔹 Global Search Input */}
                            <div className="col-md-4 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Vehicle.."
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
                                        borderRadius: "8px"
                                    }}
                                >
                                    <option value="Active">Active Vehicles</option>
                                    <option value="Not-Active">Not Active Vehicles</option>
                                    <option value="All">All Vehicles</option>
                                </select>
                            </div>

                            {/* 🔹 New Vehicle Button */}
                            <div className="col-md-4 text-end mb-2">
                                <button
                                    type="button"
                                    className="btn btn- text-white"
                                    style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
                                    onClick={() => {
                                        setInitialValues({
                                            txtVehicle_Name: "",
                                            txtFuel_Type: "",
                                            txtVehicle_No: "",
                                            txtStatus: "Active"
                                        });
                                        setShow(true);
                                    }}
                                >
                                    <i className="fas fa-truck"></i> New Vehicle
                                </button>
                            </div>

                            {/* 🔹 Vehicle Table */}
                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={vehicleList}
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
                                    <Column field="Driver_Name" sortable header="Driver Name"></Column>
                                    <Column field="PUC_No" sortable header="PUC No"></Column>
                                    <Column field="PUC_Expiry" sortable header="PUC Expiry" body={(rowData) => formatDate(rowData.PUC_Expiry)}></Column>
                                    <Column field="Vehicle_No" sortable header="Vehicle No"></Column>
                                    <Column field="Vehicle_Name" sortable header="Vehicle Name"></Column>
                                    <Column field="Fual_Type" sortable header="Fuel Type"></Column>
                                    <Column field="Driving_Licences_No" sortable header="Driving Licences No"></Column>
                                    <Column field="Status" sortable header="Status"></Column>
                                    <Column className="text-center" body={editTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <VehiclePopup
                loading={loading}
                setLoading={setLoading}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                getVehicle={getVehicle}
                VehicleId={vehicleId}
                setVehicleId={setVehicleId}
                show={show}
                setShow={setShow}
            />
            {panelLoading ? loadingPanel : null}
        </main>
    );
}
