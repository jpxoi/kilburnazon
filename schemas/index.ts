import { z } from "zod";

export const PromoteEmployeeFormSchema = z.object({
    percentage: z.preprocess((val) => parseFloat(val as string), z.number().min(0.01).max(100)),
});