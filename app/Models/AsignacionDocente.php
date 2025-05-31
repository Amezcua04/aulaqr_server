<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AsignacionDocente extends Model
{
    /** @use HasFactory<\Database\Factories\AsignacionDocenteFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'asignacion_docentes';
    protected $fillable = [
        'materia_id',
        'docente_id',
        'grupo_id',
        'horario_dia_id',
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function horarioDia()
    {
        return $this->belongsTo(HorarioDia::class);
    }

    public function asistencia(){
        return $this->hasMany(Asistencia::class, 'asignacion_docente_id');
    }
}
