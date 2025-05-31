<?php

namespace App\Http\Controllers;

use App\Models\AsignacionDocente;
use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AsistenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user->docente) {
            abort(403, 'Este usuario no está asociado a un docente.');
        }

        $asistencias = Asistencia::with(['estudiante', 'asignacionDocente.materia', 'asignacionDocente.grupo'])
            ->whereHas('asignacionDocente', function ($query) use ($user) {
                $query->where('docente_id', $user->docente->id);
            })
            ->orderBy('fecha', 'desc')
            ->paginate(7);

        return Inertia::render('asistencias/index', [
            'asistencias' => $asistencias
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Auth::user();

        $asignacionId = $request->query('asignacion');
        $asignacion = AsignacionDocente::with(['grupo.estudiantes', 'materia'])
            ->where('docente_id', $user->docente->id)
            ->findOrFail($asignacionId);

        return Inertia::render('asistencias/create', [
            'asignacion' => $asignacion,
            'fecha' => now()->toDateString(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->filled(['fecha', 'asignacion_docente_id', 'estudiante_id', 'estado'])) {
            $validated = $request->validate([
                'fecha' => 'required|date',
                'asignacion_docente_id' => 'required|exists:asignacion_docentes,id',
                'estudiante_id' => 'required|exists:estudiantes,id',
                'estado' => 'required|in:presente,ausente,tarde,justificado',
            ]);

            Asistencia::updateOrCreate(
                [
                    'fecha' => $validated['fecha'],
                    'asignacion_docente_id' => $validated['asignacion_docente_id'],
                    'estudiante_id' => $validated['estudiante_id'],
                ],
                [
                    'estado' => $validated['estado'],
                ]
            );

            return back()->with('success', 'Asistencia registrada con éxito.');
        }

        $validated = $request->validate([
            'fecha' => 'required|date',
            'asignacion_docente_id' => 'required|exists:asignacion_docentes,id',
            'asistencias' => 'required|array',
            'asistencias.*.estudiante_id' => 'required|exists:estudiantes,id',
            'asistencias.*.estado' => 'required|in:presente,ausente,tarde,justificado',
        ]);

        foreach ($validated['asistencias'] as $asistencia) {
            Asistencia::updateOrCreate(
                [
                    'fecha' => $validated['fecha'],
                    'asignacion_docente_id' => $validated['asignacion_docente_id'],
                    'estudiante_id' => $asistencia['estudiante_id'],
                ],
                [
                    'estado' => $asistencia['estado'],
                ]
            );
        }

        return redirect()->route('asistencias.index')->with('success', 'Asistencias registradas con éxito.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Asistencia $asistencia)
    {
        return Inertia::render('asistencias/show', [
            'asistencia' => $asistencia->load(['estudiante', 'asignacionDocente'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asistencia $asistencia)
    {
        $asignaciones = AsignacionDocente::with(['materia', 'grupo'])
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'nombre' => $a->materia->nombre . ' - ' . $a->grupo->nombre,
            ]);

        $estudiantes = Estudiante::select('id', 'nombre', 'paterno', 'materno')
            ->get()
            ->map(fn($e) => [
                'id' => $e->id,
                'nombre' => "{$e->nombre} {$e->paterno} {$e->materno}",
            ]);

        return Inertia::render('asistencias/edit', [
            'asistencia' => $asistencia,
            'asignaciones' => $asignaciones,
            'estudiantes' => $estudiantes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asistencia $asistencia)
    {
        $validated = $request->validate([
            'estado' => 'required|in:presente,ausente,tarde,justificado'
        ]);

        $asistencia->update($validated);

        return redirect()->route('asistencias.index')->with('success', 'Asistencia actualizada con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asistencia $asistencia)
    {
        $asistencia->delete();

        return redirect()->route('asistencias.index')->with('success', 'Asistencia eliminada con éxito.');
    }
}
