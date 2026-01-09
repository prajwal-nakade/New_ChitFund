import { useState } from "react";
import Layout from "../components/layout";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    dob: "",
    address: "",
    pincode: "",
    pan: "",
    aadhar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (formData.aadhar.length !== 12) {
      alert("Aadhar number must be 12 digits");
      return;
    }

    console.log("Submitted Data:", formData);
    alert("Application submitted successfully");
  };

  return (
    <Layout>
    <div className="max-w-4xl mx-auto bg-white border border-neutral-300 rounded-md p-6">
      <h1 className="text-lg font-medium mb-6">Application Form</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-1.5 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium">Mobile No.</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
            required
            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="text-sm font-medium">Pin Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength="6"
            required
            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Permanent Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* PAN */}
        <div>
          <label className="text-sm font-medium">PAN Number</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="Enter PAN No. Here"
            required
            className="w-full mt-1 px-3 py-1 uppercase border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* Aadhar */}
        <div>
          <label className="text-sm font-medium">Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            maxLength="12"
            required
            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md outline-none focus:ring-1"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-1 bg-[#1d85ed] text-white rounded-md hover:opacity-90 transition"
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
