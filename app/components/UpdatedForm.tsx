"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { IJobsType, updateJob } from "@/lib/actions/jobs"
import { ArrowRight, Building2, Calendar, Globe, MapPin } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]
type JobTypes = "Full-time" | "Part-time" | "Contract" | "Internship"

const UpdatedForm = ({ job }: { job: IJobsType }) => {
  const [jobS, setJobS] = useState(job.jobType as string);
  const router = useRouter();
  const [remote, setRemote] = useState(job.remoteWork);
  const handelUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedJobData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >
    const data: IJobsType = {
      jobTitle: updatedJobData.jobTitle,
      companyName: updatedJobData.companyName,
      jobCategory: updatedJobData.jobCategory,
      jobType: updatedJobData.jobType as JobTypes,
      remoteWork: updatedJobData.remoteWork === "on" ? true : false,
      jobLocation: updatedJobData.jobLocation,
      deadline: updatedJobData.deadline,
      minSalary: updatedJobData.minSalary,
      maxSalary: updatedJobData.maxSalary,
      salaryFrequency: updatedJobData.salaryFrequency,
      responsibilities: updatedJobData.responsibilities,
      qualifications: updatedJobData.qualifications,
      applicants: job.applicants,
      status: job.status,
    }

    const result = await updateJob(job._id as string, data);
    if(result.matchedCount > 0){
      toast.add({
        title: "Job Updated",
        description: "The job has been updated successfully.",
      });
      router.refresh();
    }
  }
  return (
    <div>
      <form className="space-y-4" onSubmit={handelUpdateSubmit}>
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          {/* Section title */}
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500" />
            <h3 className="text-sm font-semibold">1. Basic Information</h3>
          </div>

          {/* Job title */}
          <div className="mt-5 flex flex-col gap-2">
            <Label
              htmlFor="job-title"
              className="text-xs text-muted-foreground"
            >
              Job Title *
            </Label>
            <Input
              id="job-title"
              name="jobTitle"
              placeholder="Frontend Developer"
              required
              defaultValue={job.jobTitle}
            />
          </div>

          {/* Company name + job category (2 columns on tablet) */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="company-name"
                className="text-xs text-muted-foreground"
              >
                Company Name *
              </Label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="company-name"
                  name="companyName"
                  defaultValue={job.companyName}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="job-category"
                className="text-xs text-muted-foreground"
              >
                Job Category *
              </Label>
              <Select name="jobCategory" defaultValue={job.jobCategory}>
                <SelectTrigger id="job-category" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering-tech">
                    Engineering &amp; Tech
                  </SelectItem>
                  <SelectItem value="design-creative">
                    Design &amp; Creative
                  </SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="customer-support">
                    Customer Support
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job type (2 columns on mobile, 4 columns on tablet) */}
          <div className="mt-4 flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Job Type *</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className={
                    // Highlight the selected one
                    type === jobS
                      ? "cursor-pointer rounded-lg border border-violet-500 bg-violet-500/10 py-2 text-center text-sm text-violet-300 transition-colors"
                      : "cursor-pointer rounded-lg border border-input bg-transparent py-2 text-center text-sm text-muted-foreground transition-colors hover:bg-input/50"
                  }
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    checked={jobS === type}
                    onChange={() => setJobS(type)}
                    className="sr-only"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          {/* Section title */}
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500" />
            <h3 className="text-sm font-semibold">
              2. Location, Compensation &amp; Timeline
            </h3>
          </div>

          {/* Remote work banner with switch */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                <Globe className="size-4 text-violet-400" />
              </span>
              <div>
                <p className="text-sm font-medium">
                  Remote Work Allowed{" "}
                  <span className="text-violet-400">(Remote)</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide work or distributed-candidate applications
                </p>
              </div>
            </div>
            <Switch
              name="remoteWork"
              checked={remote}
              onCheckedChange={setRemote}
              className="data-checked:bg-violet-600"
            />
          </div>

          {/* Job location + deadline */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <Label
                  htmlFor="job-location"
                  className="text-xs text-muted-foreground"
                >
                  Job Location
                </Label>
                <span className="text-xs text-muted-foreground/80">
                  Required
                </span>
              </div>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="job-location"
                  name="jobLocation"
                  defaultValue={job.jobLocation}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="deadline"
                className="text-xs text-muted-foreground"
              >
                Application Deadline
              </Label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  defaultValue={job.deadline}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Salary fields (1 on mobile, 2 on tablet, 3 rows on desktop) */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="min-salary"
                className="text-xs text-muted-foreground"
              >
                Min Salary / Rate
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  min={0}
                  defaultValue={job.minSalary}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="max-salary"
                className="text-xs text-muted-foreground"
              >
                Max Salary / Rate
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  min={0}
                  defaultValue={job.maxSalary}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="salary-frequency"
                className="text-xs text-muted-foreground"
              >
                Frequency
              </Label>
              <Select name="salaryFrequency" defaultValue={job.salaryFrequency}>
                <SelectTrigger id="salary-frequency" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per-hour">per hour</SelectItem>
                  <SelectItem value="per-day">per day</SelectItem>
                  <SelectItem value="per-month">per month</SelectItem>
                  <SelectItem value="per-year">per year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          {/* Section title */}
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500" />
            <h3 className="text-sm font-semibold">
              3. Responsibilities &amp; Requirements
            </h3>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="responsibilities"
                className="text-xs text-muted-foreground"
              >
                Key Responsibilities *
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={5}
                defaultValue={job.responsibilities}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="qualifications"
                className="text-xs text-muted-foreground"
              >
                Qualifications &amp; Requirements *
              </Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                rows={5}
                defaultValue={job.qualifications}
              />
            </div>
          </div>
        </section>
        <Button
          type="submit"
          size="lg"
          className="gap-2 bg-violet-600 text-white hover:bg-violet-500"
        >
          Update Job
          <ArrowRight />
        </Button>
      </form>
    </div>
  )
}

export default UpdatedForm
