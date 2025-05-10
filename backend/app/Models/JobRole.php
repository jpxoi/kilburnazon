<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobRole extends Model
{
    protected $table = 'JobRole';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'department_id',
        'title',
    ];

    public function employeeJob()
    {
        return $this->hasMany(EmployeeJob::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
