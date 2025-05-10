<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class BirthdayController extends Controller
{
    public function index()
    {
        $currentMonth = date('m');
        $currentYear = date('Y');
        $currentDate = date('Y-m-d');

        $employees = Employee::whereMonth('date_of_birth', $currentMonth)
            ->get()
            ->map(function ($employee) use ($currentYear, $currentDate) {
                $dobYear = date('Y', strtotime($employee->date_of_birth));
                $dobMonth = date('m', strtotime($employee->date_of_birth));
                $dobDay = date('d', strtotime($employee->date_of_birth));
                $employee->this_year_birthday = date('Y-m-d', strtotime("$currentYear-$dobMonth-$dobDay"));
                $employee->turns_age = $currentYear - $dobYear;
                return $employee;
            });

        $pastBirthdays = $employees->filter(function ($employee) use ($currentDate) {
            return $employee->this_year_birthday < $currentDate;
        })->sortByDesc('this_year_birthday')->values()->toArray();

        $upcomingBirthdays = $employees->filter(function ($employee) use ($currentDate) {
            return $employee->this_year_birthday >= $currentDate;
        })->sortBy('this_year_birthday')->values()->toArray();

        return response()->json(['past' => $pastBirthdays, 'upcoming' => $upcomingBirthdays], 200);
    }
}
