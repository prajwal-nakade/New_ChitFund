import { BookUser, SquarePen, Trash } from 'lucide-react'
import React from 'react'
import dayjs from 'dayjs';

const UserManagement = ({data}) => {
  return (
    <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg">
      <div className='flex items-center justify-between w-full'>
            <h2 className="text-lg font-medium mb-4 tracking-tight text-neutral-800">User Management</h2>
            <div>
                <input type="text" className='border border-neutral-300 shadow-sm text-neutral-800 text-sm px-3 py-1 placeholder:text-sm rounded-md w-64' placeholder='Search User by name' />
                {/* <button>Search</button> */}
            </div>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="w-full border border-neutral-300 text-sm rounded-md overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Sr.No.</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Name</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Mobile No</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Email</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">D.O.B</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Address</th> 
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Created at</th>
              <th className="border border-neutral-300 text-neutral-800 font-medium p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-neutral-300 p-2 text-center">{index + 1}</td>
                <td className="border border-neutral-300 p-2">
                    <div className='flex items-center gap-1 justify-center'>
                        <span>{item.firstname}</span>
                        <span>{item.middlename}</span>
                        <span>{item.lastname}</span>
                    </div>
                </td>
                <td className="border border-neutral-300 text-center p-2">{item.mobile_no}</td>
                <td className="border border-neutral-300 text-center p-2">{item.email}</td>
                <td className="border border-neutral-300 text-center p-2">{item.dob}</td>
                <td className="border border-neutral-300 text-center p-2">{item.permanent_address}</td>
                <td className="border border-neutral-300 text-center p-2">{dayjs(item.created_at).format('DD MMM YYYY')}</td>
                {/* <td className="border p-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                    {item.status}
                  </span>
                </td> */}
                <td className="border border-neutral-300 p-2">
                    <div className='flex items-center justify-center gap-2'>
                        <button className='p-1 bg-yellow-500 rounded-sm hover:bg-yellow-600 transition-colors duration-300 cursor-pointer relative group'><SquarePen size={16}/>
                        <span className='absolute -top-7 -left-3 rounded-md text-xs bg-neutral-800 text-white px-4 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>Edit</span>
                        </button>
                        <button className='relative group  p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors duration-300 cursor-pointer'><Trash size={16}/>
                        <span className='absolute text-white bg-black -top-7 -left-3 px-3 py-0.5 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200'>Delete</span>
                        </button>
                        <button className='relative group p-1 bg-slate-400 text-white rounded-sm hover:bg-slate-500 transition-colors duration-300 cursor-pointer'><BookUser size={16}/>
                        <span className='absolute -top-7 -left-3 text-xs px-3 py-0.5 text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                            View
                        </span>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement