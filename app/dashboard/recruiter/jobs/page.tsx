import React from "react";
import Link from "next/link";
import {
  CircleDot,
  CodeXml,
  EllipsisVertical,
  Globe,
  MapPin,
  Megaphone,
  MoreVertical,
  PenTool,
  Pencil,
  Plus,
  ServerCog,
  Settings,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "cn";
import { IJobsType } from "@/lib/actions/jobs";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobs } from "@/app/components/DeleteJobs";

type JobStatus = "Active" | "Paused" | "Closed";

export interface IJobPostRow extends IJobsType {
  _id: string;
  applicants: number;
  status: JobStatus;
  postedAgo: string;
}

const STATUS_STYLES: Record<JobStatus, { badge: string; dot: string }> = {
  Active: {
    badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  Paused: {
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
  },
  Closed: {
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

const CATEGORY_STYLES: Record<string,{ icon: React.ElementType; chip: string }> = {
  engineering: {
    icon: CodeXml,
    chip: "bg-violet-500/10 text-violet-400",
  },
  infrastructure: {
    icon: ServerCog,
    chip: "bg-rose-500/10 text-rose-400",
  },
  design: {
    icon: PenTool,
    chip: "bg-orange-500/10 text-orange-400",
  },
  marketing: {
    icon: Megaphone,
    chip: "bg-cyan-500/10 text-cyan-400",
  },
  quality: {
    icon: Settings,
    chip: "bg-emerald-500/10 text-emerald-400",
  },
};

const categoryStyle = (jobCategory: string) => CATEGORY_STYLES[Object.keys(CATEGORY_STYLES).find(key=>jobCategory.toLowerCase().includes(key)) ?? "engineering"] || { icon: CircleDot, chip: "bg-muted/10 text-muted-foreground"};

const frequencyLabel = (salaryFrequency: string) =>salaryFrequency.replace("per-", "").replace("month", "mo");

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});


  
const COLUMNS = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
] as const;

const StatusPill = ({ status }: { status: JobStatus }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Closed;
  return (
    <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
          style.badge
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {status ?? "Closed"}
    </span>
  );
};

/** Compact title + department cell content, shared by table and cards. */
const JobTitleDept = ({ job }: { job: IJobPostRow }) => {
  const { icon: Icon, chip } = categoryStyle(job.jobCategory);
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md",
          chip
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {job.jobTitle}
        </p>
        <p className="text-xs text-muted-foreground">{job.jobCategory}</p>
      </div>
    </div>
  );
};

/** Company + location cell content. */
const CompanyLocation = ({ job }: { job: IJobPostRow }) => (
  <div>
    <p className="text-sm font-medium text-foreground">{job.companyName}</p>
    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
      {job.remoteWork ? (
        <Globe className="size-3.5 shrink-0" />
      ) : (
        <MapPin className="size-3.5 shrink-0" />
      )}
      <span className="truncate">
        {job.remoteWork ? `Remote (${job.jobLocation})` : job.jobLocation}
      </span>
    </div>
  </div>
);

const ManageJobsPage = async() => {
  const JOB_POSTS: IJobPostRow[] = await getJobs();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Breadcrumb */}
      <p className="mb-1 text-xs text-muted-foreground">
        <Link
          href="/dashboard/recruiter/jobs"
          className="hover:text-foreground hover:underline"
        >
          Manage Jobs
        </Link>
        <span className="mx-1">&rsaquo;</span>
        <span className="text-foreground">Job Listings &amp; Postings</span>
      </p>

      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full gap-2 bg-violet-600 text-white hover:bg-violet-500 sm:w-auto"
          )}
        >
          <Plus className="size-4!" />
          New Job Post
        </Link>
      </div>

      {/* ================= Desktop / tablet table ================= */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {COLUMNS.map((column, index) => (
                <TableHead
                  key={column}
                  className={cn(index === 0 && "pl-4 sm:pl-5",column === "Actions" && "pr-4 text-right sm:pr-5" )}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {JOB_POSTS.map((job) => (
              <TableRow key={job._id}>
                {/* Job title & dept */}
                <TableCell className="pl-4 sm:pl-5">
                  <JobTitleDept job={job} />
                </TableCell>

                {/* Company & location */}
                <TableCell>
                  <CompanyLocation job={job} />
                </TableCell>

                {/* Type */}
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {job.jobType}
                  </Badge>
                </TableCell>

                {/* Compensation */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    €{job.minSalary} – €{job.maxSalary}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    / {frequencyLabel(job.salaryFrequency)}
                  </span>
                </TableCell>

                {/* Applicants */}
                <TableCell>
                  <span className="flex items-center gap-2 text-sm">
                    <Users className="size-4 shrink-0 text-violet-400" />
                    <span className="font-medium">{job.applicants}</span>
                    <span className="text-muted-foreground">Candidates</span>
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusPill status={job.status} />
                </TableCell>

                {/* Deadline */}
                <TableCell>
                  <p className="text-sm text-foreground">
                    {formatDate(job.deadline)}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs",
                      job.status === "Closed"
                        ? "text-muted-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {job.postedAgo}
                  </p>
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-4 text-right sm:pr-5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="sm"
                      className="h-7 gap-1.5 rounded-md bg-violet-600 px-2.5 text-xs text-white hover:bg-violet-500"
                    >
                      <Pencil className="size-3.5!" />
                      Update
                    </Button>

                    <DeleteJobs job={job} />

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="More actions"
                            className="text-muted-foreground hover:text-foreground"
                          />
                        }
                      >
                        <MoreVertical className="size-4!" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View applicants</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>


                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= Mobile stacked cards ================= */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {JOB_POSTS.map((job) => {
          return (
            <div
              key={job._id}
              className="rounded-xl border border-border bg-card p-4"
            >
              {/* Title + actions */}
              <div className="flex items-start justify-between gap-2">
                <JobTitleDept job={job} />
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="More actions"
                        className="-mt-1 -mr-1 text-muted-foreground hover:text-foreground"
                      />
                    }
                  >
                    <EllipsisVertical className="size-4!" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View applicants</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Company + location */}
              <div className="mt-3">
                <CompanyLocation job={job} />
              </div>

              {/* Type / status / applicants */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-normal">
                  {job.jobType}
                </Badge>
                <StatusPill status={job.status} />
                <span className="ml-auto flex items-center gap-2 text-sm">
                  <Users className="size-4 shrink-0 text-violet-400" />
                  <span className="font-medium">{job.applicants}</span>
                  <span className="text-muted-foreground">Candidates</span>
                </span>
              </div>

              {/* Compensation / deadline */}
              <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
                <div>
                  <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                    Compensation
                  </p>
                  <p className="mt-0.5 text-sm">
                    <span className="font-medium text-foreground">
                      €{job.minSalary} – €{job.maxSalary}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / {frequencyLabel(job.salaryFrequency)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                    Deadline
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {formatDate(job.deadline)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {job.postedAgo}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 flex-1 gap-1.5 bg-violet-600 text-white hover:bg-violet-500"
                >
                  <Pencil className="size-3.5!" />
                  Update
                </Button>

                <DeleteJobs job={job} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageJobsPage;
