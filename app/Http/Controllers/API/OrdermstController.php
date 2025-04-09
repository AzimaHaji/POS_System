<?php

namespace App\Http\Controllers\API;

use App\Models\ManageOrdermst;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrdermstController extends Controller
{
    private ManageOrdermst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageOrdermst();
    }

    public function AddOrdermst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Order_No' => 'required',
            'Customer_Name' => 'required',
            'ContactNo' => 'required',
            'Order_Date' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddOrdermst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetOrdermst()
    {

        $Result = $this->dbContext->GetOrdermst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function getOrderDetails($Id)
    {

        $Result = $this->dbContext->getOrderDetails($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function storeOrder(Request $req)
    {

        $Result = $this->dbContext->storeOrder($req);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateOrdermst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Order_No' => 'required',
            'Customer_Name' => 'required',
            'ContactNo' => 'required',
            'Order_Date' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateOrdermst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "Data Updated Successfully"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetOrder(){
        
        $Result = $this->dbContext->GetOrder();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
}
