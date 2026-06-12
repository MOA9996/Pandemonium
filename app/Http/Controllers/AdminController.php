<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function usuarios()
    {
        $usuarios = \App\Models\User::withCount('compras')->orderBy('created_at', 'desc')->get();
        return \Inertia\Inertia::render('Admin/Usuarios', ['usuarios' => $usuarios]);
    }

    public function editUsuario(\App\Models\User $user)
    {
        return \Inertia\Inertia::render('Admin/UsuarioEdit', ['usuario' => $user]);
    }
    public function storeUsuario(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role'     => 'required|in:user,admin',
        ]);

        \App\Models\User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'role'     => $request->role,
        ]);

        return redirect()->route('admin.usuarios');
    }

    public function updateUsuario(\Illuminate\Http\Request $request, \App\Models\User $user)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role'  => 'required|in:user,admin',
        ]);

        $user->update($request->only('name', 'email', 'role'));
        return redirect()->route('admin.usuarios')->with('success', 'Usuario actualizado.');
    }

    public function destroyUsuario(\App\Models\User $user)
    {
        $user->delete();
        return redirect()->route('admin.usuarios')->with('success', 'Usuario eliminado.');
    }
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
