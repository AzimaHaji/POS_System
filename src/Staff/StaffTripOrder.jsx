import React, { useEffect, useState } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";

export default function StaffTripOrder() {
    const [orderTripData, setOrderTripData] = useState([]);
    const [placedOrders, setPlacedOrders] = useState({});
    const TripId = localStorage.getItem("TripId");

    useEffect(() => {
        const fetchOrderTrip = async () => {
            try {
                if (!TripId) {
                    toast.error("Trip ID not found.");
                    return;
                }

                const response = await getData(`Get/GetOrderByTripId/${TripId}`);
                if (response.Status === "OK") {
                    setOrderTripData(response.Result);
                } else {
                    toast.error("Failed to fetch trip orders.");
                }
            } catch (error) {
                toast.error("Error fetching trip orders.");
                console.error(error);
            }
        };

        fetchOrderTrip();
        
    }, [TripId]);

    const handleOrderPlaced = (orderId) => {
        toast.success(`Order ID ${orderId} marked as placed.`);
        setPlacedOrders((prev) => ({ ...prev, [orderId]: true }));
    };

    return (
        <div className="card shadow-sm mt-2">
            <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}>
                <h5 className="mb-0">Orders for Trip ID : {TripId || "N/A"}</h5>
            </div>

            <div className="card-body table-responsive">
                {orderTripData.length > 0 ? (
                    <table className="table table-bordered">
                        <thead className="table" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", textAlign: "center" }}>
                            <tr>
                                <th>Customer Name</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Total (₹)</th>
                                <th>Delivery Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderTripData.map((order) => {
                                const isPlaced = placedOrders[order.OrderAssign_Id];
                                return (
                                    <tr key={order.OrderAssign_Id} style={{ textAlign: "center" }}>
                                        <td>{order.Customer_Name}</td>
                                        <td>{order.Name}</td>
                                        <td>{order.Qty}</td>
                                        <td>₹{order.Price}</td>
                                        <td>₹{(order.Qty * order.Price).toFixed(2)}</td>
                                        <td>{new Date(order.Delivery_Date).toLocaleDateString("en-GB")}</td>
                                        <td>
                                            <button
                                                className={`btn ${isPlaced ? "btn-secondary" : "btn-success"} btn-sm`}
                                                onClick={() => handleOrderPlaced(order.OrderAssign_Id)}
                                                disabled={isPlaced}
                                            >
                                                {isPlaced ? "✅ Order Placed" : "Place Order"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No Orders Found for this Trip.</p>
                )}
            </div>
        </div>
    );
}
