<?php

namespace App\Http\Controllers\API;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserVoteRequest;
use App\Models\User;
use App\Models\UserVote;
use Illuminate\Http\Request;

class UserVoteController extends Controller
{
    public function makeVote(UserVoteRequest $request) {
        
        $voteData = $request->validated();
        $voteData['voter_id'] = $request->user()->id;

        if ($voteData['voter_id'] == $voteData['target_user_id']) {

            return response()->json([
                'message' => 'You cannot vote for yourself',
            ], 400);
        }

        $voter = User::find($voteData['voter_id']);
        $targetUser = User::find($voteData['target_user_id']);

        if ($voter->status !== UserStatus::APPROVED->value) {

            return response()->json([
                'message' => 'Your account is pending admin approval. You cannot vote or receive votes until your account is approved.',
            ], 403);
        }

        if ($targetUser->status !== UserStatus::APPROVED->value) {

            return response()->json([
                'message' => 'The user you are trying to vote for is pending admin approval. You cannot vote for users until their accounts are approved.',
            ], 403);
        }

        $vote = UserVote::firstOrCreate([
            'voter_id' => $voteData['voter_id'],
            'target_user_id' => $voteData['target_user_id']
        ]);

        if (!$vote->wasRecentlyCreated) {
            return response()->json(['message' => 'You have already voted for this user'], 400);
        }

        return response()->json([
            'message' => 'Your vote has been successfully recorded.',
        ], 201);
    
    }
}
