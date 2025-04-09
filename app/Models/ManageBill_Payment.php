<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageBill_Payment extends Model
{
    public function AddBill_Payment($req)
    {
        try {
            
            $PurchaseExists = DB::table('purchasemst')->where('Purchase_Id', $req['Purchase_Id'])->exists();

            if (!$PurchaseExists) {
                return  "Invalid Purchase_Id. It Does Not Exist.";
            }
            else
            {
                $AddData = [
                    "Purchase_Id" => $req['Purchase_Id'],
                    "Amount" => $req['Amount'],
                    "Payment_Mode" => $req['Payment_Mode'],
                    "Ref_No" => $req['Ref_No'],
                    "Payment_Date" => $req['Payment_Date']
                ];

                DB::table("billpayment")->insert($AddData);
                return "Saved Successfully..!!";
            }
                
        } catch (Exception $Exp) {
            return $Exp->getMessage(); 
        }
    }


    public function GetBill_Payment(){
        try
        {

            $Result = DB::table('billpayment')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }

    public function UpdateBill_Payment($req){


        $Exists = DB::table('billpayment')->where([
            "Payment_Id" => $req['Payment_Id']
        ])->exists();


        $AddData = [
            "Purchase_Id" => $req['Purchase_Id'],
            "Amount" => round($req['Amount'],2),
            "Payment_Mode" => $req['Payment_Mode'],
            "Ref_No" => $req['Ref_No'],
            "Payment_Date" => $req['Payment_Date']
        ];

        if(!$Exists){
            return response()->json(["Result" => "No Data Exists","Status" => "Failed"],401);
        }

        $DataUpdate = DB::table('billpayment')->where(["Payment_Id" => $req['Payment_Id']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }
}
