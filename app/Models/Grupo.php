<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grupo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'estado',
        'carrera_id'
    ];

    public function carrera()
    {
        return $this->belongsTo(Carreras::class);
    }

    public function estudiantes(){
        return $this->hasMany(Estudiante::class, 'grupo_id');
    }

    public function asignacionDocente(){
        return $this->hasMany(AsignacionDocente::class, 'grupo_id');
    }
}
