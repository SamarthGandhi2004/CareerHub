import React from 'react';
import NewJobCard from './NewJobCard';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const NewJobs = () => {
    const {allJobs}=useSelector(store=>store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-purple-700'>New Openings &</span> Top-Rated Vacancies
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                   allJobs?.length<=0?<span>NO jobs Available</span> : allJobs?.slice(0, 6).map((job) => (
                        <NewJobCard key={job._id} job={job} />
                    ))
                }
            </div>
        </div>
    );
}

export default NewJobs;
