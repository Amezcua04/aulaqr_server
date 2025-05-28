<?php

namespace Database\Factories;

use App\Models\Carreras;
use App\Models\Grupo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grupo>
 */
class GrupoFactory extends Factory
{
    protected $model = Grupo::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => strtoupper($this->faker->bothify('G##')),
            'estado' => true,
            'carrera_id' => Carreras::inRandomOrder()->first()->id ?? Carreras::factory(),
        ];
    }
}
