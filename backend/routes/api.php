<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Front\ProductController as FrontProductController;
use App\Http\Controllers\Front\AccountConroller;
use App\Http\Controllers\Front\OrderController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\TempImageController;


Route::post('register', [AccountConroller::class,'register']);
Route::post('login', [AccountConroller::class,'login'])->name('login');

route::post('admin/login',[AuthController::class,'authenticate']);  
Route::get('get-new-arrived-products', [FrontProductController::class,'fetchNewArrivedProducts']);
Route::get('get-featured-products', [FrontProductController::class,'fetchFeaturedProducts']);
Route::get('get-category', [FrontProductController::class,'getCategory']);
Route::get('get-brand', [FrontProductController::class,'getBrand']);
Route::get('get-products', [FrontProductController::class,'getProducts']);
Route::get('get-product-details/{id}', [FrontProductController::class,'getProductDetails']);

route::group(['middleware'=>['auth:sanctum','Role:customer']],function(){    
    Route::post('save-order', [OrderController::class,'saveOrder']);
    Route::get('order-confirmation/{oderId}',[OrderController::class,'orderConfirmationDetails']);
    Route::get('get-order-list',[OrderController::class,'getOrderList']);
    Route::get('get-order-details/{id}',[OrderController::class,'orderDetail']);
    // Route::get('get-user',[AccountConroller::class,'getUser']);
    Route::post('update-account-info',[AccountConroller::class,'updateProfile']);
    Route::get('get-acount-details',[AccountConroller::class,'fetchUserAccountInfo']);
});



// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('admin/')->middleware(['auth:sanctum','Role:admin'])->group(function () {
    Route::resource('category', CategoryController::class);
    Route::resource('brand', BrandController::class);
    Route::get('sizes', [SizeController::class,'index']);
    // Route::resource('product', [ProductController::class]);
    Route::resource('product', ProductController::class);
    Route::post('update-product/{id}', [ProductController::class,'update']);
    Route::post('save-temp-image', [TempImageController::class,'store']);
    Route::get('order-list',[AdminOrderController::class,'getOrderList']);
    Route::get('order-detail/{id}',[AdminOrderController::class,'orderDetail']);
    Route::post('update-order-status/{id}',[AdminOrderController::class,'updateOrderStatus']);
    // Route::post('update-order-payment-status/{id}',[AdminOrderController::class,'updateOrderPaymentStatus']);
    

});






