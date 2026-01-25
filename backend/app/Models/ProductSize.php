<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Size;

class ProductSize extends Model
{
  protected $table='tbl_product_sizes';
  protected $primaryKey = 'id';
  protected $fillable=[
    'product_id',
    'size_id'
  ];
  public function size(){
    return $this->hasMany(Size::class,'id','size_id')->select('name','id');
  }
}
