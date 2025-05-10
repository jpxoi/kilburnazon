<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollEntry extends Model
{
    protected $table = 'PayrollEntry';
    protected $fillable = [
        'id',
        'employee_id',
        'period_id',
        'base_salary',
        'bonus',
        'overtime',
        'tax_deduction',
        'insurance_deduction',
        'retirement_contribution',
        'other_deductions',
        'net_pay',
        'processed_at'
    ];

    public $timestamps = false;

    public function payrollPeriod()
    {
        return $this->belongsTo(PayrollPeriod::class, 'period_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
