<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
