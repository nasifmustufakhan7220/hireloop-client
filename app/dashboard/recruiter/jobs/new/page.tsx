"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calendar,
  Globe,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJob } from "@/lib/actions/jobs"
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  type Job,
  type JobCategory,
  type JobType,
  type SalaryFrequency,
} from "@/lib/types/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation";

const AddJobPage = () => {

  const [job, setJob] = useState<JobType>("Full-time");
  const router = useRouter();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = new FormData(event.currentTarget);
    const form = Object.fromEntries(newFormData.entries()) as Record< string,string>;

    const data: Job = {
      jobTitle: form.jobTitle,
      companyName: form.companyName,
      jobCategory: form.jobCategory as JobCategory,
      jobType: form.jobType as JobType,

      // FormData gives: OFF = undefined, ON = the string "on"
      // So: is it "on"?  → true : false
      remoteWork: form.remoteWork === "on",
      jobLocation: form.jobLocation,
      deadline: form.deadline,
      minSalary: form.minSalary,
      maxSalary: form.maxSalary,
      salaryFrequency: form.salaryFrequency as SalaryFrequency,
      responsibilities: form.responsibilities,
      qualifications: form.qualifications,
      applicants: 10,
      status: "Active"
    };

    const result = await createJob({...data, postedAgo: "1 day ago"});
    if(result.insertedId){
      toast.add({
        title: "Job Created",
        description: "The job has been created successfully.",
      });
      router.push("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:py-8">
      {/* Breadcrumb */}
      <p className="mb-2 text-xs text-muted-foreground">
        <Link
          href="/dashboard/recruiter/jobs"
          className="hover:text-foreground hover:underline"
        >
          Manage Jobs
        </Link>
        <span className="mx-1">&rsaquo;</span>
        <span className="text-foreground">Create New Listing</span>
      </p>

      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Post a New Job
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <Button
          type="submit"
          form="add-job-form"
          className="h-10 w-full gap-2 bg-violet-600 text-white hover:bg-violet-500 sm:h-9 sm:w-auto"
        >
          Publish Job
          <ArrowRight />
        </Button>
      </div>

      <form
        id="add-job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* 1. Basic Information */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          {/* Section title */}
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500" />
            <h3 className="text-sm font-semibold">1. Basic Information</h3>
          </div>

          {/* Job title */}
          <div className="mt-5 flex flex-col gap-2">
            <Label htmlFor="job-title" className="text-xs text-muted-foreground">
              Job Title *
            </Label>
            <Input
              id="job-title"
              name="jobTitle"
              placeholder="Frontend Developer"
              required
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
                <Building2 className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="company-name"
                  name="companyName"
                  defaultValue="HirePulse Network"
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
              <Select name="jobCategory" defaultValue="engineering-tech">
                <SelectTrigger id="job-category" className="w-full h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
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
                    type === job
                      ? "cursor-pointer rounded-lg border border-violet-500 bg-violet-500/10 py-2 text-center text-sm text-violet-300 transition-colors"
                      : "cursor-pointer rounded-lg border border-input bg-transparent py-2 text-center text-sm text-muted-foreground transition-colors hover:bg-input/50"
                  }
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    checked={job === type}
                    onChange={() => setJob(type)}
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
            <Switch name="remoteWork" className="data-checked:bg-violet-600" />
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
                <MapPin className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="job-location"
                  name="jobLocation"
                  defaultValue="New York, USA"
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
                <Calendar className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  defaultValue="2025-05-30"
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
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  min={0}
                  defaultValue={25}
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
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  min={0}
                  defaultValue={40}
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
              <Select name="salaryFrequency" defaultValue="per-hour">
                <SelectTrigger id="salary-frequency" className="w-full h-9">
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
                defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction-rich products."
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
                defaultValue="• 3+ years of experience with React, TypeScript, and modern state architectures
• Solid understanding of DOM performance and component-driven designs
• Experience partnering closely with product teams and UI/UX designers"
              />
            </div>
          </div>
        </section>

        {/* Buttons at the bottom */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" size="lg">
            Save as Draft
          </Button>
          <Button
            type="submit"
            size="lg"
            className="gap-2 bg-violet-600 text-white hover:bg-violet-500"
          >
            Publish Job
            <ArrowRight />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddJobPage;
