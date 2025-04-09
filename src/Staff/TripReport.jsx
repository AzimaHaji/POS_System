import React, { useState, useEffect } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TripReport() {
    const [tripData, setTripData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTripReport();
    }, []);

    const fetchTripReport = async () => {
        setLoading(true);
        try {
            const response = await getData("trip-report");
            if (response.Status === "OK") {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Trip Report Retrieved Successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
                setTripData(response.Result);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "No Data!",
                    text: "No trip records available.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error fetching trip report.",
                timer: 2500,
                showConfirmButton: false,
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Export to Excel
    const exportToExcel = () => {
        if (tripData.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Data!",
                text: "No trip records to export.",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const headers = [
            ["Trip Report"],
            ["#", "Trip ID", "Start Date", "Staff Name", "Driver Name", "Vehicle Name", "Status"]
        ];

        const rows = tripData.map((trip, index) => [
            index + 1,
            trip.Trip_Id,
            new Date(trip.Start_Date).toLocaleDateString("en-GB"),
            trip.Staff_Name,
            trip.Driver_Name,
            trip.Vehicle_Name,
            trip.Status
        ]);

        const worksheetData = [...headers, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Report");

        XLSX.writeFile(workbook, `Trip_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    // ✅ Export to CSV
    const exportToCSV = () => {
        if (tripData.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Data!",
                text: "No trip records to export.",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const csvData = tripData.map((trip, index) => ({
            "#": index + 1,
            "Trip ID": trip.Trip_Id,
            "Start Date": new Date(trip.Start_Date).toLocaleDateString("en-GB"),
            "Staff Name": trip.Staff_Name,
            "Driver Name": trip.Driver_Name,
            "Vehicle Name": trip.Vehicle_Name,
            "Status": trip.Status
        }));

        const worksheet = XLSX.utils.json_to_sheet(csvData);
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `Trip_Report_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container p-4 border rounded shadow-lg bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-uppercase fw-bold" style={{ color: "#005f5f" }}>
                    🚛 Trip Report
                </h2>
                <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={exportToExcel}>
                        <i className="fas fa-file-excel"></i> Excel
                    </button>
                    <button className="btn btn-info text-white" onClick={exportToCSV}>
                        <i className="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            <hr />

            {loading && <p className="text-center text-primary fw-bold">Loading Trip Report...</p>}

            {tripData.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered mt-3 text-center align-middle shadow-sm">
                        <thead style={{
                            background: "linear-gradient(135deg, #008080, rgb(63, 70, 76))",
                            color: "white"
                        }}>
                            <tr>
                                <th>#</th>
                                <th>Trip ID</th>
                                <th>Start Date</th>
                                <th>Staff Name</th>
                                <th>Driver Name</th>
                                <th>Vehicle Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tripData.map((trip, index) => (
                                <tr key={trip.Trip_Id} style={{ background: index % 2 === 0 ? "#eef6f6" : "white" }}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td>{trip.Trip_Id}</td>
                                    <td>{new Date(trip.Start_Date).toLocaleDateString("en-GB")}</td>
                                    <td>{trip.Staff_Name}</td>
                                    <td>{trip.Driver_Name}</td>
                                    <td>{trip.Vehicle_Name}</td>
                                    <td>
                                        <span className={`badge ${trip.Status === "Active" ? "bg-success" : "bg-danger"}`}>
                                            {trip.Status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && <p className="text-danger text-center fw-bold">⚠️ No trip records found.</p>
            )}
        </div>
    );
}
