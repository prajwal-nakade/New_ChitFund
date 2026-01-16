import React from 'react'
import { Link, useNavigate } from 'react-router'

function LoginPage() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }
  return (
    <>    
    <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4 w-120 bg-white px-5 py-5 shadow-lg rounded-md border border-neutral-300'>
        <h1 className='text-2xl font-semibold tracking-tight leading-tight'>Login Page</h1> 
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <label>
            Username:
        </label>
        <input  className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="text" name="username" placeholder='Enter Username Here...' />
        </div>
        <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <label>Password :</label>
        <input className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="password" name="password" placeholder='Enter Password Here...' />
        </div>
        <button onClick={()=>navigate("/application-form")} className='bg-red-500 mt-4 text-white px-4 py-2 rounded-md'>Login 
            
        </button>
        <p className='w-full text-center justify-center underline'>Don't Have account ? <Link to={'/signup'}>sign up </Link></p>
        </form>
        
    </div>
    </>

  )
}

export default LoginPage