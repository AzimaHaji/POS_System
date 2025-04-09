<?php

namespace App\Http\Controllers\API;

use App\Models\ManageProductmst;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductmstController extends Controller
{
    private ManageProductmst $dbContext;

    public function __construct()
    {
        $this->dbContext = new ManageProductmst();
    }

    public function AddProductmst(Request $req)
    {
        $Data = $req->all();

        $Validation = Validator::make($Data, [
            'Name' => 'required',
            'Weight' => 'required',
            'Unit' => 'required',
            'Price' => 'required',
            'Net_Qty' => 'required',
            'FSSAI' => 'required',
            'Barcode' => 'required',
            'Brand' => 'required',
            'HSN' => 'required',
            'GST' => 'required'
        ]);

        if (!$Validation->fails()) {

            $Result = $this->dbContext->AddProductmst($Data);
            return response()->json(["Status" => "OK", "Result" => $Result], 200);
        }
        else 
        {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function GetProductmst()
    {

        $Result = $this->dbContext->GetProductmst();
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function UpdateProductmst(Request $req)
    {
        $Data = $req->all();
        $Validation = Validator::make($Data, [
            'Name' => 'required',
            'Weight' => 'required',
            'Unit' => 'required',
            'Price' => 'required',
            'Net_Qty' => 'required',
            'FSSAI' => 'required',
            'Barcode' => 'required',
            'Brand' => 'required',
            'HSN' => 'required',
            'GST' => 'required'
        ]);


        if (!$Validation->fails()) {
            $Result = $this->dbContext->UpdateProductmst($Data);
            if ($Result) {
                return response()->json(["Result" => "Data Updated Successfully", "Status" => "OK"], 200);
            } else {
                return response()->json(["Result" => "Failed To Update", "Status" => "Failed"], 404);
            }
        } else {
            return response()->json(["Status" => "Fail", "Result" => "Validation Error"], 400);
        }
    }

    public function DeleteProductmst($Id)
    {
        try {
            
            $Result = $this->dbContext->DeleteProductmst($Id);

            if ($Result) {
                return response()->json(["Status" => "OK", "Result" => "Product Deleted Successfully"], 200);
            } else {
                return response()->json(["Status" => "Fail", "Result" => "Product not found"], 404);
            }
        } catch (Exception $Exp) {
            return response()->json(["Status" => "Fail", "Result" => $Exp->getMessage()], 500);
        }
    }


    public function GetProductById($Id)
    {
        $Result = $this->dbContext->GetProductById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }

    public function GetProductStock(){
        
        $Result = $this->dbContext->GetProductStock();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
}
