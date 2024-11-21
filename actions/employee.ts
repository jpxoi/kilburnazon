"use server";

import { PromoteEmployeeFormSchema } from "@/schemas";
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
