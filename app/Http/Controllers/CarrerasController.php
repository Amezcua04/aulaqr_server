<?php

namespace App\Http\Controllers;

use App\Models\Carreras;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarrerasController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $carreras = Carreras::orderBy('id', 'asc')->get();
    return Inertia::render('carreras/index', [
      'carreras' => $carreras
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('carreras/create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'nombre' => 'required|string|max:100|unique:carreras,nombre',
      'estado' => 'required'
    ]);
    $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

    Carreras::create($validated);

    return redirect()->route('carreras.index')->with('success', 'Carrera creada con éxito.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Carreras $carreras)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Carreras $carrera)
  {
    return Inertia::render('carreras/edit', [
      'carrera' => $carrera
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Carreras $carrera)
  {
    $validated = $request->validate([
      'nombre' => 'required|string|max:100|unique:carreras,nombre,' . $carrera->id,
      'estado' => 'required'
    ]);
    $validated['estado'] = filter_var($validated['estado'], FILTER_VALIDATE_BOOLEAN);

    $carrera->update($validated);

    return redirect()->route('carreras.index')->with('success', 'Carrera actualizada con éxito.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Carreras $carrera)
  {
    $carrera->delete();

    return redirect()->route('carreras.index')->with('success', 'Carrera eliminada con éxito.');
  }
}
