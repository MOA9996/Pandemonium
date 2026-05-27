<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LookbookFoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'lookbook_id',
        'imagen',
        'orden',
    ];

    public function lookbook()
    {
        return $this->belongsTo(Lookbook::class);
    }
}
