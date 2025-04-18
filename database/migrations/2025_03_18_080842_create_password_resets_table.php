<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('password_resets', function (Blueprint $table) {
            $table->id();
            $table->string('Email')->unique(); // Match staff_mst table column name
            $table->string('token'); // Store reset token
            $table->timestamp('created_at')->nullable();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('password_resets', function (Blueprint $table) {
            //
        });
    }
};
