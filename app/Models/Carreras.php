<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carreras extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'carreras';
    protected $fillable = ['nombre', 'estado'];

    public function grupos()
    {
        return $this->hasMany(Grupo::class);
    }
}
