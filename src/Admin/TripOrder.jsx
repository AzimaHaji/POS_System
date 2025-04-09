import React, { useEffect, useState } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import { toast } from "react-toastify";

export default function TripOrder({ TripId }) {
    const [orderTripData, setOrderTripData] = useState([]);

    useEffect(() => {
        const fetchOrderTrip = async () => {
            try {
                const response = await getData(`Get/GetOrderByTripId/${TripId}`);
                console.log(response);
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

    return (
        <div className="card shadow-sm">
            {/* Card Header */}
            <div
                className="card-header text-white"
                style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))" }}
            >
                <h5 className="mb-0">Orders for Trip ID: {TripId}</h5>
            </div>

            {/* Card Body */}
            <div className="card-body table-responsive">
                {orderTripData.length > 0 ? (
                    <table className="table table-bordered">
                        <thead className="table" style={{ background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))", textAlign: "center" }}>
                            <tr>
                                <th>Customer Name</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Total (₹)</th> {/* New Column */}
                                <th>Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderTripData.map((order) => (
                                <tr key={order.OrderAssign_Id} style={{ textAlign: "center" }}>
                                    <td>{order.Customer_Name}</td>
                                    <td>{order.Name}</td>
                                    <td>{order.Qty}</td>
                                    <td>₹{order.Price}</td>
                                    <td>₹{(order.Qty * order.Price).toFixed(2)}</td> {/* Multiplication for Total */}
                                    <td>{new Date(order.Delivery_Date).toLocaleDateString("en-GB")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No Orders Found for this Trip.</p>
                )}
            </div>
        </div>
    );
}
