<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asistencia extends Model
{
    /** @use HasFactory<\Database\Factories\AsistenciaFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'fecha',
        'estado',
        'estudiante_id',
        'asignacion_docente_id'
    ];

    public function estudiante() {
        return $this->belongsTo(Estudiante::class);
    }

    public function asignacionDocente() {
        return $this->belongsTo(AsignacionDocente::class);
    }
}
