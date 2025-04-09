<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageRec_Detail extends Model
{
    public function AddRec_Detail($req)
    {
        try {

            $Invoice_IdExists = DB::table('receiptmst')->where('Invoice_Id', $req['Invoice_Id'])->exists();

            if (!$Invoice_IdExists) {
                return "Invalid Invoice_Id. It Does Not Exist.";
            } 

            $Stock_IdExists = DB::table('stockmst')->where('Stock_Id', $req['Stock_Id'])->exists();

            if (!$Stock_IdExists) {
                return "Invalid Stock_Id. It Does Not Exist.";
            } 

                $AddData = [
                    "Invoice_Id" => $req['Invoice_Id'],
                    "Stock_Id" => $req['Stock_Id'],
                    "Qty" => round($req['Qty'],2),
                    "Rate" => round($req['Rate'],2),
                    "GST" => $req['GST'],
                    "Amt" => round($req['Amt'],2),
                    "Total" => round($req['Total'],2)
                ];

                DB::table("rec_detail")->insert($AddData);
                return "Saved Successfully..!!";

        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetRec_Detail(){
        try
        {

            $Result = DB::table('rec_detail')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }

    public function UpdateRec_Detail($req){

        $Exists = DB::table('rec_detail')->where([
            "ID" => $req['ID']
        ])->exists();

        $AddData = [
            "Invoice_Id" => $req['Invoice_Id'],
            "Stock_Id" => $req['Stock_Id'],
            "Qty" => round($req['Qty'],2),
            "Rate" => round($req['Rate'],2),
            "GST" => $req['GST'],
            "Amt" => round($req['Amt'],2),
            "Total" => round($req['Total'],2)
        ];

        if(!$Exists){
            return response()->json(["Result" => "No Data Exists","Status" => "Failed"],401);
        }

        $DataUpdate = DB::table('rec_detail')->where(["ID" => $req['ID']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }
}
