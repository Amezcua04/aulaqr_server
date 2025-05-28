<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CoordinadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Coordinador',
            'email' => 'coordinador@test.com',
            'password' => Hash::make('coordinador1234'),
            'role' => 'coordinador'
        ]);
    }
}
