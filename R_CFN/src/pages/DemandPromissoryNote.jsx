import dayjs from "dayjs";
import React from "react";

import { numberToWords } from "amount-to-words";
const DemandPromissoryNote = ({ chit, user, chitAgreement, bidAgreement, gurantor, gurantor2 }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[16px] leading-6 ">
        {/* TOP RIGHT CIN */}
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

        {/* TITLE BAR */}
        <div className="bg-black text-white text-center text-[13px] font-bold py-[3px] mt-2">
          DEMAND PROMISSORY NOTE
        </div>

        {/* DATE */}
        <div className="flex justify-end mt-3">
          <span className="mr-2">Date :</span>
          <input className="border-b border-black w-48 outline-none bg-transparent text-center" disabled value={bidAgreement?.dateofAuction ? dayjs(bidAgreement?.dateofAuction).format("DD MMM YYYY") : ""} />
        </div>

        {/* CHIT REF + DATE */}
        <div className="flex justify-between mt-3">
          <div className="flex items-center">
            <span className="mr-2">CHIT REF :</span>
            <input className="border-b border-black w-60 outline-none bg-transparent text-center uppercase " disabled value={`${chit?.GroupCode} / ${chit?.TicketNmber}`} />
          </div>
        </div>

        {/* 1 */}
        <div className="mt-4 flex w-full items-center">
          <span className="w-40">1. On Demand I/We</span>
          <input className="border-b border-black ml-3 w-[650px] outline-none bg-transparent text-center" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
        </div>

        {/* 2 */}
        <div className="mt-3 flex items-center">
          <span className="w-40">2.Collective Add -</span>
          <textarea className="border-b border-black ml-3 w-[667px] outline-none bg-transparent resize-none text-sm" readOnly value={user?.permanent_address} />
        </div>

        {/* TEXT */}
        <p className="mt-3 text-[15px] leading-6 text-justify">
          Jointly and severally promise to <b> KARDE KRISHNA CHITS PRIVATE LIMITED</b> a
          company Near in corporate under companies act 1956, having its
          registered office at <b>Plot No. 7, Gut No. 216 Holakar Chauk Satara
            Parisar Chh. Sambhajinagar 431001</b>
        </p>

        {/* AMOUNT */}
        <div className="mt-3 flex items-center">
          <span>Or wherever demand the sum of</span>
          <input className="border-b border-black mx-3 w-130 outline-none bg-transparent text-center" value={`${numberToWords(chit?.ChitValue)} Rupees`} />
        </div>

        {/* BAR */}
        <div className="font-bold">
          AFTER THE DEDUCTION OF FILE CHARGES VERIFICATION CHARGES AND DOCUMENTATION
          CHARGES
        </div>

        {/* INTEREST TEXT */}
        <p className="mt-3 text-[15px] leading-6">
          Payable with interest @18% per annum, being my/our liability to <b>Karde
            Krishna Chits Private Limited Chh.Sambhajinagar </b>in respect of Ticket
          number
          <input className="border-b border-black mx-2 w-28 outline-none bg-transparent text-center" disabled value={chit?.TicketNmber} />
          in Group Number
          <input className="border-b border-black mx-2 w-28 outline-none bg-transparent text-center uppercase" disabled value={chit?.GroupCode} />
          for the value received.
        </p>

        {/* RS BOX */}
        <div className="mt-4 border border-black w-44 h-10 flex items-center px-2 font-semibold">
          Rs.
          <input className="outline-none ml-2 bg-transparent w-28 " disabled value={chit.ChitValue} />/-
        </div>

        {/* SIGNATURES */}
        <div className="mt-10 space-y-8 mx-10">
          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>

          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled value={`${gurantor?.firstname} ${gurantor?.middlename} ${gurantor?.lastname} `} />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>

          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled value={
              gurantor2
                ? `${gurantor2?.firstname || ""} ${gurantor2?.middlename || ""} ${gurantor2?.lastname || ""}`
                : ""
            } />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemandPromissoryNote;
