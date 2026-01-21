import { useState } from "react";
import Layout from "../components/layout";

const AgreementOfChit = () => {
  const [formData, setFormData] = useState({
    srNo: "",
    branch: "",
    byelawNo: "",
    date: "",
    conductsOfChit: "",
    fullName: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agreement Data:", formData);
    // API call can be added here
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-[#004c9e] text-white px-4 py-1 rounded-t flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold">Agreement of Chit</h2>

        <div className="flex items-center gap-2 text-sm">
          <label>
            Sr. No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="srNo"
            value={formData.srNo}
            onChange={handleChange}
            placeholder="Enter Sr. No."
            className="border border-neutral-400 rounded px-3 py-1 text-sm text-white"
            required
          />
        </div>
      </div>

      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white text-sm rounded-b-md border border-neutral-300"
      >
        <div className="px-5 py-2 flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Branch */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              >
                <option value="">Select Branch</option>
                <option value="Main">Main</option>
                <option value="City">City</option>
              </select>
            </div>

            {/* Bye Law No */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Bye Law No. <span className="text-red-500">*</span>
              </label>
              <input
                name="byelawNo"
                value={formData.byelawNo}
                onChange={handleChange}
                placeholder="Bye Law Number"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Conducts of Chit */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Conducts of Chit <span className="text-red-500">*</span>
              </label>
              <input
                name="conductsOfChit"
                value={formData.conductsOfChit}
                onChange={handleChange}
                placeholder="Conducts of Chit"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>
          </div>
        </div>
        <div className="bg-[#004c9e] text-white px-4 py-1  flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Schedule</h2>
        </div>

        <div className="px-5  border-neutral-200 flex flex-col">
          <label>
            Full Name and Address<span className="text-red-500">*</span>
          </label>
          <textarea
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name and Address"
            className="w-full  px-3 py-1 border border-neutral-300 rounded-md text-sm"
            required
          />
        </div>
        <div className="flex w-full px-5  border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              No. of Tickets <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              No. of Installments <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Amount per Ticket per Installments{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>
        </div>
        <div className="flex w-full px-5 border-neutral-200 gap-4 ">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Series and per Chits No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Chits Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Time of Auction <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              placeholder="Time of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Day of Auction <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Day of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Last date for Payment of Installment is <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Last Date of Installment"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-4 pb-4">
          <button
            type="submit"
            className="px-6 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 text-white rounded-md text-sm shadow-md"
          >
            Save Agreement
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AgreementOfChit;
