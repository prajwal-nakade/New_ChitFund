import dayjs from "dayjs";
import React from "react";

const PromissoryNote = ({ chit, user, chitAgreementData }) => {
  return (
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
      <div className="bg-black text-white text-center text-[13px] font-bold py-0.75 mt-2">
        PROMISSORY NOTE
      </div>

      {/* DATE */}
      <div className="flex justify-end mt-3">
        <span className="mr-2">Date :</span>
        <input
          className="border-b border-black w-48 outline-none bg-transparent text-center"
          disabled
          value={
            chit?.BylawsDate ? dayjs(chit.BylawsDate).format("DD MMM YYYY") : ""
          }
        />
      </div>

      {/* REF + AMOUNT */}
      <div className="mt-3">
        <div className="flex items-center">
          <span className="mr-2">CHIT REF :</span>
          <input
            className="border-b border-black w-64 outline-none bg-transparent text-center "
            disabled
            value={chit?.GroupCode}
          />
        </div>

        <div className="flex items-center mt-1">
          <span className="mr-2">Amount Rs:</span>
          <input
            className="border-b border-black w-40 outline-none bg-transparent text-center"
            disabled
            value={chit?.ChitValue}
          />
        </div>
      </div>

      {/* BODY TEXT */}
      <div className="mt-4 ">
        ON DEMAND I/WE Jointly and Severally do hereby promise to pay KARDE
        KRISHNA CHITS PRIVATE LTD. Of Order the Sum of ( Rupees
        <span className="inline-block border-b border-black w-130 mx-2"></span>
        only )
      </div>

      <div className="mt-3">
        Repayable with interest at
        <input
          className="inline-block border-b border-black w-20 mx-2 text-center"
          value={"18%"}
        ></input>
        Percent per annum being the amount of the future installment due to
        Messrs.
      </div>

      {/* COMPANY SECTION */}
      <div className="mt-4">
        <div className="font-bold">KARDE KRISHNA CHITS PRIVATE LIMITED</div>

        <div className="mt-2">
          In respect of Ticket No.
          <span className="inline-block border-b border-black w-20 mx-2 text-center">
            {chit?.TicketNmber}
          </span>
          in
          <span className="inline-block border-b border-black w-32 mx-2 text-center">
            {chit?.GroupCode}
          </span>
          series, in Monthly Installment of Rs.
          <span className="inline-block border-b border-black w-24 mx-2 text-center ">
            {chitAgreementData?.installment_amount}
          </span>
        </div>

        <div className="mt-1">
          ( Rupees
          <span className="inline-block border-b border-black w-64 mx-2"></span>
          only ) for
          <span className="inline-block border-b border-black w-16 mx-2 text-center">
            {chit?.Duration}
          </span>
          {chit?.DurationCategory}
          <span className="inline-block border-b border-black w-64 mx-2"></span>
        </div>
      </div>

      {/* SIGNATURE AREA */}
      <div className="mt-10 space-y-15 max-w-3xl mx-auto">
        {/* Subscriber */}
        <div className="flex justify-between items-end">
          <div className="w-100 flex flex-col items-center justify-center ">
            <div className="border-b border-black w-full text-center">
              <span className="text-center w-full">{`${user?.firstname} ${user?.middlename} ${user?.lastname} `}</span>
            </div>
            <p className="text-sm mt-1 text-center">Name Of Subscriber</p>
          </div>

          <div className="grid grid-cols-2 gap-15 mr-10">
            <div className="scale-150 w-14 h-16 border border-black"></div>
            <div className="w-14 h-16 border border-black"></div>
          </div>
        </div>

        {/* Guarantor 01 */}
        <div className="flex justify-between items-end">
          <div className="w-100 flex flex-col items-center justify-center">
            <div className="border-b border-black w-full text-center">
              <span className="text-center w-full">{`${user?.nominees[0]?.firstname} ${user?.nominees[0]?.middlename} ${user?.nominees[0]?.lastname} `}</span>
            </div>
            <p className="text-sm mt-1 text-center">Name Of Guarantor 01</p>
          </div>

          <div className="grid grid-cols-2 gap-15 mr-10">
            <div className="scale-150 w-14 h-16 border border-black"></div>
            <div className="w-14 h-16 border border-black"></div>
          </div>
        </div>

        {/* Guarantor 02 */}
        <div className="flex justify-between items-end ">
          <div className="w-[400px] flex flex-col items-center justify-center">
            <div className="border-b border-black w-full"></div>
            <p className="text-sm text-center mt-1">Name Of Guarantor 02</p>
          </div>

          <div className="grid grid-cols-2 gap-15 mr-10">
            <div className=" scale-150 w-14 h-16 border border-black"></div>
            <div className="w-14 h-16 border border-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromissoryNote;
