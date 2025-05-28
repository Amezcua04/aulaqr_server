<?php

namespace App\Http\Controllers;

use App\Models\Carreras;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grupos = Grupo::with('carrera')->orderBy('id', 'asc')->paginate(5);
        return Inertia::render('grupos/index', [
            'grupos' => $grupos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('grupos/create', [
            'carreras' => Carreras::orderBy('nombre')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:grupos,nombre',
            'estado' => 'required',
            'carrera_id' => 'required|exists:carreras,id'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);
        Grupo::create($validated);

        return redirect()->route('grupos.index')->with('success', 'Grupo creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Grupo $grupo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grupo $grupo)
    {
        return Inertia::render('grupos/edit', [
            'grupo' => $grupo,
            'carreras' => Carreras::orderBy('nombre')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grupo $grupo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:grupos,nombre,' . $grupo->id,
            'estado' => 'required',
            'carrera_id' => 'required|exists:carreras,id'
        ]);
        $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);
        $grupo->update($validated);

        return redirect()->route('grupos.index')->with('success', 'Grupo actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grupo $grupo)
    {
        $grupo->delete();

        return redirect()->route('grupos.index')->with('success', 'Grupo eliminado con éxito.');
    }
}
