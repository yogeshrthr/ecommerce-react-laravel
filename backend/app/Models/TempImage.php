<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempImage extends Model
{
    protected $table='tbl_temp_images';
    protected $fillable=[
        'name'
    ];
}
