import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/types/jobs"

import { FilterSingleSelectGroup } from "./FilterSingleSelectGroup"

type FiltersSidebarProps = {
  /** Number of jobs per job type, keyed by type. */
  typeCounts: Record<string, number>
  /** Number of jobs per job category, keyed by category value. */
  categoryCounts: Record<string, number>
  /** Number of jobs that allow remote work. */
  remoteCount: number
}

export function FiltersSidebar({
  typeCounts,
  categoryCounts,
  remoteCount,
}: FiltersSidebarProps) {

  const jobTypeOptions = JOB_TYPES.map((type) => ({
    value: type,
    label: type,
    count: typeCounts[type],
  }))

  const jobCategoryOptions = JOB_CATEGORIES.map((category) => ({
    value: category.value,
    label: category.label,
    count: categoryCounts[category.value],
  }))

  // Work mode is a boolean on the Job type (remoteWork), so it has one option.
  // As a single-select group it behaves like a checkbox: select on first
  // click, clear on a second click.
  const workModeOptions = [
    {
      value: "true",
      label: "Remote only",
      count: remoteCount,
    },
  ]

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
      <h2 className="text-base font-semibold text-foreground">Filters</h2>

      <div className="mt-5 flex flex-col gap-5">
        <FilterSingleSelectGroup
          title="Job Type"
          name="jobType"
          options={jobTypeOptions}
        />

        <FilterSingleSelectGroup
          title="Job Category"
          name="jobCategory"
          options={jobCategoryOptions}
        />

        <FilterSingleSelectGroup
          title="Work Mode"
          name="remoteWork"
          options={workModeOptions}
        />
      </div>
    </aside>
  )
}
