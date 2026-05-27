<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lookbook extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function fotos()
    {
        return $this->hasMany(LookbookFoto::class)->orderBy('orden');
    }
}
