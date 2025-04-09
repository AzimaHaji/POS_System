<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageInvoice_Payment extends Model
{
    
    public function AddInvoice_Payment($req)
    {
        try {

            $Invoice_Id = DB::table('invoice_payment')->where('Invoice_Id', $req['Invoice_Id'])->exists();

            if (!$Invoice_Id) {
                return "Invalid Invoice_Id. It Does Not Exist.";
            }
            else
            {
                $AddData = [
                    "Invoice_Id" => $req['Invoice_Id'],
                    "Amount" => round($req['Amount'],2),
                    "Payment_Mode" => $req['Payment_Mode'],
                    "Ref_No" => $req['Ref_No'],
                    "Payment_Date" => $req['Payment_Date']
                ];

                DB::table("invoice_payment")->insert($AddData);
                return "Saved Successfully..!!";
            }
            
                
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetInvoice_Payment(){
        try
        {

            $Result = DB::table('invoice_payment')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }


    public function UpdateInvoice_Payment($req){
        $Exists = DB::table('invoice_payment')->where([
            "ID" => $req['ID']
        ])->exists();


        $AddData = [
            "Invoice_Id" => $req['Invoice_Id'],
            "Amount" => round($req['Amount'],2),
            "Payment_Mode" => $req['Payment_Mode'],
            "Ref_No" => $req['Ref_No'],
            "Payment_Date" => $req['Payment_Date']
        ];

        if(!$Exists){
            return response()->json(["Result" => "No Data Exists","Status" => "Failed"],401);
        }

        $DataUpdate = DB::table('invoice_payment')->where(["ID" => $req['ID']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }
}
