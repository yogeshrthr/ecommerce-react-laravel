<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProductImage extends Model
{
    protected  $table ='tbl_product_images';
    protected $fillable=[
        'image',
        "product_id",
        'created_at',
        'updated_at'
    ];
   
}
