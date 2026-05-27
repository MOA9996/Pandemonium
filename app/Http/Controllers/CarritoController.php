<?php

namespace App\Http\Controllers;

use App\Models\Prenda;
use App\Models\Compra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CarritoController extends Controller
{
    public function index()
    {
        $carrito = session('carrito', []);
        return Inertia::render('Carrito/Index', [
            'carrito' => array_values($carrito),
        ]);
    }

    public function añadir(Prenda $prenda)
    {
        if (!$prenda->disponible) {
            return back()->withErrors(['message' => 'Esta prenda no está disponible.']);
        }

        $carrito = session('carrito', []);

        if (isset($carrito[$prenda->id])) {
            return back()->withErrors(['message' => 'Esta prenda ya está en el carrito.']);
        }

        $carrito[$prenda->id] = [
            'prenda_id' => $prenda->id,
            'nombre'    => $prenda->nombre,
            'precio'    => $prenda->precio,
            'imagen'    => $prenda->imagen,
            'talla'     => $prenda->talla,
            'color'     => $prenda->color,
        ];

        session(['carrito' => $carrito]);

        return back()->with('success', 'Prenda añadida al carrito.');
    }

    public function quitar(Prenda $prenda)
    {
        $carrito = session('carrito', []);
        unset($carrito[$prenda->id]);
        session(['carrito' => $carrito]);

        return back()->with('success', 'Prenda eliminada del carrito.');
    }

    public function confirmar()
    {
        $carrito = session('carrito', []);

        if (empty($carrito)) {
            return back()->with('error', 'El carrito está vacío.');
        }

        foreach ($carrito as $item) {
            $prenda = Prenda::find($item['prenda_id']);

            if (!$prenda || !$prenda->disponible) {
                continue;
            }

            // Creamos la compra con estado 'paid'
            // En el futuro aquí iría primero 'pending' y Stripe confirmaría el 'paid'
            Compra::create([
                'user_id'       => auth()->id(),
                'prenda_id'     => $prenda->id,
                'precio_pagado' => $prenda->precio,
                'fecha_compra'  => now(),
                'estado'        => 'paid',
            ]);

            $prenda->disponible = false;
            $prenda->save();
        }

        session()->forget('carrito');

        return redirect()->route('prendas.index')->with('success', 'Compra realizada correctamente.');
    }

    public function crearPago()
    {
        $carrito = session('carrito', []);

        if (empty($carrito)) {
            return redirect()->route('carrito.index')->with('error', 'El carrito está vacío.');
        }

        $total = collect($carrito)->sum('precio');

        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount'   => (int)round($total * 100),
            'currency' => 'eur',
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        return Inertia::render('Carrito/Pago', [
            'clientSecret' => $paymentIntent->client_secret,
            'stripeKey'    => config('services.stripe.key'),
            'total'        => $total,
        ]);
    }
    public function pagoExito(Request $request)
    {
        if ($request->query('redirect_status') === 'succeeded') {
            session()->forget('carrito');
            return Inertia::render('Carrito/Exito');
        }

        return redirect()->route('carrito.index')
            ->with('error', 'El pago no se completó correctamente.');
    }
    public function completar(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

        if ($paymentIntent->status !== 'succeeded') {
            return back()->with('error', 'El pago no se completó correctamente.');
        }

        $carrito = session('carrito', []);

        foreach ($carrito as $item) {
            $prenda = Prenda::find($item['prenda_id']);

            if (!$prenda || !$prenda->disponible) {
                continue;
            }

            Compra::create([
                'user_id'       => auth()->id(),
                'prenda_id'     => $prenda->id,
                'precio_pagado' => $prenda->precio,
                'fecha_compra'  => now(),
                'estado'        => 'paid',
            ]);

            $prenda->disponible = false;
            $prenda->save();
        }

        session()->forget('carrito');

        return Inertia::render('Carrito/Exito');
    }
}
