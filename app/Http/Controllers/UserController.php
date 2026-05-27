<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function compras(Request $request)
    {
        $compras = $request->user()
            ->compras()
            ->with('prenda')
            ->latest('fecha_compra')
            ->get();

        return Inertia::render('User/Compras', [
            'compras' => $compras,
        ]);
    }
}
