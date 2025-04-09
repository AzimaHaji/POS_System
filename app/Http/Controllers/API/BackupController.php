<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class BackupController extends Controller
{
    public function downloadDatabaseBackup()
    {
        try {
            // Get database credentials from .env
            $databaseName = env('DB_DATABASE'); 
            $username = env('DB_USERNAME'); 
            $password = env('DB_PASSWORD'); 
            $host = env('DB_HOST');

            // Check if the database name exists
            if (empty($databaseName)) {
                return response()->json(['success' => false, 'message' => 'Database name is missing in .env file.'], 500);
            }

            // Define the backup file name
            $backupFileName = "{$databaseName}_" . date('Y-m-d_H-i-s') . ".sql";
            $backupFilePath = storage_path("app/backups/{$backupFileName}");

            // Ensure the backups folder exists
            if (!Storage::exists('backups')) {
                Storage::makeDirectory('backups'); 
            }

            // Handle password part in the MySQL dump command
            $passwordPart = !empty($password) ? "--password=" . escapeshellarg($password) : "";

            // Build the MySQL Dump Command
            $command = sprintf(
                'mysqldump --user=%s %s --host=%s %s > %s',
                escapeshellarg($username),
                $passwordPart,
                escapeshellarg($host),
                escapeshellarg($databaseName),
                escapeshellarg($backupFilePath)
            );

            // Execute the command
            $output = null;
            $resultCode = null;
            exec($command, $output, $resultCode);

            // Check if the backup was successful
            if ($resultCode == 0) {
                return Response::download($backupFilePath);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Database backup failed. Please check server permissions.'
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
