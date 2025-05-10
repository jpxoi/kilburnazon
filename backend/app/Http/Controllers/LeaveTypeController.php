<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;
use Illuminate\Http\Request;

class LeaveTypeController extends Controller
{
    public function index()
    {
        $leaveTypes = LeaveType::all();

        if ($leaveTypes->isEmpty()) {
            return response()->json(['message' => 'No leave types found'], 404);
        }

        return response()->json($leaveTypes, 200);
    }
}
