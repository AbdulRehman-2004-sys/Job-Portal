import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const navLinks = user && user.role === 'recruiter'
        ? [
            { to: "/admin/companies", label: "Companies" },
            { to: "/admin/jobs", label: "Jobs" }
        ]
        : [
            { to: "/", label: "Home" },
            { to: "/jobs", label: "Jobs" },
            { to: "/saved", label: "Bookmarks" },
        ];

    return (
        <div>
            <div className="absolute top-0 left-0 w-full z-50">
                <div className="flex items-center justify-between px-4 md:px-16 h-16">
                    <div>
                        <h1 className='text-3xl font-bold'>
                            QUIK<i className='text-[var(--primary-color)]'>JOBS</i>
                        </h1>
                    </div>
                    {/* Hamburger menu for mobile */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-12">
                        <ul className='flex font-medium items-center gap-5'>
                            {navLinks.map(link => (
                                <li key={link.to}>
                                    <Link to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button className='hover:bg-[var(--primary-color)] hover:text-white' variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-white shadow rounded-b-lg px-4 py-4">
                        <ul className="flex flex-col font-medium items-start gap-4">
                            {navLinks.map(link => (
                                <li key={link.to} className="w-full">
                                    <Link
                                        to={link.to}
                                        className="block w-full py-2"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {!user ? (
                            <div className='flex flex-col gap-2 mt-4'>
                                <Link to="/login" onClick={() => setMobileOpen(false)}>
                                    <Button className='w-full hover:bg-[var(--primary-color)] hover:text-white' variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                                    <Button className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 mt-4">
                                {user && user.role === 'student' && (
                                    <Button variant="link" className="w-full text-left" onClick={() => setMobileOpen(false)}>
                                        <Link to="/profile" className="flex items-center gap-2">
                                            <User2 /> View Profile
                                        </Link>
                                    </Button>
                                )}
                                <Button onClick={() => { setMobileOpen(false); logoutHandler(); }} variant="link" className="w-full text-left flex items-center gap-2">
                                    <LogOut /> Logout
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar