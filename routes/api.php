<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AssignOrderController;
use App\Http\Controllers\API\BackupController as APIBackupController;
use App\Http\Controllers\API\Bill_PaymentController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\Invoice_PaymentController;
use App\Http\Controllers\API\Load_StockController;
use App\Http\Controllers\API\Order_ProductController;
use App\Http\Controllers\API\OrdermstController;
use App\Http\Controllers\API\ProductmstController;
use App\Http\Controllers\API\PurchasemstController;
use App\Http\Controllers\API\Rec_DetailController;
use App\Http\Controllers\API\ReceiptmstController;
use App\Http\Controllers\API\SetPassword;
use App\Http\Controllers\API\Staff_mstController;
use App\Http\Controllers\API\StockmstController;
use App\Http\Controllers\API\StockoutwordController;
use App\Http\Controllers\API\Trip_mstController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\VehiclemstController;
use App\Http\Controllers\API\VendorController;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\ResetPasswordController;
use Brick\Math\RoundingMode;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(UserController::class)->group(function () {
    Route::post("/User/CreateUser", "register");
    Route::post("/User/Login", "login");
})->middleware('auth:api');


Route::controller(AdminController::class)->group(function () {
    Route::post("/login", "login");
    Route::post("/NewToken", "register");
    Route::post("Admin/Add", "AddAdmin");
    Route::get("Admin/Get", "GetAdmin");
    Route::delete("Admin/Delete/{Id}", "DeleteAdmin");
    Route::put("Admin/Update", "UpdateAdmin");
    Route::post("Admin/Auth", "AuthAdmin");
    Route::post("Admin/CloseTrip", "CloseTrip");
    Route::get("GetAdminById/Get/{Id}", "GetAdminById");
    Route::put("Admin/ChangePasswd", "ChangePasswd");
});

Route::controller(Bill_PaymentController::class)->group(function () {
    Route::post("Bill_Payment/Add", "AddBill_Payment");
    Route::get("Bill_Payment/Get", "GetBill_Payment");
    Route::put("Bill_Payment/Update", "UpdateBill_Payment");
});

Route::controller(VehiclemstController::class)->group(function () {
    Route::post("Vehiclemst/Add", "AddVehiclemst");
    Route::get("Vehiclemst/Get", "GetVehiclemst");
    Route::get("Vehiclemst/GetVehicle", "GetVehicle");
    Route::put("Vehiclemst/Update", "UpdateVehiclemst");
    Route::get("GetVehicleById/Get/{Id}", "GetVehicleById");
});

Route::controller(VendorController::class)->group(function () {
    Route::post("Vendors/Add", "AddVendors");
    Route::get("Vendors/Get", "GetVendors");
    Route::get("Vendors/GetPurVen", "GetVenPur");
    Route::put("Vendors/Update", "UpdateVendors");
});

Route::controller(PurchasemstController::class)->group(function () {
    Route::post("Purchasemst/Add", "AddPurchasemst");
    Route::get("Purchasemst/Get", "GetPurchasemst");
    Route::get("Purchasemst/Get", "purchasePaymentList");
    Route::put("Purchasemst/Update", "UpdatePurchasemst");
    Route::get("GetPurchaseById/Get/{Id}", "GetPurchaseById");
});

Route::controller(ReceiptmstController::class)->group(function () {
    Route::post("Receiptmst/Add", "storeInvoice");
    Route::get("Receiptmst/Get", "GetReceiptmst");
    Route::get("Receiptmst/GetMonthSales", "GetMonthSales");
    Route::get("Receiptmst/receiptDetails/{Id}", "receiptDetails");
    Route::put("Receiptmst/Update", "UpdateReceiptmst");
    Route::post('/receipts', 'index');
    Route::post('/OrderProductReceipt', 'getOrderProductReceiptByDateRange');

});

Route::controller(Invoice_PaymentController::class)->group(function () {
    Route::post("Invoice_Payment/Add", "AddInvoice_Payment");
    Route::get("Invoice_Payment/Get", "GetInvoice_Payment");
    Route::put("Invoice_Payment/Update", "UpdateInvoice_Payment");
});

Route::controller(ProductmstController::class)->group(function () {
    Route::post("/Add/Productmst", "AddProductmst");
    Route::get("/Get/Productmst", "GetProductmst");
    Route::get("/Get/GetProductStock", "GetProductStock");
    Route::put("/Update/Productmst", "UpdateProductmst");
    Route::delete("/Delete/Productmst/{Id}", "DeleteProductmst");
    Route::get("/Get/ProductById/{Id}", "GetProductById");
});

