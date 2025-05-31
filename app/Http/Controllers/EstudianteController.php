<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estudiantes = Estudiante::with('grupo')->orderBy('id', 'asc')->paginate(10);
        return Inertia::render('estudiantes/index', [
            'estudiantes' => $estudiantes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('estudiantes/create', [
            'grupos' => Grupo::orderBy('nombre')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'paterno' => 'required|string|max:50',
            'materno' => 'required|string|max:50',
            'matricula' => 'required|string|max:20|unique:estudiantes,matricula',
            'celular' => 'required|digits:10',
            'grupo_id' => 'required|exists:grupos,id'
        ]);

        Estudiante::create($validated);

        return redirect()->route('estudiantes.index')->with('success', 'Estudiante creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Estudiante $estudiante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estudiante $estudiante)
    {
        return Inertia::render('estudiantes/edit', [
            'estudiante' => $estudiante,
            'grupos' => Grupo::orderBy('id')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estudiante $estudiante)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'paterno' => 'required|string|max:50',
            'materno' => 'required|string|max:50',
            'matricula' => 'required|string|max:20|unique:estudiantes,matricula,' . $estudiante->id,
            'celular' => 'required|digits:10',
            'grupo_id' => 'required|exists:grupos,id'
        ]);

        $estudiante->update($validated);

        return redirect()->route('estudiantes.index')->with('success', 'Estudiante actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estudiante $estudiante)
    {
        $estudiante->delete();

        return redirect()->route('estudiantes.index')->with('success', 'Estudiante eliminado con éxito.');
    }
}
