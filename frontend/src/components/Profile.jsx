import React, { useState } from 'react';
import Navbar from '@/shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, Contact } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { UpdateProfile } from './UpdateProfile';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAppliedJobs from './hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
  const [open,setOpen]=useState(false)
const {user}=useSelector(store=>store.auth);
  const isResume = true
  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-green-700 rounded-2xl my-5 p-8 shadow-xl shadow-green-700 mt-20'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl text-purple-700'>{user?.fullName}</h1>
              <p className='text-purple-700'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className="text-right" variant="outline" onClick={()=>setOpen(true)}><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail className="text-purple-700" />
            <span className='text-purple-700'>{user.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact className="text-purple-700" />
            <span className='text-purple-700'>{user.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1 className='text-purple-700'>Skills</h1>
          <div className='flex gap-2'>{
          user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="cursor-pointer border-2 border-green-800 text-purple-700 bg-transparent hover:bg-purple-700 hover:text-white hover:border-white flex justify-center items-center h-8 w-20">{item}</Badge>) : <span>NA</span>
          }
          </div>
        </div>

        <div className='mt-4'>
          <Label className='text-purple-700'>Resume</Label>
          {
            isResume ? <a target="blank" href={user?.profile?.resume} className='text-blue-600 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }
        </div>

      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2x1 mt-14'>
        <h1>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen}/>
    </>
  );
};

export default Profile;
