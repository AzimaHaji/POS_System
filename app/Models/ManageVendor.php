<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;
use Illuminate\Support\Facades\DB;

class ManageVendor extends Model
{


    public function AddVendors($req)
    {
        try {
            $AddData = [
                "Business_Name" => $req['Business_Name'],
                "Contact_Person" => $req['Contact_Person'],
                "Address" => $req['Address'],
                "ContactNo" => $req['ContactNo'],
                "Alter_ContactNo" => $req['Alter_ContactNo'],
                "GST_In" => $req['GST_In']
            ];

            DB::table("vendors")->insert($AddData);
            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetVendors()
    {
        try {

            $Result = DB::table('vendors')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }


    public function UpdateVendors($req)
    {


        $Exists = DB::table('vendors')->where([
            "V_Id" => $req['V_Id']
        ])->exists();


        $AddData = [
            "Business_Name" => $req['Business_Name'],
            "Contact_Person" => $req['Contact_Person'],
            "Address" => $req['Address'],
            "ContactNo" => $req['ContactNo'],
            "Alter_ContactNo" => $req['Alter_ContactNo'],
            "GST_In" => $req['GST_In']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('vendors')->where(["V_Id" => $req['V_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function GetVenPur()
    {
        try {

            $Result = DB::table('vendors')
                ->join('purchasemst', 'vendors.V_Id', '=', 'purchasemst.V_Id')
                ->select('vendors.*', 'purchasemst.*') 
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
}
