<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class StaffSetPasswordMail extends Mailable
{
    public $email;
    public $token;

    public function __construct($email, $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject('Set Your Password')
                    ->view('emails.set-password')
                    ->with([
                        'email' => $this->email,
                        // 'link'  => url('/set-password?token=' . $this->token),
                        'link' => env('FRONTEND_URL', 'http://localhost:5173') . '/set-password?token=' . $this->token,

                    ]);
    }
}
