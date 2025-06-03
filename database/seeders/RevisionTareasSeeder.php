<?php

namespace Database\Seeders;

use App\Models\RevisionTareas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RevisionTareasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RevisionTareas::factory()->count(20)->create();
    }
}
