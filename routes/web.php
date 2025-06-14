<?php

use App\Http\Controllers\AsignacionDocenteController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\CarrerasController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\RevisionTareasController;
use App\Http\Controllers\TareaController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Rutas publicas
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/features', function () {
    return Inertia::render('features');
})->name('features');

Route::get('/plans', function () {
    return Inertia::render('plans');
})->name('plans');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Rutas para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {

    // Rutas para el maestro
    Route::middleware(['role:maestro'])->group(function () {
        Route::get('/clases', [ClaseController::class, 'index'])->name('clases.index');
        // Route::resource('clases', ClaseController::class);
        Route::resource('asistencias', AsistenciaController::class);
        Route::resource('tareas', TareaController::class);
        Route::resource('revisiones', RevisionTareasController::class);
    });

    // Rutas para coordinador y admin
    Route::middleware('role:coordinador,admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        Route::resource('carreras', CarrerasController::class);
        Route::resource('grupos', GrupoController::class);
        Route::resource('materias', MateriaController::class);
        Route::resource('docentes', DocenteController::class);
        Route::resource('estudiantes', EstudianteController::class);
        Route::resource('asignaciones', AsignacionDocenteController::class);
    });

    //Rutas para el administrador
    Route::middleware('role:admin')->group(function () {
        Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes.index');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
