import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { userEntry } from "../api/endpoint";
import { X } from "lucide-react";

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
    // const fullName =
    //   `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
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

    // Nominee
    // const nomineeName =
    //   `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
    data.append("nominee_firstname", nomineeData.nominee_firstname);
    data.append("nominee_middlename", nomineeData.nominee_middlename);
    data.append("nominee_lastname", nomineeData.nominee_lastname);
    data.append("nominee_mobile", nomineeData.nomineeMobile);
    data.append("nominee_dob", nomineeData.nomineeDob);
    data.append("relationship", nomineeData.relationship);

    const response = await userEntry(data);
    console.log(response);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto border border-neutral-300 rounded-md p-6 bg-gray-50">
        

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full bg-white px-5 py-3 shadow-lg rounded-md">
          {/* User Name */}
          <h1 className="text-lg font-medium mb-6">Application Form</h1>
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
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

          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
                required
                placeholder="Pin Code"
                className=" w-full px-3 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>
            <div className="flex items-center w-full gap-3">
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                required
                placeholder="PAN number"
                className="w-full px-3 py-1 uppercase border border-neutral-300 rounded-md text-sm placeholder:lowercase"
              />
            </div>

            {/* Aadhar */}
            <div className="flex items-center gap-3 w-full">
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                maxLength="12"
                required
                placeholder="Aadhar Number"
                className="w-full px-3 py-1 border border-neutral-300 rounded-md text-sm ms-auto"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 py-1">
            <label
              htmlFor="pan_image"
              className="cursor-pointer flex items-center relative border border-neutral-300 rounded-md px-3 py-1 w-81 text-sm text-neutral-500"
            >
              {!preview.pan_image ? (
                <>
                  <span>Upload PAN Image</span>
                  <input
                    id="pan_image"
                    type="file"
                    accept="image/*"
                    name="pan_image"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </>
              ) : (
                <span className="flex items-center gap-2 text-green-600 w-full break-all rounded-md">
                  {preview.pan_image}
                  <button onClick={removePanImage} type="button">
                    <X size={14} />
                  </button>
                </span>
              )}
            </label>

            <label
              htmlFor="aadhar_image"
              className="cursor-pointer flex items-center relative border border-neutral-300 rounded-md px-3 py-1 w-80 text-sm text-neutral-500"
            >
              {!preview.aadhar_image ? (
                <>
                  <span>Upload Aadhar Image</span>
                  <input
                    id="aadhar_image"
                    type="file"
                    accept="image/*"
                    name="aadhar_image"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </>
              ) : (
                <span className="flex items-center gap-2 text-green-600 w-full break-all text-sm rounded-md">
                  {preview.aadhar_image}
                  <button onClick={removeAadharImage} type="button">
                    <X size={14} />
                  </button>
                </span>
              )}
            </label>
          </div>

          <div className="text-lg md:col-span-2 border-t border-neutral-300 pt-4 flex flex-col gap-3">
            <h2 className="font-medium mb-2">Nominee Details</h2>
            <div className="flex w-full items-center gap-4">
              <input
                name="nominee_firstname"
                placeholder="Nominee First Name"
                value={nomineeData.nominee_firstname}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full  text-sm"
              />
              <input
                name="nominee_middlenamee"
                placeholder="Nominee Middle Name"
                value={nomineeData.nominee_middlename}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full text-sm"
              />
              <input
                name="nominee_lastname"
                placeholder="Nominee Last Name"
                value={nomineeData.nominee_lastname}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full  text-sm"
              />
            </div>
            <div className="flex w-full items-center gap-4">
              <input
                name="relationship"
                placeholder="Relationship"
                value={nomineeData.relationship}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full text-sm"
              />

              <input
                type="date"
                name="nomineeDob"
                value={nomineeData.nomineeDob}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full  text-sm text-neutral-500"
              />

              <input
                name="nomineeMobile"
                placeholder="Nominee Mobile Number"
                value={nomineeData.nomineeMobile}
                onChange={handleNomineeChange}
                className="border border-neutral-300 px-3 py-1 rounded w-full text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-1 bg-[#1d85ed] text-white rounded-md text-sm shadow-md"
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
