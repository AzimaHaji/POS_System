<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;
use Illuminate\Support\Facades\DB;

class ManageVehiclemst extends Model
{

    public function AddVehiclemst($req)
    {
        try 
        {
            $AddData = [
                "Driver_Name" => $req['Driver_Name'],
                "PUC_No" => $req['PUC_No'],
                "PUC_Expiry" => $req['PUC_Expiry'],
                "Vehicle_No" => $req['Vehicle_No'],
                "Vehicle_Name" => $req['Vehicle_Name'],
                "Fual_Type" => $req['Fual_Type'],
                "Driving_Licences_No" => $req['Driving_Licences_No'],
                "Status" => $req['Status']
            ];

            DB::table("vehiclemst")->insert($AddData);
            return "Saved Successfully..!!";
        }
        catch(Exception $Exp) 
        {
            return $Exp->getMessage();
        }
    }
    public function GetVehiclemst(){
        try
        {

            $Result = DB::table('vehiclemst')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }
    public function UpdateVehiclemst($req){


        $Exists = DB::table('vehiclemst')->where([
            "Vehicle_Id" => $req['Vehicle_Id']
        ])->exists();


        $AddData = [
            "Driver_Name" => $req['Driver_Name'],
            "PUC_No" => $req['PUC_No'],
            "PUC_Expiry" => $req['PUC_Expiry'],
            "Vehicle_No" => $req['Vehicle_No'],
            "Vehicle_Name" => $req['Vehicle_Name'],
            "Fual_Type" => $req['Fual_Type'],
            "Driving_Licences_No" => $req['Driving_Licences_No'],
            "Status" => $req['Status']
        ];

        if(!$Exists){
            return response()->json(["Result" => "No Data Exists","Status" => "Failed"],401);
        }

        $DataUpdate = DB::table('vehiclemst')->where(["Vehicle_Id" => $req['Vehicle_Id']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }
    public function GetVehicleById($Id) {
        try {
            $Exists = DB::table('vehiclemst')->where('Vehicle_Id', "=",$Id)->exists();

            if (!$Exists) {
                return false; 
            }

            $Result = DB::table('vehiclemst')->where('Vehicle_Id', "=",$Id)->first();
            return $Result; 
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetVehicle(){
        try
        {

            $Result = DB::table('vehiclemst')->count();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }

}