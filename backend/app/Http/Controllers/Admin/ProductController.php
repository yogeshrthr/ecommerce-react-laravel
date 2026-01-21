<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\TempImage;
use App\Models\ProductImage;
use Validator , Str;
use Illuminate\Support\Facades\DB;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    public function index(Request $request){
        $per_page=$request->per_page??10;
        $searchTerm=$request->search;
        $status=$request->status;
        $product=Product::orderBy('id','desc')
        // 1. Always apply status filter if it exists (0 or 1)
        ->when($status !== null, function($query) use ($status) {
            $query->where('status', $status);
        })
        ->
        when($searchTerm, function($query) use ($searchTerm ,$status){            
            $query->where('title', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('sku', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('id', 'LIKE', '%' . $searchTerm . '%');
        })
        ->paginate($per_page);
        // $product=Product::orderBy('id','desc')->get()->toArray();
        if(!$product){
            return response()->json(['status'=>404,'data'=>[],'message'=>'Not Found !']);
        }
        return response()->json(['status'=>200,'data'=>$product,'message'=>'fetched Successfully!']);
    }


    public function store(Request $request){
        try{        
    
            DB::beginTransaction();
            $validate= Validator::make($request->all(),[
                    'title'=>'required|string',
                    'status'=>'required|in:0,1',                
                    'price'=>'required|numeric',
                    'category_id'=>'required|integer',               
                    // 'size_id'=>'required|integer',
                    // 'image'=>'required',
                    'sku'=>'required|string|unique:tbl_products,sku',


                    'description'=>'max:200',
                    'brand_id'=>'integer',
            ]);


            if($validate->fails()){
                return response()->json(['status'=>400,'error'=>$validate->errors(), 'message'=>"Validation Failed!"],200);
            }


            $product=new Product();
            $product->title=$request->title;
            $product->price=(float)$request->price;
            $product->category_id=$request->category_id;
            $product->brand_id=$request->brand_id;
            $product->sku=$request->sku;
            $product->description=$request->description;
            $product->short_description=$request->short_description;
            $product->compare_price=(float)$request->compare_price;
            $product->is_featured=strtolower($request->isFeatured);
            $product->qty=$request->qty;
            $product->barcode=$request->barcode;
            $product->status=$request->status;
            $product->save();

            if(!empty($request->gallery) &&  count(explode(',',$request->gallery))>0 ){
                foreach(explode(',',$request->gallery) as $indx=>$itemId){
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

                    ProductImage::create(['product_id'=>$product->id,'image'=>$imgeName]);
                    if($indx==0){
                        $product->image=$imgeName;
                        $product->save();
                    }

                }
            }            
            DB::commit();

            return response()->json(['status'=>200,'message'=>"Product has Been Created Successfully!". (isset($indx)? $indx+1 ." files uploaded" :'') ],200);
        }catch (\Exception  $e){
            return response()->json(['status'=>500,'message'=>$e->getMessage()],200);
        } 
       
        
        

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
            return response()->json(['status'=>200,'data'=>$product,'message'=>"Product Found!"],200);    
        else 
            return response()->json(['status'=>404,'messsge'=>'Product Not found']);

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
