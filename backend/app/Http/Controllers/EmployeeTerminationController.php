<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeTermination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeTerminationController extends Controller
{
    public function index()
    {
        $terminations = EmployeeTermination::with(['employee', 'jobRole'])->get();
        
        /* Format the response - last_salary in GBP, timestamp in human readable format */
        $terminations->transform(function ($termination) {
            $termination->last_salary = '£' . number_format($termination->last_salary, 2);
            $termination->termination_timestamp = date_format(date_create($termination->termination_timestamp), 'd M Y H:i:s');
            $termination->retention_timestamp = date_format(date_create($termination->retention_timestamp), 'd M Y');
            return $termination;
        });

        return response()->json($terminations, 200);
    }

    public function store(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'termination_reason' => 'required|string',
            'terminated_by' => 'required|string',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Validation failed. Please check the errors.',
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        try {
            //* Update Employee's Status to Terminated
            $employee = Employee::with('employeeJob.jobRole')->find($id);

            if (!$employee) {
                $data = [
                    'message' => 'Employee not found. Aborting termination process.'
                ];
                return response()->json($data, 404);
            }

            $employee->status = 'TERMINATED';
            $employee->save();

            //* Create Employee Termination Record
            $newTerminationRegister = EmployeeTermination::create([
                'employee_id' => $id,
                'termination_reason' => $request->termination_reason,
                'terminated_by' => $request->terminated_by,
                'last_position_id' => $employee->employeeJob->job_role_id,
                'last_salary' => $employee->employeeJob->salary,
            ]);

            if (!$newTerminationRegister) {
                $data = [
                    'message' => 'Failed to process employee termination.'
                ];
                $employee->status = 'ACTIVE';
                $employee->save();
                return response()->json($data, 500);
            }
        } catch (\Exception $e) {
            $data = [
                'message' => 'Failed to process employee termination.',
                'error' => $e
            ];
            $employee->status = 'ACTIVE';
            $employee->save();
            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Employee termination process completed successfully.',
            'termination' => $newTerminationRegister
        ];

        return response()->json($data, 201);
    }
}
