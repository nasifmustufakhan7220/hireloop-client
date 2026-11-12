import type { JobPost } from "@/lib/types/jobs";

export const getJobs = async (): Promise<JobPost[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
    if(!res.ok){
        throw new Error("Failed to fetch jobs");
    }
    return res.json();
}
