import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { getData } from "../APIConfig/ConfigAPI";
import { loadingContext } from "../App";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import VendorPopup from "./Popups/VendorPopup";
export default function Vendors() {
    const [vendorList, setVendorList] = useState([]);
    const [panelLoading, setPanelLoading] = useState(false);
    const loadingPanel = useContext(loadingContext);

    const [globalFilter, setGlobalFilter] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [showPopup, setShowPopup] = useState(false);
    const [vendorId, setVendorId] = useState(0);
    const [initialValues, setInitialValues] = useState({
        txtBusiness_Name: "",
        txtContact_Person: "",
        txtAddress: "",
        txtContactNo: "",
        txtAlter_ContactNo: "",
        txtGST_In: "",
    });

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters({
            ...filters,
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        });
    };

    const getVendors = useCallback(async () => {
        try {
            setPanelLoading(true);
            const response = await getData("Vendors/Get");
            if (response.Status === "OK") {
                setVendorList(response.Result);
            } else {
                toast.error("Error fetching vendor list.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPanelLoading(false);
        }
    }, []);

    useEffect(() => {
        getVendors();
    }, [getVendors]);

    const actionBodyTemplate = (rowData) => {
        return (
            <button
                className="btn btn-sm btn-success"
                onClick={() => {
                    setInitialValues({
                        txtBusiness_Name: rowData.Business_Name,
                        txtContact_Person: rowData.Contact_Person,
                        txtAddress: rowData.Address,
                        txtContactNo: rowData.ContactNo,
                        txtAlter_ContactNo: rowData.Alter_ContactNo,
                        txtGST_In: rowData.GST_In,
                    });
                    setVendorId(rowData.V_Id);
                    setShowPopup(true);
                }}
            >
                <i className="fas fa-edit"></i>
            </button>
        );
    };

    return (
        <main>
            <div className="container-fluid px-4">
                <p className="text-right mt-3">
                    <a style={{ textDecoration: "none" }} href="#">Home</a> / Vendors
                </p>
                <div className="card mb-2">
                    <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                        Vendors
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Vendors..."
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

                            <div className="col-md-8 mb-3 text-end">
                                <button className="btn" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" , color:"white"}} onClick={() => {
                                    setVendorId(0);
                                    setInitialValues({
                                        txtBusiness_Name: "",
                                        txtContact_Person: "",
                                        txtAddress: "",
                                        txtContactNo: "",
                                        txtAlter_ContactNo: "",
                                        txtGST_In: ""
                                    });
                                    setShowPopup(true);
                                }}>
                                    <i className="fas fa-user-plus me-2"></i> Add Vendor
                                </button>
                            </div>

                            <div className="col-md-12 table-responsive">
                                <DataTable
                                    value={vendorList}
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
                                    <Column field="Business_Name" header="Business Name" sortable />
                                    <Column field="Contact_Person" header="Contact Person" sortable />
                                    <Column field="Address" header="Address" />
                                    <Column field="ContactNo" header="Contact No" />
                                    <Column field="Alter_ContactNo" header="Alt. Contact No" />
                                    <Column field="GST_In" header="GST IN" />
                                    <Column header="Actions" body={actionBodyTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VendorPopup
                show={showPopup}
                setShow={setShowPopup}
                VendorId={vendorId}
                setVendorId={setVendorId}
                loading={panelLoading}
                setLoading={setPanelLoading}
                getVendors={getVendors}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
            />

            {panelLoading ? loadingPanel : null}
        </main>
    );
}
