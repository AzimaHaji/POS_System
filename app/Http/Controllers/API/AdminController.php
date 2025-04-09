<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    private Admin $dbContext;
    public function __construct(){
        $this->dbContext = new Admin();
    }
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            return response()->json(['success' => $success], 200); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);

        if ($validator->fails()) { 
                    return response()->json(['error'=>$validator->errors()], 401);            
                }
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], 200); 
    }
    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json(['success' => $user], 200); 
    } 
    public function AddAdmin(Request $req){
        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "F_Name" => "required|string|max:255",
            "U_Name" => "required|string|max:255",
            "Passwd" => "required|string|min:6",
            "Email" => "required|email",
            "ContactNo" => "required|digits:10"
        ]);

        
            if(!$Validation->fails()){
                $Result = $this->dbContext->AddAdmin($Data);
                return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
       
    }
    public function GetAdmin(){
        
        $Result = $this->dbContext->GetAdmin();
        return response()->json(["Status" => "OK","Result"=>$Result],200);
            
    }
    public function DeleteAdmin($Id)
    {
        try {
            
            $Result = $this->dbContext->DeleteAdmin($Id);

            if ($Result) {
                return response()->json(["Status" => "OK", "Result" => "Admin Deleted Successfully"], 200);
            } else {
                return response()->json(["Status" => "Fail", "Result" => "Admin not found"], 404);
            }
        } catch (Exception $Exp) {
            return response()->json(["Status" => "Fail", "Result" => $Exp->getMessage()], 500);
        }
    }
    public function UpdateAdmin(Request $req){


        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "F_Name" => "required|string",
            "U_Name" => "required|string",
            "Email" => "required|email",
            "ContactNo" => "required|digits:10"
        ]);

        
            if(!$Validation->fails()){
                $Result = $this->dbContext->UpdateAdmin($Data);
                if($Result)
                {
                    return response()->json(["Result"=> $Result,"Status" => "OK"],200);
                }
                else
                {
                    return response()->json(["Result"=> "Failed To Update","Status" => "Failed"],200);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }
    public function AuthAdmin(Request $req){
        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "Passwd" => "required|string|min:6",
            "Email" => "required|email",
        ]);

            if(!$Validation->fails()){
                $Result = $this->dbContext->AuthAdmin($Data);

                if ($Result != "Fail"){
                    return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
                }
                else
                {
                    return response()->json(["Status" => "Fail","Result"=> "Wrong Email or Password"],status: 200);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }
    public function GetAdminById($Id)
    {
        $Result = $this->dbContext->GetAdminById($Id);
        return response()->json(["Status" => "OK", "Result" => $Result], 200);
    }
    public function ChangePasswd(Request $req){
        $Data = $req->all();
        $validator = Validator::make($req->all(), [
            "Email" => "required|email",
            "OldPasswd" => "required",
            "NewPasswd" => "required|min:6",
            "C_Passwd" => "required|same:NewPasswd",
        ]);

            if(!$validator->fails()){
                $Result = $this->dbContext->ChangePasswd($Data);

                if ($Result != "Incorrect Email or Old Password"){
                    return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
                }
                else
                {
                    return response()->json(["Status" => "Fail","Result"=> "Wrong Email or Password"],status: 404);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }

    public function CloseTrip(Request $req){
        $Data = $req->all();
        $Validation = Validator::make($Data,[
            "Finish_Date" => "",
            "Start_Date" => "required",
        ]);

            if(!$Validation->fails()){
                $Result = $this->dbContext->CloseTrip($Data);

                if ($Result != "Fail"){
                    return response()->json(["Status" => "OK","Result"=>$Result],status: 200);
                }
                else
                {
                    return response()->json(["Status" => "Fail","Result"=> "No Trip Available"],status: 200);
                }
            }
            else
            {
                return response()->json(["Status" => "Fail","Result"=>"Validation Error"],400);
            }
    }

}
