<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    public function AddCustomer($req)
    {
        try {
            $AddData = [
                "Customer_Name" => $req['Customer_Name'],
                "Email" => $req['Email'],
                "ContactNo" => $req['ContactNo'],
                "GST_No" => $req['GST_No']
            ];

            DB::table("customer_mst")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetCustomer(){
        try
        {

            $Result = DB::table('customer_mst')->get();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }

    public function UpdateCustomer($req){


        $Exists = DB::table('customer_mst')->where([
            "C_Id" => $req['C_Id']
        ])->exists();


        $AddData = [
            "Customer_Name" => $req['Customer_Name'],
            "Email" => $req['Email'],
            "ContactNo" => $req['ContactNo'],
            "GST_No" => $req['GST_No']
        ];

        if(!$Exists){
            return false;
        }

        $DataUpdate = DB::table('customer_mst')->where(["C_Id" => $req['C_Id']])->update($AddData);   

        if($DataUpdate){
            return true;
        }
        else
        {
            return false;
        }
    }

    public function CustomerById($Id) {
        try {
            $Exists = DB::table('customer_mst')->where('C_Id', "=",$Id)->exists();

            if (!$Exists) {
                return false; 
            }

            $Result = DB::table('customer_mst')->where('C_Id', "=",$Id)->first();
            return $Result; 
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetTotalCustomer(){
        try
        {

            $Result = DB::table('customer_mst')->count();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }
}
