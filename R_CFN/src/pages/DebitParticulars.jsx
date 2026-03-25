import dayjs from "dayjs";
import React from "react";

const DebitParticulars = ({chit, user, chitAgreement, bidAgreement, gurantor }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-8 text-justify">
        {/* CIN */}
        <div className="text-end text-xs">CIN NO.U64990MH2023PTC400938</div>

        {/* HEADER */}
        <div className="flex items-center mt-2">
          <img src="/Logo2.png" alt="" className="w-20" />

          <div className="mx-auto text-center w-full flex flex-col items-center">
            <img src="/Logo.png" alt="" className="w-72" />
            <p className="text-xs mt-1">
              Plot No.7, Gut No.216 Satara Road Near Ahilyabai Holkar Chauk
              Satara Parisar Chh.Sambhajinagar.
            </p>
          </div>
        </div>
        <div className="bg-black text-white text-center text-[13px] font-bold py-[3px] mt-3">
          DEBIT PARTICULARS
        </div>

        <div className="flex justify-between">
          <div className="flex ">
            <p>CHIT REF :</p>
            <input className="border-b border-black w-64 outline-none bg-transparent text-center uppercase" disabled value={chit?.GroupCode} />
          </div>
          <div className="flex">
            <p>Date :</p>
            <input className="border-b border-black w-40 outline-none bg-transparent text-center" disabled value={bidAgreement?.dateofAuction ? dayjs(bidAgreement?.dateofAuction).format("DD MMM YYYY") : ""} />
          </div>
        </div>

        <div className=" mt-10">
          <div className="flex">
            <p>Paid to Shri/Smt.</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1 text-sm" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
          </div>
          <p>being the Successor / successful bidder in the auction held on</p>

          <div className="flex">
            <p>Total Value of the Chit -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 text-center" disabled value={chit?.ChitValue} />
          </div>

          <div className="flex">
            <p>Less Foremen Commission-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" value={bidAgreement?.foremanCommision} />
          </div>

          <div className="flex">
            <p>Less Dividend to Members -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" value={bidAgreement?.dividend}/>
          </div>
          <div className="flex">
            <p>Less Service Tаx -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Less Other-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>D.D. Cheque No -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
        </div>
        <div className="mb-8">
          <b>BID PAYBLE ACCOUNТ</b>
          <div className="flex">
            <p>AMOUNT Rs.-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
        </div>

        <div className="pt-15 border-t ">
          <div className="w-20 h-24 border border-black ml-10"></div>
        </div>

        <div className="text-center mt-5 border-b  py-4">
          <p>
            Received Rs.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            (Rupees{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            ) being the Bid Payable Amount paid to Shri/Smt.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent text-center" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />{" "}
          </p>
        </div>

        <div className="flex justify-between mt-30 font-bold">
            <p>Assi.</p>
            <p>Accountant</p>
            <p>(Branch Manager)</p>
        </div>
      </div>
    </>
  );
};

export default DebitParticulars;
