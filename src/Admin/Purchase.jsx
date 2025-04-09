import React, { useContext, useEffect, useState } from 'react'
import { loadingContext } from '../App';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../APIConfig/ConfigAPI';
import { toast } from 'react-toastify';
import PurchasePopup from './Popups/PurchasePopup';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from "primereact/inputtext";

export default function Purchase() {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [PurchaseId, setPurchaseId] = useState(0);
    const [Purchase, setPurchase] = useState([]);

    const [initialValues, setInitialValues] = useState({
        txtBill_No: "",
        txtGrossAmt: "",
        txtTotalAmt: "",
        txtV_Id: "",
        txtGST_Type: "",
        txtBill_Date: "",
        txtTotal: ""
    });

    const getPurchase = async () => {
        try {
            setPanelLoading(true);
            const Response = await getData("Purchasemst/Get");
            if (Response.Status == "OK") {
                setPurchase(Response.Result);
            }
            else {
                toast.error("Data Fetching error..!!");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setPanelLoading(false);
        }
    }

    useEffect(() => {
        getPurchase();
    }, []);

    const editTemplate = (Purchase) => {
        return <button onClick={() => FetchPurchase(Purchase.Purchase_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    };


    const FetchPurchase = async (Id) => {
        try {
            setPanelLoading(true);
            const Response = await getData("GetPurchaseById/Get/" + Id);
            if (Response.Status == "OK") {
                const Data = Response.Result;
                console.log(Data);
                setInitialValues({
                    txtV_Id: Data.V_Id,
                    txtBill_No: Data.Bill_No,
                    txtGrossAmt: Data.GrossAmt,
                    txtTotalAmt: Data.TotalAmt,
                    txtGST_Type: Data.GST_Type,
                    txtBill_Date: Data.Bill_Date,
                    txtTotal: Data.Total
                });

                setPurchaseId(Data.Purchase_Id);
                setShow(true);
            }

        }
        catch (error) {
            toast.error(error);
        }
        finally {
            setPanelLoading(false);
        }
    }


    const formatDate = (Data) => {
        if (!Data) return "";
        const date = new Date(Data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [globalFilter, setGlobalFilter] = useState("");

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        V_Id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Bill_No: { value: null, matchMode: FilterMatchMode.EQUALS },
        GrossAmt: { value: null, matchMode: FilterMatchMode.CONTAINS },
        TotalAmt: { value: null, matchMode: FilterMatchMode.EQUALS },
        GST_Type: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Bill_Date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Total: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        }));
    };
    return (
        <>
            <main>
                <div className="container-fluid px-4">
                    <p className='text-right mt-3'><a style={{ textDecoration: "none" }} href="#">Home</a>/Purchase</p>
                    <div className="card mb-4">
                        <div className="card-header text-white" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            Purchase
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <InputText
                                        type="text"
                                        value={globalFilter}
                                        onChange={onGlobalFilterChange}
                                        placeholder="🔍 Search Purchase.."
                                        className="form-control border-0"
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "500",
                                            padding: "10px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px 8px 8px 8px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 text-end mb-2">
                                    <button type="button" onClick={() => setShow(true)} className='btn btn-md text-white' style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                                    }}><i className="fas fa-shopping-cart "></i> New Purchase</button>
                                </div>
                                <div className="col-md-12 table-responsive">
                                    <DataTable value={Purchase} filters={filters}
                                        globalFilter={globalFilter} showGridlines stripedRows size='small' paginator rows={5} tableStyle={{ minWidth: '100%' }}>
                                        <Column field="Bill_No" header="Bill No"></Column>
                                        <Column field="Business_Name" sortable header="Business Name"></Column>
                                        <Column field="GrossAmt" header="Gross Amt (₹)"></Column>
                                        <Column field="TotalAmt" sortable header="GST Amt (₹)"></Column>
                                        <Column field="GST_Type" header="GST Type"></Column>
                                        <Column field="Bill_Date" header="Bill Date" body={(rowData) => formatDate(rowData.Bill_Date)}></Column>
                                        <Column field="Total" header="Total (₹)"></Column>
                                        <Column className='text-center' body={editTemplate} />
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PurchasePopup getPurchase={getPurchase} PurchaseId={PurchaseId} setPurchaseId={setPurchaseId} loading={loading} setLoading={setLoading} show={show} setShow={setShow} initialValues={initialValues} setInitialValues={setInitialValues} />
                {Panelloading ? loadingPanel : null}
            </main>
        </>
    )
}
