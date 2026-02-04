import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout'
import { BrushCleaning, Loader2, Search, X } from 'lucide-react'
import { createChit, getUserEntries } from '../api/endpoint'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import ChitManagement from '../components/ChitManagement'
import { useNavigate } from 'react-router'

const CustomerApplication = () => {
  const [loading, setLoading] = useState(false)
  const { userData, branchData, fetchBranchData, allchitData, fetchChitsData } = useContext(UserContext)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [selectedUserID, setSelectedUserID] = useState(null)
  const [selectedApplicatioID, setSelectedApplicationID] = useState(null)
  const [userApplications, setUserApplication] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchBranchData()
    fetchChitsData()
  }, [])
  const handleSearch = (value) => {
    setSearch(value)

    if (!value.trim()) {
      setData([])
      return
    }

    const keyword = value.trim().toLowerCase()
    const filtered = userData.filter((f) =>
      String(f?.CustomerID || "")
        .toLowerCase()
        .includes(keyword)
      || f?.mobile_no.toLowerCase().includes(keyword))

    setData(filtered)
  }

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    dob: "",
    email: "",
    address: "",
    pincode: "",
    pan: "",
    aadhar: "",
  });

  const [nomineeData, setNomineeData] = useState({
    nominee_firstname: "",
    nominee_middlename: "",
    nominee_lastname: "",
    relationship: "",
    nomineeDob: "",
    nomineeMobile: "",
  });

  const [chitData, setChitData] = useState({
    ByLawsNumber: "",
    BylawsDate: "",
    GroupCode: "",
    TicketNmber: "",
    ChitValue: "",
    Duration: "",
    DurationCategory: "",
    branch: ""
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
      email: user.email || "",
      dob: user.dob || "",
      address: user.permanent_address || "",
      pincode: user.pincode || "",
      pan: user.pancard_no || "",
      aadhar: user.aadharcard_no || ""
    })
    setNomineeData({
      nominee_firstname: user.nominees[0].firstname || "",
      nominee_middlename: user.nominees[0].middlename || "",
      nominee_lastname: user.nominees[0].lastname || "",
      relationship: user.nominees[0].relationship || "",
      nomineeDob: user.nominees[0].dob || "",
      nomineeMobile: user.nominees[0].mobile_no || "",
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
        const payload = {
          ...chitData,
          user: selectedUserID
        }
        const data = await createChit(payload)
        console.log(data)
        toast.success(`Chit created successfully with Application ID: ${data.application_id}`)
        setTimeout(() => {
          navigate(`/chit/print/${data.id}`)
        }, 2000)

      }
    } catch (error) {
      console.log(error.message)
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
    setChitData({
      ByLawsNumber: "",
      BylawsDate: "",
      GroupCode: "",
      TicketNmber: "",
      ChitValue: "",
      Duration: "",
      DurationCategory: "",
      branch: ""
    })

    setNomineeData({
      nominee_firstname: "",
      nominee_middlename: "",
      nominee_lastname: "",
      relationship: "",
      nomineeDob: "",
      nomineeMobile: "",
    })
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      mobile: "",
      dob: "",
      email: "",
      address: "",
      pincode: "",
      pan: "",
      aadhar: "",
    })
    setSelectedApplicationID(null)

    setSearch("")
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto  rounded-md p-6">
        <div className='w-full text-start'>
          <h1 className='text-xl font-medium tracking-tight leading-tight text-white bg-[#004f9e] py-2 rounded-t-md px-5'>Application Form</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white px-5 py-3 shadow-lg rounded-b-md border border-neutral-300"
        >
          <div className='flex flex-col lg:flex-row items-start lg:items-center gap-3'>
            <div className="flex items-center relative">
              <div className="absolute bg-gray-200 h-full rounded-l-md  border border-neutral-300 px-2">
                <Search size={14} className="text-neutral-500 mt-2" />
              </div>
              <input
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
                type="text"
                className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-78 outline-none uppercase"
                placeholder="Enter CustomerID or mobile no."
              />
              {search && data.length > 0 && (
                <div className="absolute top-full left-0 w-78 bg-white border border-neutral-300 rounded shadow z-10">
                  {data.map(item => (
                    <div
                      key={item.id}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setData([])
                        setSearch(item.CustomerID)
                        autofillUser(item)
                      }}
                    >
                      {item.firstname} – {item.mobile_no}
                    </div>
                  ))}
                </div>
              )}

            </div>


            <div className="flex items-center">
              <input
                type="text"
                disabled
                value={`Application No. : ${selectedApplicatioID || ""}`}
                className="border border-neutral-300 shadow-sm text-neutral-800 text-xs px-3 py-1 placeholder:text-xs rounded-md w-64 outline-none uppercase cursor-not-allowed bg-slate-50 text-center"
                placeholder="Application ID"
              />
            </div>
            <div className='flex items-center justify-start lg:w-full lg:justify-end'>
              <button type='button' onClick={() => resetInput()} className='border border-neutral-300 px-4 py-1 rounded-md shadow-sm text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300 cursor-pointer'><BrushCleaning size={14} className='text-neutral-500' />Reset</button>
            </div>
          </div>
          {userApplications.length > 0 && (
            <div className="mt-3 border border-neutral-300 rounded-md bg-white shadow-sm w-full">
              <div className="text-sm font-medium px-4 py-2 bg-slate-100 w-full flex items-center justify-between">
                <h3 className='w-full'>Previous Applications</h3>
                <button onClick={() => setUserApplication([])} className='w-full items-end justify-end flex'>
                  <X size={18} className="text-red-500" />
                </button>
              </div>

              <div className="divide-y flex overflow-auto">
                {userApplications.map(app => (
                  <div
                    key={app.id}
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 gap-5 border border-neutral-300"
                  >
                    <div onClick={() => autoFillChitDetails(app)} className='cursor-pointer '>
                      <p className="font-medium">
                        APP_ID - {app.application_id}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/chit/print/${app.id}`)}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {search && userApplications.length === 0 && (
            <div className='flex items-center justify-center w-full'>
              <h1 className='font-medium text-neutral-500'>Customer has 0 Application</h1>
            </div>
          )}
          <h1 className="text-md font-medium mb-3 w-full text-start px-5 py-2 shadow-sm text-white bg-[#004f9e] rounded-md  tracking-tight">
            Chit Details
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <div className="flex flex-col items-start w-full text-sm">
              <label>Byelaws No. <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="ByLawsNumber"
                value={chitData.ByLawsNumber}
                onChange={handleChitChange}
                placeholder="Bylaws No."
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Byelaws Date <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="BylawsDate"
                type='date'
                value={chitData.BylawsDate}
                onChange={handleChitChange}
                placeholder="Bylaws Date"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Group Code <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="GroupCode"
                value={chitData.GroupCode}
                onChange={handleChitChange}
                placeholder="Group code"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="flex flex-col items-start w-full text-sm">
              <label>Ticket No.<span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="TicketNmber"
                value={chitData.TicketNmber}
                onChange={handleChitChange}
                placeholder="Ticket No."
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label>Chit Value <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="ChitValue"
                type='number'
                value={chitData.ChitValue}
                onChange={handleChitChange}
                placeholder="Chit Value"
                required
              />
            </div>
            <div className="flex w-full">
              <div className="flex flex-col items-start w-full text-sm">
                <label>
                  Duration<span className="text-red-500 ms-1">*</span>
                </label>
                <input
                  value={chitData.Duration}
                  onChange={handleChitChange}
                  className="w-full min-w-0 mt-1 px-3 py-1 border-l border-t border-b border-neutral-300 rounded-l-md text-sm outline-none"
                  type="number"
                  placeholder="eg., 1,2,3"
                  name="Duration"
                />
              </div>

              <div className="flex flex-col items-start w-full text-sm">
                <label>
                  Days/Week/Months/Years<span className="text-red-500 ms-1">*</span>
                </label>
                <select
                  value={chitData.DurationCategory}
                  onChange={handleChitChange}
                  className="w-full min-w-0 mt-1 px-3 py-[4.5px] md:py-[5] border-r border-t border-b border-neutral-300 rounded-r-md text-sm text-neutral-500 outline-none"
                  name="DurationCategory"
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="Days">Days</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                  <option value="Year">Year</option>
                </select>
              </div>
            </div>


          </div>
          <div className="flex flex-col items-start w-full text-sm">
            <label>Branch<span className="text-red-500 ms-1">*</span></label>
            <select value={chitData.branch}
              onChange={handleChitChange} className=" w-full lg:w-86  min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm text-neutral-500" name="branch" required>
              <option value="">Select Branch</option>
              {branchData.map((items) => (
                <option key={items.id} value={items.id}>{items.branchName} – {items.branchLocation}</option>
              ))}
            </select>
          </div>

          <div className='w-full shadow-sm bg-slate-100 rounded-md'>
            <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 text-neutral-800 tracking-tight">
              Applicant Declaration
            </h1>
            <div className='mx-4 bg-white border border-neutral-300 rounded-md mb-4 px-5 py-3'>

              <p className='text-sm tracking-wide text-neutral-600'>
                Dear Sir,<br /><br />
                I/We (Name of the Co./Firm/Enterprises if applicant not Individual) Age<input className='border-b outline-none mx-1 font-semibold w-10 text-center' />Son/Wife/daughter/Proprietor/proprietress/duly authorized attorney/ Mrs<input className='border-b outline-none mx-1 font-semibold text-center' /> Request you to reserve a membership/ Ticket in the above chit/kuri being floated by you/ I have remitted this day a sum of (Rupees<input className='border-b outline-none mx-1 font-semibold text-center' /> only) being the first installment of the chit/kuri membership applied for. I/We have received and gone through a copy of the chit agreement cum bye-laws of the proposed chit/kuri being registered and conducted by you as FOREMAN COMPANY and I have read or caused to read / translated and understood the same. Knowing the conditions. Accordingly I am submitting here with, this bye law of proposed/floated chit agreement in duplicate duly filled and signed by me/us as required by you for registration of the chit under section 4 of the CHIT FUNDS ACT, 1982 and Maharashtra Chit Fund Rule 2004. I/we do hereby declare to abide by and be bounded by the rules contained therein and well any further amendments that may be made from time to time.</p>
            </div>
          </div>
          <h1 className="text-md font-medium mb-3 w-full text-start px-5 py-2 shadow-sm text-white bg-[#004f9e] rounded-md tracking-tight">
            Customer Details
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <div className="flex flex-col items-start w-full text-sm">
              <label>First Name <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Middle Name <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Last Name <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="flex flex-col items-start w-full text-sm">
              <label>Mobile Number <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label>Email <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label>Date of Birth <span className="text-red-500">*</span></label>
              <input
                type="date"
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Permanent Address <span className="text-red-500">*</span></label>
            <textarea
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Permanent Address"
              required
            />
          </div>

          <div className="w-full text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm">PIN Code <span className="text-red-500">*</span></label>
                <input
                  className="w-full px-3 py-1 border border-neutral-300 rounded-md"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-sm">PAN Number <span className="text-red-500">*</span></label>

                <div className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-1 border border-neutral-300 rounded-md uppercase"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="PAN"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 relative">
                <label className="text-sm">Aadhar Number <span className="text-red-500">*</span></label>

                <div className="flex items-center gap-2">
                  <input
                    className="w-full px-3 py-1 border border-neutral-300 rounded-md"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    placeholder="Aadhar"
                    required
                  />

                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-300 flex flex-col gap-4 mt-4">
            <h2 className="text-md font-medium mb-3 w-full text-start px-5 py-2 shadow-sm text-white bg-[#004f9e] rounded-md tracking-tight">
              Nominee Details
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex flex-col items-start w-full text-sm">
                <label>First Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="nominee_firstname"
                  value={nomineeData.nominee_firstname}
                  onChange={handleNomineeChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full text-sm">
                <label>Middle Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="nominee_middlename"
                  value={nomineeData.nominee_middlename}
                  onChange={handleNomineeChange}
                  placeholder="Middle Name"
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full text-sm">
                <label>Last Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="nominee_lastname"
                  value={nomineeData.nominee_lastname}
                  onChange={handleNomineeChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-start w-full text-sm">
                <label>Relationship <span className="text-red-500">*</span></label>
                <input
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="relationship"
                  value={nomineeData.relationship}
                  onChange={handleNomineeChange}
                  placeholder="Relationship"
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full text-sm">
                <label>Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="nomineeDob"
                  value={nomineeData.nomineeDob}
                  onChange={handleNomineeChange}
                  required
                />
              </div>
              <div className="flex flex-col items-start w-full text-sm">
                <label>Mobile Number <span className="text-red-500">*</span></label>
                <input
                  className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300"
                  name="nomineeMobile"
                  value={nomineeData.nomineeMobile}
                  onChange={handleNomineeChange}
                  placeholder="Mobile"
                  required
                />
              </div>
            </div>
          </div>
          <div className='w-full shadow-sm bg-slate-100 rounded-md'>
            <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 text-neutral-800 tracking-tight">
              Declaration cum Authority for Bidding at Maximum Discount
            </h1>
            <div className='mx-4 bg-white border border-neutral-300 rounded-md mb-4 px-5 py-3'>

              <p className='text-sm tracking-wide text-neutral-600'>
                I/We am/are willing to avail prized value at maximum discount of 40% of the chit value and here by authorize the Foreman company to include my/our Name for the draw for first <input className='border-b outline-none mx-1 font-semibold text-center' /> auction/draws.</p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            {loading ? (
              <button className="px-6 py-1 bg-[#06c] transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Registering Customer...
              </button>
            ) : (
              <button className="px-6 py-1 text-white bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 cursor-pointer  rounded-md text-sm shadow-md">
                Register Customer
              </button>
            )}
          </div>
        </form>
        {/* <ChitManagement data={allchitData} fetchChitsData={fetchChitsData}/> */}
      </div>

    </Layout>
  )
}

export default CustomerApplication