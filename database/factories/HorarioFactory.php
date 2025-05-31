<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Horario>
 */
class HorarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $inicio = $this->faker->dateTimeBetween('07:00', '19:10');
        $fin = (clone $inicio)->modify('+50 min');
        return [
            'hora_inicio' => $inicio->format('H:i'),
            'hora_fin' => $fin->format('H:i'),
        ];
    }
}
