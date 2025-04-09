<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageLoad_Stock extends Model
{
    public function AddLoad_Stock($req)
    {
        try {
            foreach ($req as $stock) {
                // Validate Stock_Id
                $Stock_IdExists = DB::table('stockmst')->where('Stock_Id', $stock['Stock_Id'])->exists();
                if (!$Stock_IdExists) {
                    return "Invalid Stock_Id: " . $stock['Stock_Id'] . ". It Does Not Exist.";
                }

                // Validate Trip_Id
                $Trip_IdExists = DB::table('trip_mst')->where('Trip_Id', $stock['Trip_Id'])->exists();
                if (!$Trip_IdExists) {
                    return "Invalid Trip_Id: " . $stock['Trip_Id'] . ". It Does Not Exist.";
                }

                // Insert Data
                $existingRecord = DB::table("load_stock")
                    ->where("Stock_Id", $stock["Stock_Id"])
                    ->where("Trip_Id", $stock["Trip_Id"])
                    ->first();

                if ($existingRecord) {
                    // ✅ Update existing record (add new qty to old qty)
                    DB::table("load_stock")
                        ->where("Stock_Id", $stock["Stock_Id"])
                        ->where("Trip_Id", $stock["Trip_Id"])
                        ->update(["Qty" => $existingRecord->Qty + $stock["Qty"]]);
                } else {
                    // ✅ Insert new record
                    $AddData = [
                        "Stock_Id" => $stock["Stock_Id"],
                        "Qty" => $stock["Qty"],
                        "Trip_Id" => $stock["Trip_Id"]
                    ];
                    DB::table("load_stock")->insert($AddData);
                }
            }

            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetLoad_Stock()
    {
        try {

            $Result = DB::table('load_stock')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function UpdateLoad_Stock($req)
    {

        $Exists = DB::table('load_stock')->where([
            "LoadStock_Id" => $req['LoadStock_Id']
        ])->exists();

        $AddData = [
            "Qty" => $req['Qty']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('load_stock')->where(["LoadStock_Id" => $req['LoadStock_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
    public function GetLoad($req)
    {
        try {
            $Result = DB::table('load_stock')
                ->join('stockmst', 'stockmst.Stock_Id', '=', 'load_stock.Stock_Id')
                ->join('productmst', 'stockmst.P_Id', '=', 'productmst.P_Id')
                ->where('load_stock.Trip_Id', '=', $req)
                ->select(
                    'productmst.Name',
                    'productmst.P_Id', // Product Name
                    'productmst.Brand',
                    'productmst.Price',
                    'productmst.Weight',
                    'productmst.HSN',
                    'productmst.GST',
                    'stockmst.MFG_Date', 
                    'stockmst.Exp_Date',
                    'load_stock.LoadStock_Id',
                    DB::raw('SUM(load_stock.Qty) as Total_Qty') // Sum of Qty
                )
                ->groupBy(
                    'productmst.Name',
                    'productmst.P_Id',
                    'productmst.Brand',
                    'productmst.Price',
                    'productmst.Weight',
                    'productmst.HSN',
                    'productmst.GST',
                    'stockmst.MFG_Date',
                    'stockmst.Exp_Date',
                    'load_stock.LoadStock_Id'
                )->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function DeleteLoadStockmst($Id)
{
    try {

        $ExistsInRecDetail = DB::table('rec_detail')->where('LoadStock_Id', "=", $Id)->first();

        if ($ExistsInRecDetail) {
            return "Can't Delete.This LoadStock_Id is not Associated with any Record in rec_detail.";
        }

        $ExistsInLoadStock = DB::table('load_stock')->where('LoadStock_Id', "=", $Id)->first();

        if (!$ExistsInLoadStock) {
            return "Invalid LoadStock_Id. It does not exist.";
        }

        DB::table('load_stock')->where('LoadStock_Id', "=", $Id)->delete();
        return "Deleted successfully";

    } catch (Exception $Exp) {
        return $Exp->getMessage();
    }
}

public function GetLoadStockById($Id)
{
    try {
        $Exists = DB::table('load_stock')->where('LoadStock_Id', "=", $Id)->exists();

        if (!$Exists) {
            return false;
        }

        $Result = DB::table('load_stock')->where('LoadStock_Id', "=", $Id)->first();
        return $Result;
    } catch (Exception $Exp) {
        return $Exp->getMessage();
    }
}

}
