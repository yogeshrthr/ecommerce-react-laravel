<?php

namespace App\Http\Controllers\Admin;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getOrderList(Request $request){
        $per_page=$request->per_page??10;
        $order= Order::OrderBy('id','desc');
        $search=$request->search??'';
        $status=$request->status??'';
        $payment_status=$request->payment_status??'';
        
        $order=$order->when($status,function($q) use ($status){
            $q->where('status',$status);               
        });
        $order=$order->when($payment_status,function($q) use ($payment_status){
            $q->where('payment_status','=',$payment_status);               
        });

        $order=$order->when($search,function($q) use ($search){
            $q->where(function($q) use ($search){
                $q->where('name','like',"%$search%")
                    ->orWhere('id','like',"%$search%")
                    ->orWhere('grand_total','like',"%$search%");
            });
            
        });


            
        $order=$order->paginate($per_page);

        if($order){
                return response()->json(['status'=>200,'message'=>'Order found','data'=>$order]);
        }else{
                return response()->json(['status'=>200,'message'=>'Order Not found','data'=>[]]);
        }

    }
    public function orderDetail($orderId, Request $request){        
        $order=Order::with(['items.product'=>function($q){
            $q->select('id', 'image');
        },'items.size'=>function($q){
                $q->select('id','name');
        }]
           
        )->find($orderId);
        if($order){
            return response()->json(['status'=>200,'message'=>'order found','data'=>$order]);
        }else{
            return response()->json(['status'=>404,'message'=>'order found','data'=>[]],404);
        }
    }
    public function updateOrderStatus($orderId , Request $request){
        try{
            $validator = Validator::make($request->all(),[
                // 'id'=>'required|integer',
                'status'=>'required|in:pending,delivered,cancelled,shipped',
            ]);
            if($validator->fails()){
                return response()->json(['status'=>400,'message'=>'validation Failed','error'=>$validator->errors()],400);
            }
            $order=Order::find($orderId);
            if($order){
                $order->status=$request->status;
                $order->save();
                return response()->json(['status'=>200,'message'=>'Update Successfully!','data'=>$order]);
            }else{
                return response()->json(['status'=>404,'message'=>'data Found!','data'=>[]],404);
            }
        }catch(\Exception $e){
            return response()->json(['status'=>500,'message'=>'Internal Server Error','error'=>$e->getMessage(),'data'=>[]],500);
        }
    }
    public function updateOrderPaymentStatus($orderId , Request $request){
        try{
            $validator = Validator::make($request->all(),[
                // 'id'=>'required|integer',
                'status'=>'required|in:not_paid,paid',
            ]);
            if($validator->fails()){
                return response()->json(['status'=>400,'message'=>'validation Failed','error'=>$validator->errors()],400);
            }
            $order=Order::find($orderId);
            if($order){
                $order->payment_status=$request->status;
                $order->save();
                return response()->json(['status'=>200,'message'=>'Update Successfully!','data'=>$order]);
            }else{
                return response()->json(['status'=>404,'message'=>'data Found!','data'=>[]],404);
            }
        }catch(\Exception $e){
            return response()->json(['status'=>500,'message'=>'Internal Server Error','error'=>$e->getMessage(),'data'=>[]],500);
        }
    }
}
