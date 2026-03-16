<?php

namespace App\Http\Controllers\API;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function getApprovedUsersForVoting(Request $request)
    {
        $voterId = $request->user()->id;

        $users = User::where('status', UserStatus::APPROVED->value)
            ->where('id', '!=', $voterId) 
            ->withExists([
                'votesReceived as has_voted' => function ($query) use ($voterId) {
                    $query->where('voter_id', $voterId);
                }
            ])
            ->paginate(10);

        return response()->json($users);
    }
}
