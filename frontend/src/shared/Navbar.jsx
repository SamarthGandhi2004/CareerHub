import { Link, NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import authSlice, { setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';



const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {


    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,
        { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="bg-white p-4">
      <div className="max-w-7xl h-11 flex items-center justify-between mx-auto bg-white font-medium">
        <div onClick={()=>navigate("/")}className="text-purple-700 text-5xl  font-serif cursor-pointer">
        CareerHub                                               
        </div>


        <div className="flex items-center gap-2">
          <ul className='flex gap-5 items-center'>
            {
              user && user.role === 'recruiter' ? (
                <>
 <li className='text-purple-700 text-1xl font-normal'><Link to={"/admin/companies"}>Companies</Link></li>
 <li className='text-purple-700 text-1xl font-normal'><Link to={"/admin/jobs"}>Jobs</Link></li>
                </>

              )
                : (<>
                  <li className='text-purple-700 text-1xl font-normal'><Link to={"/"}>Home</Link></li>
                  <li className='text-purple-700 text-1xl font-normal'><Link to={"/jobs"}>Jobs</Link></li>
                  <li className='text-purple-700 text-1xl font-normal'><Link to={"/browse"}>Browse</Link></li>
                </>)}
          </ul>

          {
            !user ? (
              <>
              
                <div className='flex items-center'>
                  <NavLink to="/Login">
                    <Button className="cursor-pointer border-2 border-green-800 text-purple-700 bg-transparent hover:bg-purple-700 hover:text-white hover:border-white">
                      Login
                    </Button>
                  </NavLink>
                </div>
                <div className='flex items-center'>
                  <NavLink to="/Signup">
                    <Button className="cursor-pointer border-2 border-green-800 text-purple-700 bg-transparent hover:bg-purple-700 hover:text-white hover:border-white">
                      Signup
                    </Button>
                  </NavLink>
                </div>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-white hover:bg-white border-white hover:border-white">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className='flex gap-4 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullName}</h4>
                        <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      {
                            user && user.role === 'student' ? (<>
                             <div className="flex gap-2 w-fit items-center cursor-pointer">
                        <User2 />
                        <Button variant="link"><Link to={"/profile"}>View Profile</Link></Button>
                      </div>
                            </>):(<></>)
                      }
                     
                      <div className="flex gap-2 w-fit items-center cursor-pointer">
                        <LogOut />
                        <Button onClick={handleLogout} variant="link">Logout</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;
