<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;


class SizeController extends Controller
{
    public function index(){
        $size=Size::orderBy('name','desc')->get()->toArray();
        if(!$size){
            return response()->json(['status'=>404,'data'=>[],'message'=>'Not Found !']);
        }
        return response()->json(['status'=>200,'data'=>$size,'message'=>'fetched Successfully!']);
        
    }
}
