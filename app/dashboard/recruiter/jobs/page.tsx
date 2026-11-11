
import React from "react"
import Link from "next/link"
import {
  CircleDot,
  CodeXml,
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
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "cn"
import { IJobsType } from "@/lib/actions/jobs"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobs } from "@/app/components/DeleteJobs"

type JobStatus = "Active" | "Paused" | "Closed"

export interface IJobPostRow extends IJobsType {
  _id: string
  postedAgo: string
}

const STATUS_STYLES: Record<JobStatus,{ badge: string; dot: string }> = {
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
}

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
}

const categoryStyle = (jobCategory: string) =>
  CATEGORY_STYLES[
    Object.keys(CATEGORY_STYLES).find((key) =>
      jobCategory.toLowerCase().includes(key)
    ) ?? "engineering"
  ] || {
    icon: CircleDot,
    chip: "bg-muted/10 text-muted-foreground",
  }

const frequencyLabel = (salaryFrequency: string) =>
  salaryFrequency.replace("per-", "").replace("month", "mo")

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const COLUMNS = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
] as const

// Status component
const StatusPill = ({ status }: { status: JobStatus }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Closed

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        style.badge
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {status ?? "Closed"}
    </span>
  )
}

// Job title and category
const JobTitleDept = ({ job }: { job: IJobPostRow }) => {
  const { icon: Icon, chip } = categoryStyle(job.jobCategory)

  return (
    <div className="flex min-w-0 items-center gap-3">
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
        <p className="truncate text-xs text-muted-foreground">
          {job.jobCategory}
        </p>
      </div>
    </div>
  )
}

// Company and location
const CompanyLocation = ({ job }: { job: IJobPostRow }) => (
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-foreground">
      {job.companyName}
    </p>

    <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
      {job.remoteWork ? (
        <Globe className="size-3.5 shrink-0" />
      ) : (
        <MapPin className="size-3.5 shrink-0" />
      )}

      <span className="truncate">
        {job.remoteWork
          ? `Remote (${job.jobLocation})`
          : job.jobLocation}
      </span>
    </div>
  </div>
)

// Applicants
const ApplicantsCount = ({
  applicants,
}: {
  applicants: number
}) => (
  <div className="flex items-center gap-2 text-sm">
    <Users className="size-4 shrink-0 text-violet-400" />
    <span className="font-medium">{applicants}</span>
    <span className="text-muted-foreground">Candidates</span>
  </div>
)

// Compensation
const Compensation = ({ job }: { job: IJobPostRow }) => (
  <div className="min-w-0">
    <p className="truncate text-sm font-medium text-foreground">
      €{job.minSalary} – €{job.maxSalary}
    </p>
    <p className="text-xs text-muted-foreground">
      {frequencyLabel(job.salaryFrequency)}
    </p>
  </div>
)

// Update button
const UpdateJobButton = ({ job }: { job: IJobPostRow }) => (
  <Link
    href={`/dashboard/recruiter/jobs/${job._id}`}
    className={cn(
      buttonVariants({ size: "sm" }),
      "h-8 gap-1.5 rounded-md bg-violet-600 px-2.5 text-xs text-white hover:bg-violet-500"
    )}
  >
    <Pencil className="size-3.5" />
    Update
  </Link>
)

// More actions dropdown
const JobActions = () => (
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
      <MoreVertical className="size-4" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem>View applicants</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

const ManageJobsPage = async () => {
  const JOB_POSTS: IJobPostRow[] = await getJobs()

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

        <span className="text-foreground">
          Job Listings &amp; Postings
        </span>
      </p>

      {/* Page Header */}
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
          <Plus className="size-4" />
          New Job Post
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="mt-6 hidden w-full overflow-hidden rounded-xl border border-border bg-card xl:block">
        <Table className="w-full table-fixed">

          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {COLUMNS.map((column, index) => (
                <TableHead
                  key={column}
                  className={cn(
                    "overflow-hidden text-xs",
                    index === 0 && "w-[19%] pl-4",
                    index === 1 && "w-[16%]",
                    index === 2 && "w-[9%]",
                    index === 3 && "w-[12%]",
                    index === 4 && "w-[12%]",
                    index === 5 && "w-[9%]",
                    index === 6 && "w-[12%]",
                    index === 7 && "w-[12%] pr-3 text-right"
                  )}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {JOB_POSTS.map((job) => (
              <TableRow key={job._id}>

                {/* Job Title */}
                <TableCell className="overflow-hidden pl-4">
                  <JobTitleDept job={job} />
                </TableCell>

                {/* Company */}
                <TableCell className="overflow-hidden">
                  <CompanyLocation job={job} />
                </TableCell>

                {/* Type */}
                <TableCell className="overflow-hidden">
                  <Badge
                    variant="secondary"
                    className="max-w-full truncate text-xs font-normal"
                  >
                    {job.jobType}
                  </Badge>
                </TableCell>

                {/* Compensation */}
                <TableCell className="overflow-hidden">
                  <Compensation job={job} />
                </TableCell>

                {/* Applicants */}
                <TableCell className="overflow-hidden">
                  <ApplicantsCount applicants={job.applicants} />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusPill status={job.status} />
                </TableCell>

                {/* Deadline */}
                <TableCell className="overflow-hidden">
                  <p className="truncate text-sm text-foreground">
                    {formatDate(job.deadline)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {job.postedAgo}
                  </p>
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-3">
                  <div className="flex items-center justify-end gap-1">
                    <UpdateJobButton job={job} />
                    <DeleteJobs job={job} />
                    <JobActions />
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= RESPONSIVE JOB CARDS ================= */}
      <div className="mt-6 flex flex-col gap-3 xl:hidden">

        {JOB_POSTS.map((job) => (
          <div
            key={job._id}
            className="min-w-0 rounded-xl border border-border bg-card p-4"
          >

            {/* Title + Actions */}
            <div className="flex items-start justify-between gap-2">
              <JobTitleDept job={job} />

              <div className="flex shrink-0 items-center gap-1">
                <UpdateJobButton job={job} />
                <JobActions />
              </div>
            </div>

            {/* Company + Location */}
            <div className="mt-3 min-w-0">
              <CompanyLocation job={job} />
            </div>

            {/* Job Type + Status */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-normal">
                {job.jobType}
              </Badge>

              <StatusPill status={job.status} />

              <div className="ml-auto">
                <ApplicantsCount applicants={job.applicants} />
              </div>
            </div>

            {/* Compensation + Deadline */}
            <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">

              <div className="min-w-0">
                <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  Compensation
                </p>

                <div className="mt-1">
                  <Compensation job={job} />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  Deadline
                </p>

                <p className="mt-1 truncate text-sm text-foreground">
                  {formatDate(job.deadline)}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {job.postedAgo}
                </p>
              </div>

            </div>

            {/* Delete Action */}
            <div className="mt-3 flex justify-end">
              <DeleteJobs job={job} />
            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {JOB_POSTS.length === 0 && (
        <div className="mt-6 rounded-xl border border-border bg-card p-10 text-center">
          <p className="font-medium">No jobs found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first job post to get started.
          </p>
        </div>
      )}

    </div>
  )
}

export default ManageJobsPage
