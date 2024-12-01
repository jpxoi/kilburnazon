"use server";

import { NewLeaveRequestFormSchema } from "@/schemas";
import { z } from "zod";

const VALIDATION_ERROR_MESSAGE =
  "Invalid fields provided. Please check your inputs and try again.";

export async function createLeaveRequest(
  values: z.infer<typeof NewLeaveRequestFormSchema>
) {
  const validatedFields = NewLeaveRequestFormSchema.parse(values);

  if (!validatedFields) {
    return { error: VALIDATION_ERROR_MESSAGE };
  }

  const parsedFields = validatedFields;

  // @ts-expect-error date_of_birth is a Date object
  parsedFields.start_date = parsedFields.start_date.toISOString().split("T")[0];
  // @ts-expect-error hired_date is a Date object
  parsedFields.end_date = parsedFields.end_date.toISOString().split("T")[0];

  const res = await fetch(`http://localhost:8000/api/leave-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFields),
  });
  const data = await res.json();

  if (data.errors) {
    console.error(data.errors);
    const errorKeys = Object.keys(data.errors);
    for (const key of errorKeys) {
      switch (key) {
        case "employee_id":
          return { error: data.errors.employee_id[0] };
        case "start_date":
          return { error: data.errors.start_date[0] };
        case "end_date":
          return { error: data.errors.end_date[0] };
        case "leave_type_id":
          return { error: data.errors.leave_type_id[0] };
        case "status":
          return { error: data.errors.status[0] };
        default:
          return { error: VALIDATION_ERROR_MESSAGE };
      }
    }
  }

  if (data.leaveRequest) {
    return { success: true };
  }

  console.log(data)

  return { error: data.error.errorInfo[2] };
}
