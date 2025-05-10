<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeTermination extends Model
{
    protected $table = 'EmployeeTermination';
    public $timestamps = false;

    protected $fillable = [
        'employee_id',
        'termination_date',
        'termination_reason',
        'terminated_by',
        'last_position_id',
        'last_salary',
        'deletion_date',
        'retention_end_date'
    ];

    public function jobRole()
    {
        return $this->belongsTo(JobRole::class, 'last_position_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
