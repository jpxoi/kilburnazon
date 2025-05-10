<?php

use App\Http\Controllers\BirthdayController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\JobRoleController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeTerminationController;
use App\Http\Controllers\LeaveBalanceController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\PayrollReportController;

/* Employee Routes */
Route::get('/employee', [EmployeeController::class, 'index'] );
Route::get('/employee/{id}', [EmployeeController::class, 'show'] );

Route::post('/employee', [EmployeeController::class, 'store'] );
Route::post('/employee/{id}/terminate', [EmployeeTerminationController::class, 'store'] );

Route::put('/employee/{id}', [EmployeeController::class, 'update'] );
Route::put('/employee/{id}/promote', [EmployeeController::class, 'promote'] );

Route::delete('/employee/{id}', [EmployeeController::class, 'destroy'] );

/* Birthday Routes */
Route::get('/birthdays', [BirthdayController::class, 'index'] );

/* Job Role Routes */
Route::get('/job-role', [JobRoleController::class, 'index'] );

/* Department Routes */
Route::get('/department', [DepartmentController::class, 'index'] );

/* Location Routes */
Route::get('/location', [LocationController::class, 'index'] );

/* Employee Termination Routes */
Route::get('/termination/logs', [EmployeeTerminationController::class, 'index'] );

/* Leave Type Routes */
Route::get('/leave-type', [LeaveTypeController::class, 'index'] );

/* Leave Request Routes */
Route::get('/leave-request', [LeaveRequestController::class, 'index'] );
Route::get('/leave-request/{id}', [LeaveRequestController::class, 'show'] );

Route::post('/leave-request', [LeaveRequestController::class, 'store'] );

Route::patch('/leave-request/{id}', [LeaveBalanceController::class, 'update'] );
Route::delete('/leave-request/{id}', [LeaveRequestController::class, 'reject'] );

/* Payroll Report Route */
Route::get('/payroll/report', [PayrollReportController::class, 'getPayrollReport']);

Route::post('/payroll/generate', [PayrollReportController::class, 'generatePayroll']);

Route::get('/absenteeism-report', [LeaveRequestController::class, 'getAbsenteeismReport']);

Route::get('/dashboard', [DashboardController::class, 'index']);