Route::controller(StockmstController::class)->group(function () {
    Route::post("Stock/Add", "AddStockmst");
    Route::get("Stock/Get", "GetStockmst");
    Route::get("Stock/GetStockDetail", "GetStockDetail");
    Route::put("Stock/Update", "UpdateStockmst");
    Route::get("/Get/GetStockById/{Id}", "GetStockById");
    Route::get("/Get/GetStockAvailableDetail/{Id}", "GetStockAvailableDetail");
    Route::delete("/Delete/Stockmst/{Id}", "DeleteStockmst");
    Route::get('/stock-report','getStockReport');
});

Route::controller(Staff_mstController::class)->group(function () {
    Route::post("Staff_mst/Add", "AddStaff_mst");
    Route::get("Staff_mst/Get", "GetStaff_mst");
    Route::get("Staff_mst/GetStaff", "GetStaff");
    Route::put("Staff_mst/Update", "UpdateStaff_mst");
    Route::get("StaffById/Get/{Id}", "GetStaffById");
    Route::post("Staff_mst/Auth", "AuthStaff");
    Route::put("Staff_mst/UpdateStaffById_mst", "UpdateStaffById_mst");
});

Route::controller(CustomerController::class)->group(function () {
    Route::post("Customer/Add", "AddCustomer");
    Route::get("Customer/Get", "GetCustomer");
    Route::get("Customer/GetTotalCustomer", "GetTotalCustomer");
    Route::put("Customer/Update", "UpdateCustomer");
    Route::get("CustomerById/Get/{Id}", "CustomerById");
});

Route::controller(OrdermstController::class)->group(function () {
    Route::post("Ordermst/Add", "AddOrdermst");
    Route::post("Ordermst/Add", "storeOrder");
    Route::get("Ordermst/Get", "GetOrdermst");
    Route::get("Ordermst/GetOrder", "GetOrder");
    Route::get("Ordermst/getOrderDetails/{Id}", "getOrderDetails");
    Route::put("Ordermst/Update", "UpdateOrdermst");
});

Route::controller(Trip_mstController::class)->group(function () {
    Route::post("Trip_mst/Add", "AddTrip_mst");
    Route::get("Trip_mst/Get", "GetTrip_mst");
    Route::put("Trip_mst/Update", "UpdateTrip_mst");
    Route::put("Trip/Update", "UpdateTrip");
    Route::get("TripById/Get/{Id}", "GetTripById");
    Route::get("GetStaffTripById/Get/{Id}", "GetStaffTripById");
    Route::get('/Trip_mst/trip-receipts/{tripId}','getTripReceipts');
    Route::get('/trip-report','tripReport');
    Route::get("Trip_mst/getSalesReport/{tripId}", "getSalesReport");
});

Route::controller(Order_ProductController::class)->group(function () {
    Route::post("Order_Product/Add", "AddOrder_Product");
    Route::get("Order_Product/Get", "GetOrder_Product");
    Route::put("Order_Product/Update", "UpdateOrder_Product");
});

Route::controller(Load_StockController::class)->group(function () {
    Route::post("Load_Stock/Add", "AddLoad_Stock");
    Route::get("Load_Stock/Get/{Id}", "GetLoad");
    Route::put("Load_Stock/Update", "UpdateLoad_Stock");
    Route::delete("Load_Stock/Delete/{Id}", "DeleteLoadStockmst");
    Route::get("/Get/GetLoadStockById/{Id}", "GetLoadStockById");
});

Route::controller(Rec_DetailController::class)->group(function () {
    Route::post("Rec_Detail/Add", "AddRec_Detail");
    Route::get("Rec_Detail/Get", "GetRec_Detail");
    Route::put("Rec_Detail/Update", "UpdateRec_Detail");
});

Route::controller(StockoutwordController::class)->group(function () {
    Route::post("Stockoutword/Add", "AddStockoutword");
    Route::get("Stockoutword/Get", "GetStockoutword");
    Route::put("Stockoutword/Update", "UpdateStockoutword");
});

Route::get('/send-test-mail', function () {
    Mail::raw('Test email for SMTP.', function ($message) {
        $message->to('patelazima1907@gmail.com')
            ->subject('SMTP Test Email');
    });

    return response()->json(['message' => 'Test email sent!']);
});

Route::controller(AssignOrderController::class)->group(function () {
    Route::post("AssignOrder/Add", "AddOrder_Product");
    Route::get("Get/GetOrderByTripId/{Id}", "GetOrderByTripId");
    Route::get("Get/FilterOrderByTripId", "FilterOrderByTripId");

});
Route::post("Staff_mst/SetPassword", [SetPassword::class, "SetPassword"]);
Route::post("Staff_mst/ForgotPassword", [ForgotPasswordController::class, "forgotPassword"]);

Route::get('admin/download-backup', [APIBackupController::class, 'downloadDatabaseBackup']);


Route::post("ResetPassword", [ResetPasswordController::class, "resetPassword"]);
Route::post("Receiptmst/SendEmail", [ReceiptmstController::class, "SendEmail"]);













































/*Route::get('/user', function () {
    // ...
})->middleware('auth:api');*/
