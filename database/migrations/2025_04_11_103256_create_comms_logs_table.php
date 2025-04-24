<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    
    public function up(): void
    {
        Schema::create('comms_logs', function (Blueprint $table) {
            $table->id();
            $table->string('log');
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('comms_logs');
    }
    
};
