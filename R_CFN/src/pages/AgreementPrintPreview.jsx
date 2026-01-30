import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router";
import { getChitAgreementbyID } from "../api/endpoint";
import { ShipWheel } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
const Blank = ({ width = "w-24" }) => (
  <span
    className={`inline-block ${width} border-b border-black mx-1 align-baseline`}
  />
);

const AgreementPrintPreview = () => {
  const { id } = useParams();
  const ref = useRef();
  const handleDownload = useReactToPrint({
    contentRef: ref,
    pageStyle: `
      @page {
        size: A3;
        margin-top: 8mm;
        margin-bottom: 8mm;
        padding-bottom: 10mm;
        padding-top: 3mm;
        border: 1px solid
        
      }

      @media print {
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          line-height: 1.4;
        }

        .print-container {
          width: 100%;
          margin: 0 auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        th, td {
          word-break: break-word;
          padding: 4px;
        }
        
        .schedule-section {
          page-break-inside: avoid;
        }

        .container {
        padding: 0;
        margin: 0;
      }
        .hero{
          margin-right: 12rem
        }
        .srnumber{
          display: flex
        }
          .srnumberlable{
          width: 3rem
          }
          .schedule{
          padding-left : 0.8rem 
          }
          .schedule-border{
          border-left: 0 solid
          }
      }
    `,
  });

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
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="max-w-7xl mx-auto leading-5" ref={ref}>
        <div className="text-end text-xs text-gray-600 pt-3 px-3">
          <p>Regd. No.: U64990MH2023PTC400938 </p>
        </div>
        <div className="mx-auto text-center mb-4 pt-2 flex flex-col justify-center items-center w-full">
          <img src="/Logo.png" alt="" width={400} />
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="w-125 mx-auto flex justify-center items-center text-center hero">
            <h1 className="px-5 font-semibold border border-neutral-500 rounded-full text-center ms-auto">
              AGREEMENT OF CHIT
            </h1>
          </div>
          <div
            className="items-center
                justify-end srnumber"
          >
            <label className="srnumberlable">Sr No.</label>
            <input
              value={chit.application_id}
              type="text"
              className="border-b outline-none mx-5 font-medium"
            />
          </div>
        </div>

        <div className="px-5 py-3">
          <p className="text-justify text-sm">
            Where as,<strong> KARDE KRISHNA CHITS PRIVATE LIMITED </strong>A
            Company registered under the Companies Act 1956, adress{" "}
            <strong>
              Plot No. 7, Gut No. 216, Near Holkar Chowk, Satara Parisar,
              Chatrapati Sambhajinagar.
            </strong>{" "}
            And branch at{" "}
            <input
              type="text"
              className="border-b outline-none mx-5 text-center font-medium"
              value={chitAgreementData.branchName}
            />
            (here in after called the Foreman, Which expression shall inclued
            its assigners, and successors in interest) have received
            Registration of Bye Law No.
            <input
              type="text"
              className="border-b outline-none mx-5 text-center font-medium"
              value={chit.ByLawsNumber}
            />
            dated
            <input
              type="text"
              className="border-b outline-none mx-5 text-center font-medium"
              value={dayjs(chit.BylawsDate).format('DD MMM YYYY')}
            />
            for the conduts of chit
            <input
              type="text"
              className="border-b outline-none mx-5 text-center font-medium"
              value={chitAgreementData.conducts_of_chits}
            />{" "}
            And whereas the foreman has received and accepted the proposal for
            membership from Shri/Smt{" "}
            <input
              type="text"
              className="border-b outline-none mx-5 text-center font-medium"
              value={`${user.firstname} ${user.middlename} ${user.lastname}`}
            />
            (Here in after called the Subscriber, which expression shall include
            his/her nominees, assignees and successors in Interest) the Foreman
            and hereby allots chit membership. Now this indenture witnesses the
            execution of Chit Agreement between the Foreman and the Subscriber
            subject to terms and conditions and privileges that follow here in
            after.
          </p>
        </div>

        <div className="print-container mx-auto w-full flex flex-col items-center justify-center schedule-section">
          <h2 className="font-semibold mb-2">SCHEDULE</h2>

          <div className="border-r border-l border-b w-full schedule-border">
            <div className="w-full overflow-x-auto border-b">
              <table className="w-full border-black text-sm ">
                {/* COLUMN WIDTHS MATCHING THE FORM - Fixed to add up to 100% */}
                <colgroup>
                  <col className="w-[35%]" /> {/* Address */}
                  <col className="w-[10%]" /> {/* Tickets */}
                  <col className="w-[10%]" /> {/* Installments */}
                  <col className="w-[15%]" /> {/* Amount per installment */}
                  <col className="w-[15%]" /> {/* Series */}
                  <col className="w-[15%]" /> {/* Chit amount */}
                </colgroup>

                <thead>
                  <tr>
                    <th className="border-t border-b border-black px-2 py-2 text-left">
                      Full Name and Permanent Residential Address of the
                      Subscriber
                    </th>
                    <th className="border border-black px-2 py-2">
                      No. of Tickets
                    </th>
                    <th className="border border-black px-2 py-2">
                      No. of Installments
                    </th>
                    <th className="border border-black px-2 py-2">
                      Amount per Ticket per installments
                    </th>
                    <th className="border border-black px-2 py-2">
                      Series and Chits No.
                    </th>
                    <th className="border-t border-b border-black px-2 py-2">
                      Chits Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="h-30">
                    <td className="border-t  border-black p-2 align-top">
                      <textarea
                        className="w-full h-20 resize-none outline-none text-start font-medium ps-3"
                        value={`${user.firstname} ${user.middlename} ${user.lastname} \n \n${chitAgreementData.branchName}`}
                      />
                    </td>

                    <td className="border-r border-l border-black p-2 align-top">
                      <input
                        className="w-full outline-none text-center font-medium"
                        value={chitAgreementData.number_of_tickets}
                      />
                    </td>

                    <td className="border-r border-l border-black p-2 align-top">
                      <input
                        className="w-full outline-none text-center font-medium"
                        value={chitAgreementData.number_of_installments}
                      />
                    </td>

                    <td className="border-r border-l border-black p-2 align-top">
                      <input
                        className="w-full outline-none text-center font-medium"
                        value={chitAgreementData.installment_amount}
                      />
                    </td>

                    <td className="border-r border-l border-black p-2 align-top">
                      <input
                        className="w-full outline-none text-center font-medium"
                        value={chit.GroupCode}
                      />
                    </td>

                    <td className="border-t  border-black p-2 align-top">
                      <input
                        className="w-full outline-none font-medium text-center"
                        value={chit.ChitValue}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-full px-4 py-2 schedule">
              <div className="flex items-start w-full text-sm">
                <label className="text-center w-32">
                  Time of Auction <span className="text-red-500">*</span>
                </label>
                <input
                  value={chitAgreementData.scheduled_auction_time}
                  type="time"
                  readOnly
                  placeholder="Time of Auction"
                  className="border-b w-50 px-3 py-1 text-center outline-none font-medium"
                />
              </div>

              <div className="flex items-start w-full text-sm">
                <label className="text-center w-32">
                  Day of Auction <span className="text-red-500">*</span>
                </label>
                <input
                  value={dayjs(chitAgreementData.scheduled_auction_day).format('DD MMM YYYY')}
                  type="text"
                  placeholder="Day of Auction"
                  className="border-b w-50 px-3 py-1 text-start me-10 outline-none font-medium"
                />
              </div>
            </div>
            <div className="w-full text-sm flex">
              <label className="text-center px-4 py-1">
                Last date for payment of Installment is{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                value={dayjs(chitAgreementData.scheduled_last_date_of_payment).format('DD MMM YYYY')}
                type="text"
                placeholder="Day of Auction"
                className="border-b w-90 px-3 py-1 text-center outline-none font-medium"
              />
            </div>
            <p className="mx-4 text-justify py-2 text-sm leading-tight">
              of each calendar month <br />
              (The Foreman may at his discretion change the day, date and time
              of auction and also last date for payment) If the day fixed for
              auction falls on holiday or if any auction already notified could
              not be conducted on the appointed day owing to causes beyond the
              control of the Foreman the day of auction will be adjourned to
              networking day or some other convenient and suitable day under
              intimation to subscribers
            </p>
          </div>
        </div>

        <div className="mx-4 text-sm mt-3">
          <h2 className="font-semibold">
            1) Date of Commencement and Termination of Chit :
          </h2>
          <div className="flex ms-4 py-2">
            <div className="flex">
              <label className="w-48">
                Date of Commencement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="border-b px-3 text-center w-30 outline-none font-medium"
                value={dayjs(chitAgreementData.date_of_commencement).format('DD MMM YYYY')}
              />
            </div>

            <div className="flex">
              <label className="w-38">
                Date of Termination<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="border-b px-3 text-cente outline-none w-30 font-medium text-center"
                value={dayjs(chitAgreementData.date_of_termination).format('DD MMM YYYY')}
              />
            </div>
          </div>
          <p className="ms-4">
            N.B. The date of termination may be postponed due to reasons beyond
            the control of the Foreman.{" "}
          </p>
        </div>

        <div className="text-justify mx-3 text-sm">
          <h1 className="font-semibold">
            2) Mode of ascertaining the Successful Bidder (Prized Subscriber)
            and Discount{" "}
          </h1>
          <p className="mx-4">
            The duration of the auction shall be 10 minutes in respect of all
            types of groups. Auction in all months Will starts with a minimum of
            7% of the chit value. (i.e Foreman commission) A Non Prized
            subscriber who cannot personally participate in the auction may send
            his authorized agent to forward to the Foreman a bid offer starting
            the, maximum amount of discount he is willing to offer, which must
            be received by the Foreman at least one day before the date of
            auction. Generally defaulted subscribers will not be allowed to
            participate in the auction. No outsiders shall be permitted to
            participate in the auction. In case there is more than one bidder
            for the same discount, the auction will be decided by lot among such
            bidders only the subscribers or their authorized agents will be
            allowed to take part in auction. The auction will be conducted under
            the following pattern marked: <br />
            <strong>A) Maximum ceiling Auctions:</strong> In this type of
            auction the amount shall start from an amount over and above the
            Foreman's commission of 7% and the bidders may in auction raise the
            discount to a maximum of 40% of the chit value. Each time the bid
            shall be raised by Rupees Hundred or multiples of Rupees Hundred.
            They non-prized subscriber.
            <br />
            <strong>B) Open Auction by Tender:</strong> In this open auction
            system in all months the bid will start with a minimum discount of
            7% of the chit value by tenders in writing with no restriction on
            the maximum discount, subject to the conditions specified in clause
            'b' above
            <br />
            <strong>C) Open Auction by Bidding:</strong> In this open auction
            system in all months the bid will start with a minimum discount of{" "}
            <strong>7%</strong> of the chit value and the bidders may in auction
            raise the discount with no restriction in maximum. Each time the bid
            shall be raised by Rupees Hundred or multiple of Rupees Hundred. In
            10 minutes duration whoever bids highest discount will be declared
            as prized subscriber.
          </p>
        </div>

        {/* A4 Page */}
        <div className="mx-5 text-justify text-sm">
          <div className="ms-2">
            <h1>
              <strong>D) Alternate month's auctions:</strong>
            </h1>
            <p>
              i) In alternate months, auction will be by oral bidding or by
              tenders in writing with no restrictions on maximum discount.
            </p>
            <p>
              ii) In other months auction will also be by oral bidding or by
              tenders in writing by the subscriber in person but with maximum
              discount limited to 40% of the chit value.
            </p>
          </div>

          {/* ===== CLAUSES 1–6 ===== */}
          <ol className="list-decimal pl-5 space-y-2 pt-3">
            <li>
              Payment may be made in Cash, Money Order, Bank Draft, UPI, or by
              Cheque, in favor of{" "}
              <strong>KARDE KRISHNA CHITS PRIVATE LIMITED</strong>. Be accepted
              on all working days of the company.
            </li>

            <li>
              Local cheques should reach the Company's Office at least 7 days
              before ten clear working days prior to the date of auction in
              order to enable the party to become eligible to participate in the
              auction after realization of the cheque. In case of outstation
              cheques the appropriate Bank charges and also a fee of Rs. 1/-
              (Rupees one only) on presentation and messenger charges must be
              included in the remittance. Cheques and Drafts should be duly
              crossed. For all cheques, if returned the Bank Charges shall be
              debited to the subscriber's account in addition to Rs. 500/- for
              service charges. In respect of cases where the cheque given is
              dishonoured future subscriptions will be accepted only in cash,
              D.D., UPI or any mode of online payment.
            </li>

            <li>
              The subscriber shall obtain receipt for Cash/Cheque/D.D./UPI/any
              mode of online payment paid at once and check-up the entries in
              the pass book. The subscribers shall not make any entries in the
              passbook.
            </li>

            <li>
              Similarly non-receipt of intimation card shall not be an excuse
              for failure or delayed remittance of subscriptions whatsoever.
              Every subscriber shall arrange to remit them on the due dates.
            </li>

            <li>
              If the chit is in the joint names of two or more persons any one
              of them can bid and the same will be binding on the others also,
              except where the others have intimated to the Foreman in writing
              contrary before the chit auction date and obtained
              acknowledgement.
            </li>

            <li>
              Mode and proportion in which the discount is distributable by way
              of dividend Foreman's commission or remuneration.
            </li>
          </ol>

          {/* ===== SUB-CLAUSES A–G ===== */}
          <div className="pl-6 mt-2 space-y-1">
            <p>
              A) The Foreman shall also be entitled to subscribe for one or more
              chits.
            </p>
            <p>
              B) The Foreman is entitled to commission or remuneration of 7% of
              the chit amount.
            </p>
            <p>
              C) The Foreman is entitled to receive and realize all contribution
              from the subscribers and distribute the prize amount to prized
              subscriber and dividend amount to the subscribers.
            </p>
            <p>
              D) The Foreman shall be entitled to demand sufficient security
              from any prized subscriber for the payment of future
              subscriptions.
            </p>
            <p>
              E) The Foreman shall be entitled to substitute subscriber in the
              place of defaulters.
            </p>
            <p>
              F) The Foreman shall be entitled to cancel the auction confirmed
              in favor of the subscriber and of the Foreman within 21 days from
              the date confirming the auction and as a result the dividend will
              be modified accordingly which shall be met by all subscribers.
            </p>
            <p>
              G) The Foreman will have a right to adjust any amount available
              held in the name of the subscriber under any account chit or
              otherwise at offices/ branches against the outstanding dues of the
              prized chit without notice to the subscriber.
            </p>
          </div>

          {/* ===== CLAUSE 7 ===== */}
          <p className="mt-3">
            <strong>
              7. The date, time and place at which the chit is to be drawn:
            </strong>
          </p>
          <p className="pl-4">
            The FIRST Auction shall be held on{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={dayjs(chitAgreementData.first_auction_date).format('DD MMM YYYY')}
            />{" "}
            and subsequent auction on every
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={getOrdinal(dayjs(chitAgreementData.auction_frequency).date())}
            />
            day of every month/day/week between{" "}
            <input
              type="time"
              readOnly
              className="border-b text-center outline-none font-medium"
              value={chitAgreementData.auction_session_start}
            />{" "}
            and{" "}
            <input
              type="time"
              readOnly
              className="border-b text-center outline-none font-medium"
              value={chitAgreementData.auction_session_end}
            />{" "}
            at the Foreman's offices situated at{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={chitAgreementData.branchName}
            />
            .
          </p>

          {/* ===== CLAUSE 8 ===== */}
          <p className="mt-2 font-bold">
            8. Foreman's entitled to the chit amount without auction, the
            Installment at which the Foreman is to get the chit amount:
          </p>
          <p className="pl-4">
            The Foreman shall be entitled to obtain the chit amount of the
            SECOND installment without any auction, lot draw or tender.
          </p>

          {/* ===== CLAUSE 9 ===== */}
          <p className="mt-2 font-bold">
            9. The approved banks in which the chit monies shall be deposited by
            the Foreman under the provision of the CHIT FUND ACT 1982.
          </p>
          <p className="pl-4">
            Name of the approved bank: Any nationalized banks or
            non-nationalized scheduled bank.
          </p>

          {/* ===== CLAUSE 10 ===== */}
          <p className="mt-2 font-bold">
            10. Registrar with whom the Bye-Laws have been registered:
          </p>
          <p className="pl-4">
            The Bye-Laws of the Foreman have been registered with the registrar
            of chits at{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={chitAgreementData.register_bank_branch}
            />
            .
          </p>

          {/* ===== CLAUSE 11 ===== */}
          <p className="mt-2 font-bold">
            11. Registration Number and date of Registration of Bye Laws:
          </p>
          <p className="pl-4">
            Registration Number{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium "
              value={chitAgreementData.company_reg_number}
            />{" "}
            Date of Registration{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={dayjs(chit.BylawsDate).format('DD MMM YYYY')}
            />
          </p>

          {/* ===== CLAUSE 12 ===== */}
          <p className="mt-2 font-bold">12. Name of foreman:</p>
          <p className="pl-4 font-semibold">
            KARDE KRISHNA CHITS PRIVATE LIMITED
          </p>
          <p className="pl-4">
            By any of its officer or officers to exercise the functions of the
            Foreman either jointly or individually duly appointed as such by the
            Board of Directors or its Managing Directors or Power of Attorney
            holder authorized to do so. Registered Office: Plot No. 7, Gut No.
            216, Near Holkar Chowk, Satara Parisar, Chh. Sambhajinagar.
          </p>

          {/* ===== CLAUSE 13 ===== */}
          <p className="mt-2 font-bold">13. Chit Amount:</p>
          <p className="pl-4">
            The amount of the Chit is Rs.
            <span className="inline-block border-b border-black px-4 py-1 ml-2 min-w-30 text-center">
              <input
                className="w-full outline-none bg-transparent text-center font-medium"
                value={chit.ChitValue}
              />
            </span>
          </p>

          {/* ===== CLAUSE 14 ===== */}
          <p className="mt-3 font-bold">
            14. Time and Place at which any period within which every prized or
            non-prized subscriber shall pay his subscription according to
            working hours:
          </p>
          <p className="pl-4">
            All the subscribers both prized and non-prized shall pay their
            monthly/Weekly/Daily subscription at the Foreman's office at{" "}
            <input
              type="text"
              className="border-b text-center outline-none font-medium"
              value={chitAgreementData.branchName}
            />{" "}
            on all the working days on or before the specified date between
            10.00 am to 1.30 pm and 2.00 pm to 6.00 pm unless otherwise agreed
            to by the Foreman in writing to any other agreement.
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">
              15. Determination of the Prized Subscriber when there are no bids
              or tenders:
            </h3>
            <p className="mt-1">
              When there are no bids or tenders at the auction a lot will be
              drawn from amongst the non-prized subscribers who have paid their
              subscription up-to-date, at the fixed minimum discount of 7%
              (Foreman's Commission).
            </p>
          </div>

          {/* 16 */}
          <div className="mb-4">
            <h3 className="font-semibold">
              16. Persons competent to bid and the rights of the participants if
              they are nominees of subscriber:
            </h3>

            <div className="pl-4 space-y-1">
              <p>
                A. All non-prized subscribers who have paid their subscription
                up-to-date; and paid.
              </p>
              <p>
                B. Those authorized by non-prized subscribers who have their
                subscription up-to-date; and paid.
              </p>
              <p>
                C. If any prized subscriber dies before the termination of the
                chit, the Foreman has the full rights to recover the arrears of
                further subscription from the legal heirs of the deceased
                subscriber.
              </p>
              <p>
                D. A subscriber removed from the chit before termination, for
                any reason, is entitled for a refund of only the net amount of
                subscription, deposited by him/her less 7% of chit amount
                towards damages for breach of contract. The refund will be made
                after the substituted subscriber draws the prized amount or at
                the close of the series whichever occurs first.
              </p>
            </div>
          </div>

          {/* 17 */}
          <div className="mb-4">
            <h3 className="font-semibold">
              17. Particulars of security given or deposited by the Foreman:
            </h3>

            <p className="tracking-tighter">
              A sum of Rs.
              <input
                className=" border-b mx-2 px-2 py-1 text-center outline-none font-medium"
                value={chit.ChitValue}
              />
              Deposited by the Forman with
              <input
                className=" border-b px-2 py-1 text-center outline-none font-medium"
                value={chitAgreementData.deposit_bank_name}
              />
              under fixed Deposit receipt No.
              <input
                className=" border-b px-2 py-1 text-center outline-none font-medium"
                value={chitAgreementData.deposit_receipt_no}
              />
              Dated
              <input
                type="text"
                className=" border-b mx-3 py-1 outline-none text-center font-medium"
                value={dayjs(chitAgreementData.deposit_date).format('DD MMM YYYY')}
              />
              for a term of
              <input
                className="border-b px-2 py-1 text-center outline-none font-medium"
                value={chitAgreementData.term_month}
              />
              months invested under section 20 of Chit Funds Act. With the right
              reserved to change or substitute the security subject to the
              permission of the Registrar under Section 20 of Chit Funds Act.
            </p>
          </div>

          {/* 18 */}
          <div className="mb-4">
            <h3 className="font-semibold">
              18. Period within which subscription for each installment is
              payable and the fine and/or penalty for delayed payments:
            </h3>

            <p className="mt-1 font-medium">NON-PRIZED SUBSCRIBER:</p>
            <p>
              if a non-prized subscriber fails to deposit his
              Monthly/Weekly/Daily subscription before the due date penalty will
              be charged at the rate of 3 paisa per rupee or part thereof. If
              the default is continued to second Installment, penalty will be
              charged at the rate of 6 paisa per rupee or part thereof per
              installment, if the default continues for more than two Months,
              Two Weeks or 5 Days the subscriber will not been titled to
              dividends in addition to the aforesaid penalty charges. A,
              subscriber who has not made up-to-datepayments of all installments
              dues from him, will not be permitted to bid in the auction. If he
              does his bid will be cancelled and he will be required to make
              good the loss incurred for transferring the bid to another
              subscriber or for conducting the re auction. If the non-prized
              subscriber fails to pay subscription for three consecutive
              monthly, three consecutive week or 10 consecutive daily
              installments he shall be liable to be removed from the list of
              subscribers and Foreman at his option, shall be entitled to
              substitute a new subscriber in place or defaulting subscriber or
              may himself subscribe for the ticket and the defaulted ticket of
              the chit will be dealt with subject to the Bye-Lows and the
              relevant provisions of the Chit Fund Act. <br />
              The Foreman at his discretion can waive the penalties partly or
              fully and can also postpone the removal in suitable and deserving
              cases. An expelled member may be re-admitted on such terms as the
              Foreman deems proper:
            </p>

            <p className="mt-1 font-medium">PRIZED SUBSCRIBER:</p>
            <p>
              When a prized subscriber defaults in payment, a penalty of 6 paisa
              per rupee or part thereof will be charged for the first month. If
              the default continues over a month, such a member will not be
              entitled to dividends also in addition to the aforesaid penalty
              charges of 6 paisa per Rupee or part thereof per month. If the
              default continued consecutively for a period of three months,
              three weeks or 10 Days as per monthly, weekly and daily chit the
              prized subscriber and the executants of the security bonds or
              sureties lose the future dividends and the benefit of paying the
              future subscription in installments. They shall become liable to
              make consolidated payment of all the future subscriptions
              inclusive of defaulted installments with interest at the rate
              of18% per annum from the date of default. <br />
              The Foreman at his discretion, can condone such defaults and
              receive any amount from the chit holder or any of the executants
              of the Security bond or Sureties after entering into an agreement
              with any or all of them and to continue as or the nominees of
              legal heirs. The death of a subscriber will also not discharge the
              liability of all oran of the executants of security documents or
              the nominees of legal heirs. The death of a subscriber will also
              not discharge the liability of the nominee or his legal heirs or
              the sureties
            </p>
          </div>

          {/* Payments & Liens */}
          <div className="mb-4">
            <p className="font-medium">A) Payments:</p>
            <p>
              Payments should be made only at counters in Foreman's office or to
              the authorized collections staff against printed official receipt.
              UPI or any kind of online payment to company's authorized account
              only. The Foreman shall not be responsible for payments, made
              without authentic official receipts.
            </p>

            <p className="mt-1 font-medium">B) Lien over amounts:</p>
            <p>
              Lien over amounts: If the chit subscriber are indebted to the
              Foreman for any amount either personally or absurdly the Foreman
              will have in respect of such liabilities first charge over any
              amount that may be due to them from the Foreman and other assets
              lying with the Foreman. The Foreman has the right to adjust amount
              towards his liabilities without prior notice Only the balance if
              any will be paid to the subscribers.
            </p>

            <p className="mt-1 font-medium">C) Fixed Deposits:</p>
            <p>
              If the subscribers have any non-prized chit amount or F.D's with
              the Foreman, the Foreman has the right to foreclose the chits &
              FD's he has adjust the amount towards his liabilities prized
              arrears.
            </p>

            <p className="mt-1 font-medium">D) Surety:</p>
            <p>
              If the subscriber is surely to any prized subscriber, who becomes
              default subsequently, the amount paid by such subscribers either
              or non-prized chits or deposits will be foreclosed by the Foreman
              and the amount will readjusted towards the defaulted subscriptions
              as he is jointly and severally liable to the debits.
            </p>
          </div>

          {/* 19 */}
          <div className="mb-4">
            <h3 className="font-semibold">19. Nature and kind of audit:</h3>
            <p>
              The accounts and the balance sheet of the Foreman shall be duly
              audited by the auditors duly qualified to act as auditors of
              Companies under the provisions of the Indian Companies Act. 1956.
            </p>
          </div>

          {/* 20 */}
          <div className="mb-4">
            <h3 className="font-semibold">
              20. Date, time and place the examination of Chits Records:
            </h3>
            <p>
              The Foreman on receipt of a fee of Rs.5/- will allow examination
              of pertinent chit records by non-prized and unpaid subscribers the
              Foreman's Office during office hours on all working days. One
              week's prior notice should be given to the Foreman The inspection
              fee shall be labile separately for each chit for which inspection
              is desired.
            </p>
          </div>

          {/* 21 */}
          <div className="mb-4">
            <h3 className="font-semibold">
              21. Security/Surety to be furnished by the subscribers for the due
              payment of future subscription:
            </h3>
            <p>
              Prized subscribers before drawing chit amount must furnish
              suitable/sufficient, necessary security or sureties to the satisfy
              Auction of the Foreman for payment of future installments. If the
              subscriber does does not have
            </p>
          </div>
          <div className="mb-4">
            <p>
              Unencumbered net pay equal to the net salary fixed for the surety
              in this agreement or not able to produce documentary evidence for
              his income le., proof of income to the satisfy Auction of the
              Foreman or whose net salary is less than the surety's salary and
              is not able to produce the documentary proof of income to the
              extent of balance or it the subscriber did not pay monthly
              subscriptions payable to the chit every month/week/dally on or
              before the Auction date the securities under the clauses (d) (e)
              (g) only will be accepted.
            </p>

            <div className="pl-4 mt-2 space-y-1">
              <p>
                a. If the subscriber has the net salary/income as state above
                and the payment pattern is regular the sureties mentioned under
                the clause (a) shall normally be accepted. Acceptance of the
                suretles at the discretion of the Foreman.
              </p>

              <p>
                b. Permanent employees in reputed Public Limited Companies who
                have put in at least 5 years service With Provident Fund,
                Gratuity and other benefits drawing the same salaries above as
                Net pay may also be accepted as Sureties at the discretion of
                the Foreman.
              </p>

              <p>
                c. Businessman/Professionals with the above noted average income
                secured and established business/Practicefor at least seven
                years with documentary proof of income (e.g. income tax
                assessment records are acceptable
              </p>

              <p>
                d. Assignment of Life Insurance policy to the extent of the
                surrender value of the policy is acceptable.
              </p>

              <p>
                e. Deposits with the company in chits to the extent of net paid
                amount of which after deducting the Company's commission are
                acceptable.
              </p>

              <p>
                f. Mortgage of local urban house property of either the prized
                subscriber or the third party guarantor (s) as security together
                with the personal guarantee of person (s) acceptable to the
                Foreman the value of property should exceed by two times of the
                amount due from prized subscriber.
              </p>

              <p>
                g. Guarantee of a Schedule Bank for the amount of the future
                liability.
              </p>

              <p>
                h. In case where the future liability is over Rs.1,00,000/- no
                personal security will normally be accepted. Only immovable
                urban property the value of which is at least 2 times the
                liability will be accepted as security. In exceptional cases and
                entirely at the discretion of the Foreman personal securities
                may be accepted or any one or more of the securities started
                under (h) (d) to (g). Normally sureties and securities are
                accepted only from such places or town where the Foreman's
                offices are situated. However, the Foreman may at his discretion
                accept sureties and securities from any other place. Surety once
                offered and accepted will not be entertained again as surety for
                another chilt holder till the liability of the previous chit
                holder is cleared. Any member who has no monthly or regular
                income or whose monthly income does not exceed the amount as
                specified for subscribers may be called to furnish securities
                mentioned under (d) (e) (9). The prized subscriber and the
                sureties must show proof that their of service is at least one
                year longer than the Future liability.
              </p>

              <p>
                The expenses for verification and inspection of the Surety
                offered stamp value; typing, registration, stationary legal and
                all other expenses shall be borne by the successful bidder.
              </p>

              <p>
                <strong>i. DOCUMENTS:</strong> The prized subscriber and his
                sureties shall execute such documents in such manner as may be
                prescribed by the Foreman.
              </p>

              <p>
                <strong>j. RELEASE OF SECURITY:</strong> All the securities
                mentioned above can duly be cancelled by the Foreman and
                delivered to the parties concerned on receipt of all subsequent
                installments due. The expenses shall be borne by the subscribers
                concerned.
              </p>

              <p>
                <strong>k.</strong> The company shall pay all payment only
                through
                <strong> ACCOUNT PAYEE CHEQUES</strong>.
              </p>
            </div>
          </div>

          {/* 22 */}
          <div className="mb-4">
            <h3 className="font-semibold">22. RECOVERY OF LOSS:</h3>
            <p>
              If the prized subscriber fails to collect the Prize Money on
              production of surety/security
              <input
                className="mx-2 w-40 border-b outline-none text-center font-medium"
                value={chitAgreementData.prize_collection}
              />
              within 60 days from the date of the auction, it is open to Foreman
              to appropriate prize money towards future installment and collect
              the balance if any from the prized subscriber or cancel the
              auction and conduct re-auction at the cost and risk of theorize
              subscriber.
            </p>
          </div>

          {/* 23 */}
          <div className="mb-4">
            <h3 className="font-semibold">23. Provisions of the Bye-Laws:</h3>
            <p>
              Provisions of the Bye-Laws of the chit registered by the Foreman
              shall have application on points that are not expressly covered
              above. Provisions of the Chit Fund Act Shall have application on
              points that are found to have not covered in the Chit Agreement
              and Bye-Laws.General Laws have application on points found to have
              been covered neither in the Chit Agreement not the Bye Laws nor
              the Chit Fund Act.
            </p>
          </div>

          {/* 24 */}
          <div className="mb-4">
            <p>
              <strong>24.</strong>The subscriber under takes to abide by the
              Registered Bye-Laws of the Chit.
              <br />
              Any disputes arising out of this Agreement shall be subject to the
              Jurisdiction of Court at
              <input
                className="mx-2 w-40 border-b outline-none text-center font-medium"
                value={chitAgreementData.jurisdiction_place}
              />
              . In witness whereof the Foreman and the subscriber have set their
              hands on
              <input className="mx-2 w-40 border-b outline-none font-medium" />.
            </p>
          </div>
          <div className="flex w-full px-4 py-3 justify-between items-center mt-15">
            <div className="flex flex-col gap-2">
              <input type="text" placeholder="" className="border-b" />
              <span className="text-center font-medium">{user.firstname} {user.lastname}</span>
              <label className="text-center">Subscriber's Signature</label>
            </div>
            <div className="flex flex-col gap-2">
              <input type="text" placeholder="" className="border-b" />
              <label className="text-center">Foreman
              </label>
              <p className="font-medium">Karde Krishna Chits Private Limited</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-[#004f9e] text-sm rounded-md text-white hover:bg-[#06c] cursor-pointer transition-colors duration-200"
        >
          Print Application
        </button>
      </div>
    </Layout>
  );
};

export default AgreementPrintPreview;