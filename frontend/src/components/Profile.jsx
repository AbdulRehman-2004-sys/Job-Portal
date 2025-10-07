import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 mt-16 sm:p-8'>
                <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <div className="h-24 w-24 rounded-full border overflow-hidden">
                            <img className='object-cover object-center w-full h-full' src={user.profile.profilePhoto} alt="profile" />
                        </div>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-lg sm:text-xl'>{user?.fullname}</h1>
                            <p className='text-sm sm:text-base'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="self-center sm:self-start" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex flex-col sm:flex-row items-center gap-3 my-2'>
                        <Mail />
                        <span className='break-all'>{user?.email}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-semibold'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer break-all'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl mt-4'>
                <h1 className='font-bold text-lg my-5 px-4'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile