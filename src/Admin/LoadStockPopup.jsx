import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData, postData } from "../APIConfig/ConfigAPI";
import Swal from "sweetalert2";

export default function LoadStockPopup({ tripId, show, setShow, fetchStockData }) {
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadQuantities, setLoadQuantities] = useState({}); // Track input values

    const fetchAvailableStockData = async () => {
        try {
            setLoading(true);
            const response = await getData(`Stock/GetStockDetail`);
            if (response.Status === "OK") {
                setStockList(response.Result || []);

                // Initialize input fields for each Stock_Id
                const initialQuantities = {};
                response.Result.forEach(item => initialQuantities[item.Stock_Id] = "");
                setLoadQuantities(initialQuantities);
            } else {
                toast.error("No Stock");
                setLoading(false);
                setShow(false);
            }
        } catch (error) {
            toast.error("Error Fetching Stock Details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!tripId || !show) return;
        fetchAvailableStockData();
    }, [tripId, show]);

    // ✅ Handle input changes per stock item
    // const handleInputChange = (e, stockId, availableStock) => {
    //     let value = parseInt(e.target.value) || "";

    //     // ✅ Prevent exceeding available stock
    //     if (value > availableStock) { 
    //         toast.error(`Can't exceed Available Stock (${availableStock}).`);
    //         value = availableStock;
    //     }

    //     // ✅ Prevent negative values
    //     if (value < 0) {
    //         toast.error("Quantity cannot be negative.");
    //         value = 0;
    //     }

    //     setLoadQuantities((prev) => ({
    //         ...prev,
    //         [stockId]: value
    //     }));
    // };

    const handleInputChange = (e, stockId, availableStock) => {
        let value = parseInt(e.target.value) || "";

        // ✅ Ensure Error Message Appears
        if (value > availableStock) {
            toast.error(`Can't exceed Available Stock (${availableStock}).`);
            value = availableStock; // Reset value to max
        }

        if (value < 0) {
            toast.error("Quantity cannot be negative.");
            value = 0; // Reset value to 0
        }

        setLoadQuantities((prev) => ({
            ...prev,
            [stockId]: value
        }));
    };


    // ✅ Assign stock and insert into Load_Stock table
    const handleAssignStock = async () => {
        const loadedStockData = stockList
            .map((item) => ({
                Trip_Id: tripId,
                Stock_Id: item.Stock_Id,
                Qty: parseInt(loadQuantities[item.Stock_Id]) || 0
            }))
            .filter(item => item.Qty > 0); // ✅ Fix: Use `Qty` instead of `Load_Stock`

        if (loadedStockData.length === 0) {
            toast.error("Please Enter at least one Stock Quantity.");
            return;
        }

        try {
            console.log(loadedStockData);
            const response = await postData("Load_Stock/Add", loadedStockData);
            console.log(response);

            if (response.Status === "OK") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Stock Assigned Successfully!",
                    confirmButtonColor: "#3085d6",
                }).then(() => {
                    fetchStockData(); // Refresh data after success
                    setShow(false);   // Close the modal (if applicable)
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Failed to Assign Stock.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error Assigning Stock.",
            });
            console.error(error);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
    };

    return (
        <>
            {show && (
                <>
                    <div className="modal show" style={{ display: "block" }} id="stockModal">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", color: "white" }}>
                                    <h5 className="modal-title">Load Stock</h5>
                                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {loading ? (
                                        <p className="text-center"><i className="fas fa-spinner fa-spin"></i> Loading stock data...</p>
                                    ) : stockList.length === 0 ? (
                                        <p className="text-center text-muted">No stock available for this trip.</p>
                                    ) : (
                                        <div className="table-responsive">

                                            <DataTable value={stockList} showGridlines stripedRows size="small" paginator rows={5} tableStyle={{ minWidth: "100%" }}>
                                                <Column field="Stock_Id" hidden={true}></Column>
                                                <Column field="Name" sortable header="Product Name"></Column>
                                                <Column field="Weight" sortable header="Weight (g)"></Column>
                                                <Column field="FSSAI" sortable header="FSSAI" hidden={true}></Column>
                                                <Column field="Brand" sortable header="Brand"></Column>
                                                <Column field="MFG_Date" header="MFG Date" body={(rowData) => formatDate(rowData.MFG_Date)}></Column>
                                                <Column field="Exp_Date" header="Exp Date" body={(rowData) => formatDate(rowData.MFG_Date)}></Column>
                                                <Column field="Available_Stock" header="Available Stock"></Column>

                                                {/* ✅ Load Quantity Column */}
                                                {/* <Column
                                                    header="Load Quantity"
                                                    body={(rowData) => (
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={loadQuantities[rowData.Stock_Id] || ""}
                                                            onChange={(e) => handleInputChange(e, rowData.Stock_Id, rowData.Total_Stock)}
                                                            min="1"
                                                            max={rowData.Total_Stock}
                                                            required
                                                        />
                                                    )}
                                                /> */}
                                                <Column
                                                    header="Load Quantity"
                                                    body={(rowData) => (
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={loadQuantities[rowData.Stock_Id] || ""}
                                                            onChange={(e) => handleInputChange(e, rowData.Stock_Id, rowData.Available_Stock)} // ✅ FIXED
                                                            min="1"
                                                            max={rowData.Available_Stock} // ✅ FIXED
                                                            required
                                                        />
                                                    )}
                                                />

                                            </DataTable>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" onClick={handleAssignStock}>
                                        <i className="fas fa-check"></i> Assign Stock
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
        </>
    );
}
