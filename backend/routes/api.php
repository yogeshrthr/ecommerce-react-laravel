<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TempImageController;


route::post('admin/login',[AuthController::class,'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('admin/')->middleware('auth:sanctum')->group(function () {
    Route::resource('category', CategoryController::class);
    Route::resource('brand', BrandController::class);
    Route::get('sizes', [SizeController::class,'index']);
    // Route::resource('product', [ProductController::class]);
    Route::resource('product', ProductController::class);


    Route::post('save-temp-image', [TempImageController::class,'store']);

});






