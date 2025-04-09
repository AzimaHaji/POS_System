<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        // Look up the token in the password_resets table
        $resetData = DB::table('password_resets')->where('token', $request->token)->first();

        if (!$resetData) {
            return response()->json(["message" => "Invalid or expired token"], 400);
        }

        // Ensure the email exists in the reset data
        if (!isset($resetData->email)) {
            return response()->json(["message" => "Invalid token data"], 400);
        }

        // Find the staff by email (adjust column name if needed)
        $staff = DB::table('staff_mst')->where('Email', $resetData->email)->first();

        if (!$staff) {
            return response()->json(["message" => "Staff not found"], 404);
        }

        // Update the staff's password (hash the new password)
        DB::table('staff_mst')
            ->where('Email', $resetData->email)
            ->update([
                'Passwrd'   =>$request->password,
                'verified'  => 1,
                'Updated_At'=> Carbon::now(),
            ]);

        // Delete the token from the password_resets table
        DB::table('password_resets')->where('email', $resetData->email)->delete();

        return response()->json(["message" => "Password reset successfully", "Status" => "OK"], 200);
    }
}
