<?php

namespace App\Http\Controllers\API;

use App\Models\ManageRec_Detail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Rec_DetailController extends Controller
{
    private ManageRec_Detail $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageRec_Detail();
    }

    public function AddRec_Detail(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Invoice_Id' => 'required',
            'Stock_Id' => 'required',
            'Qty' => 'required',
            'Rate' => 'required',
            'GST' => 'required',
            'Amt' => 'required',
            'Total' => 'required'

        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddRec_Detail($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetRec_Detail()
    {

        $Result = $this->dbContext->GetRec_Detail();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateRec_Detail(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Invoice_Id' => 'required',
            'Stock_Id' => 'required',
            'Qty' => 'required',
            'Rate' => 'required',
            'GST' => 'required',
            'Amt' => 'required',
            'Total' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateRec_Detail($Data);
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
