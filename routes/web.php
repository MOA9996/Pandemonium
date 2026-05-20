<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\LookbookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página principal — Lookbook (público)
Route::get('/', [LookbookController::class, 'index'])->name('lookbook.home');

// Rutas públicas — sin necesidad de login
Route::get('/prendas', [PrendaController::class, 'index'])->name('prendas.index');

// Rutas admin de prendas ANTES de {prenda} para evitar conflictos
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/prendas/create', [PrendaController::class, 'create'])->name('prendas.create');
    Route::post('/prendas', [PrendaController::class, 'store'])->name('prendas.store');
    Route::get('/prendas/{prenda}/edit', [PrendaController::class, 'edit'])->name('prendas.edit');
    Route::put('/prendas/{prenda}', [PrendaController::class, 'update'])->name('prendas.update');
    Route::patch('/prendas/{prenda}', [PrendaController::class, 'update']);
    Route::delete('/prendas/{prenda}', [PrendaController::class, 'destroy'])->name('prendas.destroy');

    // Panel admin
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/compras', [AdminController::class, 'compras'])->name('admin.compras');

    // Gestión lookbook
    Route::get('/admin/lookbooks', [LookbookController::class, 'adminIndex'])->name('lookbook.admin');
    Route::get('/admin/lookbooks/crear', [LookbookController::class, 'create'])->name('lookbook.create');
    Route::post('/admin/lookbooks', [LookbookController::class, 'store'])->name('lookbook.store');
    Route::patch('/admin/lookbooks/{lookbook}/activar', [LookbookController::class, 'activar'])->name('lookbook.activar');
    Route::delete('/admin/lookbooks/{lookbook}', [LookbookController::class, 'destroy'])->name('lookbook.destroy');
});

// Ruta pública de show DESPUÉS de create para evitar conflictos
Route::get('/prendas/{prenda}', [PrendaController::class, 'show'])->name('prendas.show');

// Rutas que requieren login
Route::middleware('auth')->group(function () {
    Route::get('/mis-compras', [UserController::class, 'compras'])->name('user.compras');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Carrito — rutas estáticas SIEMPRE antes de {prenda}
    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::post('/carrito/confirmar', [CarritoController::class, 'confirmar'])->name('carrito.confirmar');
    Route::get('/carrito/pago', [CarritoController::class, 'crearPago'])->name('carrito.pago');
    Route::post('/carrito/completar', [CarritoController::class, 'completar'])->name('carrito.completar');
    Route::get('/carrito/exito', [CarritoController::class, 'pagoExito'])->name('carrito.exito');
    Route::post('/carrito/{prenda}', [CarritoController::class, 'añadir'])->name('carrito.añadir');
    Route::delete('/carrito/{prenda}', [CarritoController::class, 'quitar'])->name('carrito.quitar');
});

require __DIR__.'/auth.php';
