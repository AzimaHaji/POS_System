<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManagePurchasemst extends Model
{
    public function AddPurchasemst($req)
    {
        try {

            $V_Id = DB::table('vendors')->where('V_Id', $req['V_Id'])->exists();

            if (!$V_Id) {
                return "Invalid V_Id. It Does Not Exist.";
            } else {
                $AddData = [
                    "Bill_No" => $req['Bill_No'],
                    "V_Id" => $req['V_Id'],
                    "GrossAmt" => round($req['GrossAmt'], 2),
                    "TotalAmt" => round($req['TotalAmt'], 2),
                    "GST_Type" => $req['GST_Type'],
                    "Bill_Date" => $req['Bill_Date'],
                    "Total" => round($req['Total'], 2)
                ];

                DB::table("purchasemst")->insert($AddData);
                return "Saved Successfully..!!";
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetPurchasemst()
    {
        try {

            $Result = DB::table('purchasemst')
                ->join('vendors', 'vendors.V_Id', '=', 'purchasemst.V_Id') // ✅ Corrected table reference
                ->select('purchasemst.*', 'vendors.Business_Name as Business_Name')
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function purchasePaymentList(){
        $data = DB::table('purchasemst as a')
                    ->join('vendors as b', 'a.V_Id', '=', 'b.V_Id')
                    ->leftJoin('billpayment as pp', 'a.Purchase_Id', '=', 'pp.Purchase_Id')
                    ->select(
                        'a.Purchase_Id',
                        'a.Bill_No',
                        'a.GrossAmt',
                        'a.TotalAmt',
                        'a.GST_Type',
                        'a.Total',
                        'a.Bill_Date',
                        'a.Created_At',
                        'b.Business_Name',
                        DB::raw('SUM(CASE WHEN pp.Amount IS NOT NULL THEN pp.Amount ELSE 0 END) as paid')
                    )->groupBy(
                        'a.Purchase_Id',
                        'a.Bill_No',
                        'a.GrossAmt',
                        'a.TotalAmt',
                        'a.GST_Type',
                        'a.Total',
                        'a.Bill_Date',
                        'a.Created_At',
                        'b.Business_Name')->get();
        return $data;
    }


    public function UpdatePurchasemst($req)
    {
        $Exists = DB::table('purchasemst')->where([
            "Purchase_Id" => $req['Purchase_Id']
        ])->exists();


        $AddData = [
            "Bill_No" => $req['Bill_No'],
            "V_Id" => $req['V_Id'],
            "GrossAmt" => round($req['GrossAmt'], 2),
            "TotalAmt" => round($req['TotalAmt'], 2),
            "GST_Type" => $req['GST_Type'],
            "Bill_Date" => $req['Bill_Date'],
            "Total" => round($req['Total'], 2)
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('purchasemst')->where(["Purchase_Id" => $req['Purchase_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }


    public function GetPurchaseById($Id)
    {
        try {
            $Exists = DB::table('purchasemst')->where('Purchase_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('purchasemst')->where('Purchase_Id', "=", $Id)->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
}
