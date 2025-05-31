<?php

namespace Database\Seeders;

use App\Models\HorarioDia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HorarioDiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HorarioDia::factory()->count(20)->create();
    }
}
