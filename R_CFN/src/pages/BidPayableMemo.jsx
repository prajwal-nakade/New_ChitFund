import React from "react";

const BidPayableMemo = () => {
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
        <div className="bg-black text-white text-center text-[13px] font-bold py-0.75 mt-3">
          BID PAYABLE MEMO
        </div>

        <div className="mt-5">
          <div className="flex">
            <p>Name-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Chit Ref -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />

            <p>Date of Auction-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Chit Value Rs. -</p>
            <input className="border-b border-black w-40 outline-none bg-transparent mx-2 " />
            <p>Rs. -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Less Bid Rs. -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Foreman's Commission Rs.-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Dividend to Members Rs. -</p>
            <input className="border-b border-black w-40 outline-none bg-transparent mx-2 " />
            <p>Rs. -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex">
            <p>Payable Amount-</p>
            <input className="border-b border-black w-40 outline-none bg-transparent mx-2 " />
            <p>Rs. -</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
        </div>

        <div>
          <b>Less Adj Receipt No.:</b>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <p>1)</p>
            <input className="border-b border-black w-100 outline-none bg-transparent mx-2 " />
          </div>
          <div className="flex">
            <p>2)</p>
            <input className="border-b border-black w-100 outline-none bg-transparent mx-2 " />
          </div>
          <div className="flex">
            <p>3)</p>
            <input className="border-b border-black w-100 outline-none bg-transparent mx-2 " />
          </div>
        </div>

        <div>
          <b>Cheque No.:</b>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <p>1)</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
            <p>Rs.</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
          </div>
          <div className="flex">
            <p>2)</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
            <p>Rs.</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
          </div>
          <div className="flex">
            <p>3)</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
            <p>Rs.</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
          </div>
        </div>

        <div>
          <p>A/c. Manager</p>
          <div className="flex">
            <p>Received Cheque No.-</p>
             <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
             <p>of Rs.</p>
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 " />
          </div>
        </div>

        <div className="flex items-end justify-end mt-25">
            <b>Signature of the Subscriber</b>
        </div>
      </div>
    </>
  );
};

export default BidPayableMemo;
