<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'Employee';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'date_of_birth',
        'hired_date',
        'nin',
        'avatar_url',
        'notes',
        'status'
    ];

    public function employeeJob()
    {
        return $this->hasOne(EmployeeJob::class);
    }

    public function employeeContact()
    {
        return $this->hasOne(EmployeeContact::class);
    }

    public function employeeTermination()
    {
        return $this->hasOne(EmployeeTermination::class);
    }

    public function payrollEntries()
    {
        return $this->hasMany(PayrollEntry::class);
    }
}
