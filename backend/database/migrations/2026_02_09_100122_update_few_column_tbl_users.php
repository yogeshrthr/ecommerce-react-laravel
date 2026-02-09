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
            if(Schema::hasColumn('users','address')){
                $table->dropColumn('address');
            }
            if(Schema::hasColumn('users','pincode')){
                $table->dropColumn('pincode');
            }
            if(Schema::hasColumn('users','state')){
                $table->dropColumn('state');
            }
            if(Schema::hasColumn('users','city')){
                $table->dropColumn('city');
            }
            $table->string('pincode')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
             $table->string('address');
             $table->string('city');
             $table->string('state');
             $table->string('pincode');
        });
    }
};
