<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\TempImage;
use Validator , Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    public function index(){
        $product=Product::orderBy('title','desc')->get()->toArray();
        dd($product);
        if(!$product){
            return response()->json(['status'=>404,'data'=>[],'message'=>'Not Found !']);
        }
        return response()->json(['status'=>200,'data'=>$product,'message'=>'fetched Successfully!']);
    }


    public function store(Request $request){
       
        $validate= Validator::make($request->all(),[
                'title'=>'required|string',
                'status'=>'required|in:0,1',                
                'price'=>'required|numeric',
                'category_id'=>'required|integer',               
                'size_id'=>'required|integer',
                // 'image'=>'required',
                'sku'=>'required|string|unique:tbl_products,sku',


                'description'=>'max:200',
                'brand_id'=>'integer',
        ]);


        if($validate->fails()){
            return response()->json(['status'=>400,'error'=>$validate->errors(), 'message'=>"Validation Failed!"],404);
        }


        $product=new Product();
        $product->title=$request->title;
        $product->price=$request->price;
        $product->category_id=$request->category_id;
        $product->brand_id=$request->brand_id;
        $product->sku=$request->sku;
        $product->description=$request->description;
        $product->short_description=$request->short_description;
        $product->compare_price=$request->compare_price;
        $product->is_featured=$request->is_featured;
        $product->qty=$request->qty;
        $product->barcode=$request->barcode;
        $product->save();



        if(!empty($request->gallary)){

            foreach($request->gallary as $indx=>$itemId){
                $tempImg=TempImage::find($itemId);


                $ext=explode('.',$tempImg->name);
                $ext=end($ext);
                $imgeName=$product->id.'-'.Str::random(10).'-'.time().'.'.$ext;


                // large image
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/'.$tempImg->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/'.$imgeName));


                // samall image  
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/'.$tempImg->name));
                $img->coverDown(400,460);
                $img->save(public_path('uploads/products/small/'.$imgeName));

                if($indx==0){
                    $product->image=$imgeName;
                    $product->save();
                }

            }
        }
       
        return response()->json(['status'=>200,'message'=>"Product has Been Created Successfully! $indx uploaded"],200);
        

    }
    public function edit(Request $request,$id){    
           
        $product = Prouct::find($id);    
        if($product)  
            return response()->json(['status'=>200,'data'=>$product,'message'=>"Product Found!"]);    
        else 
            return response()->json(['status'=>404,'data'=>[],'messsge'=>'Product Not found']);

    }
    public function update(Request $request,$id){
         $validate= Validator::make($request->all(),[
            'title'=>'required|string',
            'status'=>'required|in:0,1',                
            'price'=>'required|numeric',
            'category_id'=>'required|integer',               
            'size_id'=>'required|integer',
            // 'image'=>'required',
            'sku'=>'required|string|unique:tbl_products,sku,id',
            'description'=>'max:200',
            'brand_id'=>'integer',
        ]);

        if($validate->fails()){
            return response()->json(['status'=>400,'error'=>$validate->errors(), 'message'=>"Validation Failed!"],404);
        }

        $product = Product::find($id);
        $product->title=$request->title;
        $product->price=$request->price;
        $product->category_id=$request->category_id;
        $product->brand_id=$request->brand_id;
        $product->sku=$request->sku;
        $product->description=$request->description;
        $product->short_description=$request->short_description;
        $product->compare_price=$request->compare_price;
        $product->is_featured=$request->is_featured;
        $product->qty=$request->qty;
        $product->barcode=$request->barcode;
        $product->save();




       
        return response()->json(['status'=>200,'message'=>'Product has Been Updated Successfully!'],200);
        

    }

    public function show(Request $request,$id){        
        $product = Product::find($id);    
        if($product)  
            return response()->json(['status'=>200,'category'=>$category,'message'=>"Category Found!"],200);    
        else 
            return response()->json(['status'=>404,'messsge'=>'Category Not found']);

    }
    public function destroy(Request $request,$id){        
        $product = Product::find($id); 
        if(!$product){
            return response()->json(['status'=>404,"data"=>[],'message'=>'Product Not found!']);
        }
        $product->delete();
        return response()->json(['status'=>200,'message'=>'Product Deleted Successfully!']);  
    }
}
