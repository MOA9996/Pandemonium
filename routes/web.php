<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PrendaController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\LookbookController;
use App\Http\Controllers\OpcionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home
Route::get('/', [LookbookController::class, 'index'])->name('lookbook.home');

Route::get('/prendas', [PrendaController::class, 'index'])->name('prendas.index');

// esto va antes de {prenda} o peta
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/prendas/create', [PrendaController::class, 'create'])->name('prendas.create');
    Route::post('/prendas', [PrendaController::class, 'store'])->name('prendas.store');
    Route::get('/prendas/{prenda}/edit', [PrendaController::class, 'edit'])->name('prendas.edit');
    Route::put('/prendas/{prenda}', [PrendaController::class, 'update'])->name('prendas.update');
    Route::patch('/prendas/{prenda}', [PrendaController::class, 'update']);
    Route::delete('/prendas/{prenda}', [PrendaController::class, 'destroy'])->name('prendas.destroy');

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/compras', [AdminController::class, 'compras'])->name('admin.compras');

    // usuarios
    Route::get('/admin/usuarios', [AdminController::class, 'usuarios'])->name('admin.usuarios');
    Route::post('/admin/usuarios', [AdminController::class, 'storeUsuario'])->name('admin.usuarios.store');
    Route::get('/admin/usuarios/{user}/edit', [AdminController::class, 'editUsuario'])->name('admin.usuarios.edit');
    Route::patch('/admin/usuarios/{user}', [AdminController::class, 'updateUsuario'])->name('admin.usuarios.update');
    Route::delete('/admin/usuarios/{user}', [AdminController::class, 'destroyUsuario'])->name('admin.usuarios.destroy');

    // lookbooks
    Route::get('/admin/lookbooks', [LookbookController::class, 'adminIndex'])->name('lookbook.admin');
    Route::get('/admin/lookbooks/crear', [LookbookController::class, 'create'])->name('lookbook.create');
    Route::post('/admin/lookbooks', [LookbookController::class, 'store'])->name('lookbook.store');
    Route::get('/admin/lookbooks/{lookbook}/edit', [LookbookController::class, 'edit'])->name('lookbook.edit');
    Route::put('/admin/lookbooks/{lookbook}', [LookbookController::class, 'update'])->name('lookbook.update');
    Route::patch('/admin/lookbooks/{lookbook}/activar', [LookbookController::class, 'activar'])->name('lookbook.activar');
    Route::patch('/admin/lookbooks/{lookbook}/desactivar', [LookbookController::class, 'desactivar'])->name('lookbook.desactivar');
    Route::delete('/admin/lookbooks/{lookbook}', [LookbookController::class, 'destroy'])->name('lookbook.destroy');

    Route::post('/admin/opciones', [OpcionController::class, 'store'])->name('opciones.store');
});

// show despues del create si no lo interpreta como {prenda}
Route::get('/prendas/{prenda}', [PrendaController::class, 'show'])->name('prendas.show');

Route::middleware('auth')->group(function () {
    Route::get('/mis-compras', [UserController::class, 'compras'])->name('user.compras');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // carrito - las fijas antes de {prenda}
    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::post('/carrito/confirmar', [CarritoController::class, 'confirmar'])->name('carrito.confirmar');
    Route::get('/carrito/pago', [CarritoController::class, 'crearPago'])->name('carrito.pago');
    Route::post('/carrito/completar', [CarritoController::class, 'completar'])->name('carrito.completar');
    Route::get('/carrito/exito', [CarritoController::class, 'pagoExito'])->name('carrito.exito');
    Route::post('/carrito/{prenda}', [CarritoController::class, 'añadir'])->name('carrito.añadir');
    Route::delete('/carrito/{prenda}', [CarritoController::class, 'quitar'])->name('carrito.quitar');
});

require __DIR__.'/auth.php';
