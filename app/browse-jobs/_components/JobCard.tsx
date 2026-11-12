import { Banknote, CircleDot, Clock, type LucideIcon } from "lucide-react"

import type { JobPost } from "@/lib/types/jobs"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<JobPost["status"], string> = {
  Active: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  Paused: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  Closed: "border-border bg-muted text-muted-foreground",
}

function JobChip({
  icon: Icon,
  className,
  children,
}: {
  icon: LucideIcon
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs whitespace-nowrap text-muted-foreground",
        className
      )}
    >
      <Icon className="size-3 shrink-0" />
      {children}
    </span>
  )
}

export function JobCard({ job }: { job: JobPost }) {
  return (
    <article className="flex min-w-0 gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      {/* Company logo placeholder */}
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-lg font-bold text-muted-foreground">
        {job.companyName.charAt(0).toUpperCase()}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-foreground">
          {job.jobTitle}
        </h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {job.companyName} &bull; {job.jobLocation}
          {job.remoteWork && " (Remote)"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <JobChip icon={Banknote}>
            &euro;{job.minSalary} &ndash; &euro;{job.maxSalary} /{" "}
            {job.salaryFrequency.replace("per-", "")}
          </JobChip>
          <JobChip icon={Clock}>{job.jobType}</JobChip>
          <JobChip icon={CircleDot} className={STATUS_STYLES[job.status]}>
            {job.status}
          </JobChip>
        </div>
      </div>
    </article>
  )
}
