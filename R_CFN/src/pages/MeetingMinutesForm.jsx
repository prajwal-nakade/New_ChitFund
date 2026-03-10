import React from "react";
import Layout from "../components/layout";
import dayjs from "dayjs";

const MeetingMinutesForm = ({ chit, user, chitAgreementData }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black p-6 text-[16px]  leading-relaxed">
        {/* HEADER */}
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
        <div className="bg-black text-white text-center font-bold py-1 mt-3">
          MINUTES OF THE MEETING OF THE CHIT SUBSCRIBERS
        </div>

        {/* TOP CONTENT */}
        <div className="mt-4 space-y-2">
          <p>
            MINUTES OF proceeding under Section 17 of the Chit Funds Act 1982.
          </p>

          <p className="flex flex-wrap items-center">
            Name of the Forman :<b>Krishna Kadubal Karde</b>
          </p>

          <p className="flex flex-wrap items-center">
            Branch :<b>Satara Parisar</b>
          </p>

          <p className="flex flex-wrap items-center">
            <span className="">Office Where the Bye –Laws are Registered</span>
            <input className="border-b border-black mx-2 w-120 outline-none bg-transparent" />
            <p className="flex mt-3">
              <span>Registration No.</span>
              <input disabled value={chitAgreementData.
                company_reg_number
              } className="border-b border-black mx-2 w-55 outline-none bg-transparent text-sm text-center" />
            </p>
            Office of the Registration in case where the chits are Conducted by
            filing the certified copy of Bye-Laws.
          </p>

          <p className="flex flex-wrap items-center">
            MINUTES OF proceeding (under section 17 of the chit funds act 1982)
            of Drawing Rs.
            <input className="border-b border-black mx-2 w-24 outline-none bg-transparent text-center" disabled value={chit.ChitValue} />
            The proceeding began on
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent text-center" disabled value={dayjs(chit.BylawsDate).format('DD MMM YYYY')} />
            at
            <input className="border-b border-black mx-2 w-16 outline-none bg-transparent text-center" />
            hours
            <input className="border-b border-black mx-2 outline-none bg-transparent text-center" readOnly type="time" value={chitAgreementData.auction_session_start} />
            and terminated at
            <input className="border-b border-black mx-2 outline-none bg-transparent text-center" readOnly type="time" value={chitAgreementData.auction_session_end} />
            hours.
          </p>

          <p className="flex flex-wrap items-center">
            1. Drawing Where held at
            <input className="border-b border-black mx-2 w-44 outline-none bg-transparent" />
            (s.17(2a))
          </p>

          <p className="flex flex-wrap items-center">
            2. Chit Group No.
            <input className="border-b border-black mx-2 w-40 outline-none bg-transparent text-center" disabled value={chit.GroupCode} />
            Installment No.
            <input className="border-b border-black mx-2 w-20 outline-none bg-transparent text-center" disabled value={chitAgreementData.number_of_installments} />
            Total Amount of the Chits
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent text-center" disabled value={chit.ChitValue} />
          </p>
        </div>

        {/* TABLE */}
        <div className="mt-4 border border-black">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-2">
                  Name Of Subscriber
                </th>
                <th className="border-r border-black">Group No.</th>
                <th className="border-r border-black">Ticket No.</th>
                <th className="border-r border-black">Bid Offer</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              <tr className="h-20">
                <td className="border-r border-black">
                  <textarea
                    className="w-full text-center outline-none bg-transparent resize-none overflow-hidden"
                    rows={2}
                    disabled
                    value={`${user.firstname} ${user.middlename} ${user.lastname}`}
                  />
                </td>
                <td className="border-r border-black">
                  <input className="w-full text-center outline-none bg-transparent" disabled value={chit.GroupCode}  />
                </td>
                <td className="border-r border-black">
                  <input className="w-full text-center outline-none bg-transparent" disabled value={chit.TicketNmber}/>
                </td>
                <td className="border-r border-black">
                  <input className="w-full text-center outline-none bg-transparent" />
                </td>
                <td>
                  <input className="w-full text-center outline-none bg-transparent" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* BODY CONTINUED */}
        <div className="mt-4 space-y-2">
          <p className="flex flex-wrap items-center">
            4. Subscriber entitled in Drawing
            <input className="border-b border-black mx-2 w-48 outline-none bg-transparent" />
            Date :
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent text-center" disabled value={dayjs(chit.BylawsDate).format('DD MMM YYYY')} />
            In Chit No.
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent text-center" disabled value={chit.GroupCode}/>
            is Shri.
            <input className="border-b border-black mx-2 w-80 outline-none bg-transparent text-center" disabled
                    value={`${user.firstname} ${user.middlename} ${user.lastname}`}/>
          </p>

          <p className="flex items-center mt-4">
            S.22-4 Auction is Knocked down in the name of the Subscriber
          </p>
          <p className=" flex-wrap items-center">
            Shri.
            <input className="border-b border-black w-74 outline-none bg-transparent text-center" disabled
                    value={`${user.firstname} ${user.middlename} ${user.lastname}`}/>
            Prized Amount Rs.
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent" />
            Signature Whose bid Discount was the highest, and Prized Amount is
            Rs.
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center mt-4">
            S.5-10(v) Total Amount of the Dividend of Rs.
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            installment is which is divided equally between all members
            <input className="border-b border-black mx-2 w-24 outline-none bg-transparent" />
            at Rs.
            <input className="border-b border-black mx-2 w-24 outline-none bg-transparent" />
            for each, balance Bid invisible
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center mt-4">
            6. 17-2 (f) The Prized Amount in respect of the proceedings No.
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            installment of Rs.
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            was paid to Shri
            <input className="border-b border-black mx-2 w-74 outline-none bg-transparent" disabled
                    value={`${user.firstname} ${user.middlename} ${user.lastname}`} />
            after taking proper
            <input className="border-b border-black mx-2 w-48 outline-none bg-transparent" />
            for the installments as security
            <input className="border-b border-black mx-2 w-48 outline-none bg-transparent" />
          </p>
        </div>

        {/* SECOND PAGE SECTION */}
        <div className="mt-6 space-y-2">
          <p>
            a) (Under section 22-1 and 2) prized subscriber Under Rule 15-1 not
            having Furnished security in No. On
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            <br />
            (Under Section 22-1 and 2) Date.
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Withdrawal, if any.
          </p>

          <p>
            Amount Of Deposit :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            <br />
            Amount Of Withdrawals :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
          </p>

          <p>
            b) Future Subscription of Prized Subscriber in No.
            <input className="border-b border-black mx-2 w-32 outline-none bg-transparent text-center" disabled value={chit.GroupCode} />
            On
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent text-center" disabled value={dayjs(chit.BylawsDate).format('DD MMM YYYY')}  />
            Withdrawals, if any.
          </p>

          <p>
            c) (Under Section 30-1) Arrears of Subscription realized for
            Substituted subscriber less advance by Forman On
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Withdrawals, if any.
          </p>

          <p>
            d) (Under Section 30-2) Non-Prized defaulting subscribers amount on
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            withdrawals, if any.
          </p>

          <p>
            e) (Under Sections 33-4) Consolidated pay member of further
            Subscription from defaulting prized subscribers on
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Withdrawals, if any.
          </p>

          <p className="font-semibold mt-3">7. Any Other Particulars :</p>
          <p>
            Name and signature of the Forman and the subscribers including
            signature of the prized subscribers:
          </p>
          <p className="flex flex-wrap items-center">
            1. Date Of Auction :
            <input className="border-b border-black mx-2 w-36 outline-none bg-transparent text-center" disabled value={dayjs(chit.BylawsDate).format('DD MMM YYYY')}  />
          </p>

          <p className="flex flex-wrap items-center">
            2. Surety papers received from p/s on :
            <input className="border-b border-black mx-2 w-36 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center">
            3. Sureties Verified On :
            <input className="border-b border-black mx-2 w-36 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center">
            4. Date of payment prized Amount :
            <input className="border-b border-black mx-2 w-36 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center">
            Cheque No :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Date :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Bank :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
          </p>

          <p className="flex flex-wrap items-center">
            Bye-Law No :
            <input className="border-b border-black mx-2 w-24 outline-none bg-transparent text-center" disabled value={chit.ByLawsNumber}/>
            Date :
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" />
            Ticket No :
            <input className="border-b border-black mx-2 w-24 outline-none bg-transparent text-center" disabled value={chit.TicketNmber} />
          </p>
        </div>

        {/* SIGNATURES */}
        <div className="flex justify-between mt-16">
          <div className="text-center">
            <div className="border-b border-black w-56 mx-auto"></div>
            <p>Signature Of Subscriber</p>
          </div>

          <div className="text-center">
            <div className="border-b border-black w-56 mx-auto"></div>
            <p>Forman Stamp & Signature</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingMinutesForm;
