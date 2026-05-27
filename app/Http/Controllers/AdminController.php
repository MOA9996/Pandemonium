<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function compras()
    {
        $compras = Compra::with(['user', 'prenda'])
            ->latest('fecha_compra')
            ->get();

        return Inertia::render('Admin/Compras', [
            'compras' => $compras,
        ]);
    }
    public function index()
    {
        return Inertia::render('Admin/Index');
    }
}
