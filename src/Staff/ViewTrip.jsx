import React, { useEffect, useState } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewTrip() {
    const [stock, setStock] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const tripId = localStorage.getItem("TripId");

            if (!tripId) {
                toast.error("Trip ID not found!");
                setLoading(false);
                return;
            }

            const Response = await getData(`Load_Stock/Get/${tripId}`);
            console.log(Response);

            if (Response.Status === "OK") {
                setStock(Array.isArray(Response.Result) ? Response.Result : [Response.Result]); 
            } else {
                toast.error("Failed to fetch stock details.");
            }
        } catch (error) {
            toast.error("Error fetching stock details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 📅 Format Date
    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-GB"); // dd/mm/yyyy format
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center text-uppercase fw-bold text-primary">
                📦 Load Stock Details
            </h2>

            {/* 📌 Loading State */}
            {loading ? (
                <p className="text-center text-primary fw-bold">Loading stock details...</p>
            ) : stock.length > 0 ? (
                <div className="card shadow-lg border-0 rounded p-4 bg-light">
                    <div className="table-responsive">
                        <DataTable
                            value={stock}
                            showGridlines
                            stripedRows
                            size="small"
                            paginator
                            rows={5}
                            tableStyle={{ minWidth: "100%" }}
                        >
                            <Column field="Brand" sortable header="Brand"></Column>
                            <Column field="Name" sortable header="Product Name"></Column>
                            <Column
                                field="MFG_Date"
                                sortable
                                header="Manufacturing Date"
                                body={(rowData) => formatDate(rowData.MFG_Date)}
                            ></Column>
                            <Column
                                field="Exp_Date"
                                sortable
                                header="Expiry Date"
                                body={(rowData) => formatDate(rowData.Exp_Date)}
                            ></Column>
                            <Column field="Total_Qty" sortable header="Quantity"></Column>
                        </DataTable>
                    </div>
                </div>
            ) : (
                <p className="text-center text-danger fw-bold">⚠️ No stock details available.</p>
            )}
        </div>
    );
}
