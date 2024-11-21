import { z } from "zod";

const CONTRACT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "INTERNSHIP",
] as const;
const LOCATION_IDS = [
  "1001",
  "1002",
  "1003",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
] as const;
const JOB_ROLE_IDS = [
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "2001",
  "2002",
  "3001",
  "3002",
  "3003",
  "4001",
  "4002",
  "4003",
  "4004",
  "4005",
  "5001",
  "5002",
  "5003",
] as const;

export const PromoteEmployeeFormSchema = z.object({
  percentage: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0.01).max(100)
  ),
});

export const EditEmployeeFormSchema = z.object({
  name: z.string().min(1).max(255),
  date_of_birth: z
    .date()
    .refine((date) => date.getFullYear() > 1900 && date < new Date(), {
      message: "Invalid date of birth",
    }),
  hired_date: z.date().refine(
    (date) => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return date.getFullYear() > 1900 && date < nextWeek;
    },
    {
      message: "Invalid hired date",
    }
  ),
  nin: z.string().refine((val) => /^[A-Z]{2}\d{6}[A-Z]$/.test(val), {
    message: "Invalid NIN format",
  }),
  avatar_url: z.string().url().optional(),
  employee_contact: z.object({
    email: z.string().email(),
    home_address: z.string().min(1).max(255),
    emergency_name: z.string().min(1).max(255).optional(),
    emergency_relationship: z.string().min(1).max(255).optional(),
    emergency_phone: z
      .string()
      .refine((val) => /^0\d{10}$/.test(val), {
        message: "Invalid UK phone number format",
      })
      .optional(),
  }),
});

export const NewEmployeeFormSchema = z.object({
  name: z.string().min(1).max(255),
  date_of_birth: z
    .date()
    .refine((date) => date.getFullYear() > 1900 && date < new Date(), {
      message: "Invalid date of birth",
    }),
  hired_date: z.date().refine(
    (date) => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return date.getFullYear() > 1900 && date < nextWeek;
    },
    {
      message: "Invalid hired date",
    }
  ),
  nin: z.string().refine((val) => /^[A-Z]{2}\d{6}[A-Z]$/.test(val), {
    message: "Invalid NIN format",
  }),
  avatar_url: z.string().url().optional(),
  employee_job: z.object({
    location_id: z.enum(LOCATION_IDS).optional(),
    salary: z.preprocess((val) => parseFloat(val as string), z.number().min(0.01)).optional(),
    job_role_id: z.enum(JOB_ROLE_IDS),
    contract_type: z.enum(CONTRACT_TYPES),
  }),
  employee_contact: z.object({
    email: z.string().email(),
    home_address: z.string().min(1).max(255),
    emergency_name: z.string().min(1).max(255).optional(),
    emergency_relationship: z.string().min(1).max(255).optional(),
    emergency_phone: z
      .string()
      .refine((val) => /^0\d{10}$/.test(val), {
        message: "Invalid UK phone number format",
      })
      .optional(),
  }),
});
