<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\isAdmin;



Route::middleware(['auth','admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'getVotingStats'])->name('admin.dashboard');

    Route::get('/users', [UserController::class, 'getAllUsers'])->name('admin.users.index');
    Route::get('/users/pending', [UserController::class, 'getPendingUsers'])->name('admin.users.pending');
    
    Route::patch('/users/{user}/approve', [UserController::class, 'approve'])->name('admin.users.approve');
    Route::patch('/users/{user}/reject', [UserController::class, 'reject'])->name('admin.users.reject');


    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
