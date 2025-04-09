<?php

namespace App\Http\Controllers\API;

use App\Models\ManageLoad_Stock;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Load_StockController extends Controller
{
    private ManageLoad_Stock $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageLoad_Stock();
    }

    public function AddLoad_Stock(Request $req)
    {
        $Data = $req->all();
        $Result = $this->dbContext->AddLoad_Stock($Data);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetLoad_Stock()
    {

        $Result = $this->dbContext->GetLoad_Stock();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateLoad_Stock(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Qty' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateLoad_Stock($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetLoad($Id)
    {

        $Result = $this->dbContext->GetLoad($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function DeleteLoadStockmst($Id)
    {
        try {
            
            $Result = $this->dbContext->DeleteLoadStockmst($Id);

            if ($Result == "Deleted successfully") {
                return response()->json(["Status" => "OK", "Result" => "Load Stock Deleted Successfully"], 200);
            } else {
                return response()->json(["Status" => "Fail", "Result" => $Result], 200);
            }
        } catch (Exception $Exp) {
            return response()->json(["Status" => "Fail", "Result" => $Exp->getMessage()], 500);
        }
    }

    public function GetLoadStockById($Id)
    {
        $Result = $this->dbContext->GetLoadStockById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
}
