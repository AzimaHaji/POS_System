import React, { useEffect, useState } from "react";
import { getData, postData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";

export default function OrdersView({ TripId }) {
    const [orders, setOrders] = useState([]);
    const [assigning, setAssigning] = useState(null);

    useEffect(() => {
        if (TripId) {
            fetchUnassignedOrders();
        }
    }, [TripId]);

    const fetchUnassignedOrders = async () => {
        try {
            const response = await getData(`Get/FilterOrderByTripId`);
            
            if (response.Status === "OK" && response.Result?.length > 0) { 
                setOrders(response.Result);
                console.log(response.Result);
            } else {
                setOrders([]); 
                toast.warn("No unassigned orders found.");
            }
        } catch (error) {
            toast.error("Error fetching orders.");
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString("en-GB") : "N/A";
    };

    const assignOrderToTrip = async (OrderProduct_Id) => {
        if (!OrderProduct_Id) return; // ✅ Prevent execution if ID is missing
        setAssigning(OrderProduct_Id);

        try {
            const response = await postData("AssignOrder/Add", { OrderProduct_Id, Trip_Id: TripId });

            if (response.Status === "OK") {
                toast.success("Order Assigned Successfully!");

                // ✅ Remove assigned order from state only if it exists
                setOrders((prevOrders) => prevOrders.filter(order => order.OrderProduct_Id !== OrderProduct_Id));
            } else {
                toast.error(response.Message || "Failed to Assign Order.");
            }
        } catch (error) {
            toast.error("Error assigning order.");
            console.error(error);
        }

        setAssigning(null);
    };

    return (
        <div className="card shadow-sm">
            {/* Header */}
            <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                <h5 className="mb-0">📦 Unassigned Orders</h5>
            </div>

            {/* Body */}
            <div className="card-body">
                {orders.length === 0 ? (
                    <p className="text-center text-muted">No unassigned orders available.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", textAlign: "center" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Order Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.OrderProduct_Id} style={{ textAlign: "center" }}>
                                        <td>{index + 1}</td>
                                        <td>{order.Customer_Name || "N/A"}</td>
                                        <td>{order.ProductName || "N/A"}</td>
                                        <td>₹ {order.Price?.toFixed(2) || "0.00"}</td>
                                        <td>{order.Qty || "0"}</td>
                                        <td>{formatDate(order.Created_At)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => assignOrderToTrip(order.OrderProduct_Id)}
                                                disabled={assigning === order.OrderProduct_Id}
                                            >
                                                {assigning === order.OrderProduct_Id ? "Assigning..." : "Assign"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
