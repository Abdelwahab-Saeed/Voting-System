<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request) {

        $registerData = $request->validated();

        if($request->hasFile('profile_photo')) {

            $url = $this->UploadProfilePhoto($request->file('profile_photo'), $registerData['name']);
        }

        $user = User::create([
            "name" => $registerData['name'],
            "email" => $registerData['email'],
            "password" => Hash::make($registerData['password']),
            "profile_photo" => $url ?? null,
            "role" => UserRole::CANDIDATE->value,
            "status" => UserStatus::PENDING->value
        ]);

        return response()->json([
            'message' => 'Registration successful! Your account is pending admin approval.',
            'status' => $user->status
        ]);
    }

    public function login(LoginRequest $request) {

        $loginData = $request->validated();

        $user = User::where('email', $loginData['email'])->first();

        if(!$user || !Hash::check($loginData['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        if($user->status == UserStatus::PENDING->value) {
            return response()->json([
                'message' => 'Your account is pending admin approval. You cannot vote or receive votes until your account is approved.'
            ], 403);
        } else if($user->status == UserStatus::REJECTED->value) {
            return response()->json([
                'message' => 'Your account has been rejected by the admin. You cannot vote or receive votes.'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);

    }

    public function logout(){

        auth()->user()->tokens()->delete();

        return response()->json([
            "message"=>"You have logged out successfully!",
        ]);
    }

    private function UploadProfilePhoto($file, $userName) {
        $extension = $file->extension();

        $fileName = $userName . '_' . time() . '.' . $extension;

        $path = $file->storeAs('profile_photos', $fileName, 'public');

        return Storage::url($path);
    }
}
