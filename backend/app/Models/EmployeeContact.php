<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeContact extends Model
{
    protected $table = 'EmployeeContact';
    public $timestamps = false;

    protected $fillable = [
        'email',
        'home_address',
        'emergency_name',
        'emergency_relationship',
        'emergency_phone',
        'employee_id',
    ];

    public function employeeContact()
    {
        return $this->hasOne(EmployeeContact::class);
    }
}
