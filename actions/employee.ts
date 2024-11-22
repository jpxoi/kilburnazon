"use server";

import {
  EditEmployeeFormSchema,
  NewEmployeeFormSchema,
  PromoteEmployeeFormSchema,
} from "@/schemas";
import { z } from "zod";

export async function promoteEmployee(
  id: string,
  values: z.infer<typeof PromoteEmployeeFormSchema>
) {
  const validatedFields = PromoteEmployeeFormSchema.parse(values);

  if (!validatedFields) {
    return { error: "Percentage must be between 0.01 and 100" };
  }

  const { percentage } = validatedFields;

  const res = await fetch(`http://localhost:8000/api/employee/${id}/promote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ percentage }),
  });
  const data = await res.json();

  if (data.errors) {
    return { error: data.errors.percentage[0] };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: "An error occurred while promoting the employee." };
}

export async function createEmployee(
  values: z.infer<typeof NewEmployeeFormSchema>
) {
  const validatedFields = NewEmployeeFormSchema.parse(values);

  if (!validatedFields) {
    return { error: "Invalid fields. Please check your input." };
  }

  /* Generate an employee ID 8 characters long of numbers */
  const id = Math.floor(10000000 + Math.random() * 90000000).toString();
  const status = "ACTIVE";

  const parsedFields = { ...validatedFields, id, status };

  // @ts-expect-error date_of_birth is a Date object
  parsedFields.date_of_birth = parsedFields.date_of_birth
    .toISOString()
    .split("T")[0];
  // @ts-expect-error hired_date is a Date object
  parsedFields.hired_date = parsedFields.hired_date
    .toISOString()
    .split("T")[0];

  const res = await fetch(`http://localhost:8000/api/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFields),
  });
  const data = await res.json();

  if (data.errors) {
    return { error: "An error occurred while creating the employee." };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: "An error occurred while creating the employee." };
}

export async function updateEmployee(
  id: string,
  values: z.infer<typeof EditEmployeeFormSchema>
) {
  const validatedFields = EditEmployeeFormSchema.parse(values);

  if (!validatedFields) {
    return { error: "Invalid fields. Please check your input." };
  }

  validatedFields.nin = undefined;
  validatedFields.date_of_birth = undefined;

  const res = await fetch(`http://localhost:8000/api/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields),
  });
  const data = await res.json();

  if (data.errors) {
    return { error: "An error occurred while updating the employee." };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: "An error occurred while updating the employee." };
}

export async function terminateEmployee(id: string) {
  const res = await fetch(`http://localhost:8000/api/employee/${id}/terminate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (data.errors) {
    return { error: "An error occurred while terminating the employee." };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: "An error occurred while terminating the employee." };
}