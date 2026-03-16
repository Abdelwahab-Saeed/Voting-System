<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function getAllUsers() {

        $users = User::where('role', UserRole::CANDIDATE->value)->paginate(10);

        return view('admin.users.index', compact('users'));
    }

    public function show($id) {

        $user = User::findOrFail($id);

        return view('admin.users.show', compact('user'));
    }

    public function getPendingUsers() {

        $users = User::where('status', UserStatus::PENDING->value)->paginate(10);

        return view('admin.users.pending', compact('users'));
    }

    public function approve($id) {

        $user = User::findOrFail($id);

        $user->status = UserStatus::APPROVED->value;

        $user->save();

        return redirect()->route('admin.users.index')->with('success', 'User approved successfully.');
    }

    public function reject($id) {

        $user = User::findOrFail($id);

        $user->status = UserStatus::REJECTED->value;

        $user->save();
        
        return redirect()->route('admin.users.index')->with('success', 'User rejected successfully.');
    }
}
