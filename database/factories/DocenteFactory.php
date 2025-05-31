<?php

namespace Database\Factories;

use App\Models\Docente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Docente>
 */
class DocenteFactory extends Factory
{
    protected $model = Docente::class;
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
            'estado' => true,
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }
}
