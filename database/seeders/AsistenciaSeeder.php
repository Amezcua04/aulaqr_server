<?php

namespace Database\Seeders;

use App\Models\Asistencia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AsistenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Asistencia::factory()->count(100)->create();
    }
}
