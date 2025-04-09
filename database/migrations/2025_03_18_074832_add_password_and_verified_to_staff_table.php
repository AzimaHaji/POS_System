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
        Schema::table('staff_mst', function (Blueprint $table) {
            $table->string('password')->nullable(); // Password is NULL at registration
            $table->boolean('verified')->default(false); // Track if staff has set their password
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_mst', function (Blueprint $table) {
            //
        });
    }
};
