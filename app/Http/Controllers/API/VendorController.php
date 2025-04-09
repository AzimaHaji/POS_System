<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ManageVendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VendorController extends Controller
{
    private ManageVendor $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageVendor();
    }

    public function AddVendors(Request $req)
    {
        $Data = $req->all();
        $Validation = Validator::make($Data, [
            "Business_Name" => "required|string|max:255",
            "Contact_Person" => "required",
            "Address" => "required",
            "ContactNo" => "required",
            "Alter_ContactNo" => "required",
            "GST_In" => "required"
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->AddVendors($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], status: 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetVendors()
    {

        $Result = $this->dbContext->GetVendors();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    

    public function GetVenPur()
    {

        $Result = $this->dbContext->GetVenPur();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }


    public function UpdateVendors(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            "Business_Name" => "required|string|max:255",
            "Contact_Person" => "required",
            "Address" => "required",
            "ContactNo" => "required",
            "Alter_ContactNo" => "required",
            "GST_In" => "required"
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateVendors($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
}
