<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ManageBill_Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Bill_PaymentController extends Controller
{
    private ManageBill_Payment $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageBill_Payment();
    }

    public function AddBill_Payment(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Purchase_Id' => 'required|integer',
            'Amount' => 'required|integer',
            'Payment_Mode' => 'required|string|max:255',
            'Payment_Date' => 'required',
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddBill_Payment($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        }
        else 
        {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetBill_Payment()
    {

        $Result = $this->dbContext->GetBill_Payment();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateBill_Payment(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Purchase_Id' => 'required|integer',
            'Amount' => 'required|integer',
            'Payment_Mode' => 'required|string|max:255',
            'Ref_No' => 'required|string|max:255',
            'Payment_Date' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateBill_Payment($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "Data Updated Successfully"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

}
