<?php

namespace App\Http\Controllers;

use App\Models\JobRole;
use Illuminate\Http\Request;

class JobRoleController extends Controller
{
    public function index()
    {
        $locations = JobRole::all();

        if ($locations->isEmpty()) {
            return response()->json(['message' => 'No locations found'], 404);
        }

        return response()->json($locations, 200);
    }
}
