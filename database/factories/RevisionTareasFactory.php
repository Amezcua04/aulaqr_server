<?php

namespace Database\Factories;

use App\Models\Estudiante;
use App\Models\RevisionTareas;
use App\Models\Tarea;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RevisionTareas>
 */
class RevisionTareasFactory extends Factory
{
    protected $model = RevisionTareas::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fecha_revision' => $this->faker->dateTimeBetween('-5 days', 'now')->format('Y-m-d'),
            'estudiante_id' => Estudiante::inRandomOrder()->first()->id,
            'tarea_id' => Tarea::inRandomOrder()->first()->id,
        ];
    }
}
