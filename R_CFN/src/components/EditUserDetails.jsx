import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

const EditUserDetails = ({ user, onClose, getUserEntries }) => {
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

  useEffect(() => {
    if (!user) return;
    const nominee = user.nominees?.[0] || {};
    setFormData({
      firstName: user.firstname || "",
      middleName: user.middlename || "",
      lastName: user.lastname || "",
      mobile: user.mobile_no || "",
      dob: user.dob || "",
      email: user.email || "",
      address: user.permanent_address || "",
      pincode: user.pincode || "",
      pan: user.pancard_no || "",
      aadhar: user.aadharcard_no || "",
      pan_image: null,
      aadhar_image: null,
    });

    setNomineeData({
      nominee_firstname: nominee.firstname || "",
      nominee_middlename: nominee.middlename || "",
      nominee_lastname: nominee.lastname || "",
      relationship: nominee.relationship || "",
      nomineeDob: nominee.dob || "",
      nomineeMobile: nominee.mobile_no || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files?.[0]) return;

    setFormData((p) => ({ ...p, [name]: files[0] }));
    setPreview((p) => ({ ...p, [name]: files[0].name }));
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
    if (formData.aadhar_image)
      data.append("aadhar_image", formData.aadhar_image);

    data.append("nominee_firstname", nomineeData.nominee_firstname);
    data.append("nominee_middlename", nomineeData.nominee_middlename);
    data.append("nominee_lastname", nomineeData.nominee_lastname);
    data.append("nominee_mobile", nomineeData.nomineeMobile);
    data.append("nominee_dob", nomineeData.nomineeDob);
    data.append("relationship", nomineeData.relationship);

    

    if (getUserEntries) {
      await getUserEntries();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-7xl rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 w-full  px-5 py-3 bg-slate-50 shadow-sm rounded-md">Update User Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
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

                  <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                    Upload
                    <input
                      type="file"
                      hidden
                      name="pan_image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
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

                  <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                    Upload
                    <input
                      type="file"
                      hidden
                      name="aadhar_image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
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
          <div className="border-t border-neutral-300 flex flex-col gap-4 mt-4">
            <h2 className="text-lg font-medium mt-4 w-full text-start px-5 py-3 shadow-sm bg-slate-50 rounded-md text-neutral-800 tracking-tight">
              Nominee Details
            </h2>

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

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-0.5 border rounded text-sm"
            >
              Cancel
            </button>

            {loading ? (
                <button
              type="submit"
              className="px-4 py-1 bg-[#ed1d25] hover:bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2"
            ><Loader2 size={14} className="animate-spin"/>
              Updateing
            </button>
            ) : (
                <button
              type="submit"
              className="px-4 py-1 bg-[#ed1d25] hover:bg-red-700 transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md"
            >
              Update
            </button>
            )
        }
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;