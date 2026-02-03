<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table='tbl_orders';
    protected $primary_key='id';
    protected $fillable=[
        'name',
        'email',
        'address',
        'mobile',
        'state',
        'zip',
        'city',
        'grand_total',
        'sub_total',
        'discount',
        'shipping',
        'payment_status',
        'status',
        'user_id',
    ];
}
