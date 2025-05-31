<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Horario extends Model
{
    /** @use HasFactory<\Database\Factories\HorarioFactory> */
    use HasFactory, SoftDeletes;
    
    protected $table = 'horarios';
    protected $fillable = [
        'hora_inicio',
        'hora_fin'
    ];

    public function horarioDias() 
    {
        return $this->hasMany(HorarioDia::class);
    }
}
