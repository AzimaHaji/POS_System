<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageAssignOrder extends Model
{
    public function AddOrder_Product($req)
    {
        try {

            $P_IdExists = DB::table('order_product')->where('OrderProduct_Id', "=", $req['OrderProduct_Id'])->exists();

            if (!$P_IdExists) {
                return "Invalid Order Product Id. It Does Not Exist.";
            }

            $Order_Id = DB::table('trip_mst')->where('Trip_Id', "=", $req['Trip_Id'])->exists();

            if (!$Order_Id) {
                return "Invalid Trip_Id. It Does Not Exist.";
            }

            $AddData = [
                "OrderProduct_Id" => $req['OrderProduct_Id'],
                "Trip_Id" => $req['Trip_Id']
            ];

            DB::table("orderassign")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetOrderByTripId($Id)
    {
        try {
            $Exists = DB::table('orderassign')->where('Trip_Id', $Id)->exists();

            if (!$Exists) {
                return response()->json(['Status' => 'ERROR', 'Message' => 'No orders found for this Trip ID'], 404);
            }

            $Result = DB::table('orderassign')
                ->join('order_product', 'order_product.OrderProduct_Id', '=', 'orderassign.OrderProduct_Id')
                ->join('ordermst', 'ordermst.Order_Id', '=', 'order_product.Order_Id') // Ensure 'ordermst' is joined
                ->join('customer_mst', 'ordermst.C_Id', '=', 'customer_mst.C_Id')
                ->join('productmst', 'order_product.P_Id', '=', 'productmst.P_Id')
                ->where('orderassign.Trip_Id', $Id)
                ->select(
                    'orderassign.*',
                    'ordermst.*',
                    'customer_mst.Customer_Name',
                    'productmst.*',
                    'order_product.*'
                )
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return response()->json(['Status' => 'ERROR', 'Message' => $Exp->getMessage()], 500);
        }
    }

    public function FilterOrderByTripId()
    {
        try {
            $orders = DB::table('order_product as a')
                ->join('productmst as b', 'a.P_Id', '=', 'b.P_Id')
                ->join('ordermst as c', 'a.Order_Id', '=', 'c.Order_Id') // Corrected: Join ordermst on Order_Id
                ->join('customer_mst as d', 'c.C_Id', '=', 'd.C_Id') // Corrected: Join customer_mst on ordermst.C_Id
                ->whereNotIn('a.OrderProduct_Id', function ($query) {
                    $query->select('OrderProduct_Id')->from('orderassign');
                })
                ->select(
                    'a.*',
                    'b.Name as ProductName',
                    'b.Price',
                    'd.Customer_Name',
                    'd.Email',
                    'd.ContactNo'
                ) // Selecting customer details from customer_mst (d)
                ->get();

            return $orders;
        } catch (Exception $Exp) {
            return response()->json(['Status' => 'ERROR', 'Message' => $Exp->getMessage()], 500);
        }
    }
}
