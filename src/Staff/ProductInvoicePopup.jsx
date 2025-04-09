import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getData } from "../APIConfig/ConfigAPI";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function ProductInvoicePopup({ show, setShow, invoiceProducts, setInvoiceProducts }) {
    const [products, setProducts] = useState([]); // Store fetched products
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rate, setRate] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [maxqty, setMaxQty] = useState(0);
    const [gstPerUnit, setGstPerUnit] = useState(0);
    const [gstTotal, setGstTotal] = useState(0);
    const [P_Id, setP_Id] = useState(0);

    // Fetch products from API when modal opens
    useEffect(() => {
        if (show) {
            fetchProducts();
        }
    }, [show]);

    const fetchProducts = async () => {
        try {
            const tripId = localStorage.getItem("TripId");
            const Response = await getData(`Load_Stock/Get/${tripId}`);
            console.log(Response);
            if (Response.Status === "OK") {
                setProducts(Array.isArray(Response.Result) ? Response.Result : [Response.Result]);
            } else {
                toast.error("Failed to fetch stock details.");
            }
        } catch (error) {
            toast.error("Error fetching stock details.");
            console.error(error);
        }
    };

    // Handle Product Selection
    const handleProductChange = (value) => {
        const product = products.find((p) => p.LoadStock_Id == value);
        console.log(product);
        if (product) {
            setSelectedProduct(product);
            setRate(product.Price);
            setMaxQty(product.Total_Qty);
            // Calculate GST per unit based on product GST percentage
            const calculatedGstPerUnit = product.Price * (product.GST / 100);
            setGstPerUnit(calculatedGstPerUnit);
            // Calculate total values with initial quantity
            setTotal(product.Price * quantity);
            setGstTotal(calculatedGstPerUnit * quantity);
            setP_Id(product.P_Id);
        }
    };

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value, 10) || 0;
        if (qty < 1) {
            toast.error("Quantity must be at least 1.");
            return;
        }
        if (qty > maxqty) {
            toast.error(`Quantity can't exceed ${maxqty}.`);
            return;
        }
        setQuantity(qty);
        setTotal(rate * qty);
        setGstTotal(gstPerUnit * qty);
    };

    const handleSave = () => {
        if (!selectedProduct) {
            toast.error("Please select a product.");
            return;
        }
        if (quantity < 1) {
            toast.error("Quantity must be at least 1.");
            return;
        }
        if (quantity > maxqty) {
            toast.error(`Quantity can't exceed ${maxqty}.`);
            return;
        }

        // Check if an item with the same LoadStock_Id already exists
        const existingIndex = invoiceProducts.findIndex(
            (item) => item.LoadStock_Id === selectedProduct.LoadStock_Id
        );

        if (existingIndex !== -1) {
            // Update the existing record by adding the new quantity
            setInvoiceProducts((prev) =>
                prev.map((item, idx) => {
                    if (idx === existingIndex) {
                        let newQty = item.Quantity + quantity;
                        if (newQty > maxqty) {
                            toast.error(`Total Quantity Can't Exceed ${maxqty}.`);
                            newQty = maxqty;
                        }
                        return {
                            ...item,
                            Quantity: newQty,
                            Total: rate * newQty,
                            Total_GST: gstPerUnit * newQty,
                        };
                    }
                    return item;
                })
            );
            Swal.fire({
                icon: "success",
                title: "Product Updated",
                text: `"${selectedProduct.Name}" Updated in the Invoice!`,
                timer: 3000,
                showConfirmButton: false,
                didClose: () => setShow(false), 
            });
        } else {
            // Add new product as a new invoice item
            const newInvoiceItem = {
                LoadStock_Id: selectedProduct.LoadStock_Id,
                Brand: selectedProduct.Brand,
                Name: selectedProduct.Name,
                MFG_Date: selectedProduct.MFG_Date,
                Exp_Date: selectedProduct.Exp_Date,
                GST: selectedProduct.GST,
                Price: rate,
                Quantity: quantity,
                Total: total,
                GST_perUnit: gstPerUnit,
                Total_GST: gstTotal,
                maxqty: maxqty,
                P_Id : P_Id
            };
            setInvoiceProducts((prev) => [...prev, newInvoiceItem]);
            Swal.fire({
                icon: "success",
                title: "Product Added",
                text: `"${selectedProduct.Name}" added! Total: ₹${total}`,
                timer: 3000,
                showConfirmButton: false,
                didClose: () => setShow(false),
            });
        }

        // Reset form state
        setSelectedProduct(null);
        setRate(0);
        setQuantity(1);
        setTotal(0);
        setMaxQty(0);
        setGstPerUnit(0);
        setGstTotal(0);
        setP_Id(0);
    };
    return (
        <>
            {/* Modal structure with model class */}
            <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                            <strong className="modal-title">Invoice Detail</strong>
                            <button type="button" onClick={() => setShow(false)} className="btn-close"></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                {/* Product Selection */}
                                <div className="mb-3">
                                    <b>Material</b> <span className="text-danger">*</span>
                                    <select className="form-select" value={selectedProduct?.LoadStock_Id || ""} onChange={(e) => handleProductChange(e.target.value)}>
                                        <option value="">-- Select Product --</option>
                                        {products.map((product) => (
                                            <option key={product.LoadStock_Id} value={product.LoadStock_Id}>
                                                {product.Brand} | {product.Name} | {new Date(product.MFG_Date).toLocaleDateString()} | {new Date(product.Exp_Date).toLocaleDateString()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Rate, Quantity & Total */}
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <b>Rate (₹)</b> <span className="text-danger">*</span>
                                        <span className="form-control">₹ {rate}</span>
                                    </div>
                                    <div>
                                        <b>Qty</b> <span className="text-danger">*</span><br />
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            style={{ width: "90px", display: "inline-block" }}
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <b>Total (₹)</b> <span className="text-danger">*</span>
                                        <p>₹ {total}</p>
                                    </div>
                                </div>

                                {/* GST Details */}
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div>
                                        <b>GST Per Unit (₹)</b> <span className="text-danger">*</span>
                                        <p>₹ {gstPerUnit.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <b>Total GST (₹)</b> <span className="text-danger">*</span>
                                        <p>₹ {gstTotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={handleSave} style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", "color": "white" }}>
                                Save
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => setShow(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal backdrop */}
            {show && <div className="modal-backdrop show"></div>}

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
