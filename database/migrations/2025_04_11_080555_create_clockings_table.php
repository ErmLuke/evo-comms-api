<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    
    public function up(): void
    {
        Schema::create('clockings', function (Blueprint $table) {
            $table->id();
            $table->dateTime('time');
            $table->integer('clocking_id');
            $table->string('serial_number');
            $table->boolean('direction')->nullable();
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('clockings');
    }
    
};
