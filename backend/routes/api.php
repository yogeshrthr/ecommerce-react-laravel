<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Front\ProductController as FrontProductController;
use App\Http\Controllers\Admin\TempImageController;


route::post('admin/login',[AuthController::class,'authenticate']);  
Route::get('get-new-arrived-products', [FrontProductController::class,'fetchNewArrivedProducts']);
Route::get('get-featured-products', [FrontProductController::class,'fetchFeaturedProducts']);
Route::get('get-category', [FrontProductController::class,'getCategory']);
Route::get('get-brand', [FrontProductController::class,'getBrand']);
Route::get('get-products', [FrontProductController::class,'getProducts']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('admin/')->middleware('auth:sanctum')->group(function () {
    Route::resource('category', CategoryController::class);
    Route::resource('brand', BrandController::class);
    Route::get('sizes', [SizeController::class,'index']);
    // Route::resource('product', [ProductController::class]);
    Route::resource('product', ProductController::class);
    Route::post('update-product/{id}', [ProductController::class,'update']);
    Route::post('save-temp-image', [TempImageController::class,'store']);

});






