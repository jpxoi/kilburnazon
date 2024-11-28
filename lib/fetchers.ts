import { BirthdayAPIResponse, DepartmentModel, EmployeeAPIResponse, JobRoleModel, LocationModel, TerminationLogAPIResponse } from "@/interfaces";

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