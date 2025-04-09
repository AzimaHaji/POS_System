<?php

namespace App\Http\Controllers\API;
use App\Models\ManagePurchasemst;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchasemstController extends Controller
{
    private ManagePurchasemst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManagePurchasemst();
    }

    public function AddPurchasemst(Request $req)
    {
        $Data = $req->all();
        $Validation = Validator::make($Data, [
            "Bill_No" => "required",
            "V_Id" => "required",
            "GrossAmt" => "required",
            "TotalAmt" => "required",
            "GST_Type" => "required",
            "Bill_Date" => "required",
            "Total" => "required"
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->AddPurchasemst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], status: 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetPurchasemst()
    {

        $Result = $this->dbContext->GetPurchasemst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }


    public function purchasePaymentList()
    {
        $Result = $this->dbContext->purchasePaymentList();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }


    public function UpdatePurchasemst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            "Bill_No" => "required",
            "V_Id" => "required",
            "GrossAmt" => "required",
            "TotalAmt" => "required",
            "GST_Type" => "required",
            "Bill_Date" => "required",
            "Total" => "required"
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdatePurchasemst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetPurchaseById($Id)
    {
        $Result = $this->dbContext->GetPurchaseById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

}
