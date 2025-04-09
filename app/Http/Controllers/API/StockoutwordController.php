<?php

namespace App\Http\Controllers\API;

use App\Models\ManageStockoutword;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StockoutwordController extends Controller
{
    private ManageStockoutword $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageStockoutword();
    }

    public function AddStockoutword(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Stock_Id' => 'required',
            'ReasonOutWord' => 'required',
            'Qty' => 'required',
            'OutWord_Date' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddStockoutword($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetStockoutword()
    {

        $Result = $this->dbContext->GetStockoutword();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateStockoutword(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Stock_Id' => 'required',
            'ReasonOutWord' => 'required',
            'Qty' => 'required',
            'OutWord_Date' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateStockoutword($Data);
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
