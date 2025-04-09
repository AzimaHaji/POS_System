import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Demo from "./Demo";
import AdminLogin from "./Admin/AdminLogin";
import Products from "./Admin/Products";
import Staff from "./Admin/Staff";
import Stock from "./Admin/Stock";
import ChangeProfile from "./Admin/ChangeProfile";
import ChangePassword from "./Admin/ChangePassword";
import Customer from "./Admin/Customer";
import Bill_Payment from "./Admin/Bill_Payment";
import Trip_mst from "./Admin/Trip_Mst";
import Purchase from "./Admin/purchase";
import Vehicle from "./Admin/Vehicle";
import TripDetails from "./Admin/TripDetails";
import StockDetails from "./Admin/StockDetails";
import StaffLogin from "./Staff/StaffLogin";
import StaffSide from "./StaffSide";
import ChangeStaffProfile from "./Schema/ChangeStaffProfileSchema";
import ViewTrip from "./Staff/ViewTrip";
import SetPassword from "./pages/SetPassword";
import InvoiceDetails from "./Staff/InvoiceDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ReceiptPage from "./Staff/ReceiptPage.jsx";
import PrintReceipt from "./Staff/PrintReceipt.jsx";
import OrderDetails from "./Staff/OrderDetails.jsx";
import OrderReceipt from "./Staff/OrderReceipt.jsx";
import OrderReceiptByDate from "./Staff/OrderReceiptByDate.jsx";
import StockReport from "./Staff/StockReport.jsx";
import TripReport from "./Staff/TripReport.jsx";
import TripReceiptReport from "./Admin/Popups/TripReceiptReport.jsx";
import SalesReportChart from "./Staff/SalesReportChart.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import TripOrder from "./Admin/TripOrder.jsx";
import OrderProductReport from "./Admin/OrderProductReport.jsx";
import StaffTripOrder from "./Staff/StaffTripOrder.jsx";
import Vendors from "./Admin/Vendors.jsx";

export const loadingContext = createContext();
export const UserContext = createContext();

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("UserName") || "Admin");
  const [staffName, setStaffName] = useState(localStorage.getItem("StaffName") || "Staff");


  return (
    <loadingContext.Provider value={<div>Loading...</div>}>
      <UserContext.Provider value={{ userName, setUserName, staffName, setStaffName }}>  {/* ✅ Provide context */}
        <BrowserRouter>
          <Routes>
            <Route path="/Admin/Dashboard" element={<Demo Component={<Dashboard />} />} />
            <Route path="/Admin/Log_In" element={<AdminLogin />} />
            <Route path="/Admin/Products" element={<Demo Component={<Products />} />} />
            <Route path="/Admin/Staff" element={<Demo Component={<Staff />} />} />
            <Route path="/Admin/Purchase" element={<Demo Component={<Purchase />} />} />
            <Route path="/Admin/Vendors" element={<Demo Component={<Vendors />} />} />
            <Route path="/Admin/Stock" element={<Demo Component={<Stock />} />} />
            <Route path="/Admin/Customer" element={<Demo Component={<Customer />} />} />
            <Route path="/Admin/Bill_Payment" element={<Demo Component={<Bill_Payment />} />} />
            <Route path="/Admin/Vehicle" element={<Demo Component={<Vehicle />} />} />
            <Route path="/Admin/Trip_Mst" element={<Demo Component={<Trip_mst />} />} />
            <Route path="/Admin/Details/:TripId" element={<Demo Component={<TripDetails />} />} />
            <Route path="/Admin/Details/:TripId" element={<Demo Component={<TripOrder />} />} />
            <Route path="/Admin/Details/:TripId" element={<Demo Component={<StockDetails />} />} />
            <Route path="/Admin/OrderReceiptByDate" element={<Demo Component={<OrderReceiptByDate />} />} />
            <Route path="/Admin/OrderProductReceiptByDate" element={<Demo Component={<OrderProductReport />} />} />
            <Route path="/Admin/StockReport" element={<Demo Component={<StockReport />} />} />
            <Route path="/admin/trip-receipt-report" element={<TripReceiptReport />} />
            <Route path="/Admin/TripReport" element={<Demo Component={<TripReport />} />} />
            <Route path="/Admin/ChangeProfile" element={<Demo Component={<ChangeProfile />} />} />
            <Route path="/Admin/ChangePassword" element={<Demo Component={<ChangePassword />} />} />

            <Route path="/Staff/Log_In" element={<StaffLogin />} />
            <Route path="/Staff/DashBoard" element={<StaffSide Component={<SalesReportChart />} />} />
            <Route path="/Staff" element={<StaffSide />} />
            <Route path="/Staff/ChangeProfile" element={<StaffSide Component={<ChangeStaffProfile />} />} />
            <Route path="/Staff/LoadStock" element={<StaffSide Component={<ViewTrip />} />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/Staff/Customer" element={<StaffSide Component={<Customer />} />} />
            <Route path="/Staff/Invoice" element={<StaffSide Component={<InvoiceDetails />} />} />
            <Route path="/Staff/Details" element={<StaffSide Component={<StaffTripOrder />} />} />
            <Route path="/Staff/ReceiptPage" element={<ReceiptPage />} />
            <Route path="/print-receipt/:invoiceId" element={<PrintReceipt />} />
            <Route path="/print-OrderReceipt/:orderId" element={<OrderReceipt />} />
            <Route path="/Staff/OrderDetails" element={<StaffSide Component={<OrderDetails />} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </loadingContext.Provider>
  );
}

export default App;
