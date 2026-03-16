<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('123456789'),
            'role' => 'admin',
            'status' => 'approved',
        ]);

        User::factory()->create([
            'name' => 'Candidate User',
            'email' => 'candidate@example.com',
            'password' => Hash::make('123456789'),
            'role' => 'candidate',
            'status' => 'approved',
        ]);
    }
}
