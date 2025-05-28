<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $docentes = Docente::orderBy('id', 'asc')->paginate(5);
        return Inertia::render('docentes/index', [
            'docentes' => $docentes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('docentes/create');
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
            'estado' => 'required'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

        Docente::create($validated);

        return redirect()->route('docentes.index')->with('success', 'Docente creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Docente $docente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Docente $docente)
    {
        return Inertia::render('docentes/edit', [
            'docente' => $docente
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Docente $docente)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'paterno' => 'required|string|max:50',
            'materno' => 'required|string|max:50',
            'estado' => 'required'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

        $docente->update($validated);

        return redirect()->route('docentes.index')->with('success', 'Docente actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Docente $docente)
    {
        $docente->delete();

        return redirect()->route('docentes.index')->with('success', 'Docente eliminado con éxito.');
    }
}
