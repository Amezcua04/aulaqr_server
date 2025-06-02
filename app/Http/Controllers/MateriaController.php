<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $materias = Materia::orderBy('id', 'asc')->paginate(5);
        return Inertia::render('materias/index', [
            'materias' => $materias
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('materias/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:materias,nombre',
            'estado' => 'required'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

        Materia::create($validated);

        return redirect()->route('materias.index')->with('success', 'Materia creada con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Materia $materia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Materia $materia)
    {
        return Inertia::render('materias/edit', [
            'materia' => $materia
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Materia $materia)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:materias,nombre,' . $materia->id,
            'estado' => 'required'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

        $materia->update($validated);

        return redirect()->route('materias.index')->with('success', 'Materia actualizada con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materia $materia)
    {
        $materia->delete();

        return redirect()->route('materias.index')->with('success', 'Materia eliminada con éxito.');
    }
}
