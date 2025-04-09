<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ManageAssignOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssignOrderController extends Controller
{

    private ManageAssignOrder $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageAssignOrder();
    }
    public function AddOrder_Product(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'OrderProduct_Id' => 'required',
            'Trip_Id' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddOrder_Product($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetOrderByTripId($Id)
    {
        $Result = $this->dbContext->GetOrderByTripId($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function FilterOrderByTripId()
    {
        $Result = $this->dbContext->FilterOrderByTripId();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
}
