<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Docente extends Model
{
    /** @use HasFactory<\Database\Factories\DocenteFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'docentes';

    protected $fillable = [
        'nombre',
        'paterno',
        'materno',
        'estado'
    ];

    public function asignacionDocente(){
        return $this->hasMany(AsignacionDocente::class, 'docente_id');
    }

    public function user(){
        return $this->belongsTo(User::class); 
    }
}
