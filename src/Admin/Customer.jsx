import React, { useContext, useEffect, useState } from 'react'
import { loadingContext } from '../App';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';
import { getData } from '../APIConfig/ConfigAPI';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import CustomerPopup from './Popups/CustomerPopup';

export default function Customer() {

    const [show, setShow] = useState(false);
    const [Customer, setCustomer] = useState([]);
    const [CustId, setCustId] = useState(0);

    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [initialValues, setInitialValues] = useState({
        txtC_Name: "",
        txtEmail: "",
        txtContactNo: "",
        txtGST_No: ""
    });

    const FetchCustomer = async (Id) => {
        try {
            setPanelLoading(true);
            const Response = await getData(`CustomerById/Get/${Id}`);
            if (Response.Status === "OK") {
                const Data = Response.Result;
                setInitialValues({
                    txtC_Name: Data.Customer_Name,
                    txtEmail: Data.Email,
                    txtContactNo: Data.ContactNo,
                    txtGST_No: Data.GST_No,
                });

                setCustId(Data.C_Id);
                setShow(true);
            } else {
                toast.error("Error Fetching Customer Data.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    };

    const getCustomer = async () => {
        try {
            const Response = await getData("Customer/Get");
            if (Response.Status === "OK") {
                setCustomer(Response.Result);
            } else {
                toast.error("Error Fetching Customer list.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { value: e.target.value, matchMode: FilterMatchMode.EQUALS }
        }));
    };

    const [globalFilter, setGlobalFilter] = useState("");

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Customer_Name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ContactNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        GST_No: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const editTemplate = (Customer) => (
        <button onClick={() => FetchCustomer(Customer.C_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    );
    return (
        <main>
            <div className="container-fluid px-4">
                <p className="text-right mt-3">
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Customer
                </p>
                <div className="card mb-2">
                    <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        Customer
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* 🔹 Global Search Input */}
                            <div className="col-md-6 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Customer.."
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
                                <button
                                    type="button"
                                    className="btn btn-md text-white"
                                    style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
                                    onClick={() => {
                                        setInitialValues({
                                            txtC_Name: "",
                                            txtEmail: "",
                                            txtContactNo: "",
                                            txtGST_No: ""
                                        });
                                        setShow(true);
                                    }}
                                >
                                    <i className="fas fa-user-plus"></i> New Customer
                                </button>
                            </div>

                            {/* 🔹 Staff Table */}
                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={Customer}
                                    filters={filters}
                                    globalFilter={globalFilter} // 🔹 Apply Global Filter
                                    filterDisplay="menu"
                                    showGridlines
                                    stripedRows
                                    size="small"
                                    paginator
                                    rows={5}
                                    tableStyle={{ minWidth: "100%" }}
                                >
                                    <Column field="Customer_Name" sortable header="Customer Name"></Column>
                                    <Column field="Email" sortable header="Email"></Column>
                                    <Column field="ContactNo" sortable header="ContactNo"></Column>
                                    <Column field="GST_No" sortable header="GST No"></Column>
                                    <Column className="text-center" body={editTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerPopup show={show} setShow={setShow} initialValues={initialValues} setInitialValues={setInitialValues} getCustomer={getCustomer} CustId={CustId} setCustId={setCustId} loading={loading} setLoading={setLoading} />
            {Panelloading ? loadingPanel : null}
        </main>
    )
}
