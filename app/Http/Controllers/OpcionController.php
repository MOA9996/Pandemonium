<?php

namespace App\Http\Controllers;

use App\Models\Opcion;
use Illuminate\Http\Request;

class OpcionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tipo'  => 'required|string|in:talla,color,corte,categoria,coleccion',
            'valor' => 'required|string|max:255',
        ]);

        $existe = Opcion::where('tipo', $request->tipo)
            ->where('valor', $request->valor)
            ->exists();

        if ($existe) {
            return back()->withErrors(['valor' => 'Esta opción ya existe.']);
        }

        Opcion::create([
            'tipo'  => $request->tipo,
            'valor' => $request->valor,
        ]);

        return back()->with('success', 'Opción añadida correctamente.');
    }
}
