import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { loadingContext } from '../App';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../APIConfig/ConfigAPI';
import { toast } from 'react-toastify';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Trip_MstPopup from './Popups/Trip_MstPopup';

export default function Trip_mst() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);
    const navigate = useNavigate(); // ✅ Initialize navigate

    const [TripId, setTripId] = useState(0);
    const [Trip, setTrip] = useState([]);
    const [staffData, setStaffData] = useState([]);

    const [initialValues, setInitialValues] = useState({
        txtVehicle_Id: "",
        txtStaff_Id: "",
        txtStart_Date: "",
    });

    const getTrip = async () => {
        try {
            setPanelLoading(true);
            const response = await getData("Trip_mst/Get");
            if (response.Status === "OK") {
                // ✅ Filter only Active trips
                const activeTrips = response.Result.filter(trip => trip.Status === "Active");
                setTrip(activeTrips || []);
            } else {
                toast.error("Data Fetching error!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPanelLoading(false);
        }
    };


    // Format date properly
    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
    };

    // Search filter
    const [globalFilter, setGlobalFilter] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        });
    };

    // Fetch trip data for editing
    const FetchTrip = async (Id) => {
        try {
            setPanelLoading(true);
            const response = await getData(`TripById/Get/${Id}`);
            if (response.Status === "OK") {
                const Data = response.Result;
                setInitialValues({
                    txtVehicle_Id: Data.Vehicle_Id,
                    txtStaff_Id: Data.Staff_Id,
                    txtStart_Date: Data.Start_Date,
                });
                setTripId(Data.Trip_Id);
                setShow(true);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setPanelLoading(false);
        }
    };

    const redirectToDetails = (TripId) => {
        navigate(`/Admin/Details/${TripId}`);
    };

    const actionTemplate = (rowData) => (
        <div className="d-flex gap-2">
            <button onClick={() => redirectToDetails(rowData.Trip_Id)} className="btn btn-primary btn-sm">
                <i className="fas fa-info-circle"></i> View
            </button>
            <button onClick={() => FetchTrip(rowData.Trip_Id)} className="btn btn-success btn-sm">
                <i className="fas fa-edit"></i>
            </button>
        </div>
    );

    useEffect(() => {
        getTrip();
    }, []);

    return (
        <main>
            <div className="container-fluid px-4">
                <p className='text-right mt-3'>
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Trip
                </p>
                <div className="card mb-4">
                    <div className="card-header text-white" style={{
                        background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))"
                    }}>
                        Trip
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* Search input */}
                            <div className="col-md-6 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Trip..."
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
                            {/* New Trip Button */}
                            <div className="col-md-6 text-end mb-2">
                                <button
                                    type="button"
                                    onClick={() => setShow(true)}
                                    className='btn btn-md text-white'
                                    style={{
                                        background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))",
                                        padding: "8px 16px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        borderRadius: "6px"
                                    }}
                                >
                                    <i className="fas fa-location-dot me-2"></i> New Trip
                                </button>
                            </div>
                            {/* Data Table */}
                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={Trip}
                                    filters={filters}
                                    globalFilter={globalFilter}
                                    showGridlines
                                    stripedRows
                                    size="small"
                                    paginator
                                    rows={5}
                                    tableStyle={{ minWidth: "100%" }}
                                >
                                    <Column field="Vehicle_Name" sortable header="Vehicle Name"></Column>
                                    <Column field="F_Name" sortable header="Staff Name" />
                                    <Column field="Driver_Name" sortable header="Driver Name" />
                                    <Column field="Start_Date" header="Start Date" body={(rowData) => formatDate(rowData.Start_Date)}></Column>
                                    <Column
                                        field="Status"
                                        header="Vehicle Status"
                                        sortable
                                        body={(rowData) => (
                                            <span
                                                style={{
                                                    color: "white",
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    display: "inline-block"
                                                }} className='bg-success'
                                            >
                                                {rowData.Status}
                                            </span>
                                        )}
                                    ></Column>
                                    <Column className='text-center' body={actionTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Trip_MstPopup
                getTrip={getTrip}
                show={show}
                setShow={setShow}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                loading={loading}
                setLoading={setLoading}
                TripId={TripId}
                setTripId={setTripId}
                Trip={Trip}
                setTrip={setTrip}
            />
            {Panelloading ? loadingPanel : null}
        </main>
    );
}
