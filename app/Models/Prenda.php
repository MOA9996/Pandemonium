<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prenda extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'talla',
        'color',
        'imagen',
        'corte',
        'categoria',
        'coleccion',
    ];

    protected $casts = [
      'precio' => 'decimal:2',
        'disponible' => 'boolean',

    ];

    // app/Models/Prenda.php
    public function compra()
    {
        return $this->hasOne(Compra::class);
    }

// Método para saber si está vendida
    public function estaVendida()
    {
        return !$this->disponible;
    }

    public function imagenes()
    {
        return $this->hasMany(PrendaImagen::class)->orderBy('orden');
    }
}
