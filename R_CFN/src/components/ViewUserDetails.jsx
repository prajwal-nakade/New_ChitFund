import { X } from 'lucide-react'
import React from 'react'

const ViewUserDetails = ({ onClose, user }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop'>
            <div className='max-w-5xl mx-auto '>
                <div className='flex flex-col items-center justify-center border border-neutral-300 gap-4 w-110 lg:w-200 bg-white px-5 py-3 rounded-md'>
                    <div className='flex items-start justify-between w-full border-b border-neutral-300 bg-slate-100'>
                        <h1 className='w-full font-medium text-xl tracking-tight text-neutral-800 pb-4 px-5 py-3'>User Details</h1>
                        <button className='px-5 py-3' onClick={onClose}><X size={18} className='mt-2 text-red-500 ' /></button>
                    </div>

                    <div className="w-full border border-neutral-300 rounded-2xl overflow-y-auto max-h-[70vh]">
                        <table className="w-full rounded-sm overflow-hidden">
                            <tbody>

                                {/* FIRST NAME */}
                                <tr>
                                    <th className="w-1/3 border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Firstname
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner cursor-not-allowed">
                                            {user.firstname}
                                        </span>
                                    </td>
                                </tr>

                                {/* MIDDLE NAME */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Middlename
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.middlename || "-"}
                                        </span>
                                    </td>
                                </tr>

                                {/* LAST NAME */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Lastname
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.lastname}
                                        </span>
                                    </td>
                                </tr>

                                {/* EMAIL */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Email
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3 break-words">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.email}
                                        </span>
                                    </td>
                                </tr>

                                {/* DOB */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Date of Birth
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.dob}
                                        </span>
                                    </td>
                                </tr>

                                {/* MOBILE */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Mobile
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.mobile_no}
                                        </span>
                                    </td>
                                </tr>

                                {/* ADDRESS */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700 align-top">
                                        Address
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <textarea
                                            disabled
                                            className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner cursor-not-allowed"
                                            value={user.permanent_address}
                                        />
                                    </td>
                                </tr>

                                {/* PINCODE */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Pincode
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.pincode}
                                        </span>
                                    </td>
                                </tr>

                                {/* PAN */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        PAN Number
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner uppercase">
                                            {user.pancard_no}
                                        </span>
                                    </td>
                                </tr>

                                {/* AADHAR */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Aadhar Number
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.aadharcard_no}
                                        </span>
                                    </td>
                                </tr>

                                {/* CREATED AT */}
                                <tr>
                                    <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                        Created At
                                    </th>
                                    <td className="border-b border-l border-neutral-300 px-5 py-3">
                                        <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                            {user.created_at}
                                        </span>
                                    </td>
                                </tr>

                                {/* ───── NOMINEE SECTION ───── */}
                                {user.nominees?.length > 0 && (
                                    <>
                                        <tr>
                                            <th colSpan={2} className="px-5 py-3 font-semibold text-neutral-800 bg-slate-100 border-b border-neutral-300 text-start text-xl tracking-tight">
                                                Nominee Details
                                            </th>
                                        </tr>

                                        <tr>
                                            <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                                Nominee Name
                                            </th>
                                            <td className="border-b border-l border-neutral-300 px-5 py-3">
                                                <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                                    {user.nominees[0].firstname} {user.nominees[0].middlename} {user.nominees[0].lastname}
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                                Relationship
                                            </th>
                                            <td className="border-b border-l border-neutral-300 px-5 py-3">
                                                <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                                    {user.nominees[0].relationship}
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                                Nominee Mobile
                                            </th>
                                            <td className="border-b border-l border-neutral-300 px-5 py-3">
                                                <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                                    {user.nominees[0].mobile_no}
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th className="border-b border-neutral-300 px-5 py-3 text-left font-medium text-neutral-700">
                                                Nominee DOB
                                            </th>
                                            <td className="border-b border-l border-neutral-300 px-5 py-3">
                                                <span className="block w-full border border-neutral-300 px-3 py-1 rounded-md bg-gray-50 shadow-inner">
                                                    {user.nominees[0].dob}
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                )}

                            </tbody>

                        </table>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ViewUserDetails