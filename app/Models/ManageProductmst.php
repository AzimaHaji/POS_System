<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageProductmst extends Model
{
    public function AddProductmst($req)
    {
        try {
            $AddData = [
                "Name" => $req['Name'],
                "Weight" => $req['Weight'],
                "Unit" => $req['Unit'],
                "Price" => $req['Price'],
                "Net_Qty" => $req['Net_Qty'],
                "FSSAI" => $req['FSSAI'],
                "Barcode" => $req['Barcode'],
                "Brand" => $req['Brand'],
                "HSN" => $req['HSN'],
                "GST" => $req['GST']
            ];

            DB::table("productmst")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetProductmst()
    {
        try {

            $Result = DB::table('productmst')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function UpdateProductmst($req)
    {


        $Exists = DB::table('productmst')->where([
            "P_Id" => $req['P_Id']
        ])->exists();


        $AddData = [
            "Name" => $req['Name'],
            "Weight" => $req['Weight'],
            "Unit" => $req['Unit'],
            "Price" => $req['Price'],
            "Net_Qty" => $req['Net_Qty'],
            "FSSAI" => $req['FSSAI'],
            "Barcode" => $req['Barcode'],
            "Brand" => $req['Brand'],
            "HSN" => $req['HSN'],
            "GST" => $req['GST']
        ];

        if (!$Exists) {
            return false;
        }

        $DataUpdate = DB::table('productmst')->where(["P_Id" => $req['P_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function DeleteProductmst($Id)
    {
        try {

            $Exists = DB::table('productmst')->where('P_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            DB::table('productmst')->where('P_Id', "=", $Id)->delete();
            return true;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetProductById($Id)
    {
        try {
            $Exists = DB::table('productmst')->where('P_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('productmst')->where('P_Id', "=", $Id)->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetProductStock() {
        $products = DB::table('stockmst')
            ->join('productmst', 'stockmst.P_Id', '=', 'productmst.P_Id')
            ->select(
                'productmst.Name',
                DB::raw('SUM(stockmst.No_Of_Stock) as TotalStock')
            )
            ->groupBy('productmst.Name')
            ->get();
    
        return $products;
    }
    
}
