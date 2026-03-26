import React from "react";

const CashVoucher = ({ chit, user, chitAgreement, bidAgreement, gurantor }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-8 text-justify print-page">
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
        <div className="bg-black text-white text-center text-[13px] font-bold py-0.75 mt-3">
          CASH VOUCHER
        </div>

        <div className=" mt-10">
          <div className="flex">
            <p>Pay to:</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
          </div>
          <div className="flex">
            <p>Rs.:</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Rs. in Words </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>being.</p>
            <span className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1">Bid Payable Amount Paid towards prized chit <span className="uppercase">{`(${chit?.GroupCode})`}</span></span>
          </div>
          <div className="flex">
            <p>and debit </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" value={bidAgreement?.debitBankName} />
          </div>
        </div>
        <div className=" mt-10 flex ">
          <p>Authorised by: </p>
          <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
        </div>

        <div className=" mt-10 ">
          <div className="flex ">
            <p>Recd. above sum of- </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex ">
            <p>Rs. - </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 " />
          </div>
        </div>

        <div className=" mt-10 ">
          <div className="flex ">
            <p>Paid by- </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 text-center" disabled value={'Karde Krishana Chit Pvt.Ltd'} />
          </div>
          <div className="flex ">
            <p>Cash or Cheque- </p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 " />
          </div>
          <div className="flex ">
            <p>Drawn on Bank -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 " />
          </div>
        </div>
        <div className="pt-15  ">
          <div className="w-20 h-24 border border-black ml-10"></div>
          <b>Receiver's Signature</b>
        </div>
      </div>
    </>
  );
};

export default CashVoucher;
