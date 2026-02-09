<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use App\ApiResponseTrait;
use Validator;

class ShippingController extends Controller
{
    use ApiResponseTrait;
    public function getShippingCharge(Request $request){
        try{
                $data=ShippingCharge::first();
                if($data){
                    return $this->success($data,'data found!');
                }
                else
                    return $this->success(null,'Shipping Charge Not found!'); 

        }catch(\Exception $e){
            return $this->internalError($e->getMessage());
        }
       
    }
    public function updateshippingCarge(Request $request){
        try{
            Validator::make($request->all(),[
                'shipping_charge'=>'required|integer'
            ])->validate();
            
            $data=ShippingCharge::updateOrCreate([
                'id'=>1
            ],['shipping_charge'=>$request->shipping_charge]);
            if($data->wasRecentlyCreated){
                return $this->success(null,'Created Successfully');
            }
            return $this->success(null,'Updated Successfully');

        }catch(\Exception $e){
            return $this->internalError($e->getMessage());
        }
       
    }
}
