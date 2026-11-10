type JobTypes = "Full-time" | "Part-time" | "Contract" | "Internship";
type JobStatus =  "Active" | "Paused" | "Closed";
export interface IJobsType{
    jobTitle: string;
      companyName: string;
      jobCategory: string;
      jobType: JobTypes;
      remoteWork: boolean;
      jobLocation: string;
      deadline: string;
      minSalary: string;
      maxSalary: string;
      salaryFrequency: string;
      responsibilities: string;
      qualifications: string;
      applicants?: number;
      status?: JobStatus;
      postedAgo?: string;
}

export const createJob = async (jobData: IJobsType) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
    });
    return response.json();
}


export const deleteJobs = async(jobId: string)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}`,{
        method: "DELETE",
    });

    if(!res.ok){
        throw new Error("Failed to delete job");
    }

    return res.json();
}