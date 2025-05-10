<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();

        if ($departments->isEmpty()) {
            return response()->json(['message' => 'No departments found'], 404);
        }

        return response()->json($departments, 200);
    }
}
