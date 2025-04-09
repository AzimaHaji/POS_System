<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller; // Import the base Controller
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPasswordMail;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:staff_mst,Email', // Adjust table/column name as needed
        ]);

        $email = $request->email;
        $token = Str::random(64);

        // Store or update the token in password_resets
        DB::table('password_resets')->updateOrInsert(
            ['email' => $email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

        // Send the reset email
        Mail::to($email)->send(new ForgotPasswordMail($email, $token));

        return response()->json([
            "Status" => "OK",
            "message" => "Reset password link sent."
        ]);
    }
}
