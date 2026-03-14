<?php

namespace App\Http\Controllers\API;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function getApprovedUsersForVoting(){
        $approvedUsers = User::where('status', UserStatus::APPROVED->value)->get();

        return response()->json($approvedUsers);
    }
}
