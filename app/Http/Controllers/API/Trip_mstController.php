<?php

namespace App\Http\Controllers\API;

use App\Models\ManageTrip_mst;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Trip_mstController extends Controller
{
    private ManageTrip_mst $dbContext;
    public function __construct()
    {
        $this->dbContext = new ManageTrip_mst();
    }

    public function AddTrip_mst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Vehicle_Id' => 'required|integer',
            'Staff_Id' => 'required|integer',
            'Start_Date' => 'required',
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddTrip_mst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetTrip_mst()
    {

        $Result = $this->dbContext->GetTrip_mst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function UpdateTrip_mst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Trip_Id' => 'required',
            'Finish_Date' => 'required',
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateTrip_mst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
    public function GetTripById($Id)
    {
        $Result = $this->dbContext->GetTripById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateTrip(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Trip_Id' => 'required',
            'Vehicle_Id' => 'required|integer',
            'Staff_Id' => 'required|integer',
            'Start_Date' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateTrip($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
    public function GetStaffTripById($Id)
    {
        $Result = $this->dbContext->GetStaffTripById($Id);
        if ($Result != null){
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        }
        else
        {
            return response()->json(["Status" => "Fail", "Result" => "Fail"], 200);
        }
    }

    public function tripReport()
    {

        $Result = $this->dbContext->tripReport();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function getTripReceipts($Id)
    {

        $Result = $this->dbContext->getTripReceipts($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function getSalesReport($Id)
    {

        $Result = $this->dbContext->getSalesReport($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
}
