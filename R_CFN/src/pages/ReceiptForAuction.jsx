import React from "react";

const ReceiptForAuction = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-5.5 text-justify">
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
          RECEIPT FOR AUCTION/DRAW DIFFRENCE (PRIZED DISCOUNT)
        </div>

        <div className="mt-4">
          <div className="flex ">
            <p>01) This receipt executed by-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex mt-2">
            <p>02) C/O-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex mt-2">
            <p>03)Collection Add-</p>
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex">
              <p>04) (Hereinaftercalled the Payee) Rs. 3,14,460 (Rupees </p>
              <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
            </div>
            <p>
              ). In favor of KARDE KRISHNA CHITS PRIVATE LIMITED, a company
              incorporated under The companies Act 1956 and having its office at
              PLOT NO. 7 GUT NO. 216 NEAR HOLAKAR CHAUK SATARA PARISAR CHH.
              SAMBHAJINAGAR. and the business of conducting Auction Chit Fund
              registered with the Registered Of Chits Aurangabad As per Section
              4 of Maharashtra Chit Fund Act 1982 (Act No XL of 1982)
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p>
            WHEREAS the foreman is conducting a daily Chit of Chit Value of Rs.
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />
            Duration{" "}
            <input className="border-b border-black w-30 outline-none bg-transparent mx-2 flex-1" />{" "}
            months, having{" "}
            <input className="border-b border-black w-30 outline-none bg-transparent mx-2 flex-1" />{" "}
            Subscribers Rs.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
            Per Ticket/subscriber, and the Chits Agreement and bye-law relating
            to its conduct registered with Register of Chits Aurangabad under
            Registration No:{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />{" "}
            With auction/draw commencing From{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
            and conducted every Week at the date and time fixed in according
            with the chits Agreement for the determination of prized amount due
            to the subscribers.
          </p>
        </div>

        <div className="mt-2">
          <p>
            WHERE AS the payee is a subscriber of one ticket Chit Group -
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />{" "}
            under Ticket No-
            <input className="border-b border-black w-30 outline-none bg-transparent mx-2 flex-1" />
            of thevalue of Rs{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />{" "}
            (Rupee{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />
            ) which was auctioned /draw on 05/01 /26and the amount including the
            Foreman's Commission viz Rs.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent mx-2 flex-1" />{" "}
            by way of foreman's commission and auction discount to be
            distributed among the chit. as per Chit Agreement.
          </p>
        </div>

        <div className="mt-2">
          <p>
            The receipt for the said amount of Rs{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />{" "}
            (Rupees{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />{" "}
            ) is hereby given by the payee in token of having received the
            amount of Rs.{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />{" "}
            (RUPEES{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent mx-2 flex-1" />
            ) in cash from the foreman subject to his/her/their obligation to
            pay all future installment as stipulated in the Chit Agreement
          </p>
        </div>

        <div className="mt-2">
          <b>Signed By Shri- </b>
        </div>

        <div className="space-y-2 mx-10">
          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent" />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>

          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent" />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptForAuction;
