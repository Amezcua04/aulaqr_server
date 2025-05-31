<?php

namespace Database\Factories;

use App\Models\AsignacionDocente;
use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asistencia>
 */
class AsistenciaFactory extends Factory
{
    protected $model = Asistencia::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fecha' => $this->faker->dateTimeBetween('-10 days', 'now')->format('Y-m-d'),
            'estado' => $this->faker->randomElement(['presente', 'ausente', 'justificado', 'tarde']),
            'estudiante_id' => Estudiante::inRandomOrder()->first()->id,
            'asignacion_docente_id' => AsignacionDocente::inRandomOrder()->first()->id,
        ];
    }
}
