<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\PayrollEntry;
use App\Models\PayrollPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PayrollReportController extends Controller
{
    public function getPayrollReport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'bail|required|string',
            'end_date' => 'required|string',
            'department_id' => 'nullable|integer|exists:Department,id',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Filters from request
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $departmentId = $request->input('department_id');


        // Query Payroll Entries
        $payrollData = PayrollEntry::with(['employee.employeeJob.jobRole.department', 'payrollPeriod'])
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereHas('payrollPeriod', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('start_date', [$startDate, $endDate])
                        ->orWhereBetween('end_date', [$startDate, $endDate]);
                });
            })
            ->when($departmentId, function ($query) use ($departmentId) {
                $query->whereHas('employee.employeeJob.jobRole.department', function ($q) use ($departmentId) {
                    $q->where('id', $departmentId);
                });
            })
            ->get();

        // $payrollPeriods = PayrollPeriod::all();

        // // Add Payroll Period to Payroll Entries as a virtual attribute
        // $payrollData->map(function ($entry) use ($payrollPeriods) {
        //     $entry->payroll_period = $payrollPeriods->where('id', $entry->period_id)->first();
        //     return $entry;
        // });

        // Calculate Summary Totals
        $totalPayroll = round($payrollData->sum('net_pay'), 2);
        $averageSalary = round($payrollData->average('base_salary'), 2);
        $totalRetentions = round($payrollData->sum('tax_deduction') + $payrollData->sum('insurance_deduction') + $payrollData->sum('retirement_contribution'), 2);
        $averageRetentions = $payrollData->count() > 0 ? round($totalRetentions / $payrollData->count(), 2) : 0.00;

        return response()->json([
            'data' => $payrollData,
            'summary' => [
                'total_payroll' => $totalPayroll,
                'average_salary' => $averageSalary,
                'total_retentions' => $totalRetentions,
                'average_retentions' => $averageRetentions,
            ]
        ]);
    }

    public function generatePayroll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'month' => 'required|date_format:Y-m',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $month = $request->input('month');

        // Check if payroll has already been generated for the given month
        $startDate = $month . '-01';
        $year = (int)substr($month, 0, 4);
        $monthNumber = (int)substr($month, 5, 2);
        $endDate = $month . '-' . cal_days_in_month(CAL_GREGORIAN, $monthNumber, $year);

        $existingPayroll = PayrollPeriod::where('start_date', $startDate)
            ->where('end_date', $endDate)
            ->first();
        if ($existingPayroll) {
            return response()->json([
                'success' => false,
                'message' => 'Payroll for this period has already been generated.',
            ], 400);
        }

        // Fetch all active employees
        $employees = Employee::with('employeeJob')
            ->where('status', 'ACTIVE')
            ->get();

        // Start database transaction
        try {
            // Generate payroll id for the period using the month
            $newPayrollId = DB::select("SELECT UUID() as id")[0]->id;
            // Create a new payroll period

            $payrollPeriod = PayrollPeriod::create([
                'id' => $newPayrollId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'PROCESSING',
                'created_at' => now(),
            ]);

            $bonusPercentage = 0.03; // 3%
            $overtimeRate = 10; // $10 per hour
            $taxRate = 0.15; // 15%
            $insuranceRate = 0.01; // 1%
            $retirementRate = 0.08; // 8%

            // Generate payroll entries for each employee
            foreach ($employees as $employee) {
                // Calculate bonus, overtime, tax, insurance, retirement, and other deductions
                $monthlySalary = $employee->employeeJob->salary / 12;
                $bonus = $monthlySalary * $bonusPercentage;
                $overtime = 0 * $overtimeRate; // Example: no overtime
                $taxDeduction = $monthlySalary * $taxRate;
                $insuranceDeduction = $monthlySalary * $insuranceRate;
                $retirementContribution = $monthlySalary * $retirementRate;

                $netPay = $monthlySalary + $bonus - $taxDeduction - $insuranceDeduction - $retirementContribution;

                PayrollEntry::create([
                    'employee_id' => $employee->id,
                    'period_id' => $newPayrollId,
                    'base_salary' => $monthlySalary,
                    'bonus' => $bonus,
                    'overtime' => $overtime,
                    'tax_deduction' => $taxDeduction,
                    'insurance_deduction' => $insuranceDeduction,
                    'retirement_contribution' => $retirementContribution,
                    'other_deductions' => 0, // Default or calculated value
                    'net_pay' => $netPay,
                    'processed_at' => now(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Payroll generated successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while generating payroll.',
                'error' => $e,
            ], 500);
        }
    }
}
