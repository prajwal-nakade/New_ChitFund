import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import { getUserEntries, userEntry } from "../api/endpoint";
import { Factory, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import UserManagement from "../components/UserManagement";
import { UserContext } from "../context/UserContext";


const ApplicationForm = () => {
  // const { fetchUserEntriesData } = useContext(UserContext)
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
    if (!formData.pan_image && !formData.aadhar_image) {
      toast.error("PAN & Aadhar image is required")
      return
    }
    if (!formData.aadhar_image) {
      toast.error("Aadhar image is required")
      return
    }
    if (!formData.pan_image) {
      toast.error("PAN image is required")
      return
    }

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
        setPreview({
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
        await fetchUserEntriesData();

      }
      else {
        toast.error('Somthing went wrong')
      }
      console.log(response);
    } catch (error) {
      const errors = error?.response?.data;

      if (errors && typeof errors === "object") {
        Object.values(errors).forEach((fieldErrors) => {
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((msg) => toast.error(msg));
          } else {
            toast.error(fieldErrors);
          }
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false)
    }

  };
  const fetchUserEntriesData = async () => {
    const data = await getUserEntries()
    console.log(data)
    setUserEntriesData(data)
  }

  useEffect(() => {
    fetchUserEntriesData()
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto  rounded-md p-6">
        <h1 className="text-lg font-medium  w-full text-start px-5 py-1 rounded-t-md bg-[#004f9e]   text-white tracking-tight">
          Customer Master Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white shadow-lg rounded-b-md border border-neutral-300"
        >
          {/* User Name */}
          <div className="px-5 py-3 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center w-full gap-4">
              <div className="flex flex-col items-start w-full text-sm">
                <label>
                  First Name <span className="text-red-500">*</span>
                </label>
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
                <label className="text-sm">
                  Middle Name <span className="text-red-500">*</span>
                </label>
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
                <label className="text-sm">
                  Last Name <span className="text-red-500">*</span>
                </label>
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

            {/* Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="flex flex-col items-start w-full text-sm">
                <label>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
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
                <label>
                  Email <span className="text-red-500">*</span>
                </label>
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
                <label>
                  Date of Birth <span className="text-red-500">*</span>
                </label>
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

            {/* Address */}
            <div>
              <label className="text-sm">
                Permanent Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Permanent Address"
                required
              />
            </div>

            {/* IDs */}
            <div className="w-full text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* PIN CODE */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-1 border border-neutral-300 rounded-md"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                  />
                </div>

                {/* PAN */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm">
                    PAN Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      className="w-full px-3 py-1 border border-neutral-300 rounded-md uppercase"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      placeholder="PAN"
                      required
                    />

                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 shadow-inner">
                      Upload
                      <input
                        type="file"
                        hidden
                        name="pan_image"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {preview.pan_image && (
                    <div className="flex items-center gap-2 text-green-600 text-xs -bottom-5 lg:-bottom-5 absolute">
                      <span className="truncate">{preview.pan_image}</span>
                      <button type="button" onClick={removePanImage}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* AADHAR */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-sm">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      className="w-full px-3 py-1 border border-neutral-300 rounded-md"
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={handleChange}
                      placeholder="Aadhar"
                      required
                    />

                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 shadow-inner">
                      Upload
                      <input
                        type="file"
                        hidden
                        name="aadhar_image"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {preview.aadhar_image && (
                    <div className="flex items-center gap-2 text-green-600 text-xs -bottom-5 absolute">
                      <span className="truncate">{preview.aadhar_image}</span>
                      <button type="button" onClick={removeAadharImage}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4 mt-1">
            <h2 className="text-lg font-medium mt-4 w-full text-start px-5 py-1  bg-[#004f9e]  text-white  tracking-tight">
              Nominee Details
            </h2>

            <div className="px-5 py-3 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex flex-col items-start w-full text-sm">
                  <label>
                    First Name <span className="text-red-500">*</span>
                  </label>
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
                  <label>
                    Middle Name <span className="text-red-500">*</span>
                  </label>
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
                  <label>
                    Last Name <span className="text-red-500">*</span>
                  </label>
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
                  <label>
                    Relationship <span className="text-red-500">*</span>
                  </label>
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
                  <label>
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
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
                  <label>
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
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
          </div>

          <div className="flex justify-center mt-4 pb-3">
            {loading ? (
              <button className="px-6 py-1 bg-[#06c] transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Registering Customer...
              </button>
            ) : (
              <button className="px-6 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md">
                Register Customer
              </button>
            )}
          </div>
        </form>
        <UserManagement
          data={userEntriesData}
          setUserEntriesData={setUserEntriesData}
        />
      </div>
    </Layout>


  );
};

export default ApplicationForm;
