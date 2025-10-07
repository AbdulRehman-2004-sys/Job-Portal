import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Delete } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBookmark, removeBookmark } from '../redux/jobSlice'
import { toast } from 'sonner'

const Job = ({ job, del,fal }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";
    console.log(job)
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const dispatch = useDispatch()

    const handleBookmark = () => {
        dispatch(addBookmark(job))
        toast.success('Saved For Later');
    }
    const handleRemoveBookmark=()=>
    {
        dispatch(removeBookmark(job))
        toast.success('Removed from Bookmark')
    }
    return (
        <div className='p-5 min-h-[55vh] rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <div className='space-x-2'>
                    <Button onClick={handleBookmark} variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
                    {del && <Button onClick={handleRemoveBookmark} variant="outline" size="icon"><Delete /></Button>}
                </div>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[var(--primary-color)] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <Button className='mt-4 w-full border border-[var(--primary-color)]' onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        </div>
    )
}

export default Job