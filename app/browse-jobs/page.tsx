import { getJobs } from "@/lib/api/jobs"
import React from "react"

const BrowseJobPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  const jobs = await getJobs(query)
  return (
    <div>
      <h1>Browse Jobs</h1>
      <ul>
        {
            jobs.map(j=><li key={j._id}>{j.jobTitle}</li>)
        }
        </ul>
    </div>
  )
}

export default BrowseJobPage
