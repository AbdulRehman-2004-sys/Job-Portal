import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)

  const trendingJobs = allJobs?.slice(0, 6) || []

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        <span className="text-white bg-[var(--primary-color)] py-1 px-4 sm:px-6 rounded-full mr-2 sm:mr-3">
          Trending
        </span>
        Jobs Opening
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {trendingJobs.length === 0 ? (
          <span className="text-gray-600 col-span-full">No Job Available</span>
        ) : (
          trendingJobs.map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  )
}

export default LatestJobs
