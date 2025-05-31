<?php

namespace Database\Factories;

use App\Models\AsignacionDocente;
use App\Models\Docente;
use App\Models\Grupo;
use App\Models\HorarioDia;
use App\Models\Materia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AsignacionDocente>
 */
class AsignacionDocenteFactory extends Factory
{
    protected $model = AsignacionDocente::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'materia_id' => Materia::inRandomOrder()->first()->id,
            'docente_id' => Docente::inRandomOrder()->first()->id,
            'grupo_id' => Grupo::inRandomOrder()->first()->id,
            'horario_dia_id' => HorarioDia::inRandomOrder()->first()->id,
        ];
    }
}
