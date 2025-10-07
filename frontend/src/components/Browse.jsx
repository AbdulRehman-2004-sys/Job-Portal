import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    console.log(allJobs)
    console.log(searchedQuery)

    const searchedJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase())
    );
    console.log(searchedJobs)

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-20'>
                <h1 className='font-bold text-xl mt-16 ml-4 mb-4'>Search Results ({searchedJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        searchedJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse