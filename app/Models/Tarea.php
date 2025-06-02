<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tarea extends Model
{
    /** @use HasFactory<\Database\Factories\TareaFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'tareas';
    protected $fillable = [
        'descripcion',
        'fecha_entrega',
        'asignacion_docente_id',
    ];

    public function asignacion(){
        return $this->belongsTo(AsignacionDocente::class, 'asignacion_docente_id');
    }
}
