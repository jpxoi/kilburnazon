<?php

namespace App\Console\Commands;

use App\Models\Employee;
use App\Models\EmployeeContact;
use App\Models\EmployeeJob;
use App\Models\EmployeeTermination;
use Illuminate\Console\Command;

class DeleteTerminatedEmployees extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-terminated-employees';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get current timestamp
        $currentTimestamp = now();

        // Delete from Employee and EmployeeTermination tables
        $terminatedEmployees = EmployeeTermination::where('retention_timestamp', '<=', $currentTimestamp)->get();

        foreach ($terminatedEmployees as $terminatedEmployee) {
            $employeeId = $terminatedEmployee->employee_id;

            // Delete related EmployeeContact and EmployeeJob records
            EmployeeContact::where('employee_id', $employeeId)->delete();
            EmployeeJob::where('employee_id', $employeeId)->delete();
            // Delete Employee record
            Employee::where('id', $employeeId)->delete();

            // Delete EmployeeTermination record
            $terminatedEmployee->delete();
        }

        $this->info('Successfully deleted terminated employees and related records from the database.');
    }
}
