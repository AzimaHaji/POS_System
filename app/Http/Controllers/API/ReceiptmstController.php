<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ManageReceiptmst;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\HtmlString;

class ReceiptmstController extends Controller
{
    private ManageReceiptmst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageReceiptmst();
    }

    public function AddReceiptmst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Rec_No' => 'required|string',
            'Customer_Name' => 'required',
            'Total_Gross' => 'required',
            'GST' => 'required',
            'GST_Type' => 'required',
            'Grand_Total' => 'required',
            'Rec_Date' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddReceiptmst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
    public function storeInvoice(Request $req)
    {
        $Result = $this->dbContext->storeInvoice($req);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function SendEmail(Request $req)
    {
        $data = $req->all();

        if (!isset($data['email']) || empty($data['email'])) {
            return response()->json(["Status" => "Fail", "Message" => "Email is required"], 400);
        }

        try {
            $emailBody = new HtmlString("
                <h3>Receipt Details</h3>
                <p><strong>Customer ID:</strong> {$data['C_Id']}</p>
                <p><strong>Grand Total:</strong> {$data['Grand_Total']}</p>
                <p><strong>GST Type:</strong> {$data['GST_Type']}</p>
                <p><strong>Receipt Date:</strong> {$data['Rec_Date']}</p>
            ");

            Mail::html($emailBody, function ($message) use ($data) {
                $message->to($data['email'])
                    ->subject("Receipt Confirmation");
            });

            return response()->json(["Status" => "OK", "Message" => "Email sent successfully"], 200);
        } catch (\Exception $e) {
            return response()->json(["Status" => "Fail", "Message" => "Email sending failed", "Error" => $e->getMessage()], 500);
        }
    }

    public function GetReceiptmst()
    {

        $Result = $this->dbContext->GetReceiptmst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function receiptDetails($Id)
    {

        $Result = $this->dbContext->receiptDetails($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetMonthSales()
    {

        $Result = $this->dbContext->GetMonthSales();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateReceiptmst(Request $req)
    {

        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Rec_No' => 'required|string',
            'Customer_Name' => 'required',
            'Total_Gross' => 'required',
            'GST' => 'required',
            'GST_Type' => 'required',
            'Grand_Total' => 'required',
            'Rec_Date' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateReceiptmst($Data);
            if ($Result) {
                return response()->json(["Result" => $Result, "Status" => "Data Updated Successfully"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }
    public function index(Request $request)
    {
        $startDate = $request->query('start_date', '2025-01-01'); // Default or from request
        $endDate = $request->query('end_date', '2025-12-31');

        $Result = $this->dbContext->getReceiptsByDateRange($startDate, $endDate);
        return response()->json([
            'Status' => 'OK',
            'Message' => 'Receipts retrieved successfully.',
            'Result' => $Result
        ], 200);
    }

    public function getOrderProductReceiptByDateRange(Request $request)
    {
        $data = $request->all();
        $startDate = $data["start_date"]; 
        $endDate = $data["end_date"];

        $Result = $this->dbContext->getOrderProductReceiptByDateRange($startDate, $endDate);
        return response()->json([
            'Status' => 'OK',
            'Message' => 'Receipts retrieved successfully.',
            'Result' => $Result
        ], 200);
    }
}
