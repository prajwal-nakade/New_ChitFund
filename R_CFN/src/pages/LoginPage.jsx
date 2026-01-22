import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { adminLogin } from '../api/endpoint'
import { toast } from 'react-toastify'
import { Eye, EyeClosed, Loader2 } from 'lucide-react'

function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [seePassword, setSeepassword] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const data = await adminLogin(formData)
            console.log(data)
            if (data.success) {
                toast.success(data.message || 'Login Success!')
                localStorage.setItem('is_superuser', data.is_superuser)
                setTimeout(() => {
                    navigate('/application-form')
                }, 2000)
            }
            else {
                toast.error('Invalid Credentials')
            }
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
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
                        <input onChange={handleChange} value={formData.username} className='w-full border border-neutral-300 px-3 py-2 rounded-md' type="text" name="username" placeholder='Enter Username Here...' />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2 w-full relative'>
                        <label>Password :</label>
                        <input onChange={handleChange} value={formData.password} className='w-full border border-neutral-300 px-3 py-2 rounded-md' type={`${seePassword ? 'text' : 'password'}`} name="password" placeholder='Enter Password Here...' />
                        <button type='button' className='absolute right-3 text-neutral-500 top-11' onClick={() => setSeepassword(!seePassword)}>
                            {seePassword ? (

                                <EyeClosed size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {loading ? (
                        <button className='bg-[#06c] mt-4 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2'><Loader2 size={18} className='animate-spin' />Letting You In...

                        </button>
                    ) : (
                        <button className='bg-[#004f9e] mt-4 text-white px-4 py-2 rounded-md'>Login

                        </button>
                    )}

                    <p className='w-full text-center justify-center'>Don't Have account ? <Link to={'/register'}>Sign Up </Link></p>
                </form>

            </div>
        </>

    )
}

export default LoginPage