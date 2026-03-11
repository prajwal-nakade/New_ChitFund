import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router";
import { getChitbyID } from "../api/endpoint";
import { ShipWheel } from "lucide-react";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";

const ChitPrintPreview = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL

  const { id } = useParams();
  const [chitDetails, setChitDetails] = useState(null);



  const ref = useRef();
  const handleDownload = useReactToPrint({
  contentRef: ref,
  pageStyle: `
    @page {
      size: A4;
      margin: 8mm;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
        font-family: Arial, sans-serif;
        font-size: 12px;
      }

      .print-container {
        padding: 0;
        margin: 0;
      }

      /* ✅ FORCE NEW PAGE */
      .print-page-break {
        break-before: page;
        page-break-before: always; /* fallback for older browsers */
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }
  `,
});

  useEffect(() => {
    const fetchChitDetail = async () => {
      const data = await getChitbyID(id);
      setChitDetails(data);
      console.log(data);
    };

    fetchChitDetail();
  }, [id]);





  if (!chitDetails || !chitDetails.user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex items-center gap-2 text-neutral-500">
              <ShipWheel size={18} className="animate-spin" />{" "}
              <span>Loading chit details...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const user = chitDetails.user;
  const nominee = user.nominees?.[0];
  const dob = chitDetails.user.dob; // "1999-12-12"

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  const chitAmt = chitDetails.ChitValue
  const chitDuration = chitDetails.Duration
  let installmentAmt = chitAmt / chitDuration
  console.log(installmentAmt)

  return (
    <Layout>
      <div className="print-container">
        <div ref={ref} className="p-6">
          <div className="text-end text-xs text-gray-600">
            <p>CIN NO.U64990MH2023PTC400938</p>
          </div>
          <div className="flex items-center justify-center w-full  ">
            <img src="/Logo2.png" alt="" width={100} />
            <div className="mx-auto text-center mb-4 pt-2 flex flex-col justify-center items-center w-full">
              <img src="/Logo.png" alt="" width={300} />
              <div className="text-xs pt-2">
                <p>
                  Plot No.7, Gut No.216, Satara Road, Near Ahilyabai Holkar
                  Chauk, Satara Parisar, Chh. Sambhajinagar.
                </p>
              </div>
            </div>
          </div>
          {/* Header Section */}

          {/* Application Form Title - Blue Background */}
          <div className="w-full text-center py-1 bg-neutral-800 text-white mb-4">
            <h1 className="text-base font-bold">Application Form</h1>
          </div>

          {/* Form Details Section */}
          <div className="mb-4">
            <div className="flex justify-between mb-2 gap-4">
              <div className="flex items-center w-1/3">
                <label className="w-40 text-sm font-medium">Byelaws No.:</label>
                <div className="border-b border-gray-800 w-full text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.ByLawsNumber}
                  </span>
                </div>
              </div>
              <div className="flex items-center w-1/3">
                <label className="w-50 text-sm font-medium">Byelaws Date:</label>
                <div className="border-b border-gray-800 w-full text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.BylawsDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-28 text-sm font-medium">Group Code:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.GroupCode}
                  </span>
                </div>
              </div>


            </div>

            <div className="flex justify-between">
              <div className="flex items-center w-1/3">
                <label className="w-20 text-sm font-medium">TKT No.:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.TicketNmber}
                  </span>
                </div>
              </div>
              <div className="flex items-center w-1/3">
                <label className="w-24 text-sm font-medium">Chit Value:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.ChitValue}
                  </span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-18 text-sm font-medium">Duration:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">{`${chitDetails.Duration} ${chitDetails.DurationCategory}`}</span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-16 text-sm font-medium">Branch:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {chitDetails.branchName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="mb-4 border-t-2 pt-3">
            <p className="text-sm mb-2">Dear Sir,</p>
            <div className="text-xs mb-3">
              <p className="mb-2 text-justify ">
                I/We (Name of the Co./Firm/Enterprises if applicant not
                Individual)
                <input
                  value={`${user.firstname} ${user.lastname}`}
                  className="inline-block min-w-40 border-b border-gray-800 mx-1 text-center font-medium align-bottom outline-none"
                />
                Age
                <input className="inline-block min-w-4 border-b border-gray-800 mx-1 text-center align-bottom outline-none font-medium" value={age} />
                Son/Wife/daughter/Proprietor/proprietress/duly authorized
                attorney/ Mrs
                <input className="inline-block min-w-16 border-b border-gray-800 mx-1 text-center align-bottom outline-none font-medium" value={`${nominee.middlename} ${nominee.lastname}`} />
                Request you to reserve a membership/ Ticket in the above
                chit/kuri being floated by you/ I have remitted this day a sum
                of (Rupees
                <input className="inline-block min-w-16 border-b border-gray-800 mx-1 text-center align-bottom outline-none font-medium" value={installmentAmt.toFixed(2)} />
                only) being the first installment of the chit/kuri membership
                applied for. I/We have received and gone through a copy of the
                chit agreement cum bye-laws of the proposed chit/kuri being
                registered and conducted by you as FOREMAN COMPANY and I have
                read or caused to read / translated and understood the same.
                Knowing the conditions. Accordingly I am submitting here with,
                this bye law of proposed/floated chit agreement in duplicate
                duly filled and signed by me/us as required by you for
                registration of the chit under section 4 of the CHIT FUNDS ACT,
                1982 and Maharashtra Chit Fund Rule 2004. I/we do hereby declare
                to abide by and be bounded by the rules contained therein and
                well any further amendments that may be made from time to time.
              </p>
            </div>
          </div>

          {/* Personal Details Section - Blue Background */}
          <div className="mb-4">
            <div className="w-full text-center py-1 bg-neutral-800 text-white mb-3">
              <h1 className="text-base font-bold">
                Full Name and Correspondence Address
              </h1>
            </div>

            <div className="mb-2">
              <div className="flex items-center">
                <label className="w-16 text-sm font-medium">Name:</label>
                <div className="border-b border-gray-800 flex-1">
                  <span className="ml-1 font-medium text-sm">{`${user.firstname} ${user.middlename} ${user.lastname}`}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="flex items-center w-1/3">
                <label className="w-16 text-sm font-medium">Mob No.:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">{user.mobile_no}</span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-10 text-sm font-medium">DOB:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {dayjs(user.dob).format("DD MMM YYYY")}
                  </span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-14 text-sm font-medium">Email:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">{user.email===null ? 'N/A' : user.email}</span>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium">
                  Permanent Address:
                </label>
                <div className="border-b border-gray-800 flex-1">
                  <span className="ml-1 font-medium text-sm">
                    {user.permanent_address}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center w-1/3">
                <label className="w-20 text-sm font-medium">PIN Code:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">{user.pincode}</span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-20 text-sm font-medium">PAN No.:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">{user.pancard_no}</span>
                </div>
              </div>

              <div className="flex items-center w-1/3">
                <label className="w-24 text-sm font-medium">Aadhar No.:</label>
                <div className="border-b border-gray-800 flex-1 text-center">
                  <span className="font-medium text-sm">
                    {user.aadharcard_no}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nominee Details Section - Blue Background */}
          {nominee && (
            <div className="mb-4">
              <div className="w-full text-center py-1 bg-neutral-800 text-white mb-3">
                <h1 className="text-base font-bold">Nominee Details</h1>
              </div>

              <div className="mb-2">
                <div className="flex items-center">
                  <label className="w-16 text-sm font-medium">Name:</label>
                  <div className="border-b border-gray-800 flex-1">
                    <span className="ml-1 font-medium text-sm">{`${nominee.firstname} ${nominee.middlename} ${nominee.lastname}`}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center w-1/3">
                  <label className="w-28 text-sm font-medium">
                    Relationship:
                  </label>
                  <div className="border-b border-gray-800 flex-1 text-center">
                    <span className="font-medium text-sm">
                      {nominee.relationship}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-1/3">
                  <label className="w-10 text-sm font-medium">DOB:</label>
                  <div className="border-b border-gray-800 flex-1 text-center">
                    <span className="font-medium text-sm">
                      {dayjs(nominee.dob).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-1/3">
                  <label className="w-20 text-sm font-medium">Mob No.:</label>
                  <div className="border-b border-gray-800 flex-1 text-center">
                    <span className="font-medium text-sm">
                      {nominee.mobile_no}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Signature Section */}
          <div className="mt-6">
            <div className="w-full text-end">
              <div className="w-full border-t-2 py-2">
                <h1 className="text-md font-semibold  w-full text-start  text-neutral-800 tracking-tight">
                  Declaration cum Authority for Bidding at Maximum Discount
                </h1>
                <div className="  rounded-md  py-1">
                  <p className="text-xs tracking-wide text-neutral-600 text-justify">
                    <span className="ms-15"></span> I/We am/are willing to avail
                    prized value at maximum discount of 40% of the chit value
                    and here by authorize the Foreman company to include my/our
                    Name for the draw for first{" "}
                    <input className="border-b outline-none mx-1 font-semibold text-center" />{" "}
                    auction/draws.
                  </p>
                </div>
              </div>
              <p className="text-base font-medium mt-4">Yours Faithfully,</p>
            </div>
          </div>
          <div className="print-page-break flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
                <img src={`${BASE_URL}${user.aadhar_image}`} />
                <img src={`${BASE_URL}${user.aadhar_image_back}`} />
            </div>
          </div>

          <div className="print-page-break flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
                <img src={`${BASE_URL}${user.pan_image}`} />
                <img src={`${BASE_URL}${user.pan_image_back}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="w-full flex items-center justify-center mt-8">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-[#004f9e] text-sm rounded-md text-white hover:bg-[#06c] cursor-pointer transition-colors duration-200"
        >
          Print Application
        </button>
      </div>
    </Layout>
  );
};

export default ChitPrintPreview;