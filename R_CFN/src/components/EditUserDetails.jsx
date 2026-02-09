import { use, useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { updateUser } from "../api/endpoint";
import { toast } from "react-toastify";

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
    pan_image_back: null, // Add back image for PAN
    aadhar_image: null,
    aadhar_image_back: null, // Add back image for Aadhar
  });

  const [loading, setLoading] = useState(false);

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

  // Add state for back image previews
  const [backPreview, setBackPreview] = useState({
    pan_image_back: null,
    aadhar_image_back: null,
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
      email: user.email === null ? "N/A" : user.email || "",
      address: user.permanent_address || "",
      pincode: user.pincode || "",
      pan: user.pancard_no || "",
      aadhar: user.aadharcard_no || "",
      pan_image: null,
      pan_image_back: null,
      aadhar_image: null,
      aadhar_image_back: null,
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

  // Update handleImageChange to handle multiple files (front and back)
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0]; // only one file per button

    if (name === "pan_image") {
      setFormData((prev) => ({ ...prev, pan_image: file }));
      setPreview((p) => ({ ...p, pan_image: file?.name || null }));
    }

    if (name === "pan_image_back") {
      setFormData((prev) => ({ ...prev, pan_image_back: file }));
      setBackPreview((p) => ({ ...p, pan_image_back: file?.name || null }));
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

  // Add functions to remove back images
  const removePanBackImage = (e) => {
    e.preventDefault();
    setFormData((p) => ({ ...p, pan_image_back: null }));
    setBackPreview((p) => ({ ...p, pan_image_back: null }));
  };

  const removeAadharBackImage = (e) => {
    e.preventDefault();
    setFormData((p) => ({ ...p, aadhar_image_back: null }));
    setBackPreview((p) => ({ ...p, aadhar_image_back: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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
      // Add back images to FormData
      if (formData.pan_image_back)
        data.append("pan_image_back", formData.pan_image_back);
      if (formData.aadhar_image_back)
        data.append("aadhar_image_back", formData.aadhar_image_back);

      data.append("nominee_firstname", nomineeData.nominee_firstname);
      data.append("nominee_middlename", nomineeData.nominee_middlename);
      data.append("nominee_lastname", nomineeData.nominee_lastname);
      data.append("nominee_mobile", nomineeData.nomineeMobile);
      data.append("nominee_dob", nomineeData.nomineeDob);
      data.append("relationship", nomineeData.relationship);

      const response = await updateUser(user.id, data);
      console.log(response);
      if (response?.success) {
        toast.success(response.message || "User updated");

        if (getUserEntries) {
          await getUserEntries();
        }

        setTimeout(() => {
          onClose?.();
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-7xl rounded-lg p-4 sm:p-6 max-h-[95vh] overflow-y-auto">
        <h2 className="text-md font-semibold mb-2 w-full  px-5 py-2 bg-[#004f9e] text-white rounded-md">
          Update User Details
        </h2>

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
              <label>Email</label>
              <input
                className="w-full min-w-0 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
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

                  <div className="flex gap-2">
                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 text-xs whitespace-nowrap">
                      PAN Front
                      <input
                        type="file"
                        hidden
                        name="pan_image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>

                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 text-xs whitespace-nowrap">
                      PAN Back
                      <input
                        type="file"
                        hidden
                        name="pan_image_back"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Show both front and back images */}
                {(preview.pan_image || backPreview.pan_image_back) && (
                  <div className="flex flex-col gap-1 mt-1">
                    {preview.pan_image && (
                      <div className="flex items-center gap-2 text-green-600 text-xs">
                        <span className="truncate">
                          Front: {preview.pan_image}
                        </span>
                        <button type="button" onClick={removePanImage}>
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {backPreview.pan_image_back && (
                      <div className="flex items-center gap-2 text-green-600 text-xs">
                        <span className="truncate">
                          Back: {backPreview.pan_image_back}
                        </span>
                        <button type="button" onClick={removePanBackImage}>
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Show existing images if no new ones are uploaded */}
                {!preview.pan_image &&
                  !backPreview.pan_image_back &&
                  user.pan_image && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="text-green-600 text-xs truncate">
                        Front: {user.pan_image.split("/").pop()}
                      </div>
                      {user.pan_image_back && (
                        <div className="text-green-600 text-xs truncate">
                          Back: {user.pan_image_back.split("/").pop()}
                        </div>
                      )}
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

                  <div className="flex gap-2">
                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 text-xs whitespace-nowrap">
                      Aadhaar Front
                      <input
                        type="file"
                        hidden
                        name="aadhar_image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>

                    <label className="px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 text-xs whitespace-nowrap">
                      Aadhaar Back
                      <input
                        type="file"
                        hidden
                        name="aadhar_image_back"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Show both front and back images */}
                {(preview.aadhar_image || backPreview.aadhar_image_back) && (
                  <div className="flex flex-col gap-1 mt-1">
                    {preview.aadhar_image && (
                      <div className="flex items-center gap-2 text-green-600 text-xs">
                        <span className="truncate">
                          Front: {preview.aadhar_image}
                        </span>
                        <button type="button" onClick={removeAadharImage}>
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {backPreview.aadhar_image_back && (
                      <div className="flex items-center gap-2 text-green-600 text-xs">
                        <span className="truncate">
                          Back: {backPreview.aadhar_image_back}
                        </span>
                        <button type="button" onClick={removeAadharBackImage}>
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Show existing images if no new ones are uploaded */}
                {!preview.aadhar_image &&
                  !backPreview.aadhar_image_back &&
                  user.aadhar_image && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="text-green-600 text-xs truncate">
                        Front: {user.aadhar_image.split("/").pop()}
                      </div>
                      {user.aadhar_image_back && (
                        <div className="text-green-600 text-xs truncate">
                          Back: {user.aadhar_image_back.split("/").pop()}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4 mt-4">
            <h2 className="text-md font-medium mt-4 w-full text-start px-5 py-2 bg-[#004f9e]   rounded-md text-white tracking-tight">
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
                className="px-4 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md flex items-center gap-2"
              >
                <Loader2 size={14} className="animate-spin" />
                Updating
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 cursor-pointer text-white rounded-md text-sm shadow-md"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
