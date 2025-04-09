<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ManageVehiclemst;
use Illuminate\Support\Facades\Validator;

class VehiclemstController extends Controller
{
    private ManageVehiclemst $dbContext;
    public function __construct(){
        $this->dbContext = new ManageVehiclemst();
    }


    public function AddVehiclemst(Request $req){
        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "Driver_Name" => "required|string|max:255",
            "PUC_No" => "required",
            "PUC_Expiry" => "required",
            "Vehicle_No" => "required",
            "Vehicle_Name" => "required",
            "Fual_Type" => "required",
            "Driving_Licences_No" => "required",
            "Status" => "required"
        ]);

        
            if(!$Validation->fails()){
                $Result = $this->dbContext->AddVehiclemst($Data);
                return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
       
    }

    public function GetVehiclemst(){
        
        $Result = $this->dbContext->GetVehiclemst();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }

    public function UpdateVehiclemst(Request $req){

        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "Driver_Name" => "required|string|max:255",
            "PUC_No" => "required",
            "PUC_Expiry" => "required",
            "Vehicle_No" => "required",
            "Vehicle_Name" => "required",
            "Fual_Type" => "required",
            "Driving_Licences_No" => "required",
            "Status" => "required"
        ]);

        
            if(!$Validation->fails()){
                $Result = $this->dbContext->UpdateVehiclemst($Data);
                if($Result)
                {
                    return response()->json(["Result"=> $Result,"Status" => "OK"],200);
                }
                else
                {
                    return response()->json(["Result"=> "Failed To Update","Status" => "Failed"],404);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }

    public function GetVehicleById($Id)
    {
        $Result = $this->dbContext->GetVehicleById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function GetVehicle(){
        
        $Result = $this->dbContext->GetVehicle();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
}
