import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { userEntry } from "../api/endpoint";
import { X } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
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


  const [nomineeData, setNomineeData] = useState({
    nomineeName: "",
    relationship: "",
    nomineeDob: "",
    nomineeMobile: "",
  });

  const [preview, setPreview] = useState({
    pan_image: null,
    aadhar_image: null,
  });

  /* USER HANDLER */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* NOMINEE HANDLER — FIXED */
  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    setPreview((prev) => ({
      ...prev,
      [name]: files[0].name,
    }));
  };

  const removePanImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFormData((prev) => ({
      ...prev,
      pan_image: null,
    }));

    setPreview((prev) => ({
      ...prev,
      pan_image: null,
    }));
  };

  const removeAadharImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFormData((prev) => ({
      ...prev,
      aadhar_image: null,
    }));

    setPreview((prev) => ({
      ...prev,
      aadhar_image: null,
    }));
  };


  useEffect(() => {
    return () => {
      Object.values(preview).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // User
    data.append("name", formData.username);
    data.append("mobile_no", formData.mobile);
    data.append("dob", formData.dob);
    data.append("email", formData.email);
    data.append("permanent_address", formData.address);
    data.append("pincode", formData.pincode);
    data.append("pancard_no", formData.pan);
    data.append("aadharcard_no", formData.aadhar);

    if (formData.pan_image) data.append("pan_image", formData.pan_image);
    if (formData.aadhar_image) data.append("aadhar_image", formData.aadhar_image);

    // Nominee
    data.append("nominee_name", nomineeData.nomineeName);
    data.append("nominee_mobile", nomineeData.nomineeMobile);
    data.append("nominee_dob", nomineeData.nomineeDob);
    data.append("relationship", nomineeData.relationship);

    const response = await userEntry(data);
    console.log(response);
  };


  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white border border-neutral-300 rounded-md p-6">
        <h1 className="text-lg font-medium mb-6">Application Form</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {/* Name */}
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>

            {/* Mobile */}
            <div className="w-full">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                required
                placeholder="Mobile Number"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            {/* Email */}
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>

            {/* DOB */}
            <div className="w-full">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                placeholder="Date of birth"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Permanent Address"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength="6"
              required
              placeholder="Pin Code"
              className="w-104 mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>

          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col w-full ">
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                required
                placeholder="PAN number"
                className="w-full mt-1 px-3 py-1 uppercase border border-neutral-300 rounded-md text-sm placeholder:lowercase"
              />

              <label htmlFor="pan_image" className="cursor-pointer mt-4 text-center w-full">
                {preview.pan_image ? (
                  <span className="text-xs text-green-600 break-all relative">
                    {preview.pan_image}
                    <button onClick={removePanImage} className="absolute ms-3"><X size={14} /></button>
                  </span>
                ) : (
                  <input
                    id="pan_image"
                    type="file"
                    accept="image/*"
                    name="pan_image"
                    className="text-xs"
                    onChange={handleImageChange}
                  />
                )}

              </label>
            </div>

            {/* Aadhar */}
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                maxLength="12"
                required
                placeholder="Aadhar Number"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm ms-auto"
              />

              <label htmlFor="aadhar_image" className="cursor-pointer mt-4 text-center">
                {preview.aadhar_image ? (
                  <span className="text-xs text-green-600 break-all relative">
                    {preview.aadhar_image}
                    <button onClick={removeAadharImage} className="absolute ms-3"><X size={14} /></button>
                  </span>
                ) : (
                  <input
                    id="aadhar_image"
                    type="file"
                    accept="image/*"
                    name="aadhar_image"
                    className="text-xs"
                    onChange={handleImageChange}
                  />
                )}

              </label>
            </div>
          </div>

          <div className="text-lg md:col-span-2 border-t border-neutral-300 pt-4 flex flex-col gap-3">
            <h2 className="font-medium mb-2">Nominee Details</h2>

            <input
              name="nomineeName"
              placeholder="Nominee Name"
              value={nomineeData.nomineeName}
              onChange={handleNomineeChange}
              className="border border-neutral-300 px-3 py-1 rounded w-full mb-2 text-sm"
            />

            <input
              name="relationship"
              placeholder="Relationship"
              value={nomineeData.relationship}
              onChange={handleNomineeChange}
              className="border border-neutral-300 px-3 py-1 rounded w-full mb-2 text-sm"
            />

            <input
              type="date"
              name="nomineeDob"
              value={nomineeData.nomineeDob}
              onChange={handleNomineeChange}
              className="border border-neutral-300 px-3 py-1 rounded w-full mb-2 text-sm text-neutral-500"
            />

            <input
              name="nomineeMobile"
              placeholder="Nominee Mobile Number"
              value={nomineeData.nomineeMobile}
              onChange={handleNomineeChange}
              className="border border-neutral-300 px-3 py-1 rounded w-full text-sm"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-1 bg-[#1d85ed] text-white rounded-md"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
