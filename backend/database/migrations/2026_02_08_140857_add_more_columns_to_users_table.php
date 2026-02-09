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
        Schema::table('users', function (Blueprint $table) {
            if(schema::hasColumn('users','address')){
                $table->dropColumn('address');
            }
            if(schema::hasColumn('users','mobile')){
                $table->dropColumn('mobile');
            }
            if(schema::hasColumn('users','state')){
                $table->dropColumn('state');
            }
            if(schema::hasColumn('users','pincode')){
                $table->dropColumn('pincode');
            }
            if(schema::hasColumn('users','city')){
                $table->dropColumn('city');
            }
            $table->string('address')->default(null);
            $table->string('mobile')->nullable()->unique();
            $table->string('pincode')->default(null);
            $table->string('state')->default(null);
            $table->string('city')->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['address','mobile','pincode','state','city']);
        });
    }
};
