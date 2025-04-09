<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageOrdermst extends Model
{
    public function AddOrdermst($req)
    {
        try {
            $AddData = [
                "Order_No" => $req['Order_No'],
                "Customer_Name" => $req['Customer_Name'],
                "ContactNo" => $req['ContactNo'],
                "Order_Date" => $req['Order_Date']
            ];

            DB::table("ordermst")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetOrdermst()
    {
        try {

            $Result = DB::table('ordermst')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateOrdermst($req)
    {


        $Exists = DB::table('ordermst')->where([
            "Order_Id" => $req['Order_Id']
        ])->exists();


        $AddData = [
            "Order_No" => $req['Order_No'],
            "Customer_Name" => $req['Customer_Name'],
            "ContactNo" => $req['ContactNo'],
            "Order_Date" => $req['Order_Date']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('ordermst')->where(["Order_Id" => $req['Order_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function getOrderDetails($Id){
        $data = DB::table("ordermst")->where("ordermst.Order_Id", "=", $Id)->first();
        $data->details = DB::table("order_product")
                            ->where("order_product.Order_Id", "=", $Id)
                            ->join("productmst", "order_product.P_Id", "productmst.P_Id")
                            ->join("ordermst", "ordermst.Order_Id", "order_product.Order_Id")
                            ->join("customer_mst", "customer_mst.C_Id", "ordermst.C_Id")
                            ->get();
        return $data;
    }
    public function storeOrder( $request)
    {
        try {
            DB::beginTransaction();

            // Insert into ordermst table
            $orderId = DB::table('ordermst')->insertGetId([
                'C_Id'            => $request->C_Id,
                'Advance_Payment' => $request->AdvanceAmount,
                'Payment_Mode'    => $request->PaymentMode,
                'Ref_No'          => $request->RefNo,
                'Order_Date'      => $request->OrderDate,
            ]);

            // Insert into order_product table
            foreach ($request->invoiceProducts as $product) {
                DB::table('order_product')->insert([
                    'Order_Id' => $orderId,
                    'P_Id'     => $product['P_Id'], // Assuming LoadStock_Id is the product ID
                    'Qty'      => $product['Quantity'],
                ]);
            }

            DB::commit();

            return $orderId;
        } catch (Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }
    }

    public function GetOrder(){
        try
        {

            $Result = DB::table('ordermst')->count();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }
}
