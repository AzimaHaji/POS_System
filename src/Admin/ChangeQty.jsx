import React, { useEffect, useState } from "react";
import { putData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ChangeQty({ show, setShow, LoadStock_Id, setInitialQty, initialQty, fetchStockData, availableStock }) {


    const handleUpdateQty = async (e) => {
        e.preventDefault();


        // ✅ Prevent exceeding available stock
        if (initialQty > availableStock) {
            toast.error(`Cannot update. Available stock is only ${availableStock}.`);
            return;
        }

        try {
            const response = await putData("Load_Stock/Update", {
                LoadStock_Id: LoadStock_Id,
                Qty: initialQty,
            });

            if (response.Status === "OK") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Quantity updated successfully!",
                    confirmButtonColor: "#3085d6",
                }).then(() => {
                    setShow(false); // ✅ Close popup after update
                    fetchStockData(); // ✅ Refresh stock data
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: response.Message || "Failed to update quantity.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error updating quantity.",
            });
            console.error("Update Qty Error:", error);
        }
    };

    useEffect(() => {

    }, [initialQty])

    return (
        show && (
            <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Quantity</h5>
                            <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateQty}>
                                <div className="mb-3">
                                    <label className="form-label">New Quantity:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="InitialQty"
                                        value={initialQty}
                                        onChange={(e) => {
                                            let value = parseInt(e.target.value, 10) || 0;
                                            value = Math.max(0, value);
                                            setInitialQty(value);
                                        }}
                                        min="0"
                                        max={availableStock}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Quantity</button>
                                <button type="button" className="btn btn-secondary ms-2" onClick={() => setShow(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
