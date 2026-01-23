<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempImage extends Model
{
    protected $table='tbl_temp_images';
    protected $fillable=[
        'name'
    ];
    protected $appends=['image_url'];   
    public function getImageUrlAttribute(){
        if($this->name==''){
            return ;

        }
        return asset('/uploads/temp/'.$this->name);
    }
    protected static function boot(){
        
        parent::boot();
        static::deleting(function ($tempImage) {
            dd($tempImage);
            // assuming column name is `image`
            $imageName = $tempImage->image;
            if (file_exists(('uploads/temp/' . $imageName))) {
                unlink(('uploads/temp/' . $imageName));
            }

            if (file_exists(('uploads/temp/thumb/' . $imageName))) {
                unlink(('uploads/temp/thumb/' . $imageName));
            }


        });
        dd('delted');
    }
}
