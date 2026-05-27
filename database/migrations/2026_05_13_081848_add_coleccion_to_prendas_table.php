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
        Schema::table('prendas', function (Blueprint $table) {
            $table->string('coleccion')->nullable()->after('categoria');
        });
    }

    public function down(): void
    {
        Schema::table('prendas', function (Blueprint $table) {
            $table->dropColumn('coleccion');
        });
    }
};
