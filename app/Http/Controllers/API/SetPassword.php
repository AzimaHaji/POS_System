<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SetPassword extends Controller
{
    public function SetPassword(Request $req)
    {
        $req->validate([
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        // Find the token in password_resets table
        $resetData = DB::table("password_resets")->where('token', $req->token)->first();

        if (!$resetData) {
            return response()->json(["message" => "Invalid or expired token"], 400);
        }

        // Ensure 'email' exists in $resetData
        if (!isset($resetData->email)) {
            return response()->json(["message" => "Invalid token data"], 400);
        }

        // Find staff by email (ensure the correct column name)
        $staff = DB::table("staff_mst")->where("email", $resetData->email)->first();

        if (!$staff) {
            return response()->json(["message" => "Staff not found"], 404);
        }

        // Update staff password and mark as verified
        DB::table("staff_mst")
            ->where("Email", $resetData->email)
            ->update([
                "Passwrd" => $req->password, // Fixed column name
                "verified" => 1
            ]);
        return response()->json(["Result" => "Password set successfully!", "Status" => "OK",], 200);
    }
}
