<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\RevisionTareas;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RevisionTareasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $revisiones = RevisionTareas::with([
            'estudiante',
            'tarea.asignacionDocente.materia',
            'tarea.asignacionDocente.grupo',
        ])->latest()->paginate(10);

        return inertia('revisiones/index', [
            'revisiones' => $revisiones,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $tarea = Tarea::with('asignacionDocente.grupo.estudiantes', 'asignacionDocente.materia')
            ->findOrFail($request->query('tarea_id'));

        return Inertia::render('revisiones/create', [
            'tarea' => $tarea,
            'fecha' => now()->toDateString(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha_revision' => 'required|date',
            'estudiante_id' => 'required|exists:estudiantes,id',
            'tarea_id' => 'required|exists:tareas,id',
        ]);

        RevisionTareas::create($validated);

        // return redirect()->route('revisiones.index')->with('success', 'Revisión registrada con éxito.');
        return redirect()->back()->with('success', 'Revisión registrada con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RevisionTareas $revisionTareas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RevisionTareas $revisionTareas)
    {
        return inertia('revisiones/edit', [
            'revision' => $revisionTareas->load(['estudiante', 'tarea']),
            'estudiantes' => Estudiante::select('id', 'nombre')->get(),
            'tareas' => Tarea::select('id', 'titulo')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RevisionTareas $revisionTareas)
    {
        $validated = $request->validate([
            'fecha_revision' => 'required|date',
            'estudiante_id' => 'required|exists:estudiantes,id',
            'tarea_id' => 'required|exists:tareas,id',
        ]);

        $revisionTareas->update($validated);

        return redirect()->route('revisiones.index')->with('success', 'Revisión actualizada con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RevisionTareas $revisione)
    {
        $revisione->delete();

        return redirect()->route('revisiones.index')->with('success', 'Revisión eliminada con éxito.');
    }
}
