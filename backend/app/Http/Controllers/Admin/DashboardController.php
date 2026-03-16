<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserVote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function getVotingStats() {

        $users = User::withCount('votesReceived')
                        ->where('status', UserStatus::APPROVED->value)
                        ->orderBy('votes_received_count', 'desc')
                        ->paginate(7);


        return view('welcome', compact('users'));
    }
}
