<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RevisionTareas extends Model
{
    /** @use HasFactory<\Database\Factories\RevisionTareasFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'revision_tareas';
    protected $fillable = [
        'fecha_revision',
        'estudiante_id',
        'tarea_id'
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }
}
