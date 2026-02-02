<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator,Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AccountConroller extends Controller
{
    public function register(Request $request){
        $validate=Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|email',
            'password'=>'required|string',
            // 'pincode'=>'required|min:6',
            // 'address'=>'required|min:6',
        ]);
        if($validate->fails()){
            return response()->json(['status'=>400,'errors'=>$validate->errors()]);
        }
        User::insert([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>"customer"
        ]);
        return response()->json(['status'=>200,'message'=>'You are registerd succesfully! Click to login below given link.']);

    }
    public function login(Request $request){
         $validator=Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(['status'=>400,'errors'=>$validator->errors()
            ],400);
        }
        // dd($request->all());
        // dd(Auth::attempt(['email'=>$request->email,'password'=>$request->password]));
          if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            $user = User::find(Auth::user()->id);

            if($user->role=='customer'){
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'token'=>$token,
                    'name'=>$user->name,
                    'id'=>$user->id,
                    'message'=>"Welcome Back $user->name !",
                ]);
            }else{
                return response()->json([
                    'status'=>401,
                    'message'=>'You are not authrized to acces this panel'
                ]);
            }
        }else{
            return response()->json(['status'=>401,'message'=>"Either email/password is incorrect"],401);
        }
    }
}
