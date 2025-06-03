<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estudiante extends Model
{
    /** @use HasFactory<\Database\Factories\EstudianteFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'estudiantes';

    protected $fillable = [
        'nombre',
        'paterno',
        'materno',
        'matricula',
        'celular',
        'grupo_id',
    ];

    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function asistencia()
    {
        return $this->hasMany(Asistencia::class, 'estudiante_id');
    }

    public function revisiones()
    {
        return $this->hasMany(RevisionTareas::class, 'estudiante_id');
    }
}
