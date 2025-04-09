<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageOrder_Product extends Model
{
    public function AddOrder_Product($req)
    {
        try {

            $P_IdExists = DB::table('productmst')->where('P_Id', $req['P_Id'])->exists();

            if (!$P_IdExists) {
                return "Invalid P_Id. It Does Not Exist.";
            }

            $Order_Id = DB::table('ordermst')->where('Order_Id', $req['Order_Id'])->exists();

            if (!$Order_Id) {
                return "Invalid Order_Id. It Does Not Exist.";
            }

            $AddData = [
                "P_Id" => $req['P_Id'],
                "Qty" => $req['Qty'],
                "Order_Id" => $req['Order_Id']
            ];

            DB::table("order_product")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetOrder_Product()
    {
        try {
            $Result = DB::table('order_product')
                ->join('productmst', 'order_product.P_Id', '=', 'productmst.P_Id')
                ->join('ordermst', 'order_product.Order_Id', '=', 'ordermst.Order_Id') // Fixed join condition
                ->join('customer_mst', 'ordermst.C_Id', '=', 'customer_mst.C_Id') // Fetch Customer details
                ->select(
                    'order_product.*',
                    'customer_mst.Customer_Name', 
                    'order_product.Qty',
                    'productmst.Name as Product_Name',
                    'productmst.Price'
                )
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return response()->json([
                'Status' => 'Error',
                'Message' => $Exp->getMessage()
            ]);
        }
    }
    public function UpdateOrder_Product($req)
    {

        $Exists = DB::table('order_product')->where([
            "OrderProduct_Id" => $req['OrderProduct_Id']
        ])->exists();

        $AddData = [
            "P_Id" => $req['P_Id'],
            "Qty" => $req['Qty'],
            "Order_Id" => $req['Order_Id']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('order_product')->where(["OrderProduct_Id" => $req['OrderProduct_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
}
