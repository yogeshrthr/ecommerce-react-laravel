<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
  protected $table='tbl_product_sizes';
  protected $primaryKey = 'id';
  protected $fillable=[
    'product_id',
    'size_id'
  ];
}
