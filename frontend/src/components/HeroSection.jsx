import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  return (
   <>
    <div className="relative bg-purple-700">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
          Access exclusive job listings
            <br className="hidden md:block" />
            tailored specifically {' '}
            <span className="relative inline-block px-2">
              <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400" />
              <span className="relative text-yellow-300">to your industry.</span>
            </span>
          </h2>
          <p className="mb-6 text-base text-indigo-100 md:text-sm">
  Welcome to CareerHub, your ultimate destination for finding the perfect job.
  Whether you are looking for a new career opportunity or aiming to hire top talent,
  our platform connects job seekers with employers across various industries.
  Explore thousands of job listings, access valuable career resources, and take the next step in your professional journey with us.
</p>

<form className='flex w-[80%] shadow-lg border-none pl-3 rounded-full items-center gap-0 mx-auto'>
  <input
    type="text"
    placeholder='Find your dream jobs'
    onChange={(e) => setQuery(e.target.value)}
    className='outline-none border-none w-full rounded-l-full h-12 px-4 '
  />
  <Button onClick={searchJobHandler} className="rounded-r-full bg-yellow-300 h-12 flex items-center justify-center px-4 w-20 hover:bg-yellow-400">
    <Search className='h-5 w-5  text-purple-700' />
  </Button>
</form>

          <p className="max-w-md mb-10 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-16">
          "Find your next opportunity. Search for jobs by title, company, or location to kickstart your career journey today!"
          </p>
       
        </div>
      </div>
    </div></>
  )
}

export default HeroSection