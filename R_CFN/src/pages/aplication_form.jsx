import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { getUserEntries, userEntry } from "../api/endpoint";
import { Factory, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import UserManagement from "../components/UserManagement";


const ApplicationForm = () => {
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
    pan_image: null,
    aadhar_image: null,
  });

  const [loading, setLoading] = useState(false)

  const [userEntriesData, setUserEntriesData] = useState([])

  const [nomineeData, setNomineeData] = useState({
    nominee_firstname: "",
    nominee_middlename: "",
    nominee_lastname: "",
    relationship: "",
    nomineeDob: "",
    nomineeMobile: "",
  });

  const [preview, setPreview] = useState({
    pan_image: null,
    aadhar_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    setPreview((prev) => ({ ...prev, [name]: files[0].name }));
  };

  const removePanImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((p) => ({ ...p, pan_image: null }));
    setPreview((p) => ({ ...p, pan_image: null }));
  };

  const removeAadharImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((p) => ({ ...p, aadhar_image: null }));
    setPreview((p) => ({ ...p, aadhar_image: null }));
  };

  useEffect(() => {
    return () => {
      Object.values(preview).forEach((v) => v && URL.revokeObjectURL(v));
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstname", formData.firstName);
    data.append("middlename", formData.middleName);
    data.append("lastname", formData.lastName);
    data.append("mobile_no", formData.mobile);
    data.append("dob", formData.dob);
    data.append("email", formData.email);
    data.append("permanent_address", formData.address);
    data.append("pincode", formData.pincode);
    data.append("pancard_no", formData.pan);
    data.append("aadharcard_no", formData.aadhar);

    if (formData.pan_image) data.append("pan_image", formData.pan_image);
    if (formData.aadhar_image) data.append("aadhar_image", formData.aadhar_image);

    data.append("nominee_firstname", nomineeData.nominee_firstname);
    data.append("nominee_middlename", nomineeData.nominee_middlename);
    data.append("nominee_lastname", nomineeData.nominee_lastname);
    data.append("nominee_mobile", nomineeData.nomineeMobile);
    data.append("nominee_dob", nomineeData.nomineeDob);
    data.append("relationship", nomineeData.relationship);

    try {
      setLoading(true)
      const response = await userEntry(data);
      if (response.success) {
        toast.success('User Application Submited!')
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
          pan_image: null,
          aadhar_image: null,
        })
        setNomineeData({
          nominee_firstname: "",
          nominee_middlename: "",
          nominee_lastname: "",
          relationship: "",
          nomineeDob: "",
          nomineeMobile: "",
        })
      }
      else {
        toast.error('Somthing went wrong')
      }
      console.log(response);
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }

  };
    const fetchUserEntriesData = async()=>{
      const data = await getUserEntries()
      console.log(data)
      setUserEntriesData(data)
    }
    
  useEffect(()=>{
    fetchUserEntriesData()
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto  rounded-md p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white px-5 py-3 shadow-lg rounded-md border border-neutral-300"
        >
          <h1 className="text-lg font-medium mb-3 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">Application Form</h1>

          {/* User Name */}
          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <input className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
            <input className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <input className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
            <input className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="date" className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="dob" value={formData.dob} onChange={handleChange} />
          </div>

          {/* Address */}
          <textarea className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="address" value={formData.address} onChange={handleChange} placeholder="Permanent Address" />

          {/* IDs */}
          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <input className="w-full min-w-0 px-3 py-1 border border-neutral-300 rounded-md text-sm" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
            <div className="w-full flex flex-col gap-1 relative">
              <div className="flex items-center gap-2">
                <input
                  className="w-full min-w-0 px-3 py-1 border border-neutral-300 rounded-md text-sm uppercase"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="PAN"
                />
                <label className="text-sm px-3 py-1 border border-neutral-300 bg-gray-200 shadow-inner rounded-md hover:bg-gray-300 cursor-pointer relative group">
                  Upload
                  <input
                    type="file"
                    hidden
                    name="pan_image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                   rounded bg-black px-2 py-1 text-[10px] text-white
                   opacity-0 group-hover:opacity-100 transition-opacity">
                    Upload PAN image
                  </span>
                </label>
              </div>

              {/* PAN PREVIEW (PI AREA) */}
              {preview.pan_image && (
                <div className="flex items-center gap-2 text-green-600 text-xs absolute top-8">
                  <span className="break-all">{preview.pan_image}</span>
                  <button type="button" onClick={removePanImage}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-1 relative">
              <div className="flex items-center gap-2">
                <input
                  className="w-full min-w-0 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Aadhar"
                />
                <label className="text-sm px-3 py-1 border border-neutral-300 bg-gray-200 shadow-inner rounded-md hover:bg-gray-300 cursor-pointer relative group">
                  Upload
                  <input
                    type="file"
                    hidden
                    name="aadhar_image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                   rounded bg-black px-2 py-1 text-[10px] text-white
                   opacity-0 group-hover:opacity-100 transition-opacity">
                    Upload Aadhar image
                  </span>
                </label>
              </div>

              {/* AADHAR PREVIEW (AI AREA) */}
              {preview.aadhar_image && (
                <div className="flex items-center gap-2 text-green-600 text-xs absolute top-8 ms-1">
                  <span className="break-all">{preview.aadhar_image}</span>
                  <button type="button" onClick={removeAadharImage}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>


          <div className="border-t border-neutral-300 flex flex-col gap-4 mt-4">
            <h2 className="text-lg font-medium mt-4 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">Nominee Details</h2>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <input className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="nominee_firstname" value={nomineeData.nominee_firstname} onChange={handleNomineeChange} placeholder="First Name" />
              <input className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="nominee_middlename" value={nomineeData.nominee_middlename} onChange={handleNomineeChange} placeholder="Middle Name" />
              <input className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="nominee_lastname" value={nomineeData.nominee_lastname} onChange={handleNomineeChange} placeholder="Last Name" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="relationship" value={nomineeData.relationship} onChange={handleNomineeChange} placeholder="Relationship" />
              <input type="date" className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="nomineeDob" value={nomineeData.nomineeDob} onChange={handleNomineeChange} />
              <input className="w-full min-w-0 border px-3 py-1 rounded text-sm border-neutral-300" name="nomineeMobile" value={nomineeData.nomineeMobile} onChange={handleNomineeChange} placeholder="Mobile" />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            {loading ? (
              <button className="px-6 py-1 bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Submiting Application...
              </button>
            ) : (
              <button className="px-6 py-1 bg-[#ed1d25] hover:bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md">
                Submit Application
              </button>
            )}
          </div>
        </form>
        <UserManagement data={userEntriesData}/>
      </div>
      
    </Layout>
  );
};

export default ApplicationForm;
