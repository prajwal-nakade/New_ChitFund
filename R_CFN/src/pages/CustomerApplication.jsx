import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Search } from 'lucide-react'
import { getUserEntries } from '../api/endpoint'
import { UserContext } from '../context/UserContext'

const CustomerApplication = () => {
  const [loading, setLoading] = useState(false)
  const { userData } = useContext(UserContext)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const handleSearch = (value) => {
    setSearch(value)

    if (!value.trim()) {
      setData([])
      return
    }

    const keyword = value.trim()
    const filtered = userData.filter(f =>
      String(f?.mobile_no).includes(keyword)
    )

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({ ...prev, [name]: value }));
  };

  const autofillUser = (user) => {
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
  }


  return (
    <Layout>
      <div className="max-w-6xl mx-auto  rounded-md p-6">
        <form
          //   onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white px-5 py-3 shadow-lg rounded-md border border-neutral-300"
        ><div className='w-full text-start'>
            <h1 className='text-2xl font-medium tracking-tight leading-tight text-neutral-800 text-shadow-sm bg-slate-100 py-3 rounded-md shadow-sm px-5'>Application Form</h1>
          </div>
          <div className="flex items-center relative">
            <div className="absolute bg-gray-200 h-full rounded-l-md  border border-neutral-300 px-2">
              <Search size={14} className="text-neutral-500 mt-2" />
            </div>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              value={search}
              type="text"
              className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-64 outline-none"
              placeholder="Enter CustomerID"
            />
            {search && data.length > 0 && (
              <div className="absolute top-full left-0 w-64 bg-white border border-neutral-300 rounded shadow z-10">
                {data.map(item => (
                  <div
                    key={item.id}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setData([])
                      setSearch(item.mobile_no)
                      autofillUser(item)
                    }}
                  >
                    {item.firstname} – {item.mobile_no}
                  </div>
                ))}
              </div>
            )}

          </div>
          <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">
            Chit Details
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <div className="flex flex-col items-start w-full text-sm">
              <label>Bylaws No. <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="bylawsnumber"
                // value={formData.firstName}
                // onChange={handleChange}
                placeholder="Bylaws No."
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Bylaws Date <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="bylawsdate"
                type='date'
                // value={formData.middleName}
                // onChange={handleChange}
                placeholder="Bylaws Date"
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label className="text-sm">Group Code <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="groupcode"
                // value={formData.lastName}
                // onChange={handleChange}
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
                name="ticketnumber"
                // value={formData.mobile}
                // onChange={handleChange}
                placeholder="Ticket No."
                required
              />
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label>Chit Value <span className="text-red-500">*</span></label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="chitvalue"
                type='number'
                // value={formData.email}
                // onChange={handleChange}
                placeholder="Chit Value"
                required
              />
            </div>
            <div className='flex w-full'>
              <div className="flex flex-col items-start w-full text-sm">
              <label>Duration<span className="text-red-500 ms-1">*</span></label>
              <input className="w-full min-w-0 mt-1 px-3 py-1 border-l border-t border-b border-neutral-300 rounded-l-md text-sm outline-none" type='number' placeholder='eg., 1,2,3'/>
            </div>
            <div className="flex flex-col items-start w-full text-sm">
              <label>Days/Week/Months/Years<span className="text-red-500 ms-1">*</span></label>
              <select className="w-full min-w-0 mt-1 px-3 py-1 border-r border-t border-b border-neutral-300 rounded-r-md text-sm text-neutral-500 outline-none" required>
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
            <select className=" w-full lg:w-86  min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm text-neutral-500" required>
              <option value="">Select Branch</option>
              <option value="">Sutgirni</option>
              <option value="">Beed by pass</option>
              <option value="">Harsul</option>
            </select>
          </div>

          <div className='w-full shadow-sm bg-slate-50 rounded-md'>
            <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 text-neutral-800 tracking-tight">
              Applicant Declaration
            </h1>
            <div className='mx-4 bg-white border border-neutral-300 rounded-md mb-4 px-5 py-3'>

              <p className='text-sm tracking-wide text-neutral-600'>
                Dear Sir,<br /><br />
                I/We (Name of the Co./Firm/Enterprises if applicant not Individual) Age<input className='border-b outline-none mx-1 font-semibold w-10 text-center' />Son/Wife/daughter/Proprietor/proprietress/duly authorized attorney/ Mrs<input className='border-b outline-none mx-1 font-semibold text-center' /> Request you to reserve a membership/ Ticket in the above chit/kuri being floated by you/ I have remitted this day a sum of (Rupees<input className='border-b outline-none mx-1 font-semibold text-center' /> only) being the first installment of the chit/kuri membership applied for. I/We have received and gone through a copy of the chit agreement cum bye-laws of the proposed chit/kuri being registered and conducted by you as FOREMAN COMPANY and I have read or caused to read / translated and understood the same. Knowing the conditions. Accordingly I am submitting here with, this bye law of proposed/floated chit agreement in duplicate duly filled and signed by me/us as required by you for registration of the chit under section 4 of the CHIT FUNDS ACT, 1982 and Maharashtra Chit Fund Rule 2004. I/we do hereby declare to abide by and be bounded by the rules contained therein and well any further amendments that may be made from time to time.</p>
            </div>
          </div>
          <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">
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
            <h2 className="text-lg font-medium mt-4 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">
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
          <div className='w-full shadow-sm bg-slate-50 rounded-md'>
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
              <button className="px-6 py-1 bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Printing Application...
              </button>
            ) : (
              <button className="px-6 py-1 bg-[#ed1d25] hover:bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md">
                Print Application
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default CustomerApplication