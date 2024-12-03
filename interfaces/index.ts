import { UUID } from "crypto";

/* DB Models */
export interface EmployeeModel {
  id: number;
  name: string;
  date_of_birth: string;
  hired_date: string;
  nin: string;
  avatar_url?: string;
  notes?: string;
  status: "ACTIVE" | "TERMINATED" | "ON_LEAVE";
}

export interface EmployeeJobModel {
  id: number;
  location_id?: number;
  salary?: number;
  job_role_id: number;
  contract: "FULL_TIME" | "PART_TIME" | "FREELANCE";
  employee_id: number;
}

export interface EmployeeContactModel {
  id: number;
  employee_id: number;
  email: string;
  home_address: string;
  emergency_name?: string;
  emergency_relationship?: string;
  emergency_phone?: string;
  is_primary: boolean;
}

export interface JobRoleModel {
  id: number;
  title: string;
  department_id: number;
}

export interface DepartmentModel {
  id: number;
  name: string;
  head_id?: number;
}

export interface LocationModel {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  type: "OFFICE" | "DISTRIBUTION_CENTRE" | "WAREHOUSE";
  is_active: boolean;
}

export interface EmployeeBirthdayModel extends EmployeeModel {
  this_year_birthday: string;
  turns_age: number;
}

export interface BirthdayAPIResponse {
  past: EmployeeBirthdayModel[];
  upcoming: EmployeeBirthdayModel[];
}

export interface EmployeeAPIResponse extends EmployeeModel {
  employee_job: EmployeeJobModel & {
    job_role: JobRoleModel & {
      department: DepartmentModel;
    };
    location?: LocationModel;
  };
  employee_contact: EmployeeContactModel;
}

export interface TerminationLogAPIResponse {
  id: number;
  employee_id: number;
  employee: EmployeeModel;
  terminated_reason: string;
  terminated_by: string;
  last_position_id: number;
  job_role: JobRoleModel;
  last_salary: number;
  termination_timestamp: string;
  retention_timestamp: string;
}

export interface LeaveTypeModel {
  id: number;
  name: string;
  description: string;
  paid: boolean;
  max_days_per_year: number;
}

export interface LeaveRequestModel {
  id: number;
  employee_id: number;
  leave_type_id: number;
  start_date: string;
  end_date: string;
  comments: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaveRequestAPIResponse extends LeaveRequestModel {
  employee: EmployeeModel;
  leave_type: LeaveTypeModel;
  total_days: number;
}

export interface PayrollPeriodModel {
  id: UUID;
  start_date: string;
  end_date: string;
  status: "DRAFT" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  created_at: string;
}

export interface PayrollEntryModel {
  id: number;
  employee_id: number;
  period_id: UUID;
  base_salary: number;
  bonus: number;
  overtime: number;
  tax_deduction: number;
  insurance_deduction: number;
  retirement_contribution: number;
  other_deductions: number;
  net_pay: number;
  processed_at: string;
  employee: EmployeeModel & {
    employee_job: EmployeeJobModel & {
      job_role: JobRoleModel & {
        department: DepartmentModel;
      };
    };
  };
  payroll_period: PayrollPeriodModel;
}

export interface PayrollSummaryModel {
  total_payroll: number;
  average_salary: number;
  total_retentions: number;
  average_retentions: number;
}

export interface PayrollReportAPIResponse {
  data: PayrollEntryModel[];
  summary: PayrollSummaryModel;
}

export type PayrollReportPeriod =
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_year"
  | "this_quarter"
  | "last_quarter"
  | "last_30_days"
  | "last_90_days";
