<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'Location';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'address',
        'city',
        'postcode',
        'type',
        'is_active'
    ];
}
