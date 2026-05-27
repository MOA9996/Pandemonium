<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrendaImagen extends Model
{
    protected $table = 'prenda_imagenes';

    protected $fillable = ['prenda_id', 'imagen', 'orden'];

    public function prenda()
    {
        return $this->belongsTo(Prenda::class);
    }
}
