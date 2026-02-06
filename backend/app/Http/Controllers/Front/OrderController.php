<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function saveOrder(Request $request){
        
        try{
            DB::beginTransaction(); 
                if(!empty($request->cart)){


                    $Validator=Validator::make($request->all(),[
                        'name'=>'required|string|min:3|max:255',
                        'email'=>'required|email|max:100',
                        'mobile'=>'required|string|min:10|max:10',
                        'state'=>'required|string',
                        'zip'=>'required|integer|min:6',
                        'city'=>'required|string',
                        // 'grand_total'=>'required|integer',
                        // 'sub_total'=>'required|integer',
                        // 'shipping'=>'required|integer',
                    ]);
                    if($Validator->fails()){
                        return response()->json(['status'=>400,'message'=>'Vliadation error!','error'=>$Validator->errors()],400);
                    }


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
                    $order->discount=0;
                    $order->shipping=$request->shipping;
                    $order->payment_status='not_paid';
                    $order->status='pending';
                    $order->user_id=auth()->user()->id;
                    $order->save();

                    $cart=json_decode($request->cart, true);
                    foreach($cart as $item){
                        $orderItem = new OrderItem();
                        $orderItem->price = $item['qty']*$item['price'];
                        $orderItem->qty=$item['qty'];
                        $orderItem->unit_price=$item['price'];
                        $orderItem->size=$item['size'];
                        $orderItem->product_id=$item['product_id'];
                        $orderItem->order_id=$order->id;
                        $orderItem->product_name=$item['product_name'];
                        $orderItem->save();
                    }
                    DB::commit();
                   
                    return response()->json(['status'=>200,'message'=>'Thanks for order!']);
                }else{
                    return response()->json(['status'=>400,'message'=>"Cart shoud't be empty!"],400);
                }
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['status'=>500,'error'=>$e->getMessage(),'message'=>'Internal Server Error!']);

        }

    }
    public function orderConfirm($orderId,Request $request){
        $data=Order::with('items','customer')->find($orderId);
        if(!$data){
            return response()->json(['status'=>404,'message'=>'Data not Fond!'],404);
        }else{
            return response()->json(['status'=>200,'message'=>'Data Fond!','data'=>$data],200);
        }
    }
}
