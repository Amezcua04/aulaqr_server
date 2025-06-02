<?php

namespace App\Http\Controllers;

use App\Models\AsignacionDocente;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $docenteId = Auth::user()->docente->id;

        $tareas = Tarea::with(['asignacion.materia', 'asignacion.grupo'])
            ->whereHas('asignacion', fn($q) => $q->where('docente_id', $docenteId))
            ->latest()
            ->paginate(10);

        return Inertia::render('tareas/index', [
            'tareas' => $tareas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $docenteId = Auth::user()->docente->id;

        $asignaciones = AsignacionDocente::with(['materia', 'grupo'])
            ->where('docente_id', $docenteId)
            ->get();

        return Inertia::render('tareas/create', [
            'asignaciones' => $asignaciones,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'descripcion' => 'required|string',
            'fecha_entrega' => 'required|date',
            'asignacion_docente_id' => 'required|exists:asignacion_docentes,id',
        ]);

        Tarea::create($request->all());

        return redirect()->route('tareas.index')->with('success', 'Tarea creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tarea $tarea)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tarea $tarea)
    {
        $asignaciones = AsignacionDocente::with(['materia', 'grupo'])
            ->where('docente_id', Auth::user()->docente->id)
            ->get();

        return Inertia::render('tareas/edit', [
            'tarea' => $tarea,
            'asignaciones' => $asignaciones,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tarea $tarea)
    {
        $request->validate([
            'descripcion' => 'required|string',
            'fecha_entrega' => 'required|date',
            'asignacion_docente_id' => 'required|exists:asignacion_docentes,id',
        ]);

        $tarea->update($request->all());

        return redirect()->route('tareas.index')->with('success', 'Tarea actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();

        return redirect()->route('tareas.index')->with('success', 'Tarea eliminada correctamente.');
    }
}
