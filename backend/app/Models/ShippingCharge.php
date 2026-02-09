<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingCharge extends Model
{
    protected $table="tbl_shipping_charges";
    protected $fillable=[
        'id',
        'shipping_charge'
    ];
}
