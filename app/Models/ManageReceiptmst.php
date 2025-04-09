<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageReceiptmst extends Model
{

    public function storeInvoice($request)
    {
        DB::beginTransaction();
        try {
            // Insert into receiptmst and get Invoice_Id
            $invoiceId = DB::table("receiptmst")->insertGetId([
                'C_Id' => $request->C_Id,
                'GST_Type' => $request->GST_Type,
                'Total_Gross' => $request->Total_Gross,
                'GST' => $request->GST,
                'Grand_Total' => $request->Grand_Total,
                'Rec_Date' => $request->Rec_Date,
                'Trip_Id' => $request->Trip_Id,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // Insert into invoiceProducts
            foreach ($request->invoiceProducts as $product) {
                $rate =  $product['Price'] - $product['GST'];
                DB::table("rec_detail")->insert([
                    'Invoice_Id' => $invoiceId, // Foreign Key
                    'LoadStock_Id' => $product['LoadStock_Id'],
                    'GST' => $product['GST'],
                    'Rate' => $rate,
                    'Amt' => $product['Price'],
                    'Qty' => $product['Quantity'],
                    'Total' => $product['Total'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            // Insert into paymentData
            foreach ($request->paymentData as $payment) {
                DB::table("invoice_payment")->insert([
                    'Invoice_Id' => $invoiceId, // Foreign Key
                    'C_Id' => $request->C_Id,
                    'Amount' => $payment['amount'],
                    'Payment_Mode' => $payment['paymentMode'],
                    'Ref_No' => $payment['refNo'],
                    'Payment_Date' => $payment['receiptDate'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            DB::commit();
            return $invoiceId;
        } catch (Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
    }

    public function GetReceiptmst()
    {
        try {

            $Result = DB::table('receiptmst')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function receiptDetails($Id)
    {
        try {
            $Result = DB::table('receiptmst')
                ->join("customer_mst", "receiptmst.C_Id",  "customer_mst.C_Id")
                ->where("receiptmst.Invoice_Id", "=", $Id)
                ->first();

            if ($Result) { // ✅ Ensure $Result is not null before assigning properties
                $Result->InvoiceDetail = DB::table('rec_detail')
                    ->join("receiptmst", "rec_detail.Invoice_Id", "=", "receiptmst.Invoice_Id")
                    ->join("load_stock", "rec_detail.LoadStock_Id", "=", "load_stock.LoadStock_Id")
                    ->join("stockmst as s1", "s1.Stock_Id", "=", "load_stock.Stock_Id")
                    ->join("productmst", "s1.P_Id", "=", "productmst.P_Id")
                    ->where("receiptmst.Invoice_Id", "=", $Id)
                    ->get();
            } else {
                return "No receipt found for this Invoice_Id";
            }




            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateReceiptmst($req)
    {


        $Exists = DB::table('receiptmst')->where([
            "Invoice_Id" => $req['Invoice_Id']
        ])->exists();


        $AddData = [
            "Rec_No" => $req['Rec_No'],
            "Customer_Name" => $req['Customer_Name'],
            "Total_Gross" => round($req['Total_Gross'], 2),
            "GST" => $req['GST'],
            "GST_Type" => $req['GST_Type'],
            "Grand_Total" => round($req['Grand_Total'], 2),
            "Rec_Date" => $req['Rec_Date']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('receiptmst')->where(["Invoice_Id" => $req['Invoice_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function GetMonthSales()
    {
        try {

            $Result =  DB::table('receiptmst as a')
                ->join('rec_detail as b', 'a.Invoice_Id', '=', 'b.Invoice_Id')
                ->selectRaw("
                YEAR(a.Created_At) AS Year, 
                MONTH(a.Created_At) AS Month, 
                DATE_FORMAT(a.Created_At, '%M') AS Month_Name, 
                COALESCE(SUM(a.Grand_Total), 0) AS Total_Sales
            ")
                ->groupByRaw("YEAR(a.Created_At), MONTH(a.Created_At), Month_Name")
                ->orderByRaw("YEAR(a.Created_At), MONTH(a.Created_At)")
                ->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function getReceiptsByDateRange($startDate, $endDate)
    {
        $receipts = DB::table('receiptmst as a')
            ->join('customer_mst as b', 'a.C_Id', '=', 'b.C_Id')
            ->whereBetween('a.Rec_Date', [$startDate, $endDate])
            ->select('a.*', 'b.Customer_Name', 'b.Email', 'b.ContactNo', 'b.GST_No') // Customize fields as needed
            ->get();

        return $receipts;
    }

    public function getOrderProductReceiptByDateRange($startDate, $endDate)
    {
        $receipts = DB::table('order_product as a')
            ->join('productmst as b', 'a.P_Id', '=', 'b.P_Id') 
            ->join('ordermst as c', 'a.Order_Id', '=', 'c.Order_Id') 
            ->whereBetween('c.Order_Date', [$startDate, $endDate])
            ->select('a.*', 'b.Name as ProductName', 'b.Price', 'c.*') 
            ->get();


        return $receipts;
    }
}
