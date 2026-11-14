import { SiteNavbar } from "@/components/site-navbar"
import { getJobs } from "@/lib/api/jobs"
import { JOB_CATEGORIES, JOB_TYPES, type JobPost } from "@/lib/types/jobs"

import { FiltersSidebar } from "./_components/FiltersSidebar"
import { JobCard } from "./_components/JobCard"
import { SearchBar } from "./_components/SearchBar"
import Link from "next/link"

const BrowseJobPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const query = new URLSearchParams(search as Record<string, string>).toString()
  const jobs: JobPost[] = await getJobs(query)

  // Filter counts, computed from the fetched jobs
  const typeCounts = Object.fromEntries(
    JOB_TYPES.map((type) => [
      type,
      jobs.filter((job) => job.jobType === type).length,
    ])
  )
  const categoryCounts = Object.fromEntries(
    JOB_CATEGORIES.map(({ value }) => [
      value,
      jobs.filter((job) => job.jobCategory === value).length,
    ])
  )
  const remoteCount = jobs.filter((job) => job.remoteWork).length

  return (
    <div className="min-h-screen bg-[#010103] pt-6 pb-16">
      <SiteNavbar className="relative z-10" />

      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <FiltersSidebar
          typeCounts={typeCounts}
          categoryCounts={categoryCounts}
          remoteCount={remoteCount}
        />

        <main className="min-w-0">
          <SearchBar />

          <h1 className="mt-6 text-lg font-semibold text-foreground">
            Found {jobs.length.toLocaleString("en-US")} Professional Jobs
          </h1>

          <div className="mt-4 flex flex-col gap-3">
            {jobs.map((job) => (
              <Link href={`/browse-jobs/${job._id}`} key={job._id}>
                <JobCard job={job} />
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="mt-4 rounded-xl border border-border bg-card p-10 text-center">
              <p className="font-medium text-foreground">No jobs found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default BrowseJobPage
