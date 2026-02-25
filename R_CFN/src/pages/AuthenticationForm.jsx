import React from "react";
import Layout from "../components/layout";
import MeetingMinutesForm from "./MeetingMinutesForm";

const AuthenticationForm = () => {
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
              type="text"
              className="border-b border-black w-48 outline-none text-center bg-transparent"
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2">Chit REF :</label>
            <input
              type="text"
              className="border-b border-black w-48 outline-none text-center bg-transparent"
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
              attend and participate in the auction relation to the above group
              to be held on
            </p>

            <input
              type="text"
              className="border-b border-black w-72 outline-none bg-transparent mt-1"
            />
          </div>

          {/* POINT 2 */}
          <div className="flex flex-wrap items-center font-semibold">
            <span>
              • I request you accept my bid offer in which I am ready to forego
              up to Rs.
            </span>

            <input
              type="text"
              className="border-b border-black w-28 mx-2 outline-none bg-transparent"
            />

            <span>for the month of</span>

            <input
              type="text"
              className="border-b border-black w-40 ml-2 outline-none bg-transparent"
            />
          </div>

          {/* DECLARATION */}
          <p>
            I do hereby agree that if I am declared as Successful Bidder, I
            would provide sureties to the satisfaction of the Company and bidder
            in accordance with company's rules.
          </p>

          <p>
            Thanking you,
            <br />
            Yours faithfully,
          </p>
        </div>

        {/* NAME + ADDRESS */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <label className="mr-2">Name :</label>
            <input
              type="text"
              className="border-b border-black w-153 outline-none bg-transparent"
            />
          </div>

          <div className="flex w-full">
            <label className="mr-2">Address :</label>
            <input
              type="text"
              className="border-b border-black w-150 outline-none bg-transparent"
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
      <MeetingMinutesForm />
    </Layout>
  );
};

export default AuthenticationForm;
