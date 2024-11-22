"use server";

import {
  EditEmployeeFormSchema,
  NewEmployeeFormSchema,
  PromoteEmployeeFormSchema,
} from "@/schemas";
import { z } from "zod";

const VALIDATION_ERROR_MESSAGE =
  "Invalid fields provided. Please check your inputs and try again.";

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

  return { error: data.error.errorInfo[2] };
}

export async function createEmployee(
  values: z.infer<typeof NewEmployeeFormSchema>
) {
  const validatedFields = NewEmployeeFormSchema.parse(values);

  if (!validatedFields) {
    return { error: VALIDATION_ERROR_MESSAGE };
  }

  const status = "ACTIVE";

  const parsedFields = { ...validatedFields, status };

  // @ts-expect-error date_of_birth is a Date object
  parsedFields.date_of_birth = parsedFields.date_of_birth
    .toISOString()
    .split("T")[0];
  // @ts-expect-error hired_date is a Date object
  parsedFields.hired_date = parsedFields.hired_date.toISOString().split("T")[0];

  const res = await fetch(`http://localhost:8000/api/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFields),
  });
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    return {
      error: VALIDATION_ERROR_MESSAGE,
    };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: data.error.errorInfo[2] };
}

export async function updateEmployee(
  id: string,
  values: z.infer<typeof EditEmployeeFormSchema>
) {
  const validatedFields = EditEmployeeFormSchema.parse(values);

  if (!validatedFields) {
    return { error: VALIDATION_ERROR_MESSAGE };
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
    console.error(data.errors);
    return {
      error: VALIDATION_ERROR_MESSAGE,
    };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: data.error.errorInfo[2] };
}

export async function terminateEmployee(id: string) {
  const res = await fetch(
    `http://localhost:8000/api/employee/${id}/terminate`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    return {
      error: VALIDATION_ERROR_MESSAGE,
    };
  }

  if (data.employee) {
    return { success: true };
  }

  return { error: data.error.errorInfo[2] };
}
