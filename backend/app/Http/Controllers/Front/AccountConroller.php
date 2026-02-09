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
    public function updateProfile(Request $request){
        try{
            $validate=Validator::make($request->all(),[
                'name'=>'required|string',
                'address'=>'required|string',
                'city'=>'required|string',
                'state'=>'required|string',
                'pincode'=>'required|integer|digits:6',
                'mobile' => 'required|integer|digits:10|starts_with:6,7,8,9',
                'email'=>'required|string|email'

            ]);
            if($validate->fails()){
                return response()->json(['status'=>400,'message'=>'validation Error!','error'=>$validate->errors()],400);
            }

            $user=User::find($request->user()->id);
            $user->name=$request->name;
            $user->address=$request->address;
            $user->city=$request->city;
            $user->state=$request->state;
            $user->mobile=$request->mobile;
            $user->email=$request->email;
            $user->pincode=$request->pincode;
            $user->save();
            return response()->json(['status'=>200,'message'=>'Account Info Update Successfully!','data'=>[]]);

        }catch(Exception $e){
            return response()->json(['status'=>500,'message'=>'Internal Server Error!','error'=>$e->getMessage()],500);
        }

    }
}
