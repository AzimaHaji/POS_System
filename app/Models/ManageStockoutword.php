<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageStockoutword extends Model
{
    public function AddStockoutword($req)
    {
        try {
            $Stock_IdExists = DB::table('stockmst')->where('Stock_Id', $req['Stock_Id'])->exists();

            if (!$Stock_IdExists) {
                return "Invalid Stock_Id. It Does Not Exist.";
            }

            $AddData = [
                "Stock_Id" => $req['Stock_Id'],
                "ReasonOutWord" => $req['ReasonOutWord'],
                "Qty" => round($req['Qty'], 2),
                "OutWord_Date" => $req['OutWord_Date']
            ];

            DB::table("stockoutword")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetStockoutword(){
        try
        {

            $Result = DB::table('stockoutword')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }

    public function UpdateStockoutword($req){

        $Exists = DB::table('stockoutword')->where([
            "StockOutWord_Id" => $req['StockOutWord_Id']
        ])->exists();

        $AddData = [
            "Stock_Id" => $req['Stock_Id'],
            "ReasonOutWord" => $req['ReasonOutWord'],
            "Qty" => round($req['Qty'], 2),
            "OutWord_Date" => $req['OutWord_Date']
        ];

        if(!$Exists){
            return response()->json(["Result" => "No Data Exists","Status" => "Failed"],401);
        }

        $DataUpdate = DB::table('stockoutword')->where(["StockOutWord_Id" => $req['StockOutWord_Id']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }
}
