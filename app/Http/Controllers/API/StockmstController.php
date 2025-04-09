<?php

namespace App\Http\Controllers\API;

use App\Models\ManageStockmst;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StockmstController extends Controller
{
    private ManageStockmst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageStockmst();
    }

    public function AddStockmst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'P_Id' => 'required',
            'MFG_Date' => 'required',
            'Exp_Date' => 'required',
            'No_Of_Stock' => 'required',
            'Cost_Price' => 'required',
            'Inword_Date' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddStockmst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetStockmst()
    {

        $Result = $this->dbContext->GetStockmst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function UpdateStockmst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'P_Id' => 'required',
            'Purchase_Id' => 'required',
            'MFG_Date' => 'required',
            'Exp_Date' => 'required',
            'No_Of_Stock' => 'required',
            'Cost_Price' => 'required',
            'Inword_Date' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateStockmst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetStockById($Id)
    {
        $Result = $this->dbContext->GetStockById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetStockAvailableDetail($Id)
    {
        $Result = $this->dbContext->GetStockAvailableDetail($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetStockDetail()
    {

        $Result = $this->dbContext->GetStockDetail();
        if ($Result == "No Stock"){
            return response()->json(["Status" => "Fail", "Result" => $Result], 200);
        }
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function DeleteStockmst($Id)
    {
        try {
            
            $Result = $this->dbContext->DeleteStockmst($Id);

            if ($Result) {
                return response()->json(["Status" => "OK", "Result" => "Product Deleted Successfully"], 200);
            } else {
                return response()->json(["Status" => "Fail", "Result" => "Stock not found"], 404);
            }
        } catch (Exception $Exp) {
            return response()->json(["Status" => "Fail", "Result" => $Exp->getMessage()], 500);
        }
    }

    public function getStockReport()
    {

        $Result = $this->dbContext->getStockReport();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
}
