<?php

namespace App\Http\Controllers\API;

use App\Models\ManageInvoice_Payment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Invoice_PaymentController extends Controller
{
    private ManageInvoice_Payment $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageInvoice_Payment();
    }

    public function AddInvoice_Payment(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Invoice_Id' => 'required',
            'Amount' => 'required',
            'Payment_Mode' => 'required',
            'Ref_No' => 'required',
            'Payment_Date' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddInvoice_Payment($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        }
        else 
        {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetInvoice_Payment()
    {

        $Result = $this->dbContext->GetInvoice_Payment();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateInvoice_Payment(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Invoice_Id' => 'required',
            'Amount' => 'required',
            'Payment_Mode' => 'required',
            'Ref_No' => 'required',
            'Payment_Date' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateInvoice_Payment($Data);
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
