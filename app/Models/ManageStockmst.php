<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ManageStockmst extends Model
{
    public function AddStockmst($req)
    {
        try {

            $P_IdExists = DB::table('productmst')->where('P_Id', $req['P_Id'])->exists();
            $Purchase_IdExists = DB::table('purchasemst')->where('Purchase_Id', $req['Purchase_Id'])->exists();

            if (!$P_IdExists && $Purchase_IdExists) {
                return "Invalid P_Id. It Does Not Exist.";
            } else {
                $AddData = [
                    "P_Id" => $req['P_Id'],
                    "Purchase_Id" => $req['Purchase_Id'],
                    "MFG_Date" => $req['MFG_Date'],
                    "Exp_Date" => $req['Exp_Date'],
                    "No_Of_Stock" => $req['No_Of_Stock'],
                    "Cost_Price" => round($req['Cost_Price'], 2),
                    "Inword_Date" => $req['Inword_Date']
                ];

                DB::table("stockmst")->insert($AddData);
                return "Saved Successfully..!!";
            }
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetStockmst()
    {
        try {

            $Result = DB::table('stockmst')
                ->join('productmst', 'stockmst.P_Id', '=', 'productmst.P_Id')
                ->join('purchasemst', 'purchasemst.Purchase_Id', '=', 'stockmst.Purchase_Id')
                ->join('vendors', 'purchasemst.V_Id', '=', 'vendors.V_Id')

                ->select('stockmst.*', 'purchasemst.*', 'vendors.*', 'productmst.Name as Product_Name')
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetPurchaseStockmst($Purchase_Id)
    {
        try {

            $Result = DB::table('stockmst')
                ->join('productmst', 'stockmst.P_Id', '=', 'productmst.P_Id')
                ->select('stockmst.*', 'productmst.Name as Product_Name')
                ->where("stockmst.Purchase_Id", "=", $Purchase_Id)
                ->get();

            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function UpdateStockmst($req)
    {

        $Exists = DB::table('stockmst')->where([
            "Stock_Id" => $req['Stock_Id']
        ])->exists();

        $AddData = [
            "P_Id" => $req['P_Id'],
            "Purchase_Id" => $req['Purchase_Id'],
            "MFG_Date" => $req['MFG_Date'],
            "Exp_Date" => $req['Exp_Date'],
            "No_Of_Stock" => $req['No_Of_Stock'],
            "Cost_Price" => round($req['Cost_Price'], 2),
            "Inword_Date" => $req['Inword_Date']
        ];

        if (!$Exists) {
            return response()->json(["Result" => "No Data Exists", "Status" => "Failed"], 401);
        }

        $DataUpdate = DB::table('stockmst')->where(["Stock_Id" => $req['Stock_Id']])->update($AddData);

        if ($DataUpdate) {
            return true;
        } else {
            return false;
        }
    }

    public function GetStockAvailableDetail($loadStockId = null)
    {
        try {
            $query = DB::table('productmst as p')
                ->join('stockmst as s', 'p.P_Id', '=', 's.P_Id')
                ->select(
                    'p.Name',
                    'p.Weight',
                    'p.FSSAI',
                    'p.Brand',
                    's.Stock_Id',
                    's.MFG_Date',
                    's.Exp_Date',
                    DB::raw('SUM(s.No_Of_Stock) as Total_Stock'),
                    DB::raw('(SUM(s.No_Of_Stock) - COALESCE((SELECT SUM(ls.Qty) FROM load_stock ls WHERE ls.Stock_Id = s.Stock_Id), 0)) as Available_Stock')
                )
                ->groupBy('p.P_Id', 'p.Name', 'p.Weight', 'p.FSSAI', 'p.Brand', 's.MFG_Date', 's.Exp_Date', 's.Stock_Id')
                ->havingRaw('Available_Stock > 0'); // ✅ Only show available stock

            // ✅ Apply condition only if $loadStockId is provided
            if (!is_null($loadStockId)) {
                $query->whereExists(function ($subquery) use ($loadStockId) {
                    $subquery->select(DB::raw(1))
                        ->from('load_stock')
                        ->whereColumn('load_stock.Stock_Id', 's.Stock_Id')
                        ->where('load_stock.LoadStock_Id', '=', $loadStockId);
                });
            }

            $Result = $query->first();

           return $Result;
        } catch (Exception $Exp) {
            return response()->json(["Status" => "Fail", "Message" => $Exp->getMessage()], 500);
        }
    }

    public function GetStockById($Id)
    {
        try {
            $Exists = DB::table('stockmst')->where('Stock_Id', "=", $Id)->exists();

            if (!$Exists) {
                return false;
            }

            $Result = DB::table('stockmst')->where('Stock_Id', "=", $Id)->first();
            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }

    public function GetStockDetail()
    {
        try {
            $Result = DB::table('productmst as p')
                ->join('stockmst as s', 'p.P_Id', '=', 's.P_Id')
                ->select(
                    'p.Name',
                    'p.Weight',
                    'p.FSSAI',
                    'p.Brand',
                    's.Stock_Id',
                    's.MFG_Date',
                    's.Exp_Date',
                    DB::raw('SUM(s.No_Of_Stock) as Total_Stock'),
                    DB::raw('(SUM(s.No_Of_Stock) - COALESCE((SELECT SUM(ls.Qty) FROM load_stock ls WHERE ls.Stock_Id = s.Stock_Id), 0)) as Available_Stock')
                )
                ->groupBy('p.P_Id', 'p.Name', 'p.Weight', 'p.FSSAI', 'p.Brand', 's.MFG_Date', 's.Exp_Date', 's.Stock_Id')
                ->havingRaw('Available_Stock > 0') // ✅ Only show available stock
                ->get();

            // ✅ Return "No Stock" if the result is empty
            if ($Result->isEmpty()) {
                return "No Stock";
            }

            return $Result;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function DeleteStockmst($Id)
    {
        try {
            $Exists = DB::table('stockmst')->where('Stock_Id', "=", $Id)->exists();
            if (!$Exists) {
                return false;
            }

            DB::table('stockmst')->where('Stock_Id', "=", $Id)->delete();
            return true;
        } catch (Exception $Exp) {
            return $Exp->getMessage();
        }
    }
    public function getStockReport()
    {
        $stocks = DB::table('stockmst as s')
            ->join('productmst as p', 's.P_Id', '=', 'p.P_Id')
            ->select(
                's.P_Id',
                'p.Name',
                'p.Weight',
                'p.Unit',
                'p.Price',
                'p.Net_Qty',
                'p.FSSAI',
                'p.Barcode',
                'p.Brand',
                'p.HSN',
                'p.GST',
                's.MFG_Date',
                's.Exp_Date',
                's.No_Of_Stock',
                's.Cost_Price',
                's.Inword_Date'
            )
            ->orderBy('s.P_Id', 'asc') // Sorting by Product ID
            ->get();

        return $stocks;
    }
}
