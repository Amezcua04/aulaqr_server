<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dia extends Model
{
    /** @use HasFactory<\Database\Factories\DiaFactory> */
    use HasFactory, SoftDeletes;
    protected $table = 'dias';
    protected $fillable = ['nombre'];

    public function horarioDias()
    {
        return $this->hasMany(HorarioDia::class);
    }
}
