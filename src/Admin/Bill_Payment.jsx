import React, { useContext, useEffect, useState } from 'react';
import { loadingContext } from '../App';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';
import { getData } from '../APIConfig/ConfigAPI';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import Bill_PaymentPopup from './Popups/Bill_PaymentPopup';

export default function Bill_Payment() {
    const [show, setShow] = useState(false);
    const [Bill, setBill] = useState([]);
    const [B_Id, setB_Id] = useState(0);
    const [Purchase_Id, setPurchase_Id] = useState(0);
    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [initialValues, setInitialValues] = useState({
        txtBill_No: "",
        txtAmount: "",
        txtPayment_Mode: "",
        txtRef_No: "",
        txtPayment_Date: ""
    });

    const [globalFilter, setGlobalFilter] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        getBill();
    }, []);

    const getBill = async () => {
        try {
            const Response = await getData("Purchasemst/Get");
            if (Response.Status === "OK") {
                // 🔹 Remove fully paid bills from UI
                const unpaidBills = Response.Result.filter(bill => (bill.Total - bill.paid) > 0);
                setBill(unpaidBills);
            } else {
                toast.error("Error Fetching Bill Payment list.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
        });
    };

    const FetchBill = async (Id, remainingAmount) => {
        if (remainingAmount === 0) {
            toast.info("It's Paid! No remaining balance.", { position: "top-right" });
            return;
        }

        try {
            setPanelLoading(true);
            const Response = await getData("GetPurchaseById/Get/" + Id);
            if (Response.Status === "OK") {
                const Data = Response.Result;

                setInitialValues({
                    txtBill_No: Data.Bill_No,
                    txtAmount: remainingAmount,
                    txtPayment_Mode: "",
                    txtRef_No: "",
                    txtPayment_Date: "",
                });

                setPurchase_Id(Data.Purchase_Id);
                setB_Id(Data.Purchase_Id);
                setShow(true);
            } else {
                toast.error("Error Fetching Customer data.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    };

    const iconRupee = (rowData) => {
        const totalAmount = rowData.Total || 0;
        const paidAmount = rowData.paid || 0;
        const remainingAmount = totalAmount - paidAmount;

        return (
            <button
                type="button"
                className={`btn btn-md ${remainingAmount === 0 ? "btn-secondary" : "btn-primary"}`}
                onClick={() => FetchBill(rowData.Purchase_Id, remainingAmount)}
                disabled={remainingAmount === 0}
                style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
            >
                <i className='fa-solid fa-indian-rupee-sign'></i>
            </button>
        );
    };

    const formatDate = (Data) => {
        if (!Data) return "";
        const date = new Date(Data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <main>
            <div className="container-fluid px-4">
                <p className="text-right mt-3">
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Bill Payment
                </p>
                <div className="card mb-2">
                    <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        Bill Payment
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Bill.."
                                    className="form-control border-0"
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        padding: "10px",
                                        background: "#f8f9fa",
                                        borderRadius: "8px",
                                    }}
                                />
                            </div>

                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={Bill || []}
                                    showGridlines
                                    stripedRows
                                    size="small"
                                    paginator
                                    rows={5}
                                    filters={filters}
                                    globalFilterFields={["Bill_No", "GrossAmt", "TotalAmt", "GST_Type", "Bill_Date", "Business_Name", "paid"]}
                                    tableStyle={{ minWidth: "100%" }}
                                >
                                    <Column field="Bill_No" sortable header="Bill No"></Column>
                                    <Column field="Business_Name" sortable header="Business Name"></Column>
                                    <Column field="Bill_Date" sortable header="Bill Date" body={(rowData) => formatDate(rowData.Bill_Date)}></Column>
                                    <Column field="GrossAmt" sortable header="Gross Amt (₹)"></Column>
                                    <Column field="GST_Type" sortable header="GST Type"></Column>
                                    <Column field="TotalAmt" sortable header="GST Amt (₹)"></Column>
                                    <Column field="Total" sortable header="Total (₹)"></Column>

                                    <Column
                                        field="paid"
                                        header="Paid (₹)"
                                        body={(rowData) => `₹ ${rowData.paid?.toLocaleString("en-IN") || 0}`}
                                    />

                                    <Column
                                        field="remaining"
                                        header="Remaining (₹)"
                                        body={(rowData) => {
                                            const totalAmt = rowData.Total || 0;
                                            const paidAmount = rowData.paid || 0;
                                            return `₹ ${(totalAmt - paidAmount).toLocaleString("en-IN")}`;
                                        }}
                                    />
                                    <Column body={iconRupee}></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Bill_PaymentPopup
                show={show}
                setShow={setShow}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                getBill={getBill}
                setBill={setBill} // ✅ Update the bill list in popup
                B_Id={B_Id}
                setB_Id={setB_Id}
                setPurchase_Id={setPurchase_Id}
                Purchase_Id={Purchase_Id}
                loading={loading}
                setLoading={setLoading}
            />
            {Panelloading ? loadingPanel : null}
        </main>
    );
}
