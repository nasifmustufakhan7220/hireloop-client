import type { JobPost } from "@/lib/types/jobs";

export const getJobs = async (query: string = ""): Promise<JobPost[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs${query ? `?${query}` : ""}`);
    if(!res.ok){
        throw new Error("Failed to fetch jobs");
    }
    return res.json();
}
