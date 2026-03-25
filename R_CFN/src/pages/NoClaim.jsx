import dayjs from "dayjs";
import React from "react";

const NoClaim = ({ chit, user, chitAgreement, bidAgreement, gurantor }) => {
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
          NO CLAIM
        </div>

        <div className="flex justify-end">
          <p>Date -</p>
          <input className="border-b border-black w-64 outline-none bg-transparent text-center" />
        </div>

        <div>
          <p>
            To,
            <br />
            The Registrar of Chits <br />
            <input className="border-b border-black w-64 outline-none bg-transparent" disabled value={chitAgreement?.register_bank_branch} />
          </p>
        </div>

        <div>
          <p>
            Dear Sir,
            <br />
            I/We am / are subscriber's to chit group{" "}
            <input className="border-b border-black w-50 outline-none bg-transparent text-center uppercase" disabled value={chit?.GroupCode} />{" "}
            Ticket No.{" "}
            <input className="border-b border-black w-30 outline-none bg-transparent text-center" disabled value={chit?.TicketNmber} />
            Conducted by KARDE KRISHNA CHITS PRIVATE LIMITED
            <br />
            <input
              type="text"
              className="border-b border-black w-full outline-none bg-transparent text-center"
              readOnly
              value="Plot No.7, Gut No.216 Satara Road Near Ahilyabai Holkar Chauk Satara Parisar Chh.Sambhajinagar."
            />{" "}
            and wish to inform you that I/We have received the Cheque No.{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />
            Dated{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            on{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent" />{" "}
            having lifted the above mentioned chit on{" "}
            <input className="border-b border-black w-64 outline-none bg-transparent text-center" disabled value={bidAgreement?.dateofAuction ? dayjs(bidAgreement?.dateofAuction).format("DD MMM YYYY") : ""} />
            I/We have no claim whatsoever on them pertaining to this chit group.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex">
            <p>Place:</p>
            <input className="border-b border-black w-64 outline-none bg-transparent text-center" value={"Chh. Sambhajinagar"} />
          </div>
          <div className="flex">
            <p>Date:</p>
            <input className="border-b border-black w-64 outline-none bg-transparent" />
          </div>
          <p>Yours' Faithfully,</p>
        </div>

        <div className="mt-10">
          <p>Signature of the Subscriber</p>
          <div className="flex">
            <p>NAME -</p>
            <input className="border-b border-black w-100 outline-none bg-transparent  text-center" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoClaim;
