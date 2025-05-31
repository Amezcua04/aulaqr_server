<?php

namespace Database\Seeders;

use App\Models\AsignacionDocente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AsignacionDocenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AsignacionDocente::factory()->count(20)->create();
    }
}
