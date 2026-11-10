export const getJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
    if(!res.ok){
        throw new Error("Failed to fetch jobs");
    }
    return res.json();
}