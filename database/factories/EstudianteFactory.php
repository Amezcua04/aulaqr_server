<?php

namespace Database\Factories;

use App\Models\Grupo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estudiante>
 */
class EstudianteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->firstName(),
            'paterno' => $this->faker->lastName(),
            'materno' => $this->faker->lastName(),
            'matricula' => $this->faker->unique()->bothify('A##??'),
            'celular' => $this->faker->numerify('311#######'),
            'grupo_id' => Grupo::inRandomOrder()->first()->id ?? Grupo::factory(),
        ];
    }
}
