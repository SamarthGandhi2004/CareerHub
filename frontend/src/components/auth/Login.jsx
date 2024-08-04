import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup } from '../ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const[input,setInput]=useState({
   
    email:"",

    password:"",
    role:"",

  })

  const eventHandler=(e)=>{
setInput({...input,[e.target.name]:e.target.value});
  }
  const fileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]});
      }
     const navigate=useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`${USER_API_END_POINT}/login`,formData,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4 p-4 max-w-lg mx-auto mt-[6rem] border border-gray-600 rounded-md"  >

      <div className="flex flex-col">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          value={Input.email}
          name="email"
          placeholder="john@gmail.com"
          onChange={eventHandler}
          required
          className="mt-2"
        />
      </div>

      
      <div className="flex flex-col">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={Input.password}
          name="password"
          placeholder="********"
          onChange={eventHandler}
          required
          className="mt-2"
        />
      </div>

      <div className="flex flex-col">
        <Label>Role</Label>
        <RadioGroup name="role" className="space-y-1 mt-5">
          <div className="flex items-center">
            <input
              type="radio"
              checked={input.role === 'student'}
              name="role"
              value="student"
              onChange={eventHandler}
            />
            <Label htmlFor="student" className="ml-2">Student</Label>
          </div>
          <div className="flex items-center mt-1">
            <input
              type="radio"
              checked={input.role === 'recruiter'}
              name="role"
              value="recruiter"
              onChange={eventHandler}
            />
            <Label htmlFor="recruiter" className="ml-2">Recruiter</Label>
          </div>
        </RadioGroup>
      </div>
      

      <div>
        <Button
          type="submit"
          className="w-full bg-green-800 text-white hover:bg-green-700"
        >
          Login
        </Button>
        <span className='text-sm'>don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
      </div>
    </form>
  );
};

export default Login;
