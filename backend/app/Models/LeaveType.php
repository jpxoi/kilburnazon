<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model
{
    protected $table = 'LeaveType';

    protected $fillable = [
        'id',
        'name',
        'description',
        'days_allocated',
        'status'
    ];
}
