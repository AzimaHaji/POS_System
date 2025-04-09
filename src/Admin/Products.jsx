import React, { useContext, useEffect, useState } from 'react'
import ProductPopup from './Popups/ProductPopup';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { deleteData, getData } from '../APIConfig/ConfigAPI';
import { toast } from 'react-toastify';
import { loadingContext } from '../App';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

export default function Products() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Panelloading, setPanelLoading] = useState(false);
    const [initialValues, setinitialValues] = useState({
        txtName: "",
        txtWeight: "",
        txtUnit: "",
        txtPrice: "",
        txtNet: "",
        txtFSSAI: "",
        txtBarcode: "",
        txtBrand: "",
        txtHSN: "",
        txtGST: ""
    });

    const [ProductId, setProductId] = useState(0);
    const [Products, setProducts] = useState([]);
    const loadingPanel = useContext(loadingContext);

    const getProduct = async () => {
        try {
            setPanelLoading(true);
            const Response = await getData("Get/Productmst");
            if (Response.Status == "OK") {
                setProducts(Response.Result);
            }
            else {
                toast.error("Data Fetching Error..!!");
            }
        }
        catch (error) {
            console.error("Error", error);
        }
        finally {
            setPanelLoading(false);
        }
    }

    const deleteProduct = async (Id) => {
        if (window.confirm("Are You Sure Want To Delete..!!")) {
            try {
                setPanelLoading(true);
                const Response = await deleteData("Delete/Productmst/" + Id);
                if (Response.Status == "OK") {
                    toast.success("Successfully Deleted");
                    getProduct();
                }
            }
            catch (error) {
                console.error("Error", error);
            }
            finally {
                setPanelLoading(false);
            }
        }
    }

    const fetchProduct = async (Id) => {
        try {
            setPanelLoading(true);
            const Response = await getData("Get/ProductById/" + Id);
            if (Response.Status == "OK") {
                const Data = Response.Result;
                console.log(Data);
                setinitialValues({
                    txtName: Data.Name,
                    txtWeight: Data.Weight,
                    txtUnit: Data.Unit,
                    txtPrice: Data.Price,
                    txtNet: Data.Net_Qty,
                    txtFSSAI: Data.FSSAI,
                    txtBarcode: Data.Barcode,
                    txtBrand: Data.Brand,
                    txtHSN: Data.HSN,
                    txtGST: Data.GST
                });
                setProductId(Data.P_Id);
                setShow(true);
            }
        }
        catch (error) {
            console.error("Error", error);
        }
        finally {
            setPanelLoading(false);
        }
    }

    const editTemplate = (product) => {
        return <button onClick={() => fetchProduct(product.P_Id)} className="btn btn-success btn-sm">
            <i className="fas fa-edit"></i>
        </button>
    };

    const deleteTemplate = (product) => {
        return <button onClick={() => deleteProduct(product.P_Id)} className="btn btn-danger btn-sm">
            <i className="fas fa-trash"></i>
        </button>
    };

    const unitTemplate = (product) => {
        return <span>{product.Weight} {product.Unit}</span>
    };

    const formatCurrency = (value) => {
        return value
            ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value)
            : "-";
    };


    useEffect(() => {
        getProduct();
    }, []);


    const [globalFilter, setGlobalFilter] = useState("");

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Weight: { value: null, matchMode: FilterMatchMode.EQUALS },
        Unit: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Price: { value: null, matchMode: FilterMatchMode.EQUALS },
        Net_Qty: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FSSAI: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Barcode: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Brand: { value: null, matchMode: FilterMatchMode.CONTAINS },
        HSN: { value: null, matchMode: FilterMatchMode.CONTAINS },
        GST: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        }));
    };
    return (
        <main>
            <div className="container-fluid px-4">
                <p className='text-right mt-3'><a style={{ textDecoration: "none" }} href="#">Home</a>/Products</p>
                <div className="card mb-4">
                    <div className="card-header text-white" style={{
                        background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                    }}>
                        Products
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <InputText
                                    type="text"
                                    value={globalFilter}
                                    onChange={onGlobalFilterChange}
                                    placeholder="🔍 Search Product.."
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
                                }}><i className="fas fa-plus-circle"></i> New Product</button>
                            </div>
                            <div className="col-md-12 table-responsive" >
                                <DataTable value={Products} showGridlines filters={filters}
                                    globalFilter={globalFilter} 
                                    filterDisplay="menu" stripedRows size='small' paginator rows={5} tableStyle={{ minWidth: '100%' }}>
                                    <Column field="Brand" header="Brand"></Column>
                                    <Column field="Name" sortable header="Name"></Column>
                                    <Column body={unitTemplate} sortable header="Weight"></Column>
                                    <Column body={(Data) => formatCurrency(Data.Price)} sortable header="Price (₹)"></Column>
                                    <Column field="GST" header="GST"></Column>
                                    <Column field="Net_Qty" sortable header="Net Qty"></Column>
                                    <Column field="HSN" header="HSN"></Column>
                                    <Column field="Barcode" header="Barcode"></Column>
                                    <Column field="FSSAI" header="FSSAI"></Column>
                                    <Column className='text-center' body={deleteTemplate} />
                                    <Column className='text-center' body={editTemplate} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductPopup setinitialValues={setinitialValues} getProduct={getProduct} ProductId={ProductId} setProductId={setProductId} loading={loading} setLoading={setLoading} show={show} setShow={setShow} initialValues={initialValues} />
            {Panelloading ? loadingPanel : null}
        </main>
    )
}
