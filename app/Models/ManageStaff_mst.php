<?php

namespace App\Models;
use Illuminate\Support\Facades\Mail;
use App\Mail\StaffSetPasswordMail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ManageStaff_mst extends Model
{
    public function AddStaff_mst($req)
    {
        try {
            $AddData = [
                "F_Name" => $req['F_Name'],
                "Gender" => $req['Gender'],
                "DOB" => $req['DOB'],
                "ContactNo" => $req['ContactNo'],
                "Address" => $req['Address'],
                "Adhar_No" => $req['Adhar_No'],
                "Driving_Licence" => $req['Driving_Licence'],
                "DOJ" => $req['DOJ'],
                "Email" => $req['Email'],
                "Passwrd" => null, 
                "Status" => $req['Status'],
                "verified" => 0, 
            ];

            // Insert staff data into the database
            DB::table("staff_mst")->insert($AddData);

            // Generate a unique password reset token
            $token = Str::random(64);

            // Store the token in the password_resets table
            DB::table("password_resets")->updateOrInsert(
                ['Email' => $req['Email']], // Match email field
                ['token' => $token, 'created_at' => Carbon::now()]
            );

            // Send "Set Password" email
            Mail::to($req['Email'])->send(new StaffSetPasswordMail($req['Email'], $token));

            return "Saved Successfully. Email sent to staff.";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetStaff_mst()
    {
        try {

            $Result = DB::table('staff_mst')->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateStaff_mst($req)
    {


        $Exists = DB::table('staff_mst')->where([
            "Staff_Id" => $req['Staff_Id']
        ])->exists();


        $AddData = [
            "F_Name" => $req['F_Name'],
            "Gender" => $req['Gender'],
            "DOB" => $req['DOB'],
            "ContactNo" => $req['ContactNo'],
            "Address" => $req['Address'],
            "Adhar_No" => $req['Adhar_No'],
            "Driving_Licence" => $req['Driving_Licence'],
            "DOJ" => $req['DOJ'],
            "Email" => $req['Email'],
            "Passwrd" => "123456",
            "Status" => $req['Status']
        ];

        if (!$Exists) {
            return false;
        }

        $DataUpdate = DB::table('staff_mst')->where(["Staff_Id" => $req['Staff_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function UpdateStaffById_mst($req)
    {


        $Exists = DB::table('staff_mst')->where([
            "Staff_Id" => $req['Staff_Id']
        ])->exists();


        $AddData = [
            "ContactNo" => $req['ContactNo'],
            "Email" => $req['Email']
        ];

        if (!$Exists) {
            return false;
        }

        $DataUpdate = DB::table('staff_mst')->where(["Staff_Id" => $req['Staff_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
    public function GetStaffById($Id)
    {
        try {
            $Exists = DB::table('staff_mst')->where('Staff_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('staff_mst')->where('Staff_Id', "=", $Id)->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function AuthStaff($req)
    {
        try {
            $Result = DB::table('staff_mst')->where("Email", "=", $req["Email"])
                ->where("Passwrd", "=", $req["Passwrd"])
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

    public function GetStaff(){
        try
        {

            $Result = DB::table('staff_mst')->count();
            return $Result;
           
        }
        catch(Exception $Exp){
            return $Exp->getMessage();

        }
    }
}
