<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\EmployeeContact;
use App\Models\EmployeeJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index()
    {
        /* Get all employees with their contact and job details sorted by name */
        $employees = Employee::with(['EmployeeJob' => function ($query) {
            $query->with(['JobRole' => function ($query) {
                $query->with('Department');
            }, 'Location']);
        }, 'EmployeeContact'])->where('status', '!=', 'TERMINATED')->orderBy('name')->get();

        return response()->json($employees, 200);
    }

    public function show($id)
    {
        $employee = Employee::with(['EmployeeJob.JobRole.Department', 'EmployeeContact'])->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        return response()->json($employee, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'nullable|unique:Employee|numeric',
            'name' => 'required|max:255',
            'date_of_birth' => 'required',
            'hired_date' => 'required',
            'nin' => 'required|unique:Employee',
            'avatar_url' => 'nullable|url',
            'notes' => 'nullable|max:255',
            'status' => 'required|in:ACTIVE,TERMINATED,ON_LEAVE',
            'employee_job.location_id' => 'nullable|exists:Location,id',
            'employee_job.salary' => 'nullable|numeric',
            'employee_job.job_role_id' => 'required|exists:JobRole,id',
            'employee_job.contract_type' => 'required|in:FULL_TIME,PART_TIME,FREELANCE,INTERNSHIP',
            'employee_contact.email' => 'required|email',
            'employee_contact.home_address' => 'required|max:255',
            'employee_contact.emergency_name' => 'nullable|max:255',
            'employee_contact.emergency_relationship' => 'nullable|max:255',
            'employee_contact.emergency_phone' => 'nullable|digits:11'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Validation failed. Please check the errors.',
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $random_add = rand(1, 500);
        $new_id = $request->id ?? Employee::max('id') + $random_add;

        try {
            $employee = Employee::create([
                'id' => $new_id,
                'name' => $request->name,
                'date_of_birth' => $request->date_of_birth,
                'hired_date' => $request->hired_date,
                'nin' => $request->nin,
                'avatar_url' => $request->avatar_url,
                'notes' => $request->notes,
                'status' => $request->status
            ]);

            $employeejob = EmployeeJob::create([
                'location_id' => $request->employee_job['location_id'],
                'salary' => $request->employee_job['salary'] ?? null,
                'job_role_id' => $request->employee_job['job_role_id'],
                'contract' => $request->employee_job['contract_type'],
                'employee_id' => $new_id
            ]);

            $employeecontact = EmployeeContact::create([
                'email' => $request->employee_contact['email'],
                'home_address' => $request->employee_contact['home_address'],
                'emergency_name' => $request->employee_contact['emergency_name'] ?? null,
                'emergency_relationship' => $request->employee_contact['emergency_relationship'] ?? null,
                'emergency_phone' => $request->employee_contact['emergency_phone'] ?? null,
                'employee_id' => $new_id
            ]);

            if (!$employee || !$employeejob || !$employeecontact) {
                $this->destroy($new_id);
                return response()->json(['message' => 'Employee could not be created'], 500);
            }
        } catch (\Exception $e) {
            $this->destroy($new_id);
            return response()->json(['message' => 'Employee could not be created', 'error' => $e], 500);
        }

        $employee = $this->show($request->id);

        return response()->json(['message' => 'Employee created successfully.', 'employee' => $employee], 201);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employeeJob = EmployeeJob::where('employee_id', $id)->first();
        $employeeContact = EmployeeContact::where('employee_id', $id)->first();

        try {
            if ($employeeJob) {
                $employeeJob->delete();
            }
            if ($employeeContact) {
                $employeeContact->delete();
            }
            $employee->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Employee could not be deleted', 'error' => $e], 500);
        }

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::with(['EmployeeJob', 'EmployeeContact'])->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'id' => 'bail|nullable|unique:Employee|numeric',
            'name' => 'required|max:255',
            'date_of_birth' => 'nullable',
            'hired_date' => 'nullable',
            'nin' => 'nullable|unique:Employee',
            'avatar_url' => 'nullable|url',
            'notes' => 'nullable|max:255',
            'status' => 'nullable|in:ACTIVE,TERMINATED,ON_LEAVE',
            'employee_job.location_id' => 'nullable|exists:Location,id',
            'employee_job.salary' => 'nullable|numeric',
            'employee_job.job_role_id' => 'nullable|exists:JobRole,id',
            'employee_job.contract_type' => 'nullable|in:FULL_TIME,PART_TIME,FREELANCE,INTERNSHIP',
            'employee_contact.email' => 'required|email',
            'employee_contact.home_address' => 'nullable|max:255',
            'employee_contact.emergency_name' => 'nullable|max:255',
            'employee_contact.emergency_relationship' => 'nullable|max:255',
            'employee_contact.emergency_phone' => 'nullable|digits:11'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Validation failed. Please check the errors.',
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        try {
            $employee->update([
                'id' => $request->id ?? $employee->id,
                'name' => $request->name,
                'date_of_birth' => $request->date_of_birth ?? $employee->date_of_birth,
                'hired_date' => $request->hired_date ?? $employee->hired_date,
                'nin' => $request->nin ?? $employee->nin,
                'avatar_url' => $request->avatar_url ?? $employee->avatar_url,
                'notes' => $request->notes ?? $employee->notes,
                'status' => $request->status ?? $employee->status
            ]);

            if ($employee->EmployeeJob) {
                $employee->EmployeeJob->update([
                    'location_id' => $request->employee_job['location_id'] ?? $employee->EmployeeJob->location_id,
                    'salary' => $request->employee_job['salary'] ?? $employee->EmployeeJob->salary,
                    'job_role_id' => $request->employee_job['job_role_id'] ?? $employee->EmployeeJob->job_role_id,
                    'contract' => $request->employee_job['contract_type'] ?? $employee->EmployeeJob->contract
                ]);
            }

            if ($employee->EmployeeContact) {
                $employee->EmployeeContact->update([
                    'email' => $request->employee_contact['email'],
                    'home_address' => $request->employee_contact['home_address'] ?? $employee->EmployeeContact->home_address,
                    'emergency_name' => $request->employee_contact['emergency_name'] ?? $employee->EmployeeContact->emergency_name,
                    'emergency_relationship' => $request->employee_contact['emergency_relationship'] ?? $employee->EmployeeContact->emergency_relationship,
                    'emergency_phone' => $request->employee_contact['emergency_phone'] ?? $employee->EmployeeContact->emergency_phone
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Employee could not be updated', 'error' => $e], 500);
        }

        $employee = $this->show($id)->original;

        return response()->json(['message' => 'Employee updated successfully.', 'employee' => $employee], 200);
    }

    public function promote(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'percentage' => 'required|numeric|min:0|max:100'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Validation failed. Please check the errors.',
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        try {
            $employee = Employee::with('EmployeeJob')->findOrFail($id);

            $newSalary = $employee->EmployeeJob->salary + ($employee->EmployeeJob->salary * $request->percentage / 100);

            $employee->EmployeeJob->update([
                'salary' => $newSalary
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Employee could not be promoted', 'error' => $e], 500);
        }

        $employee = $this->show($id);

        return response()->json(['message' => 'Employee promoted successfully.', 'employee' => $employee], 200);
    }
}
