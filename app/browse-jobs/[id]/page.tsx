import React from 'react';

const JobDetailsPage = async({params}:{params: Promise<{id: string}>}) => {
    const {id} = await params;
    console.log(id);
    return (
        <div>
            <h2>Job Deailts page</h2>
        </div>
    );
};

export default JobDetailsPage;