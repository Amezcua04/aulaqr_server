<?php

namespace App\Http\Controllers;

use App\Models\AsignacionDocente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Pest\Laravel\get;

class ClaseController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->docente) {
            abort(403, 'Este usuario no está asociado a un docente');
        }

        $asignaciones = AsignacionDocente::with(['materia', 'grupo', 'horarioDia.dia', 'horarioDia.horario'])
            ->where('docente_id', $user->docente->id)
            ->get();

        return Inertia::render('clases/index', [
            'clases' => $asignaciones,
        ]);
    }
}
