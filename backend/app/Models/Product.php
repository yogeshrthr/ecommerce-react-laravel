<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;

class Product extends Model
{
    protected $table='tbl_products';

    protected $appends=['image_url','default_image'];   

    public function getImageUrlAttribute(){
        if($this->image==""){
            return "";
        }
        return asset('/uploads/products/small/'.$this->image);
    }
    
    public function product_images(){
        return $this->hasMany(ProductImage::class);
    }
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($product) {
            foreach ($product->product_images as $image) {
                file_exists('uploads/products/small/'.$image->image)?unlink('uploads/products/small/'.$image->image):'';
                file_exists('uploads/products/large/'.$image->image)?unlink('uploads/products/large/'.$image->image):'';
            }
            $product->product_images()->delete();
        });
    }

    public function getDefaultImageAttribute()
    {
        // Finds the ID in product_images table where the filename matches the product's main image
        return $this->product_images()
            ->where('image', $this->image)
            ->first()?->id;
    }
   
}
