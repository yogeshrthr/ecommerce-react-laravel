<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public function saveOrder(Request $request){
        // dd($request->all(),auth()->user()->toArray());
        if(!empty($request->cart)){
            $order =new Order();
            $order->name=$request->name;
            $order->email=$request->email;
            $order->address=$request->address;
            $order->mobile=$request->mobile;
            $order->state=$request->state;
            $order->zip=$request->zip;
            $order->city=$request->city;
            $order->grand_total=$request->grand_total;
            $order->sub_total=$request->sub_total;
            $order->discount=$request->discount;
            $order->shipping=$request->shipping;
            $order->payment_status=$request->payment_status;
            $order->status=$request->status;
            $order->user_id=$request->user_id;
            $order->save();
            
            foreach($request->cart as $item){
                $orderItme=new OrderItem();
                $orderItem->price=$item['qty']*$item['price'];
                $orderItem->qty=$item['qty'];
                $orderItem->price=$item['price'];
                $orderItem->size=$item['size'];
                $orderItem->product_id=$item['product_id'];
                $orderItem->save();
            }

            return response()->json(['status'=>200,'message'=>'Thanks for order!']);
        }else{
            return response()->json(['status'=>400,'message'=>"Cart shoud't be empty!"],400);
        }

    }
}
