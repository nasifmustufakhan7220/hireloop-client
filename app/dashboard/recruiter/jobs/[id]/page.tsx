import UpdatedForm from "@/app/_components/UpdatedForm"
import { getJobs } from "@/lib/api/jobs"
import type { JobPost } from "@/lib/types/jobs"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

const UpdatedJobsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const data = await getJobs()
  const job = data.find((j: JobPost) => j._id === id)
  if (!job) {
    notFound()
  }
  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8 mb-20">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/dashboard/recruiter/"></Link>}
              >
                Manage Jobs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/dashboard/recruiter/jobs"></Link>}
              >
                Job Listings & Postings
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Updated Job</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1>Update Job Page</h1>

      <UpdatedForm job={job} />
    </div>
  )
}

export default UpdatedJobsPage
