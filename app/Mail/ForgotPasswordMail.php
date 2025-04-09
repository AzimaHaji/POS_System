<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ForgotPasswordMail extends Mailable
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
        return $this->subject('Reset Your Password')
                    ->view('emails.forgot-password')
                    ->with([
                        'link' => config('app.frontend_url') . '/reset-password?token=' . $this->token,
                    ]);
    }
}
