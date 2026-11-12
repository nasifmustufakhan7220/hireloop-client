// Shared job domain types — single source of truth for all job-related data.
// Unions are derived from const arrays so lists and types can never drift apart.

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const JOB_CATEGORIES = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design-creative", label: "Design & Creative" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "customer-support", label: "Customer Support" },
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number]["value"];

export const JOB_STATUSES = ["Active", "Paused", "Closed"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const SALARY_FREQUENCIES = ["per-hour", "per-day", "per-month", "per-year"] as const;
export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number];

export interface Job {
  _id?: string;
  jobTitle: string;
  companyName: string;
  jobCategory: JobCategory;
  jobType: JobType;
  remoteWork: boolean;
  jobLocation: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  salaryFrequency: SalaryFrequency;
  responsibilities: string;
  qualifications: string;
  applicants: number;
  status: JobStatus;
  postedAgo?: string;
}

/** A job as returned by the API, with guaranteed `_id` and `postedAgo`. */
export interface JobPost extends Job {
  _id: string;
  postedAgo: string;
}
