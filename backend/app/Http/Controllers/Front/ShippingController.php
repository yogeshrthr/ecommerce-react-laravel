<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ApiResponseTrait;
use App\Models\ShippingCharge;

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
}
