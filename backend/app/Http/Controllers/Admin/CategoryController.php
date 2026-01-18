<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Validator;

class CategoryController extends Controller
{
    public function index(Request $request){

        $category=Category::orderBy('id','desc')->get()->toArray();
        if(empty($category)){
            return response()->json(['status'=>400,'category'=>$category,'message'=>"No Records found!"],200);
        }
        return response()->json(['status'=>200,'category'=>$category,'message'=>"fetch Successfully!"],200);

    }

    public function store(Request $request){
       
        $validate= Validator($request->all(),[
                'name'=>'required|string',
                'status'=>'required|in:0,1',
        ]);
        if($validate->fails()){
            return response()->json(['status'=>400,'error'=>$validate->errors(), 'message'=>"Validation Failed!"],400);
        }

        Category::insert([
            'name'=>$request->name,
            'status'=>$request->status,
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        return response()->json(['status'=>200,'message'=>'Category Created Successfully!'],200);
        

    }
    public function edit(Request $request,$id){    
           
        $category = Category::find($id);    
        if($category)  
            return response()->json(['status'=>200,'category'=>$category,'message'=>"Category Found!"]);    
        else 
            return response()->json(['status'=>400,'messsge'=>'Category Not found']);

    }
    public function update(Request $request,$id){
        $validate= Validator($request->all(),[
                'name'=>'string',
                'status'=>'required|in:0,1',
        ]);
        if($validate->fails()){
            return response()->json(['status'=>400,'error'=>$validate->errors(),'message'=>"Validation Failed!"]);
        }

        $category = Category::find($id);
        // dd($category,$request->name);
        if(!$category){
             return response()->json(['status'=>400,'message'=>'Category Not found!']);
        }
        $category->update([
            'name'=>$request->name,
            'status'=>$request->status,
        ]);

        return response()->json(['status'=>200,'message'=>'Category Updated Successfully!']);
        

    }

    public function show(Request $request,$id){        
        $category = Category::find($id);    
        if($category)  
            return response()->json(['status'=>200,'category'=>$category,'message'=>"Category Found!"],200);    
        else 
            return response()->json(['status'=>400,'messsge'=>'Category Not found']);

    }
    public function destroy(Request $request,$id){        
        $category = Category::find($id); 
        if(!$category){
              
             return response()->json(['status'=>400,'message'=>'Category Not found!']);
        }
        $category->delete();
        return response()->json(['status'=>200,'message'=>'Category Deleted Successfully!']);  
    }
}
