import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Receipt = ({ invoiceData }) => {
  const navigate = useNavigate();

  if (!invoiceData || !invoiceData.InvoiceDetail) {
    return <p>Loading receipt...</p>;
  }

  const handlePrint = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to print the receipt?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Print!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/print-receipt", { state: { invoiceData } });
      }
    });
  };

  return (
    <div className="container receipt-container mt-4 p-4 border rounded shadow">
      {/* Header */}
      <div className="receipt-header text-center">
        <h2>Invoice Receipt</h2>
        <p><strong>Date:</strong> {invoiceData.Rec_Date}</p>
      </div>

      {/* Customer Details */}
      <div className="mb-3">
        <h5>Customer Details</h5>
        <p><strong>Name:</strong> {invoiceData.Customer_Name}</p>
        <p><strong>Email:</strong> {invoiceData.Email}</p>
        <p><strong>Contact No:</strong> {invoiceData.ContactNo}</p>
        <p><strong>GST No:</strong> {invoiceData.GST_No}</p>
      </div>

      {/* Invoice Details */}
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Item</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.InvoiceDetail.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Brand}</td>
              <td>{item.Qty}</td>
              <td>₹{item.Rate}</td>
              <td>{item.GST}%</td>
              <td>₹{item.Total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="text-end fw-bold">
        <p><strong>Total Gross:</strong> ₹{invoiceData.Total_Gross}</p>
        <p><strong>GST Type:</strong> {invoiceData.GST_Type}</p>
        <p><strong>Grand Total:</strong> ₹{invoiceData.Grand_Total}</p>
      </div>

      {/* Print & Download Buttons */}
      <div className="text-center mt-3">
        <button className="btn btn-primary me-2" onClick={handlePrint}>
          Print
        </button>
        <button className="btn btn-success">Download PDF</button>
      </div>
    </div>
  );
};

export default Receipt;
