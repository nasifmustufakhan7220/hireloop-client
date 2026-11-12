import type { Job } from "@/lib/types/jobs";

export const createJob = async (jobData: Job) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
    });
    if(!response.ok){
        throw new Error("Failed to create job");
    }
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

export const updateJob = async(jobID: string, jobData: Job)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobID}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
    });
    if(!res.ok){
        throw new Error("Failed to update job");
    }
    return res.json();
}
