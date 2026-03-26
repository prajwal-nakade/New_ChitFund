import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout'
import { BrushCleaning, Loader2, Search, X } from 'lucide-react'
import { createChit, getUserEntries } from '../api/endpoint'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const CustomerApplication = () => {
  const [loading, setLoading] = useState(false)
  const { userData, branchData, fetchBranchData, allchitData, fetchChitsData, fetchUserEntriesData } = useContext(UserContext)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [selectedUserID, setSelectedUserID] = useState(null)
  const [selectedApplicatioID, setSelectedApplicationID] = useState(null)
  const [userApplications, setUserApplication] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchBranchData()
    fetchChitsData()
    fetchUserEntriesData()
  }, [])

  const handleSearch = (value) => {
    setSearch(value)
    if (!value.trim()) {
      setData([])
      return
    }
    const keyword = value.trim().toLowerCase()
    const filtered = userData.filter((f) =>
      String(f?.CustomerID || "").toLowerCase().includes(keyword) ||
      f?.mobile_no.toLowerCase().includes(keyword) ||
      f?.firstname.toLowerCase().includes(keyword) ||
      f?.lastname.toLowerCase().includes(keyword)
    )
    setData(filtered)
  }

  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", mobile: "", dob: "", email: "", address: "", pincode: "", pan: "", aadhar: "",
  });

  const [nomineeData, setNomineeData] = useState({
    nominee_firstname: "", nominee_middlename: "", nominee_lastname: "", relationship: "", nomineeDob: "", nomineeMobile: "",
  });

  const [chitData, setChitData] = useState({
    ByLawsNumber: "", BylawsDate: "", GroupCode: "", TicketNmber: "", ChitValue: "", Duration: "", DurationCategory: "", branch: ""
  })

  const handleChitChange = (e) => {
    const { name, value } = e.target
    setChitData(prev => ({ ...prev, [name]: value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({ ...prev, [name]: value }));
  };

  const autofillUser = (user) => {
    setSelectedUserID(user.id)
    setFormData({
      firstName: user.firstname || "",
      middleName: user.middlename || "",
      lastName: user.lastname || "",
      mobile: user.mobile_no || "",
      email: user.email === null ? 'N/A' : user.email || "",
      dob: user.dob || "",
      address: user.permanent_address || "",
      pincode: user.pincode || "",
      pan: user.pancard_no || "",
      aadhar: user.aadharcard_no || ""
    })
    setNomineeData({
      nominee_firstname: user.nominees[0]?.firstname || "",
      nominee_middlename: user.nominees[0]?.middlename || "",
      nominee_lastname: user.nominees[0]?.lastname || "",
      relationship: user.nominees[0]?.relationship || "",
      nomineeDob: user.nominees[0]?.dob || "",
      nomineeMobile: user.nominees[0]?.mobile_no || "",
    })
    const application = allchitData.filter(chit => chit.user === user.id || chit.user?.id === user.id)
    setUserApplication(application)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (!selectedUserID) {
        toast.error('Please Select User')
      } else {
        const payload = { ...chitData, user: selectedUserID }
        const data = await createChit(payload)
        toast.success(`Chit created successfully with Application ID: ${data.application_id}`)
        setTimeout(() => { navigate(`/chit/print/${data.id}`) }, 2000)
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const autoFillChitDetails = (chit) => {
    setSelectedApplicationID(chit.application_id)
    setChitData({
      ByLawsNumber: chit.ByLawsNumber || "",
      BylawsDate: chit.BylawsDate || "",
      GroupCode: chit.GroupCode || "",
      TicketNmber: chit.TicketNmber || "",
      ChitValue: chit.ChitValue || "",
      Duration: chit.Duration || "",
      DurationCategory: chit.DurationCategory || "",
      branch: chit.branch || ""
    })
  }

  const resetInput = () => {
    setChitData({ ByLawsNumber: "", BylawsDate: "", GroupCode: "", TicketNmber: "", ChitValue: "", Duration: "", DurationCategory: "", branch: "" })
    setNomineeData({ nominee_firstname: "", nominee_middlename: "", nominee_lastname: "", relationship: "", nomineeDob: "", nomineeMobile: "" })
    setFormData({ firstName: "", middleName: "", lastName: "", mobile: "", dob: "", email: "", address: "", pincode: "", pan: "", aadhar: "" })
    setSelectedApplicationID(null)
    setSearch("")
    setUserApplication([])
  }

  // Common Table Classes
  const labelCell = "bg-gray-50 border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 w-1/3";
  const inputCell = "border border-neutral-300 px-3 py-1 w-2/3 text-sm";

  return (
    <Layout>
      <div className="mx-auto rounded-md p-6">
        <h1 className='text-xl font-medium tracking-tight text-white bg-[#004f9e] py-2 rounded-t-md px-5'>Application Form</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-b-md border border-neutral-300 overflow-hidden">
          
          {/* SEARCH & RESET SECTION */}
          <div className='p-3 border-b border-neutral-200 bg-slate-50 flex flex-col lg:flex-row items-center gap-4'>
            <div className="relative group flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-500" />
              <input
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
                type="text"
                className="w-full lg:w-100 border border-neutral-300 pl-10 pr-4 py-1.5 text-sm rounded-md outline-none uppercase bg-white shadow-sm"
                placeholder="Enter CustomerID or mobile no."
              />
              {search && data.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-neutral-300 rounded shadow-lg z-20">
                  {data.map(item => (
                    <div key={item.id} className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer border-b last:border-0" onClick={() => { setData([]); setSearch(item.CustomerID); autofillUser(item); }}>
                      {item.firstname} {item.lastname} – {item.mobile_no}
                    </div>
                  ))}
                </div>
              )}

              <span className='w-40 -top-2 ms-5 bg-neutral-800 text-white text-[11px] opacity-0 group-hover:opacity-100 absolute px-3 py-1 shadow-sm leading-4 tracking-tight  rounded-md'>
                Search by Customer's firstname, lastname, mobile No., CustomerID
              </span>
            </div>
            <input disabled value={`Application No. : ${selectedApplicatioID || ""}`} className="border border-neutral-300 text-xs px-3 py-1.5 rounded-md w-64 bg-slate-100 text-center cursor-not-allowed" />
            <button type='button' onClick={resetInput} className='border border-neutral-300 px-4 py-1.5 rounded-md shadow-sm text-sm flex items-center gap-2 hover:bg-gray-100 bg-white'><BrushCleaning size={14} />Reset</button>
          </div>

          {/* PREVIOUS APPLICATIONS */}
          {userApplications.length > 0 && (
            <div className="m-5 border border-neutral-300 rounded-md">
              <div className="bg-slate-100 px-4 py-2 text-sm font-medium flex justify-between items-center">
                <span>Previous Applications</span>
                <X size={18} className="text-red-500 cursor-pointer" onClick={() => setUserApplication([])} />
              </div>
              <div className="flex overflow-x-auto p-2 gap-2">
                {userApplications.map(app => (
                  <div key={app.id} className="flex-shrink-0 border border-neutral-300 px-3 py-1.5 rounded bg-white text-xs flex items-center gap-3">
                    <span className="font-bold cursor-pointer hover:text-blue-600" onClick={() => autoFillChitDetails(app)}>APP_{app.application_id}</span>
                    <button type="button" onClick={() => navigate(`/chit/print/${app.id}`)} className="text-blue-600 underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHIT DETAILS TABLE */}
          <div className="px-3 py-1 bg-[#004f9e] text-white text-md font-medium">Chit Details</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={labelCell}>Byelaws Number & Date <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="ByLawsNumber" value={chitData.ByLawsNumber} onChange={handleChitChange} placeholder="No." className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                    <input name="BylawsDate" type='date' value={chitData.BylawsDate} onChange={handleChitChange} className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Group Code <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <input name="GroupCode" value={chitData.GroupCode.toUpperCase()} onChange={handleChitChange} placeholder="Group Code" className="w-full border border-neutral-300 px-3 py-1 rounded uppercase" required />
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Ticket Number & Value <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="TicketNmber" value={chitData.TicketNmber} onChange={handleChitChange} placeholder="Ticket No." className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                    <input name="ChitValue" type='number' value={chitData.ChitValue} onChange={handleChitChange} placeholder="Value" className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Duration <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex">
                    <input name="Duration" type="number" value={chitData.Duration} onChange={handleChitChange} placeholder="eg. 12" className="w-1/3 border border-neutral-300 px-3 py-1 rounded-l" required />
                    <select name="DurationCategory" value={chitData.DurationCategory} onChange={handleChitChange} className="w-2/3 border border-l-0 border-neutral-300 px-3 py-1 rounded-r" required>
                      <option value="">Select Category</option>
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Months">Months</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Branch <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <select name="branch" value={chitData.branch} onChange={handleChitChange} className="w-full border border-neutral-300 px-3 py-1 rounded" required>
                    <option value="">Select Branch</option>
                    {branchData.map((items) => (
                      <option key={items.id} value={items.id}>{items.branchName} – {items.branchLocation}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          {/* CUSTOMER DETAILS TABLE */}
          <div className="px-3 py-1 bg-[#004f9e] text-white text-md font-medium mt-1">Customer Details</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={labelCell}>Full Name <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                    <input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                    <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Contact Information <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-1/2 border border-neutral-300 px-3 py-1 rounded" />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Date of Birth <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-neutral-300 px-3 py-1 rounded" required />
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Permanent Address <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" className="w-full border border-neutral-300 px-3 py-1 rounded" required />
                </td>
              </tr>
              <tr>
                <td className={labelCell}>ID Details (PAN/Aadhar/PIN) <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN" className="w-full border border-neutral-300 px-2 py-1 rounded uppercase" required />
                    <input name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="Aadhar" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                    <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* NOMINEE DETAILS TABLE */}
          <div className="px-3 py-1 bg-[#004f9e] text-white text-md font-medium mt-1">Nominee Details</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={labelCell}>Nominee Name <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input name="nominee_firstname" value={nomineeData.nominee_firstname} onChange={handleNomineeChange} placeholder="First" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                    <input name="nominee_middlename" value={nomineeData.nominee_middlename} onChange={handleNomineeChange} placeholder="Middle" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                    <input name="nominee_lastname" value={nomineeData.nominee_lastname} onChange={handleNomineeChange} placeholder="Last" className="w-full border border-neutral-300 px-2 py-1 rounded" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>Relationship <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <select name="relationship" value={nomineeData.relationship} onChange={handleNomineeChange} className="w-full border border-neutral-300 px-3 py-1 rounded bg-white" required>
                    <option value="" disabled>Select Relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={labelCell}>DOB & Mobile <span className="text-red-500">*</span></td>
                <td className={inputCell}>
                  <div className="flex gap-2">
                    <input type="date" name="nomineeDob" value={nomineeData.nomineeDob} onChange={handleNomineeChange} className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                    <input name="nomineeMobile" value={nomineeData.nomineeMobile} onChange={handleNomineeChange} placeholder="Mobile No." className="w-1/2 border border-neutral-300 px-3 py-1 rounded" required />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center p-6 bg-slate-50 border-t border-neutral-300">
            {loading ? (
              <button disabled className="px-8 py-2 bg-[#06c] text-white rounded-md text-sm shadow-md flex items-center gap-2 opacity-80">
                <Loader2 size={18} className="animate-spin" /> Registering Customer...
              </button>
            ) : (
              <button type="submit" className="px-8 py-2 text-white bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 rounded-md text-sm shadow-md">
                Register Customer
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default CustomerApplication