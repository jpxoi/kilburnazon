import {
  BirthdayAPIResponse,
  DepartmentModel,
  EmployeeAPIResponse,
  JobRoleModel,
  LeaveRequestAPIResponse,
  LeaveTypeModel,
  LocationModel,
  PayrollReportAPIResponse,
  PayrollReportPeriod,
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
  period: PayrollReportPeriod,
  department_id?: number
) {
  const { start_date, end_date } = getPayrollPeriod(period);
  console.log(start_date, end_date);
  const res = await fetchPayrollReport(start_date, end_date, department_id);

  return res.data || [];
}

export async function fetchPayrollSummary(
  period: PayrollReportPeriod,
  department_id?: number
) {
  const { start_date, end_date } = getPayrollPeriod(period);
  const res = await fetchPayrollReport(start_date, end_date, department_id);

  return res.summary as PayrollSummaryModel;
}

export function getPayrollPeriod(period: PayrollReportPeriod) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  switch (period) {
    case "this_month":
      return {
        start_date: `${year}-${month.toString().padStart(2, "0")}-01`,
        end_date: `${year}-${month
          .toString()
          .padStart(2, "0")}-${getLastDayOfMonth(year, month)}`,
      };
    case "last_month":
      return {
        start_date: `${year}-${(month - 1).toString().padStart(2, "0")}-01`,
        end_date: `${year}-${(month - 1)
          .toString()
          .padStart(2, "0")}-${getLastDayOfMonth(year, month - 1)}`,
      };
    case "this_year":
      return {
        start_date: `${year}-01-01`,
        end_date: `${year}-12-31`,
      };
    case "last_year":
      return {
        start_date: `${year - 1}-01-01`,
        end_date: `${year - 1}-12-31`,
      };
    case "this_quarter":
      const startMonthThisQuarter = Math.floor((month - 1) / 3) * 3 + 1;
      const endMonthThisQuarter = startMonthThisQuarter + 2;
      return {
        start_date: `${year}-${startMonthThisQuarter
          .toString()
          .padStart(2, "0")}-01`,
        end_date: `${year}-${endMonthThisQuarter
          .toString()
          .padStart(2, "0")}-${getLastDayOfMonth(year, endMonthThisQuarter)}`,
      };
    case "last_quarter":
      const startMonthLastQuarter = Math.floor((month - 1) / 3) * 3 - 2;
      const endMonthLastQuarter = startMonthLastQuarter + 2;
      return {
        start_date: `${year}-${startMonthLastQuarter
          .toString()
          .padStart(2, "0")}-01`,
        end_date: `${year}-${endMonthLastQuarter
          .toString()
          .padStart(2, "0")}-${getLastDayOfMonth(year, endMonthLastQuarter)}`,
      };
    case "last_30_days":
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return {
        start_date: last30Days.toISOString().split("T")[0],
        end_date: now.toISOString().split("T")[0],
      };
    case "last_90_days":
      const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      return {
        start_date: last90Days.toISOString().split("T")[0],
        end_date: now.toISOString().split("T")[0],
      };
    default:
      return {
        start_date: `${year}-${month.toString().padStart(2, "0")}-01`,
        end_date: `${year}-${month
          .toString()
          .padStart(2, "0")}-${getLastDayOfMonth(year, month)}`,
      };
  }
}
