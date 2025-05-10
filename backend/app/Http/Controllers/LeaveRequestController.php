<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $leaveRequests = LeaveRequest::with(['employee', 'leaveType'])->get();

        if ($leaveRequests->isEmpty()) {
            return response()->json(['message' => 'No leave requests found'], 404);
        }
        /* Format the response - start_date and end_date, created_at and updated_at in human readable format */
        $leaveRequests->transform(function ($leaveRequest) {
            $leaveRequest->start_date = date_format(date_create($leaveRequest->start_date), 'd M Y');
            $leaveRequest->end_date = date_format(date_create($leaveRequest->end_date), 'd M Y');
            return $leaveRequest;
        });

        /* Create total_days attribute */
        $leaveRequests->transform(function ($leaveRequest) {
            $start_date = date_create($leaveRequest->start_date);
            $end_date = date_create($leaveRequest->end_date);
            $diff = date_diff($start_date, $end_date);
            $leaveRequest->total_days = $diff->format('%a');
            return $leaveRequest;
        });

        return response()->json($leaveRequests, 200);
    }

    public function show($id)
    {
        $leaveRequest = LeaveRequest::find($id);

        if (!$leaveRequest) {
            return response()->json(['message' => 'Leave request not found'], 404);
        }

        return response()->json($leaveRequest, 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'employee_id' => 'bail|required|exists:Employee,id',
            'leave_type_id' => 'required|exists:LeaveType,id',
            'start_date' => 'required:date:after:today',
            'end_date' => 'required:date:after:start_date',
            'status' => 'required:in:PENDING,APPROVED,REJECTED,CANCELLED',
            'comments' => 'nullable:string',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Validation failed. Please check tthe errors',
                'errors' => $validator->errors()
            ];

            return response()->json($data, 400);
        }

        try {
            $leaveRequest = LeaveRequest::create($request->all());
        } catch (\Exception $e) {
            return response()->json(['message' => 'Leave request creation failed', 'error' => $e], 500);
        }

        $data = [
            'message' => 'Leave request created successfully',
            'leaveRequest' => $leaveRequest
        ];

        return response()->json($data, 201);
    }

    public function reject($id)
    {
        try {
            $leaveRequest = LeaveRequest::find($id);

            if (!$leaveRequest) {
                throw new \Exception('Leave request not found');
            }

            $leaveRequest->status = 'REJECTED';
            $leaveRequest->save();

            return response()->json(['message' => 'Leave request rejected', 'leaveRequest' => $leaveRequest], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Leave request rejection failed', 'error' => $e], 500);
        }
    }

    public function getAbsenteeismReport(Request $request)
    {
        $validator = Validator::make($request->query(), [
            'period' => 'in:monthly,quarterly,yearly',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid query parameter', 'errors' => $validator->errors()], 400);
        }

        $period = $request->query('period', 'monthly'); // Default to monthly
        $year = now()->year;

        // Determine the grouping format
        $groupByFormat = match ($period) {
            'monthly' => 'DATE_FORMAT(start_date, "%Y-%m")',
            'quarterly' => 'CONCAT(YEAR(start_date), "-Q", QUARTER(start_date))',
            'yearly' => 'YEAR(start_date)',
            default => 'DATE_FORMAT(start_date, "%Y-%m")',
        };

        $query = `SELECT 
                    $groupByFormat AS period,
                    JobRole.department_id AS department_id,
                    Department.name AS department_name,
                    LeaveType.name AS leave_reason,
                    COUNT(*) AS total_requests,
                    SUM(DATEDIFF(end_date, start_date) + 1) AS total_absent_days,
                    AVG(DATEDIFF(end_date, start_date) + 1) AS avg_absent_days,
                    (SUM(DATEDIFF(end_date, start_date) + 1) / (COUNT(DISTINCT Employee.id) * 160)) * 100 AS absence_rate
                    FROM 
                        LeaveRequest
                    JOIN 
                        Employee ON LeaveRequest.employee_id = Employee.id
                    JOIN 
                        EmployeeJob ON Employee.id = EmployeeJob.employee_id
                    JOIN 
                        JobRole ON EmployeeJob.job_role_id = JobRole.id
                    JOIN 
                        Department ON JobRole.department_id = Department.id
                    JOIN 
                        LeaveType ON LeaveRequest.leave_type_id = LeaveType.id
                    WHERE 
                        LeaveRequest.status = 'APPROVED'
                        AND YEAR(start_date) = $year
                    GROUP BY 
                        $groupByFormat, 
                        JobRole.department_id, 
                        Department.name, 
                        LeaveRequest.leave_type_id, 
                        LeaveType.name`;

        $report = LeaveRequest::selectRaw("
        $groupByFormat AS period,
        JobRole.department_id AS department_id,
        Department.name AS department_name,
        LeaveType.name AS leave_reason,
        COUNT(*) AS total_requests,
        SUM(DATEDIFF(end_date, start_date) + 1) AS total_absent_days,
        AVG(DATEDIFF(end_date, start_date) + 1) AS avg_absent_days,
        (SUM(DATEDIFF(end_date, start_date) + 1) / (COUNT(DISTINCT Employee.id) * 160)) * 100 AS absence_rate
    ")
            ->join('Employee', 'LeaveRequest.employee_id', '=', 'Employee.id')
            ->join('EmployeeJob', 'Employee.id', '=', 'EmployeeJob.employee_id')
            ->join('JobRole', 'EmployeeJob.job_role_id', '=', 'JobRole.id')
            ->join('Department', 'JobRole.department_id', '=', 'Department.id')
            ->join('LeaveType', 'LeaveRequest.leave_type_id', '=', 'LeaveType.id')
            ->where('LeaveRequest.status', '=', 'APPROVED')
            ->whereYear('start_date', '=', $year)
            ->groupByRaw("$groupByFormat, JobRole.department_id, Department.name, LeaveRequest.leave_type_id, LeaveType.name")
            ->get();

        return response()->json($report);
    }
}
