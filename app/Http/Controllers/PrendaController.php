<?php

namespace App\Http\Controllers;

use App\Models\Prenda;
use App\Models\PrendaImagen;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Opcion;

class PrendaController extends Controller
{
    public function index(Request $request)
    {
        $prendas = Prenda::query()
            ->with('imagenes')
            ->where('disponible', true)
            ->when($request->talla, fn($q) => $q->where('talla', $request->talla))
            ->when($request->color, fn($q) => $q->where('color', $request->color))
            ->when($request->corte, fn($q) => $q->where('corte', $request->corte))
            ->when($request->categoria, fn($q) => $q->where('categoria', $request->categoria))
            ->when($request->precio_max, fn($q) => $q->where('precio', '<=', $request->precio_max))
            ->when($request->coleccion, fn($q) => $q->where('coleccion', $request->coleccion))
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Prendas/Index', [
            'prendas' => $prendas,
            'filtros' => $request->only(['talla', 'color', 'corte', 'categoria', 'precio_max', 'coleccion']),
            'opciones' => Opcion::all()->groupBy('tipo'),
        ]);
    }

    public function create()
    {
        $opciones = Opcion::all()->groupBy('tipo');
        return Inertia::render('Prendas/Create', [
            'opciones' => $opciones,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio'      => 'required|numeric|min:0',
            'talla'       => 'nullable|string',
            'color'       => 'nullable|string',
            'corte'       => 'nullable|string',
            'categoria'   => 'nullable|string',
            'coleccion'   => 'nullable|string|max:255',
            'imagenes'    => 'nullable|array',
            'imagenes.*'  => 'image|max:102400',
        ]);

        $validated['disponible'] = true;
        $validated['imagen'] = null;

        $prenda = Prenda::create($validated);

        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $index => $img) {
                $path = $img->store('prendas', 'public');
                PrendaImagen::create([
                    'prenda_id' => $prenda->id,
                    'imagen'    => $path,
                    'orden'     => $index,
                ]);
                if ($index === 0) {
                    $prenda->update(['imagen' => $path]);
                }
            }
        }

        return redirect()->route('prendas.index')->with('success', 'Prenda creada correctamente.');
    }

    public function show(Prenda $prenda)
    {
        $prenda->load('imagenes');
        return Inertia::render('Prendas/Show', [
            'prenda' => $prenda,
        ]);
    }

    public function edit(Prenda $prenda)
    {
        $prenda->load('imagenes');
        $opciones = Opcion::all()->groupBy('tipo');
        return Inertia::render('Prendas/Edit', [
            'prenda'   => $prenda,
            'opciones' => $opciones,
        ]);
    }

    public function update(Request $request, Prenda $prenda)
    {
        $validated = $request->validate([
            'nombre'              => 'required|string|max:255',
            'descripcion'         => 'nullable|string',
            'precio'              => 'required|numeric|min:0',
            'talla'               => 'nullable|string',
            'color'               => 'nullable|string',
            'corte'               => 'nullable|string',
            'categoria'           => 'nullable|string',
            'coleccion'           => 'nullable|string|max:255',
            'imagenes'            => 'nullable|array',
            'imagenes.*'          => 'image|max:102400',
            'imagenes_eliminar'   => 'nullable|array',
            'imagenes_eliminar.*' => 'integer',
        ]);

        $prenda->update([
            'nombre'      => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'precio'      => $validated['precio'],
            'talla'       => $validated['talla'] ?? null,
            'color'       => $validated['color'] ?? null,
            'corte'       => $validated['corte'] ?? null,
            'categoria'   => $validated['categoria'] ?? null,
            'coleccion'   => $validated['coleccion'] ?? null,
        ]);

        if (!empty($validated['imagenes_eliminar'])) {
            $imgs = PrendaImagen::whereIn('id', $validated['imagenes_eliminar'])
                ->where('prenda_id', $prenda->id)
                ->get();
            foreach ($imgs as $img) {
                \Storage::disk('public')->delete($img->imagen);
                $img->delete();
            }
        }

        if ($request->hasFile('imagenes')) {
            $ultimoOrden = $prenda->imagenes()->max('orden') ?? -1;
            foreach ($request->file('imagenes') as $index => $img) {
                $path = $img->store('prendas', 'public');
                PrendaImagen::create([
                    'prenda_id' => $prenda->id,
                    'imagen'    => $path,
                    'orden'     => $ultimoOrden + $index + 1,
                ]);
            }
        }

        $primera = $prenda->imagenes()->orderBy('orden')->first();
        $prenda->update(['imagen' => $primera?->imagen]);

        return redirect()->route('prendas.show', $prenda)->with('success', 'Prenda actualizada correctamente.');
    }

    public function destroy(Prenda $prenda)
    {
        foreach ($prenda->imagenes as $img) {
            \Storage::disk('public')->delete($img->imagen);
        }
        $prenda->delete();

        return redirect()->route('prendas.index')->with('success', 'Prenda eliminada correctamente.');
    }
}
