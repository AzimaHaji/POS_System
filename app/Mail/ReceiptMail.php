<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    public $receiptData;

    public function __construct($data)
    {
        $this->receiptData = $data; // Store full data
    }

    public function build()
    {
        return $this->subject('Your Receipt')
                    ->view('emails.receipt') 
                    ->with('receiptData', $this->receiptData);
    }
}

