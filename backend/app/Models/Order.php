<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use App\Models\Order;
use App\Models\OrderItem;

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
        'id',
        'created_at'
    ];
    protected $appends=['order_date','full_address'];
    public function getOrderDateAttribute(){
       return  $this->created_at->format('Y-m-d  H:i');
    }
    public function items(){
        return $this->hasMany(OrderItem::class,'order_id','id');
    }

    public function customer(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function getFullAddressAttribute(){
        if(!empty($this->address) && !empty($this->city) && !empty($this->state) ){
            $address=$this->address.', '.$this->city.', '.$this->state.', '.$this->zip;
        }elseif(!empty($this->address) && !empty($this->city) ){
            $address=$this->address.','.$this->city.', '.$this->zip;
        }else if(!empty($this->address) && !empty($this->state)){
            $address=$this->address.' '.$this->state.', '.$this->zip;
        }else{
            return $this->address || $this->city|| $this->state;
        }
        return $address;
        
    }

}
