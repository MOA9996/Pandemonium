<?php

namespace App\Http\Controllers;

use App\Models\Lookbook;
use App\Models\LookbookFoto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LookbookController extends Controller
{
    public function index()
    {
        $lookbook = Lookbook::with('fotos')
            ->where('activo', true)
            ->first();

        return Inertia::render('LookBook/Index', [
            'lookbook' => $lookbook,
        ]);
    }

    public function adminIndex()
    {
        $lookbooks = Lookbook::withCount('fotos')
            ->with(['fotos' => fn($q) => $q->orderBy('orden')->limit(1)])
            ->latest()
            ->get();

        return Inertia::render('LookBook/Admin/Index', [
            'lookbooks' => $lookbooks,
        ]);
    }

    public function create()
    {
        return Inertia::render('LookBook/Admin/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'activo'      => 'boolean',
            'fotos'       => 'nullable|array',
            'fotos.*'     => 'image|max:102400',
        ]);

        if (!empty($validated['activo'])) {
            Lookbook::where('activo', true)->update(['activo' => false]);
        }

        $lookbook = Lookbook::create([
            'titulo'      => $validated['titulo'],
            'descripcion' => $validated['descripcion'] ?? null,
            'activo'      => $validated['activo'] ?? false,
        ]);

        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $index => $foto) {
                $path = $foto->store('lookbooks', 'public');
                LookbookFoto::create([
                    'lookbook_id' => $lookbook->id,
                    'imagen'      => $path,
                    'orden'       => $index,
                ]);
            }
        }

        return to_route('lookbook.admin')->with('success', 'Lookbook creado correctamente.');
    }

    public function edit(Lookbook $lookbook)
    {
        $lookbook->load('fotos');
        return Inertia::render('LookBook/Admin/Edit', [
            'lookbook' => $lookbook,
        ]);
    }

    public function update(Request $request, Lookbook $lookbook)
    {
        $validated = $request->validate([
            'titulo'           => 'required|string|max:255',
            'descripcion'      => 'nullable|string',
            'activo'           => 'boolean',
            'fotos'            => 'nullable|array',
            'fotos.*'          => 'image|max:102400',
            'fotos_eliminar'   => 'nullable|array',
            'fotos_eliminar.*' => 'integer',
        ]);

        if (!empty($validated['activo'])) {
            Lookbook::where('activo', true)->where('id', '!=', $lookbook->id)->update(['activo' => false]);
        }

        $lookbook->update([
            'titulo'      => $validated['titulo'],
            'descripcion' => $validated['descripcion'] ?? null,
            'activo'      => $validated['activo'] ?? false,
        ]);

        if (!empty($validated['fotos_eliminar'])) {
            $fotosEliminar = LookbookFoto::whereIn('id', $validated['fotos_eliminar'])
                ->where('lookbook_id', $lookbook->id)
                ->get();

            foreach ($fotosEliminar as $foto) {
                \Storage::disk('public')->delete($foto->imagen);
                $foto->delete();
            }
        }

        if ($request->hasFile('fotos')) {
            $ultimoOrden = $lookbook->fotos()->max('orden') ?? -1;
            foreach ($request->file('fotos') as $index => $foto) {
                $path = $foto->store('lookbooks', 'public');
                LookbookFoto::create([
                    'lookbook_id' => $lookbook->id,
                    'imagen'      => $path,
                    'orden'       => $ultimoOrden + $index + 1,
                ]);
            }
        }

        return to_route('lookbook.admin')->with('success', 'Lookbook actualizado correctamente.');
    }

    public function activar(Lookbook $lookbook)
    {
        Lookbook::where('activo', true)->update(['activo' => false]);
        $lookbook->update(['activo' => true]);

        return to_route('lookbook.admin')->with('success', 'Lookbook activado correctamente.');
    }

    public function desactivar(Lookbook $lookbook)
    {
        $lookbook->update(['activo' => false]);

        return to_route('lookbook.admin')->with('success', 'Lookbook desactivado correctamente.');
    }

    public function destroy(Lookbook $lookbook)
    {
        foreach ($lookbook->fotos as $foto) {
            \Storage::disk('public')->delete($foto->imagen);
        }

        $lookbook->delete();

        return to_route('lookbook.admin')->with('success', 'Lookbook eliminado correctamente.');
    }
}
