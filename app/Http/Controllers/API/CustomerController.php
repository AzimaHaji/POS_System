<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    private Customer $dbContext;

    public function __construct()
    {
        $this->dbContext = new Customer();
    }

    public function AddCustomer(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Customer_Name' => 'required',
            'Email' => 'required',
            'ContactNo' => 'required',
            'GST_No' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->AddCustomer($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetCustomer()
    {

        $Result = $this->dbContext->GetCustomer();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateCustomer(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Customer_Name' => 'required',
            'Email' => 'required',
            'ContactNo' => 'required',
            'GST_No' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateCustomer($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function CustomerById($Id)
    {
        $Result = $this->dbContext->CustomerById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetTotalCustomer(){
        
        $Result = $this->dbContext->GetTotalCustomer();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
}
