<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollPeriod extends Model
{
    protected $table = 'PayrollPeriod';
    protected $fillable = [
        'id',
        'start_date',
        'end_date',
        'status',
        'created_at',
        'processed_at'
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public $timestamps = false;

    public function payrollEntries()
    {
        return $this->hasMany(PayrollEntry::class);
    }
}
