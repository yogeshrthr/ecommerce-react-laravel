<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator,Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\ApiResponseTrait;


class AccountConroller extends Controller
{
    use ApiResponseTrait;

    public function register(Request $request){
        $validate=Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string',
            // 'pincode'=>'required|digits:6',
        ])->validate();
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
            'role'=>"customer"
        ]);
        return $this->success(null,'You are registerd succesfully! Click to login below given link.');
       

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
            Validator::make($request->all(),[
                'name'=>'required|string:255',
                'email'=>'required|email|string:80',
                'mobile'=>'digits:10|starts_with:6,7,8,9',
                'city'=>'string:255',
                'state'=>'string:255',
                'pincode'=>'digits:6',
            ])->validate();

            $user=User::find($request->user()->id);
            $user->name=$request->name;
            $user->address=$request->address;
            $user->city=$request->city;
            $user->state=$request->state;
            $user->mobile=$request->mobile;
            $user->email=$request->email;
            $user->pincode=$request->pincode;
            $user->save();
            return $this->success(null,'Account Info Update Successfully!');

        }catch(\Exception $e){
            return $this->internalError('Internal Server Error!',$e->getMessage());
            // return response()->json(['status'=>500,'message'=>'Internal Server Error!','error'=>$e->getMessage()],500);
        }

    }
    public function fetchUserAccountInfo(Request $request){
        try{
            if(!$request->user()){
               return $this->unauthorized();
            }else{
                return $this->success($request->user(),'Data found');
            }

        }catch(\Exception $e){
            // return response()->json(['status'=>500,'message'=>'Internal Server Error!','error'=>$e->getMessage()],500);
            return $this->internalError('',$e->getMessage());
        }
    }
}
