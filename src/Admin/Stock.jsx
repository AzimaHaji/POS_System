import React, { useContext, useEffect, useState } from 'react';
import { loadingContext } from '../App';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../APIConfig/ConfigAPI';
import { FilterMatchMode } from 'primereact/api';
import StockPopup from './Popups/StockPopup';

export default function Stock() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [Stock, setStock] = useState([]);
    const [StockId, setStockId] = useState(0);

    const [filters, setFilters] = useState({
        Business_Name: { value: null, matchMode: FilterMatchMode.EQUALS },
        Bill_No: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const [initialValues, setInitialValues] = useState({
        txtP_Id: "",
        txtMFG_Date: "",
        txtExp_Date: "",
        txtNo_Of_Stock: "",
        txtCost_Price: "",
        txtInword_Date: ""
    });

    const getStock = async () => {
        try {
            setPanelLoading(true);
            const Response = await getData("Stock/Get");
            if (Response.Status === "OK") {
                setStock(Response.Result);
            } else {
                toast.error("Data Fetching error..!!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPanelLoading(false);
        }
    };

    useEffect(() => {
        getStock();
    }, []);

    const formatDate = (Data) => {
        if (!Data) return "";
        const date = new Date(Data);
        return date.toLocaleDateString("en-GB");
    };

    const FetchStock = async (Id) => {
        try {
            setPanelLoading(true);
            const Response = await getData("Get/GetStockById/" + Id);
            if (Response.Status === "OK") {
                const Data = Response.Result;
                setInitialValues({
                    txtP_Id: Data.P_Id,
                    txtPurchase_Id: Data.Purchase_Id,
                    txtMFG_Date: Data.MFG_Date,
                    txtExp_Date: Data.Exp_Date,
                    txtNo_Of_Stock: Data.No_Of_Stock,
                    txtCost_Price: Data.Cost_Price,
                    txtInword_Date: Data.Inword_Date
                });

                setStockId(Data.Stock_Id);
                setShow(true);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setPanelLoading(false);
        }
    };

    const editTemplate = (Stock) => (
        <button onClick={() => FetchStock(Stock.Stock_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    );

    return (
        <>
            <main>
                <div className="container-fluid px-4">
                    <p className='text-right mt-3'><a style={{ textDecoration: "none" }} href="#">Home</a>/Purchase Details</p>
                    <div className="card mb-4">
                        <div className="card-header text-white" style={{
                            background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                        }}>
                            Purchase Detail
                        </div>
                        <div className="card-body">
                            <div className="row">

                                {/* 🔹 Dropdown: Search by Vendor Name */}
                                <div className="col-md-4 mb-2">
                                    <b>Search by Vendor</b>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setFilters({ ...filters, Business_Name: { value: e.target.value, matchMode: FilterMatchMode.EQUALS } })}
                                    >
                                        <option value="">All Vendors</option>
                                        {Stock.map((item, index) => (
                                            <option key={index} value={item.Business_Name}>{item.Business_Name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 🔹 Dropdown: Search by Bill No */}
                                <div className="col-md-4 mb-2">
                                    <b>Search by Bill No</b>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setFilters({ ...filters, Bill_No: { value: e.target.value, matchMode: FilterMatchMode.EQUALS } })}
                                    >
                                        <option value="">All Bills</option>
                                        {Stock.map((item, index) => (
                                            <option key={index} value={item.Bill_No}>{item.Bill_No}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 🔹 New Stock Button */}
                                <div className="col-md-4 text-end mb-2">
                                    <button type="button" onClick={() => setShow(true)} className='btn btn-md text-white' style={{
                                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                                    }}>
                                        <i className="fas fa-boxes"></i> New Stock
                                    </button>
                                </div>

                                {/* 🔹 Data Table */}
                                <div className="col-md-12 table-responsive">
                                    <DataTable value={Stock} filters={filters} showGridlines stripedRows size='small' paginator rows={5} tableStyle={{ minWidth: '100%' }}>
                                        <Column field="Bill_No" sortable header="Bill No"></Column>
                                        <Column field="Business_Name" sortable header="Vendor Name"></Column>
                                        <Column field="Product_Name" sortable header="Product Name"></Column>
                                        <Column field="Bill_Date" sortable header="Bill Date" body={(rowData) => formatDate(rowData.Bill_Date)}></Column>
                                        <Column field="MFG_Date" header="MFG Date" body={(rowData) => formatDate(rowData.MFG_Date)}></Column>
                                        <Column field="Exp_Date" header="Exp Date" body={(rowData) => formatDate(rowData.Exp_Date)}></Column>
                                        <Column field="No_Of_Stock" sortable header="Stock"></Column>
                                        <Column field="Cost_Price" header="Price (₹)"></Column>
                                        <Column
                                            field="Total"
                                            sortable
                                            header="Total (₹)"
                                            body={(rowData) => (rowData.No_Of_Stock * rowData.Cost_Price).toFixed(2)}
                                        />
                                        <Column field="Inword_Date" header="Inword Date" body={(rowData) => formatDate(rowData.Inword_Date)}></Column>
                                        <Column className='text-center' body={editTemplate} />
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <StockPopup StockId={StockId} setStockId={setStockId} getStock={getStock} loading={loading} setLoading={setLoading} show={show} setShow={setShow} initialValues={initialValues} setInitialValues={setInitialValues} />
                {Panelloading ? loadingPanel : null}
            </main>
        </>
    );
}
