<?php

namespace Database\Factories;

use App\Models\Dia;
use App\Models\Horario;
use App\Models\HorarioDia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HorarioDia>
 */
class HorarioDiaFactory extends Factory
{
    protected $model = HorarioDia::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'horario_id' => Horario::inRandomOrder()->first()->id ?? Horario::factory(),
            'dia_id' => Dia::inRandomOrder()->first()->id ?? Dia::factory(),
        ];
    }
}
