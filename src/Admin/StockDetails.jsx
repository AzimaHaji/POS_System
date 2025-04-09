import React, { useContext, useEffect, useState } from "react";
import { deleteData, getData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LoadStockPopup from "./LoadStockPopup";
import { loadingContext } from '../App';
import ChangeQty from "./ChangeQty";


export default function StockDetails({ TripId }) {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [LoadStock_Id, setLoadStock_Id] = useState(null);
    const [initialQty, setInitialQty] = useState(0);
    const [availableStock, setAvailableStock] = useState(0);

    const fetchStockData = async () => {
        try {
            setLoading(true);
            const response = await getData(`Load_Stock/Get/${TripId}`);
            if (response.Status === "OK") {
                setStockData(response.Result || []);
            } else {
                toast.error(response.Message || "Failed to fetch stock details.");
            }
        } catch (error) {
            toast.error("Error fetching stock details.");
            console.error("Fetch Stock Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLoadStock = async (Id) => {
        if (window.confirm("Are You Sure Want To Delete..!!")) {
            try {
                setPanelLoading(true);
                const Response = await deleteData("Load_Stock/Delete/" + Id);
                if (Response.Status === "OK") {
                    toast.success("Successfully Deleted");
                    fetchStockData();
                }
            } catch (error) {
                console.error("Error", error);
            } finally {
                setPanelLoading(false);
            }
        }
    };

    const fetchLoadStock = async (Id, Qty) => {
        try {
            const Response = await getData("Get/GetStockAvailableDetail/" + Id);
            if (Response.Status === "OK") {
                const Data = Response.Result;
                console.log("Load Stock: ", Data);
                
                setLoadStock_Id(Id);  // ✅ Set the correct LoadStock_Id
                setInitialQty(Qty);    // ✅ Correctly setting the initial quantity
                setAvailableStock(Data.Available_Stock);
                setShowEditPopup(true); 
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    

    const editTemplate = (rowData) => {
        console.log(rowData.Total_Qty);
        return (
            <button
                onClick={() => fetchLoadStock(rowData.LoadStock_Id, rowData.Total_Qty)}
                className="btn btn-success btn-sm"
            >
                <i className="fas fa-edit"></i>
            </button>
        );
    };

    const deleteTemplate = (rowData) => {
        return (
            <button
                onClick={() => deleteLoadStock(rowData.LoadStock_Id)}
                className="btn btn-danger btn-sm"
            >
                <i className="fas fa-trash"></i>
            </button>
        );
    };

    useEffect(() => {
        fetchStockData();
    }, [initialQty]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Stock Details</h5>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowPopup(true)}
                    aria-label="Load Stock"
                >
                    <i className="fas fa-box"></i> Load Stock
                </button>
            </div>

            {loading ? (
                <div className="text-center my-4">Loading Stock Details...</div>
            ) : stockData.length === 0 ? (
                <div className="text-center my-4">No Stock Data Available.</div>
            ) : (
                <div className="table-responsive">
                    <DataTable
                        value={stockData}
                        showGridlines
                        stripedRows
                        size="small"
                        paginator
                        rows={5}
                        tableStyle={{ minWidth: "100%" }}
                    >
                        <Column field="Brand" sortable header="Brand"></Column>
                        <Column field="Name" sortable header="Name"></Column>
                        <Column field="MFG_Date" sortable header="MFG Date"></Column>
                        <Column field="Exp_Date" sortable header="Exp Date"></Column>
                        <Column field="Total_Qty" sortable header="Qty"></Column>
                        <Column className='text-center' body={deleteTemplate} />
                        <Column className='text-center' body={editTemplate} />
                    </DataTable>
                </div>
            )}

            <LoadStockPopup
                tripId={TripId}
                show={showPopup}
                setShow={setShowPopup}
                fetchStockData={fetchStockData}
            />

            <ChangeQty
                show={showEditPopup}
                setShow={setShowEditPopup}
                LoadStock_Id={LoadStock_Id}
                initialQty={initialQty}
                fetchStockData={fetchStockData}
                availableStock={availableStock}
                setInitialQty={setInitialQty}
            />
        </div>
    );
}

