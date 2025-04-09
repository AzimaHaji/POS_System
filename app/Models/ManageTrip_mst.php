<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;




class ManageTrip_mst extends Model
{
    public function AddTrip_mst($req)
    {
        try {

            $VehicleExists = DB::table('vehiclemst')->where('Vehicle_Id', $req['Vehicle_Id'])->exists();

            $StaffExists = DB::table('staff_mst')->where('Staff_Id', $req['Staff_Id'])->exists();

            if (!$VehicleExists) {
                return "Invalid Vehicle_Id. It does not exist.";
            }

            if (!$StaffExists) {
                return "Invalid Staff_Id. It does not exist.";
            }

            $AddData = [
                $AddData = [
                    "Vehicle_Id"   => $req['Vehicle_Id'],
                    "Staff_Id"     => $req['Staff_Id'],
                    "Start_Date"   => Carbon::now(),
                    "Finish_Date"  => null,
                ]
            ];
            DB::table("trip_mst")->insert($AddData);

            return "Saved Successfully..!!";
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetTrip_mst()
    {
        try {

            $Result = DB::table('trip_mst')
                ->join('staff_mst', 'trip_mst.Staff_Id', '=', 'staff_mst.Staff_Id')
                ->join('vehiclemst', 'trip_mst.Vehicle_Id', '=', 'vehiclemst.Vehicle_Id')
                ->select(
                    'trip_mst.*',
                    'staff_mst.F_Name',
                    'vehiclemst.Driver_Name',
                    'vehiclemst.Vehicle_Name',
                    'vehiclemst.Status'
                )
                ->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateTrip_mst($req)
    {
        $Exists = DB::table('trip_mst')->where([
            "Trip_Id" => $req['Trip_Id']
        ])->exists();


        $AddData = [
            "Finish_Date"  => $req['Finish_Date']
        ];

        if (!$Exists) {
            return "No Data Exists";
        }

        $DataUpdate = DB::table('trip_mst')->where(["Trip_Id" => $req['Trip_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
    public function GetTripById($Id)
    {
        try {
            $Exists = DB::table('trip_mst')->where('Trip_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('trip_mst')->where('Trip_Id', "=", $Id)
                ->join('staff_mst', 'trip_mst.Staff_Id', '=', 'staff_mst.Staff_Id')
                ->join('vehiclemst', 'trip_mst.Vehicle_Id', '=', 'vehiclemst.Vehicle_Id')
                ->select(
                    'trip_mst.*',
                    'staff_mst.F_Name',
                    'vehiclemst.Driver_Name',
                    'vehiclemst.Vehicle_Name',
                    'vehiclemst.Status'
                )
                ->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function GetStaffTripById($Id)
    {
        try {

            $Exists = DB::table('staff_mst')->where('Staff_Id', $Id)->exists();

            if (!$Exists) {
                return null; 
            }

            $today = Carbon::today()->toDateString(); 

            $Result = DB::table('staff_mst')
                ->join('trip_mst', 'trip_mst.Staff_Id', '=', 'staff_mst.Staff_Id')
                ->join('vehiclemst', 'trip_mst.Vehicle_Id', '=', 'vehiclemst.Vehicle_Id')
                ->where('staff_mst.Staff_Id', $Id)
                ->whereDate('trip_mst.Start_Date', "=", $today) // Ensuring proper date format
                ->whereNull('trip_mst.Finish_Date') // More reliable than checking for empty string
                ->select(
                    'trip_mst.*',
                    'staff_mst.F_Name',
                    'vehiclemst.Driver_Name',
                    'vehiclemst.Vehicle_Name',
                    'vehiclemst.Status'
                )
                ->first();

            return $Result ?: null; // Return null if no trip found
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function UpdateTrip($req)
    {
        $Exists = DB::table('trip_mst')->where([
            "Trip_Id" => $req['Trip_Id']
        ])->exists();


        $AddData = [
            "Vehicle_Id"   => $req['Vehicle_Id'],
            "Staff_Id"     => $req['Staff_Id'],
            "Start_Date"   => Carbon::now()
        ];

        if (!$Exists) {
            return "No Data Exists";
        }

        $DataUpdate = DB::table('trip_mst')->where(["Trip_Id" => $req['Trip_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }
    public function tripReport()
    {
        try {

            $Result = DB::table('trip_mst')
                ->join('staff_mst', 'trip_mst.Staff_Id', '=', 'staff_mst.Staff_Id')
                ->join('vehiclemst', 'trip_mst.Vehicle_Id', '=', 'vehiclemst.Vehicle_Id')
                ->select(
                    'trip_mst.Trip_Id',
                    'trip_mst.Start_Date',
                    'staff_mst.F_Name as Staff_Name',
                    'vehiclemst.Driver_Name',
                    'vehiclemst.Vehicle_Name',
                    'vehiclemst.Status'
                )
                ->get();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function getTripReceipts($tripId)
    {
        $Result = DB::table('receiptmst')
            ->join('customer_mst', 'receiptmst.C_Id', '=', 'customer_mst.C_Id')
            ->select(
                'receiptmst.Invoice_Id',
                'receiptmst.C_Id',
                'customer_mst.Customer_Name',
                'customer_mst.Email',
                'customer_mst.ContactNo',
                'customer_mst.GST_No',
                'receiptmst.Total_Gross',
                'receiptmst.GST',
                'receiptmst.GST_Type',
                'receiptmst.Grand_Total',
                'receiptmst.Rec_Date',
                'receiptmst.Trip_Id'
            )
            ->where('receiptmst.Trip_Id', $tripId) // Filter by Trip_Id
            ->get();

        return $Result;
    }

    public function getSalesReport($tripId)
    {
        $salesReport = DB::table('invoice_payment')
            ->join('receiptmst', 'invoice_payment.Invoice_Id', '=', 'receiptmst.Invoice_Id')
            ->join('load_stock', 'receiptmst.Trip_Id', '=', 'load_stock.Trip_Id') // ✅ Join with load_stock
            ->join('stockmst', 'load_stock.Stock_Id', '=', 'stockmst.Stock_Id')
            ->join('productmst', 'stockmst.P_Id', '=', 'productmst.P_Id')
            ->select(
                'invoice_payment.Invoice_Id',
                'invoice_payment.Amount',
                'invoice_payment.Payment_Mode',
                'invoice_payment.Payment_Date',
                'productmst.Name as Product_Name',
                'stockmst.No_Of_Stock',
                'load_stock.Qty as Sold_Qty',
                'stockmst.Cost_Price',
                DB::raw('(load_stock.Qty * stockmst.Cost_Price) as Total_Cost')
            )
            ->where('receiptmst.Trip_Id', $tripId)
            ->orderBy('invoice_payment.Payment_Date', 'desc')
            ->get();

        return $salesReport;
    }
}
