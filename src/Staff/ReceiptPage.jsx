import React, { useEffect, useState } from "react";
import Receipt from "./Receipt";

const ReceiptPage = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    // Fetch receipt details from API
    fetch("http://127.0.0.1:8000/api/Receiptmst/receiptDetails/16")  // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => setInvoiceData(data.Result))
      .catch((error) => console.error("Error fetching invoice:", error));
  }, []);

  return (
    <div>
      {invoiceData ? <Receipt invoiceData={invoiceData} /> : <p>Loading...</p>}
    </div>
  );
};

export default ReceiptPage;
