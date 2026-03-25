import React from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom"; // 1. Added this import

const BidAgreementDetails = () => {
  const navigate = useNavigate(); // 2. Initialized the navigate hook

  // 3. Added the submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/authenticationform/3");
  };

  const tableRowClass =
    "border-b border-neutral-200 last:border-none hover:bg-gray-50 transition-colors";
  const labelCellClass =
    "w-1/3 bg-neutral-50 px-6 py-4 text-sm font-semibold text-neutral-700 border-r border-neutral-200";
  const inputCellClass = "px-6 py-3";
  const inputClass =
    "w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-[#004f9e] outline-none";
  const fileBtnClass =
    "px-3 py-1 border border-neutral-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 shadow-inner text-xs whitespace-nowrap";

  return (
    <Layout>
      <div className="max-w-6xl mx-auto rounded-md p-15">
        <h1 className="text-lg font-medium w-full text-start px-5 py-2 rounded-t-md bg-[#004f9e] text-white tracking-tight">
          Bid Agreement Details
        </h1>

        {/* 4. Added onSubmit={handleSubmit} to the form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-b-md border border-neutral-300 overflow-hidden">
          <table className="w-full border-collapse">
            <tbody>
              {/* --- Basic Details --- */}
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Date of Auction <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Chit Ref <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    placeholder="Chit Ref"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Total Bid Amount (Bid Offer){" "}
                  <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="number"
                    placeholder="Total Bid Amount"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Auction Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    placeholder="Auction Number"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Prized Amount <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="number"
                    placeholder="Prized Amount"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Dividend <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="number"
                    placeholder="Dividend"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Total Members of Group <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="number"
                    placeholder="Total Members of Group"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Surety Papers Received From p/s On{" "}
                  <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Sureties Verified On <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Date of Payment Prized Amount{" "}
                  <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Cheque Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    placeholder="Cheque Number"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Cheque Date <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Bank <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Forman's Commission <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="number"
                    placeholder="Forman's Commission"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Debit Bank Name <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    type="text"
                    placeholder="Debit Bank Name"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>

              {/* --- Guarantor KYC Section Header --- */}
              <tr>
                <td
                  colSpan="2"
                  className="bg-[#004c9e] text-white px-5 py-2 text-lg font-semibold"
                >
                  Guarantor KYC
                </td>
              </tr>

              {/* --- Guarantor 1 --- */}
              <tr className="bg-neutral-100">
                <td colSpan="2" className="px-5 py-2 font-bold">
                  Guarantor 1
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Full Name <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex gap-2">
                    <input
                      placeholder="First"
                      className={inputClass}
                      required
                    />
                    <input
                      placeholder="Middle"
                      className={inputClass}
                      required
                    />
                    <input placeholder="Last" className={inputClass} required />
                  </div>
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Date of Birth <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass} required />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Mobile Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    placeholder="Mobile Number"
                    className={inputClass}
                    required
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  PAN Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="PAN"
                      className={`${inputClass} uppercase`}
                      required
                    />
                    <label className={fileBtnClass}>
                      PAN Front
                      <input
                        type="file"
                        hidden
                        accept=".png,.jpg,.jpeg"
                        name="pan_image"
                      />
                    </label>
                  </div>
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Aadhar Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex flex-col gap-2">
                    <input
                      name="aadhar"
                      placeholder="Enter your 12 digit Aadhar number"
                      className={inputClass}
                      required
                    />
                    <div className="flex gap-2">
                      <label className={fileBtnClass}>
                        Aadhaar Front{" "}
                        <input type="file" hidden name="aadhar_image" />
                      </label>
                      <label className={fileBtnClass}>
                        Aadhaar Back{" "}
                        <input type="file" hidden name="aadhar_image_back" />
                      </label>
                    </div>
                  </div>
                </td>
              </tr>

              {/* --- Guarantor 2 --- */}
              <tr className="bg-neutral-100 border-t border-neutral-300">
                <td colSpan="2" className="px-5 py-2 font-bold">
                  Guarantor 2
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Full Name <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex gap-2">
                    <input
                      placeholder="First"
                      className={inputClass}
                      
                    />
                    <input
                      placeholder="Middle"
                      className={inputClass}
                      
                    />
                    <input placeholder="Last" className={inputClass} />
                  </div>
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Date of Birth <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input type="date" className={inputClass}  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Mobile Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <input
                    placeholder="Mobile Number"
                    className={inputClass}
                    
                  />
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  PAN Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="PAN"
                      className={`${inputClass} uppercase`}
                      
                    />
                    <label className={fileBtnClass}>
                      PAN Front
                      <input
                        type="file"
                        hidden
                        accept=".png,.jpg,.jpeg"
                        name="pan_image"
                      />
                    </label>
                  </div>
                </td>
              </tr>
              <tr className={tableRowClass}>
                <td className={labelCellClass}>
                  Aadhar Number <span className="text-red-500">*</span>
                </td>
                <td className={inputCellClass}>
                  <div className="flex flex-col gap-2">
                    <input
                      name="aadhar"
                      placeholder="Enter your 12 digit Aadhar number"
                      className={inputClass}
                      
                    />
                    <div className="flex gap-2">
                      <label className={fileBtnClass}>
                        Aadhaar Front{" "}
                        <input type="file" hidden name="aadhar_image" />
                      </label>
                      <label className={fileBtnClass}>
                        Aadhaar Back{" "}
                        <input type="file" hidden name="aadhar_image_back" />
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center py-6 bg-neutral-50 border-t border-neutral-200">
            <button
              type="submit"
              className="px-10 py-2 bg-[#004f9e] hover:bg-[#06c] transition-all text-white rounded-md text-sm font-medium shadow-md"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BidAgreementDetails;