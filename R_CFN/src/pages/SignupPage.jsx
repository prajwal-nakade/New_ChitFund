import React from "react";
import { Link, useNavigate } from 'react-router'

function SignupPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign up logic here
    }
  return (
    <>
    <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4 w-120 bg-white px-5 py-5 shadow-lg rounded-md border border-neutral-300'>
        <h1 className='text-2xl font-semibold tracking-tight leading-tight'>Sign Up Page</h1>
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <label>Name :</label>
            <input className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="text" name="name" placeholder="Enter Name Here..." />
        </div>
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <label>Email :</label>
            <input className='w-full border border-neutral-300 px-3 py-2 rounded-md'  type="email" name="email" placeholder="Enter Email Here..." />

        </div>
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <label>Mobile No :</label>
            <input className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="text" name="mobile" placeholder="Enter Mobile No Here..." />
        </div>

        <div className='flex flex-col items-start justify-start gap-2 w-full'>
          <label>Username:</label>
          <input className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="text" name="username" placeholder="Enter Username Here..." />
        </div>
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
          <label>Password :</label>
          <input className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="password" name="password" placeholder="Enter Password Here..." />
        </div>
        <button className="bg-[#004f9e] mt-4 text-white px-4 py-2 rounded-md ">
          Sign Up
        </button>
        <p className='w-full text-center justify-center'>Already Have account ? <Link to={'/'}>Login </Link></p>
      </form>

      
      </div>
    </>
  );
}

export default SignupPage;