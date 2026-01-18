<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\TempImage;
use Validator;


class TempImageController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'image'=>'required|image|mimes:jpeg,png,jpg,gif',

        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors()
            ],400);
        }

        $file=$request->file('image');
        $name=date('Y-m-d').time().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('uploads/temp'),$name);
        $data=TempImage::create([
            'name'=>$name,
        ]);


       $manager = new ImageManager(Driver::class);
       $img = $manager->read(public_path('uploads/temp/'.$name));
       $img->coverDown(400,450);
       $img->save(public_path('uploads/temp/thumb/'.$name));

        return response()->json(['status'=>200,
            'message'=>'image udloaded successfully!',
            'data'=>$data
        ]);

    }
}
