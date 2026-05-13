<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\CarritoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/mis-compras', [UserController::class, 'compras'])->name('user.compras');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Prendas
    Route::middleware('admin')->group(function () {
        Route::resource('prendas', PrendaController::class)->except(['index', 'show']);
        Route::get('/admin/compras', [AdminController::class, 'compras'])->name('admin.compras');
    });
    Route::resource('prendas', PrendaController::class)->only(['index', 'show']);

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
