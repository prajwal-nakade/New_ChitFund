import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import { getUserEntries, userEntry } from "../api/endpoint";
import { Factory, Loader2, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import UserManagement from "../components/UserManagement";
import { UserContext } from "../context/UserContext";

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
    aadhar_image_back: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userEntriesData, setUserEntriesData] = useState([]);
  const [nomineeData, setNomineeData] = useState({
    nominee_firstname: "",
    nominee_middlename: "",
    nominee_lastname: "",
    relationship: "",
    nomineeDob: "",
    nomineeMobile: "",
  });

  const [preview, setPreview] = useState({ pan_image: null, aadhar_image: null });
  const [backPreview, setBackPreview] = useState({ aadhar_image_back: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (name === "pan_image") {
      setFormData((prev) => ({ ...prev, pan_image: file }));
      setPreview((p) => ({ ...p, pan_image: file?.name || null }));
    }
    if (name === "aadhar_image") {
      setFormData((prev) => ({ ...prev, aadhar_image: file }));
      setPreview((p) => ({ ...p, aadhar_image: file?.name || null }));
    }
    if (name === "aadhar_image_back") {
      setFormData((prev) => ({ ...prev, aadhar_image_back: file }));
      setBackPreview((p) => ({ ...p, aadhar_image_back: file?.name || null }));
    }
  };

  const removePanImage = (e) => {
    e.preventDefault();
    setFormData((p) => ({ ...p, pan_image: null }));
    setPreview((p) => ({ ...p, pan_image: null }));
  };

  const removeAadharImage = (e) => {
    e.preventDefault();
    setFormData((p) => ({ ...p, aadhar_image: null }));
    setPreview((p) => ({ ...p, aadhar_image: null }));
  };

  const removeAadharBackImage = (e) => {
    e.preventDefault();
    setFormData((p) => ({ ...p, aadhar_image_back: null }));
    setBackPreview((p) => ({ ...p, aadhar_image_back: null }));
  };

  const validatePan = (panNo) => /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(panNo);
  const validateAadhar = (aadharNo) => /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/.test(aadharNo);

  const validateAadharAndPan = () => {
    let newError = {};
    if (!validatePan(formData.pan)) newError.pan = "Invalid PAN format (ABCDE1234F).";
    if (!validateAadhar(formData.aadhar)) newError.aadhar = "Invalid 12-digit Aadhaar.";
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pan_image && !formData.aadhar_image) {
      toast.error("PAN & Aadhar image is required");
      return;
    }
    if (!formData.aadhar_image) {
      toast.error("Aadhar image is required");
      return;
    }
    if (!formData.pan_image) {
      toast.error("PAN image is required");
      return;
    }

    const isValid = validateAadharAndPan();

    if (!isValid) return;

    const data = new FormData();
    data.append("firstname", formData.firstName);
    data.append("middlename", formData.middleName);
    data.append("lastname", formData.lastName);
    data.append("mobile_no", formData.mobile);
    data.append("dob", formData.dob);
    data.append("email", formData.email);
    data.append("permanent_address", formData.address);
    data.append("pincode", formData.pincode);
    data.append("pancard_no", formData.pan.toUpperCase());
    data.append("aadharcard_no", formData.aadhar);

    if (formData.pan_image) data.append("pan_image", formData.pan_image);
    if (formData.aadhar_image)
      data.append("aadhar_image", formData.aadhar_image);

    if (formData.aadhar_image_back)
      data.append("aadhar_image_back", formData.aadhar_image_back);

    data.append("nominee_firstname", nomineeData.nominee_firstname);
    data.append("nominee_middlename", nomineeData.nominee_middlename);
    data.append("nominee_lastname", nomineeData.nominee_lastname);
    data.append("nominee_mobile", nomineeData.nomineeMobile);
    data.append("nominee_dob", nomineeData.nomineeDob);
    data.append("relationship", nomineeData.relationship);

    try {
      setLoading(true);
      const response = await userEntry(data);
      if (response.success) {
        toast.success("User Application Submited!");

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
          aadhar_image_back: null,
        });

        setPreview({
          pan_image: null,
          aadhar_image: null,
        });

        setBackPreview({
          aadhar_image_back: null,
        });

        setNomineeData({
          nominee_firstname: "",
          nominee_middlename: "",
          nominee_lastname: "",
          relationship: "",
          nomineeDob: "",
          nomineeMobile: "",
        });

        await fetchUserEntriesData();
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEntriesData = async () => {
    const data = await getUserEntries();
    setUserEntriesData(data);
  };

  useEffect(() => { fetchUserEntriesData(); }, []);

  // Utility class for table cells
  const tdLabel = "p-3 border border-neutral-300 bg-gray-50 font-medium text-sm w-1/3";
  const tdInput = "p-3 border border-neutral-300 w-2/3 ";

  return (
    <Layout>
      <div className="mx-auto rounded-md p-6">
        <h1 className="text-lg font-medium w-full text-start px-5 py-2 rounded-t-md bg-[#004f9e] text-white">
          Customer Master Form
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-b-md border border-neutral-300 overflow-hidden">
          
          <table className="w-full border-collapse">
            <tbody>
              {/* Personal Details Section */}
              <tr><td colSpan="2" className="bg-gray-100 p-2 font-bold text-[#004f9e] border-b border-neutral-300 text-center">Personal Information</td></tr>
              
              <tr>
                <td className={tdLabel}>Full Name <span className="text-red-500">*</span></td>
                <td className="flex gap-2 p-3">
                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />

                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" placeholder="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} required />

                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </td>
              </tr>

              

              <tr>
                <td className={tdLabel}>Mobile Number <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Email</td>
                <td className={tdInput}>
                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Date of Birth <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <input type="date" className="w-full px-3 py-1 border border-neutral-300 rounded-md" name="dob" value={formData.dob} onChange={handleChange} required />
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Permanent Address <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <textarea className="w-full px-3 py-1 border border-neutral-300 rounded-md resize-none" name="address" value={formData.address} onChange={handleChange} placeholder="Permanent Address" required />
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Gender <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <select className="w-full px-3 py-1.5 border border-neutral-300 rounded-md bg-white" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>PIN Code <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <input className="w-full px-3 py-1 border border-neutral-300 rounded-md" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN Code" required />
                </td>
              </tr>

              {/* ID Details */}
              <tr>
                <td className={tdLabel}>PAN Number <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input className="flex-1 px-3 py-1 border border-neutral-300 rounded-md uppercase" name="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" required />
                        <label className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer text-xs flex items-center gap-1">
                           <Upload size={16} /> Upload PAN <input type="file" hidden name="pan_image" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
                        </label>
                    </div>
                    {errors.pan && <span className="text-red-600 text-xs">{errors.pan}</span>}
                    {preview.pan_image && <div className="text-green-600 text-xs flex items-center gap-1">{preview.pan_image} <X size={14} className="cursor-pointer" onClick={removePanImage}/></div>}
                  </div>
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Aadhar Number <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input className="flex-1 px-3 py-1 border border-neutral-300 rounded-md" name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="12 Digit Aadhar" required />
                        <label className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer text-xs flex items-center gap-1">
                           <Upload size={16} />Upload Aadhar Front <input type="file" hidden name="aadhar_image" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
                        </label>
                        <label className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer text-xs flex items-center gap-1">
                           <Upload size={16} /> Upload Aadhar Back <input type="file" hidden name="aadhar_image_back" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
                        </label>
                    </div>
                    {errors.aadhar && <span className="text-red-600 text-xs">{errors.aadhar}</span>}
                    <div className="flex flex-col gap-1">
                        {preview.aadhar_image && <div className="text-green-600 text-xs flex items-center gap-1">Front: {preview.aadhar_image} <X size={14} className="cursor-pointer" onClick={removeAadharImage}/></div>}
                        {backPreview.aadhar_image_back && <div className="text-green-600 text-xs flex items-center gap-1">Back: {backPreview.aadhar_image_back} <X size={14} className="cursor-pointer" onClick={removeAadharBackImage}/></div>}
                    </div>
                  </div>
                </td>
              </tr>

              {/* Nominee Details Section */}
              <tr><td colSpan="2" className="bg-gray-100 p-2 font-bold text-[#004f9e] border-y border-neutral-300 text-center">Nominee Details</td></tr>

              <tr>
                <td className={tdLabel}>Nominee Name <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <div className="flex gap-2">
                    <input className="w-full px-2 py-1 border border-neutral-300 rounded-md" name="nominee_firstname" value={nomineeData.nominee_firstname} onChange={handleNomineeChange} placeholder="First" required />
                    <input className="w-full px-2 py-1 border border-neutral-300 rounded-md" name="nominee_middlename" value={nomineeData.nominee_middlename} onChange={handleNomineeChange} placeholder="Middle" required />
                    <input className="w-full px-2 py-1 border border-neutral-300 rounded-md" name="nominee_lastname" value={nomineeData.nominee_lastname} onChange={handleNomineeChange} placeholder="Last" required />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Relationship <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <select className="w-full px-3 py-1.5 border border-neutral-300 rounded-md bg-white" name="relationship" value={nomineeData.relationship} onChange={handleNomineeChange} required>
                    <option value="" disabled>Select Relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Wife">Wife</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Nominee DOB / Mobile <span className="text-red-500">*</span></td>
                <td className={tdInput}>
                  <div className="flex gap-2">
                    <input type="date" className="w-full px-2 py-1 border border-neutral-300 rounded-md" name="nomineeDob" value={nomineeData.nomineeDob} onChange={handleNomineeChange} required />
                    <input className="w-full px-2 py-1 border border-neutral-300 rounded-md" name="nomineeMobile" value={nomineeData.nomineeMobile} onChange={handleNomineeChange} placeholder="Mobile" required />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center p-6 bg-gray-50 border-t border-neutral-300">
            {loading ? (
              <button disabled className="px-8 py-2 bg-[#06c] text-white rounded-md text-sm shadow-md flex items-center gap-2 opacity-70">
                <Loader2 size={18} className="animate-spin" /> Registering...
              </button>
            ) : (
              <button type="submit" className="px-8 py-2 bg-[#004f9e] hover:bg-[#06c] transition-all text-white rounded-md text-sm shadow-md">
                Register Customer
              </button>
            )}
          </div>
        </form>

        <UserManagement data={userEntriesData} setUserEntriesData={setUserEntriesData} />
      </div>
    </Layout>
  );
};

export default ApplicationForm;