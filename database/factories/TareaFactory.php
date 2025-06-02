<?php

namespace Database\Factories;

use App\Models\AsignacionDocente;
use App\Models\Tarea;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tarea>
 */
class TareaFactory extends Factory
{
    protected $model = Tarea::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'descripcion' => $this->faker->sentence(),
            'fecha_entrega' => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'asignacion_docente_id' => AsignacionDocente::inRandomOrder()->first()->id,
        ];
    }
}
