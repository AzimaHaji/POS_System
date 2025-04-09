<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Admin extends Model
{

    public function isExists($Col, $Val)
    {
        $isExists = DB::table('admin')->where($Col, "=", $Val)->first();

        if ($isExists) {
            return true;
        } else {
            return false;
        }
    }
    public function AddAdmin($req)
    {

        try {
            $Exists = array();

            if ($this->isExists("F_Name", $req["F_Name"])) {
                $Exists[] = "Full Name Already Exists";
            }

            if ($this->isExists("U_Name", $req["U_Name"])) {
                $Exists[] = "User Name Already Exists";
            }

            if ($this->isExists("Passwd", $req["Passwd"])) {
                $Exists[] = "Password Already Exists";
            }

            if ($this->isExists("Email", $req["Email"])) {
                $Exists[] = "Email Already Exists";
            }

            if ($this->isExists("ContactNo", $req["ContactNo"])) {
                $Exists[] = "ContactNo Already Exists";
            }

            if (count($Exists) == 0) {
                $AddData = [
                    "F_Name" => $req['F_Name'],
                    "U_Name" => $req['U_Name'],
                    "Passwd" => $req['Passwd'],
                    "Email" => $req['Email'],
                    "ContactNo" => $req['ContactNo']
                ];
                DB::table("admin")->insert($AddData);
                return "Saved Successfully..!!";
            } else {
                return $Exists;
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetAdmin()
    {
        try {

            $Result = DB::table('admin')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function DeleteAdmin($Id)
    {
        try {

            $Exists = DB::table('admin')->where('A_Id', $Id)->exists();

            if (!$Exists) {
                return false;
            }

            DB::table('admin')->where('A_Id', $Id)->delete();
            return true;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateAdmin($req)
    {


        $Exists = DB::table('admin')->where([
            "A_Id" => $req['A_Id']
        ])->exists();


        $AddData = [
            "F_Name" => $req['F_Name'],
            "U_Name" => $req['U_Name'],
            "Email" => $req['Email'],
            "ContactNo" => $req['ContactNo']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('admin')->where(["A_Id" => $req['A_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
    public function AuthAdmin($req)
    {
        try {
            $Result = DB::table('admin')->where("Email", "=", $req["Email"])
                ->where("Passwd", "=", $req["Passwd"])
                ->first();
            if ($Result) {
                return $Result;
            } else {
                return "Fail";
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetAdminById($Id)
    {
        try {
            $Exists = DB::table('admin')->where('A_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('admin')->where('A_Id', "=", $Id)->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function ChangePasswd($req)
    {
        try {
            $Admin = DB::table('admin')
                ->where('Email', $req['Email'])
                ->where('Passwd', $req['OldPasswd'])
                ->first();

            $Result = DB::table('admin')
                ->where("Email", "=", $req["Email"])
                ->update(["Passwd" => ($req["NewPasswd"])]);

            if (!$Admin) {
                return "Incorrect Email or Old Password";
            } else {
                return $Result;
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function CloseTrip($req)
    {
        try {

            $today = Carbon::today();

            $Result = DB::table('trip_mst')
                ->whereNull('Finish_Date')
                ->whereDate('Start_Date', $today)
                ->first();
            if ($Result) {
                return $Result;
            } else {
                return "Fail";
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
}
