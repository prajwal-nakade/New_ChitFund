import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router";
import { getChitAgreementbyID } from "../api/endpoint";
import { ShipWheel } from "lucide-react";
import MeetingMinutesForm from "./MeetingMinutesForm";
import dayjs from "dayjs";
import PromissoryNote from "./PromissoryNote";
import DemandPromissoryNote from "./DemandPromissoryNote";
import GuaranteeAgreement from "./GuaranteeAgreement";

const AuthenticationForm = () => {
  const { id } = useParams();
  const [chitAgreementData, setChitAgreementData] = useState(null);

  const fetchChitAgreementData = async () => {
    const data = await getChitAgreementbyID(id);
    setChitAgreementData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchChitAgreementData();
  }, []);

  if (!chitAgreementData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto print-container">
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

  const chit = chitAgreementData?.chit;
  const user = chitAgreementData.chit.user;
  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return `${day}th`; // 11th–19th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white border border-black p-6 text-[16px] ">
        {/* CIN */}
        <div className="text-end text-xs">CIN NO.U64990MH2023PTC400938</div>

        {/* HEADER */}
        <div className="flex items-center mt-2">
          <img src="/Logo2.png" alt="" className="w-20" />

          <div className="mx-auto text-center w-full flex flex-col items-center">
            <img src="/Logo.png" alt="" className="w-72" />
            <p className="text-xs mt-1">
              Plot No.7, Gut No.216, Satara Road, Near Ahilyabai Holkar Chauk,
              Satara Parisar, Chh. Sambhajinagar.
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="w-full text-center py-1 bg-black text-white font-bold mt-4">
          BID AUTHORISATION CUM OFFER FORM
        </div>

        {/* DATE + REF */}
        <div className="flex justify-end mt-4 space-y-2 flex-col items-end">
          <div className="flex items-center">
            <label className="mr-2">Date :</label>
            <input
              disabled
              value={dayjs(chit.BylawsDate).format("DD MMM YYYY")}
              type="text"
              className="border-b border-black w-48 outline-none text-center bg-transparent"
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2">Chit REF :</label>
            <input
              disabled
              type="text"
              className="border-b border-black w-48 outline-none text-center bg-transparent"
              value={chit.GroupCode}
            />
          </div>
        </div>

        {/* COMPANY */}
        <div className="mt-4">
          <p>
            The,
            <br />
            <b>KARDE KRISHNA CHITS PRIVATE LIMITED</b>
          </p>

          <div className="flex items-center mt-2">
            <label className="mr-2">Branch :</label>
            <input
              disabled
              value={chit.branchName}
              type="text"
              className="border-b border-black w-64 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* BODY */}
        <div className="mt-4 space-y-4">
          <p>Dear Sir,</p>

          {/* POINT 1 */}
          <div>
            <p className="font-semibold">
              • I wish to inform you that I would not be able to personally
              attend and participate in the auction
              <p className="lg:ms-2">
                relation to the above group to be held on
                <input
                  type="text"
                  disabled
                  value={dayjs(chit.BylawsDate).format("DD MMM YYYY")}
                  className="border-b border-black w-72 outline-none bg-transparent mt-1 text-center font-normal"
                />
              </p>
            </p>
          </div>
          <div>
            <p className="font-semibold">
              • I therefore request you to please allow
              <p className="lg:ms-2">
                who is hereby authorized to bid on my behalf and whose signature
                is attended below:
              </p>
              <p className="lg:ms-2">
                Signature of Representative
                <input
                  type="text"
                  disabled
                  className="border-b border-black w-72 outline-none bg-transparent mt-1 text-center font-normal"
                />
              </p>
            </p>
          </div>

          {/* POINT 2 */}
          <div className="flex flex-wrap items-center font-semibold">
            <span>
              • I request you accept my bid offer in which I am ready to forego
              up to Rs.
            </span>

            <span className="border-b border-black w-28 mx-2 outline-none bg-transparent font-normal text-center">
              {chit.ChitValue}/-
            </span>

            <span className="lg:ms-2">for the month of</span>

            <input
              disabled
              value={dayjs(chit.BylawsDate).format("MMMM YYYY")}
              type="text"
              className="border-b border-black w-40 ml-2 outline-none bg-transparent font-normal text-center"
            />
          </div>

          {/* DECLARATION */}
          <p>
            I do hereby agree that if I am declared as Successful Bidder, I
            would provide sureties to the satisfaction of the Company and bidder
            in accordance with company's rules.
          </p>

          <div className="w-full flex justify-between items-center">
            <span>Thanking you.</span>
            <span>Your's faithfully</span>
          </div>
        </div>

        {/* NAME + ADDRESS */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <label className="mr-2">Name :</label>
            <input
              type="text"
              value={`${user.firstname} ${user.middlename} ${user.lastname}`}
              className="font-medium border-b border-black w-153 outline-none bg-transparent"
              disabled
            />
          </div>

          <div className="flex w-full">
            <label className="mr-2 w-20">Address :</label>
            <textarea
              disabled
              value={user.permanent_address}
              type="text"
              className="border-b border-black outline-none bg-transparent w-full"
            />
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="flex justify-end py-2 ">
          <div className="text-center">
            <p className="text-sm mt-1">Signature</p>
            <input
              type="text"
              className="border-b border-black w-56 outline-none bg-transparent mt-5"
            />
          </div>
        </div>

        {/* COMPANY REMARKS */}
        <div className="border border-black mt-8 p-3">
          <p className="font-semibold text-center mb-5">Company's Remarks.</p>

          <div className="flex justify-between items-center py-5">
            <div>
              Signature Verified
              <input className="border-b border-black w-32 ml-2 outline-none bg-transparent" />
            </div>

            <div>
              Prized On
              <input className="border-b border-black w-32 ml-2 outline-none bg-transparent" />
            </div>

            <div className="px-4">Foreman</div>
          </div>
        </div>
      </div>
      <MeetingMinutesForm chit={chit} user={user} chitAgreementData={chitAgreementData}/>
      <PromissoryNote/>
      <DemandPromissoryNote/>
      <GuaranteeAgreement/>
    </Layout>
  );
};

export default AuthenticationForm;
