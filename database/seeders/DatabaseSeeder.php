<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            CoordinadorSeeder::class,
            MaestroSeeder::class,
            CarreraSeeder::class,
            GrupoSeeder::class,
            DocenteSeeder::class,
            MateriaSeeder::class,
            EstudianteSeeder::class,
            DiaSeeder::class,
            HorarioSeeder::class,
            HorarioDiaSeeder::class,
            AsignacionDocenteSeeder::class,
            AsistenciaSeeder::class,
            TareaSeeder::class
        ]);
    }
}
