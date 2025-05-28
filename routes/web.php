<?php

use App\Http\Controllers\CarrerasController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\MateriaController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rutas para el maestro
    Route::middleware(['role:maestro'])->group(function () {});

    // Rutas para coordinador y admin
    Route::middleware('role:coordinador,admin')->group(function () {
        Route::resource('carreras', CarrerasController::class);
        Route::resource('grupos', GrupoController::class);
        Route::resource('materias', MateriaController::class);
        Route::resource('docentes', DocenteController::class);
        Route::resource('estudiantes', EstudianteController::class);
    });

    //Rutas para el administrador
    Route::middleware('role:admin')->group(function () {});
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
