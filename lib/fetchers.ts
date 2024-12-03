import {
  BirthdayAPIResponse,
  DepartmentModel,
  EmployeeAPIResponse,
  JobRoleModel,
  LeaveRequestAPIResponse,
  LeaveTypeModel,
  LocationModel,
  PayrollReportAPIResponse,
  PayrollSummaryModel,
  TerminationLogAPIResponse,
} from "@/interfaces";

export async function fetchLocations() {
  const res = await fetch("http://localhost:8000/api/location", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as LocationModel[];
}

export async function fetchJobRoles() {
  const res = await fetch("http://localhost:8000/api/job-role", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as JobRoleModel[];
}

export async function fetchDepartments() {
  const res = await fetch("http://localhost:8000/api/department", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as DepartmentModel[];
}

export async function fetchLeaveTypes() {
  const res = await fetch("http://localhost:8000/api/leave-type", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as LeaveTypeModel[];
}

export async function fetchEmployees() {
  const res = await fetch("http://localhost:8000/api/employee", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as EmployeeAPIResponse[];
}

export async function fetchEmployee(id: string) {
  const res = await fetch(`http://localhost:8000/api/employee/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as EmployeeAPIResponse;
}

export async function fetchBirthdays() {
  const res = await fetch("http://localhost:8000/api/birthdays", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as BirthdayAPIResponse;
}

export async function fetchTerminationLogs() {
  const res = await fetch("http://localhost:8000/api/termination/logs", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as TerminationLogAPIResponse[];
}

export async function fetchLeaveRequests() {
  const res = await fetch("http://localhost:8000/api/leave-request", {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as LeaveRequestAPIResponse[];
}

export async function fetchPayrollReport(
  start_date: string,
  end_date: string,
  department_id?: number
) {
  const query = new URLSearchParams({
    start_date,
    end_date,
    department_id: department_id ? String(department_id) : "",
  });
  const res = await fetch(
    `http://localhost:8000/api/payroll/report?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return (await res.json()) as PayrollReportAPIResponse;
}

export async function fetchPayrollEntries(
  period:
    | "this_month"
    | "last_month"
    | "this_year"
    | "last_year"
    | "this_quarter"
    | "last_quarter"
    | "last_30_days"
    | "last_90_days",
  department_id?: number
) {
  const res = await fetchPayrollReport(
    "2024-10-01",
    "2024-10-31",
    department_id
  );

  return res.data || [];
}

export async function fetchPayrollSummary() {
  const res = await fetchPayrollReport("2024-10-01", "2024-10-31");

  return res.summary as PayrollSummaryModel;
}
