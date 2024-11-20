export interface EmployeeAPIResponse {
  id: number;
  name: string;
  date_of_birth: string;
  hired_date: string;
  nin: string;
  avatar_url?: string;
  notes?: string;
  status: "ACTIVE" | "TERMINATED" | "ON_LEAVE";
  EmployeeJob: EmployeeJobModel;
  EmployeeContact: EmployeeContactModel;
}

export interface EmployeeJobModel {
  id: number;
  salary: number;
  contract: "FULL_TIME" | "PART_TIME" | "FREELANCE";
  employee_id: number;
  job_role: {
    id: number;
    title: string;
    Department: {
        id: number;
        name: string;
        head_id: number;
    }
  };
  location: {
    id: number;
    name: string;
    address: string;
    city: string;
    postcode: string;
    type: "OFFICE" | "DISTRIBUTION_CENTRE" | "WAREHOUSE";
    is_active: boolean;
  };
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
