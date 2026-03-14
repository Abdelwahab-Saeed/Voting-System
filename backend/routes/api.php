<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UserVoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
   
    Route::post('logout',[AuthController::class,'logout']);

    Route::post('votes',[UserVoteController::class,'makeVote']);

    Route::get('users',[UserController::class,'getApprovedUsersForVoting']);

});