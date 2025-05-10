<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeJob extends Model
{
    protected $table = 'EmployeeJob';
    public $timestamps = false;

    protected $fillable = [
        'location_id',
        'salary',
        'job_role_id',
        'contract',
        'employee_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function jobRole()
    {
        return $this->belongsTo(JobRole::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
