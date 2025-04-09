<?php

namespace App\Http\Controllers\API;

use App\Models\ManageStaff_mst;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Staff_mstController extends Controller
{
    private ManageStaff_mst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageStaff_mst();
    }

    public function AddStaff_mst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'F_Name' => 'required',
            'Gender' => 'required',
            'DOB' => 'required',
            'ContactNo' => 'required',
            'Address' => 'required',
            'Adhar_No' => 'required',
            'Driving_Licence' => 'required',
            'DOJ' => 'required',
            'Email' => 'required',
            'Status' => 'required'
        ]);

        if (!$Validation->fails()) {
            $Result = $this->dbContext->AddStaff_mst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
    public function GetStaff_mst()
    {

        $Result = $this->dbContext->GetStaff_mst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function UpdateStaff_mst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'F_Name' => 'required',
            'Gender' => 'required',
            'DOB' => 'required',
            'ContactNo' => 'required',
            'Address' => 'required',
            'Adhar_No' => 'required',
            'Driving_Licence' => 'required',
            'DOJ' => 'required',
            'Email' => 'required',
            'Status' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateStaff_mst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function UpdateStaffById_mst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'ContactNo' => 'required',
            'Email' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateStaffById_mst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetStaffById($Id)
    {
        $Result = $this->dbContext->GetStaffById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function AuthStaff(Request $req){
        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "Passwrd" => "required|string|min:6",
            "Email" => "required|email",
        ]);

            if(!$Validation->fails()){
                $Result = $this->dbContext->AuthStaff($Data);

                if ($Result != "Fail"){
                    return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
                }
                else
                {
                    return response()->json(["Status" => "Fail","Result"=> "Wrong Email or Password"],status: 200);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }

    public function GetStaff(){
        
        $Result = $this->dbContext->GetStaff();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
}
