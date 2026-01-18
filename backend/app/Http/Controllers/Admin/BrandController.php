<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Brand;

class BrandController extends Controller
{
     public function index(Request $request){

        $brand=Brand::get()->toArray();
        if(!$brand){
            return response()->json(['status'=>400,'brand'=>$brand,'message'=>"No Records found!"],200);
        }
        return response()->json(['status'=>200,'brand'=>$brand],200);

    }

    public function store(Request $request){
        $validate= Validator($request->all(),[
                'name'=>'required|string',
                'status'=>'required|in:0,1',
        ]);
        if($validate->fails()){
            return response()->json(['status'=>404,'error'=>$validate->errors(),'message'=>'Validation error!']);
        }

        Brand::insert([
            'name'=>$request->name,
            'status'=>$request->status,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response()->json(['status'=>200,'message'=>'Brand Created Successfully!']);
        

    }
    public function edit(Request $request,$id){        
        $brand = Brand::find($id);    
        if($brand)  
            return response()->json(['status'=>200,'brand'=>$brand]);    
        else 
            return response()->json(['status'=>404,'messsge'=>'Brand Not found']);

    }
    public function update(Request $request,$id){
        $validate= Validator($request->all(),[
                'name'=>'string',
                'status'=>'required|in:0,1',
        ]);
        if($validate->fails()){
            return response()->json(['status'=>404,'error'=>$validate->errors(),'message'=>'Validation error!']);
        }

        
        $brand = Brand::find($id);
        if(!$brand){
             return response()->json(['status'=>404,'message'=>'brand Not found!']);
        }
        $brand->update([
            'name'=>$request->name,
            'status'=>$request->status,
        ]);
        return response()->json(['status'=>200,'message'=>'Brand Updated Successfully!']);
        

    }

    public function show(Request $request ,$id){        
        $brand = Brand::find($id);    
        if($brand)  
            return response()->json(['status'=>200,'brand'=>$brand,'message'=>'Brand fetch successfully !']);    
        else 
            return response()->json(['status'=>404,'messsge'=>'Brand Not found']);

    }
    public function destroy(Request $request,$id){        
        $brand = Brand::find($id); 

        if(!$brand){
             return response()->json(['status'=>404,'message'=>'brand Not found!']);
        }
        $brand->delete();
        return response()->json(['status'=>200,'message'=>'Brand Deleted Successfully!']);  
    }
}
