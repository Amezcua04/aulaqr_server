<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Materia extends Model
{
    /** @use HasFactory<\Database\Factories\MateriaFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'materias';

    protected $fillable = [
        'nombre',
        'estado',
    ];

    public function asignacionDocente()
    {
        return $this->hasMany(AsignacionDocente::class, 'materia_id');
    }
}
