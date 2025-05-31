<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HorarioDia extends Model
{
    /** @use HasFactory<\Database\Factories\HorarioDiaFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'horario_dias';
    protected $fillable = [
        'horario_id',
        'dia_id'
    ];

    public function horario()
    {
        return $this->belongsTo(Horario::class);
    }

    public function dia()
    {
        return $this->belongsTo(Dia::class);
    }

    public function asignacionDocente(){
        return $this->hasMany(AsignacionDocente::class);
    }
}
