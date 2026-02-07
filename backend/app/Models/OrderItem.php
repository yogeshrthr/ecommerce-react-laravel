<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Size;

class OrderItem extends Model
{
    protected $table='tbl_order_items';
    protected $primary_key='id';
    protected $fillable=[
        'price',
        'qty',
        'unit_price',
        'size',
        'product_id',
        'product_name'
    ];
    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
    public function size(){
       return $this->belongsTo(Size::class, 'size', 'id');
    }
}
