import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const vantaRef = useRef(null);
    useEffect(() => {

        const vantaEffect = CLOUDS({
            el: vantaRef.current,
            THREE,
            minHeight: 200.0,
            minwidth: 200.0,
            highlightColor: 0xffc300,
            midtoneColor: 0xff1f00,
            lowlightColor: 0x2d00ff,
            baseColor: 0xffebeb,
            blurFactor: 0.6,
            zoom: 1,
            speed: 1

        })
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // delay between children
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, y: -100 },
    };

   // ...existing code...
return (
    <div ref={vantaRef} className='w-full min-h-screen flex justify-center items-center px-2'>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className='flex flex-col gap-5 text-center w-full max-w-3xl mx-auto'
        >
            <motion.span
                variants={childVariants}
                className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[var(--primary-color)] font-medium text-sm sm:text-base md:text-lg'
            >
                Job Hunt Made Easy
            </motion.span>

            <motion.div className='space-y-3' variants={childVariants}>
                <h1 className='text-5xl md:text-7xl font-bold'>Get Access To </h1>
                <h2 className='text-4xl md:text-6xl font-extrabold'>
                    Your{" "}
                    <span className='text-[var(--primary-color)] bg-black px-4 sm:px-8 py-1 rounded-full inline-block'>
                        Dream Job
                    </span>
                </h2>
            </motion.div>

            <motion.div variants={childVariants} className='w-full flex justify-center items-center'>
                <p className='font-semibold text-base sm:text-lg md:text-xl w-full max-w-xl mx-auto'>
                    Empower your career journey with top job opportunities tailored just for you.
                </p>
            </motion.div>

            <motion.div
                variants={childVariants}
                className='flex w-full max-w-xl shadow-md pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white/10'
            >
                <input
                    type="text"
                    placeholder='Find your dream jobs'
                    onChange={(e) => setQuery(e.target.value)}
                    className='outline-none border-none w-full bg-transparent text-white placeholder:text-gray-300 px-2 py-2 text-sm sm:text-base'
                />
                <Button onClick={searchJobHandler} className="rounded-r-full bg-[var(--primary-color)] px-4 py-2">
                    <Search className='h-5 w-5' />
                </Button>
            </motion.div>
        </motion.div>
    </div>
)
// ...existing code...
}

export default HeroSection