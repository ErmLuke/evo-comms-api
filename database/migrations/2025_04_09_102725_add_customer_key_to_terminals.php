<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    
    public function up(): void
    {
        Schema::table('terminals', function (Blueprint $table) {
            $table->string('model')->nullable()->change();
            $table->foreignId('customer_id')->nullable()->constrained();
        });
    }
    
    public function down(): void
    {
        Schema::table('terminals', function (Blueprint $table) {
            //
        });
    }
    
};
