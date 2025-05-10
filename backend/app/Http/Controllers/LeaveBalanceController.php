<?php

namespace App\Http\Controllers;

use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeaveBalanceController extends Controller
{
    public function index()
    {
        $leaveBalances = LeaveBalance::with(['employee', 'leaveType'])->get();

        if ($leaveBalances->isEmpty()) {
            return response()->json(['message' => 'No leave balances found'], 404);
        }

        return response()->json($leaveBalances, 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'bail|required|exists:Employee,id',
            'leave_type_id' => 'required|exists:LeaveType,id',
            'year' => 'required|date_format:Y',
            'total_days' => 'required|numeric',
            'used_days' => 'required|numeric',
            'approved_by' => 'required|exists:Employee,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if ($request->total_days < $request->used_days) {
            return response()->json(['error' => 'Total days cannot be less than used days'], 400);
        }

        if ($request->used_days < 0) {
            return response()->json(['error' => 'Used days cannot be less than 0'], 400);
        }

        try {
            /* Find the leave balance where employee_id = employee_id and leave_type_id = leave_type_id and year = year */
            $leaveBalance = LeaveBalance::where('employee_id', $request->employee_id)
                ->where('leave_type_id', $request->leave_type_id)
                ->where('year', $request->year)
                ->first();

            if (!$leaveBalance) {
                /* If leave balance not found, create a new leave balance with the given data */
                $leaveBalance = LeaveBalance::create([
                    'employee_id' => $request->employee_id,
                    'leave_type_id' => $request->leave_type_id,
                    'year' => $request->year,
                    'total_days' => $request->total_days,
                    'used_days' => $request->used_days,
                    'remaining_days' => $request->total_days - $request->used_days,
                ]);

                $leaveRequest = LeaveRequest::find($id);

                if ($leaveRequest) {
                    $leaveRequest->status = 'APPROVED';
                    $leaveRequest->approved_by = $request->approved_by;
                    $leaveRequest->save();
                } else {
                    return response()->json(['error' => 'Leave request not found'], 404);
                }

                return response()->json(['message' => 'Leave balance created', 'leaveBalance' => $leaveBalance], 201);
            }

            /* Check if there is enough remaining days to update */
            if ($leaveBalance->remaining_days < $request->used_days) {
                return response()->json(['error' => 'Not enough remaining days'], 400);
            }

            $leaveBalance->used_days = $leaveBalance->used_days + $request->used_days;
            $leaveBalance->remaining_days = $leaveBalance->total_days - $leaveBalance->used_days;
            $leaveBalance->save();

            /* Update leave request status to APPROVED */
            $leaveRequest = LeaveRequest::find($id);

            if ($leaveRequest) {
                $leaveRequest->status = 'APPROVED';
                $leaveRequest->approved_by = $request->approved_by;
                $leaveRequest->save();
            } else {
                return response()->json(['error' => 'Leave request not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update leave balance', 'error' => $e], 500);
        }

        return response()->json(['message' => 'Leave balance created', 'leaveBalance' => $leaveBalance], 201);
    }
}
