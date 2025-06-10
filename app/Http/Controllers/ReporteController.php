<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Estudiante;
use App\Models\Tarea;
use App\Models\AsignacionDocente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReporteController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        $fechaInicio = Carbon::parse($request->fecha_inicio)->startOfDay();
        $fechaFin = Carbon::parse($request->fecha_fin)->endOfDay();

        $estudiantes = Estudiante::with('grupo')->get();

        // Precarga de asistencias y tareas para evitar N+1
        $asistencias = Asistencia::whereBetween('fecha', [$fechaInicio, $fechaFin])->get();
        $todasTareas = Tarea::whereBetween('fecha_entrega', [$fechaInicio, $fechaFin])
            ->with('revisiones')
            ->get();

        $reportes = $estudiantes->map(function ($estudiante) use ($fechaInicio, $fechaFin, $asistencias, $todasTareas) {
            $asignaciones = AsignacionDocente::where('grupo_id', $estudiante->grupo_id)
                ->with(['materia', 'docente', 'horarioDia'])
                ->get();

            $asistenciasEstudiante = $asistencias->where('estudiante_id', $estudiante->id);
            $totalPresentes = $asistenciasEstudiante->where('estado', 'asistencia')->count();
            $totalFaltas = $asistenciasEstudiante->where('estado', 'falta')->count();
            $totalClases = $asistenciasEstudiante->count();

            $tareasAsignadas = 0;
            $tareasEntregadas = 0;

            $materias = $asignaciones->map(function ($asignacion) use ($estudiante, $asistenciasEstudiante, $todasTareas, &$tareasAsignadas, &$tareasEntregadas) {
                $asistenciasMateria = $asistenciasEstudiante->where('asignacion_docente_id', $asignacion->id);

                $tareasMateria = $todasTareas->where('asignacion_docente_id', $asignacion->id);
                $entregadas = $tareasMateria->sum(function ($tarea) use ($estudiante) {
                    return $tarea->revisiones->where('estudiante_id', $estudiante->id)->count();
                });

                $asignadas = $tareasMateria->count();
                $noEntregadas = $asignadas - $entregadas;

                $tareasAsignadas += $asignadas;
                $tareasEntregadas += $entregadas;

                return [
                    'materia' => $asignacion->materia->nombre,
                    'docente' => $asignacion->docente->nombre,
                    'horario' => $asignacion->horarioDia->dia . ' ' . $asignacion->horarioDia->hora_inicio . '-' . $asignacion->horarioDia->hora_fin,
                    'asistencias' => $asistenciasMateria->where('estado', 'asistencia')->count(),
                    'total_asistencias' => $asistenciasMateria->count(),
                    'tareas_entregadas' => $entregadas,
                    'tareas_asignadas' => $asignadas,
                ];
            });

            return [
                'nombre' => $estudiante->nombre,
                'matricula' => $estudiante->matricula,
                'grupo' => $estudiante->grupo->nombre,
                'fecha_inicio' => $fechaInicio->toDateString(),
                'fecha_fin' => $fechaFin->toDateString(),
                'total_clases' => $totalClases,
                'total_asistencias' => $totalPresentes,
                'total_faltas' => $totalFaltas,
                'tareas_asignadas' => $tareasAsignadas,
                'tareas_entregadas' => $tareasEntregadas,
                'tareas_no_entregadas' => $tareasAsignadas - $tareasEntregadas,
                'materias' => $materias,
            ];
        });

        return Inertia::render('reportes/index', [
            'reportes' => $reportes,
            'fecha_inicio' => $fechaInicio->toDateString(),
            'fecha_fin' => $fechaFin->toDateString(),
        ]);
    }
}
