<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lookbook_fotos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lookbook_id')->constrained()->onDelete('cascade');
            $table->string('imagen');
            $table->integer('orden')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lookbook_fotos');
    }
};
