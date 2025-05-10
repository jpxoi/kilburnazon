<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\EmployeeJob;
use App\Models\JobRole;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEmployees = Employee::count();
        $totalDepartments = Department::count();
        $totalPositions = JobRole::count();
        $estimatedMonthlyPayroll = EmployeeJob::sum('salary') / 12;

        return response()->json([
            'totalEmployees' => $totalEmployees,
            'totalDepartments' => $totalDepartments,
            'totalPositions' => $totalPositions,
            'estimatedMonthlyPayroll' => $estimatedMonthlyPayroll,
        ]);
    }
}
