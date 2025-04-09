<?php

namespace App\Http\Controllers\API;

use App\Models\ManageOrder_Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Order_ProductController extends Controller
{
    private ManageOrder_Product $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageOrder_Product();
    }

    public function AddOrder_Product(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'P_Id' => 'required',
            'Qty' => 'required',
            'Order_Id' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddOrder_Product($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetOrder_Product()
    {

        $Result = $this->dbContext->GetOrder_Product();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateOrder_Product(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'P_Id' => 'required',
            'Qty' => 'required',
            'Order_Id' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateOrder_Product($Data);
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
