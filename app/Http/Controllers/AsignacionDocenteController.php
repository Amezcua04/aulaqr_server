<?php

namespace App\Http\Controllers;

use App\Models\AsignacionDocente;
use App\Models\Docente;
use App\Models\Grupo;
use App\Models\HorarioDia;
use App\Models\Materia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsignacionDocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $asignaciones = AsignacionDocente::with([
            'docente',
            'materia',
            'grupo',
            'horarioDia.horario',
            'horarioDia.dia'
        ])->withoutTrashed()->orderBy('id', 'asc')->paginate(8);


        return Inertia::render('asignaciones/index', [
            'asignaciones' => $asignaciones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $docentes = Docente::all();
        $grupos = Grupo::with('carrera')->get();
        $materias = Materia::all();
        $horarios = HorarioDia::query()
            ->select('horario_dias.*')
            ->join('dias', 'horario_dias.dia_id', '=', 'dias.id')
            ->with(['dia', 'horario'])
            ->orderBy('dias.id')
            ->get();

        return Inertia::render('asignaciones/create', [
            'docentes' => $docentes,
            'grupos' => $grupos,
            'materias' => $materias,
            'horarios' => $horarios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'materia_id' => 'required|exists:materias,id',
            'docente_id' => 'required|exists:docentes,id',
            'grupo_id' => 'required|exists:grupos,id',
            'horario_dia_id' => 'required|exists:horario_dias,id',
        ]);

        AsignacionDocente::create($validated);

        return redirect()->route('asignaciones.index')->with('success', 'Asignación creada con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AsignacionDocente $asignacionDocente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AsignacionDocente $asignacione)
    {
        return Inertia::render('asignaciones/edit', [
            'asignacion' => [
                'id' => $asignacione->id,
                'docente_id' => $asignacione->docente_id,
                'materia_id' => $asignacione->materia_id,
                'grupo_id' => $asignacione->grupo_id,
                'horario_dia_id' => $asignacione->horario_dia_id,
            ],
            'materias' => Materia::select('id', 'nombre')->orderBy('nombre')->get(),
            'docentes' => Docente::select('id', 'nombre')->orderBy('nombre')->get(),
            'grupos' => Grupo::select('id', 'nombre')->orderBy('nombre')->get(),
            'horarios' => HorarioDia::with(['dia', 'horario'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AsignacionDocente $asignacione)
    {
        $validated = $request->validate([
            'materia_id' => 'required|exists:materias,id',
            'docente_id' => 'required|exists:docentes,id',
            'grupo_id' => 'required|exists:grupos,id',
            'horario_dia_id' => 'required|exists:horario_dias,id',
        ]);

        $asignacione->update($validated);

        return redirect()->route('asignaciones.index')->with('success', 'Asignación actualizada con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsignacionDocente $asignacione)
    {
        $asignacione->delete();

        return redirect()->route('asignaciones.index')->with('success', 'Asignación eliminada con éxito.');
    }
}
