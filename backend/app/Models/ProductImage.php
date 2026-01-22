<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProductImage extends Model
{
    protected  $table ='tbl_product_images';
    protected $primery_key='id';
    protected $fillable=[
        'image',
        "product_id",
        'created_at',
        'updated_at'
    ];
    protected $appends=['image_path'];   

    public function getImagePathAttribute(){
        if($this->image==""){
            return "";
        }
        return asset('/uploads/products/small/'.$this->image);
    }
   
}
