<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;

class ProductController extends Controller
{
    // fetcign new added product 
    public function fetchNewArrivedProducts(Request $request){
       $newProduct= Product::where(['status'=>1,'is_featured'=>'no'])->orderBy('id','desc')->limit(8)->get();
       return response()->json(['status'=>200,'data'=>$newProduct]);
    }
    // fetching Featured  product 
    public function fetchFeaturedProducts(Request $request){
       $newProduct= Product::where(['status'=>1,'is_featured'=>'yes'])->orderBy('id','desc')->limit(8)->get();
       return response()->json(['status'=>200,'data'=>$newProduct]);
    }


    /// fetchign cateory 
    public function getCategory(Request $request){
        $category=Category::where('status',1)->select('id','name')->get();
        if($category){
            return response()->json(['status'=>200,'data'=>$category]);
        }
        return response()->json(['status'=>500,'data'=>[],'message'=>'Not Found!']);
    }
    /// fetchign Brand 
    public function getBrand(Request $request){
        $brand=Brand::where('status',1)->select('id','name')->get();
        if($brand){
            return response()->json(['status'=>200,'data'=>$brand]);
        }
        return response()->json(['status'=>500,'data'=>[],'message'=>'Not Found!']);
    }

    //get shop product (search product based on category or brand)
    public function getProducts(Request $request){
        // dd($request->all());
        $per_page=$request->page??10;
        $query = Product::where('status', 1);
        $categoryIds=array_filter(explode(',',$request->category));
        $brandIds=array_filter(explode(',',$request->brand));
        

        // dd($categoryIds,$brandIds);
        if (!empty($categoryIds) && !empty($brandIds)) {
            // Both filters are set → use OR between category and brand
            $query->where(function ($q) use ($categoryIds, $brandIds) {
                $q->whereIn('category_id', $categoryIds)
                ->orWhereIn('brand_id', $brandIds);
            });
        } elseif (!empty($categoryIds)) {
            // Only category filter
            $query->whereIn('category_id', $categoryIds);
        } elseif (!empty($brandIds)) {
            // Only brand filter
            $query->whereIn('brand_id', $brandIds);
        }

        $products = $query->paginate($per_page);
        // dd($products->toArray());
        if($products){
            return response()->json(['status'=>200,'data'=>$products,'message'=>'product Found!']);
        }else{
            return response()->json(['status'=>500,'data'=>[],'message'=>'product not Found!']);
        }
       
        
        // dd($products->toArray());
    }

   
}
