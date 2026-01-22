import React from "react";
import Layout from "../components/layout";

const AgreementPrintPreview = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto border ">
        <div className="text-end text-xs text-gray-600 pt-3 px-3">
          <p>Redg NO.U64990MH2023PTC400938</p>
        </div>
        <div className="mx-auto text-center mb-4 pt-2 flex flex-col justify-center items-center w-full">
          <img src="/Logo.png" alt="" width={400} />
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="w-125 mx-auto flex justify-center items-center text-center ">
            <h1 className="px-5 font-semibold border border-neutral-500 rounded-full text-center ms-auto">
              AGREEMENT OF CHIT
            </h1>
          </div>
          <div
            className="items-center
                justify-end "
          >
            <label>Sr No.</label>
            <input type="text" className="border-b outline-none mx-5" />
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
            <input type="text" className="border-b outline-none mx-5" /> for the
            conducts (here in after called the Foreman, Which expression shall
            inclued its assigners, and successors in interest) have received
            Registration of Bye Law No.
            <input type="text" className="border-b outline-none mx-5" />
            dated
            <input type="text" className="border-b outline-none mx-5" />
            For the conduts of chit
            <input type="text" className="border-b outline-none mx-5" /> And
            whereas the foreman has received and accepted the the proposal for
            membership from Shri/Smt{" "}
            <input type="text" className="border-b outline-none mx-5" />
            (Here in after called the Subscriber, which expression shall include
            his/her nominees, assignees and successors in Interest) the Foreman
            and hereby allots chit membership. Now this indenture witnesses the
            execution of Chit Agreement between the Foreman and the Subscriber
            subject to terms and conditions and privileges that follow here in
            after.
          </p>
        </div>

        <div className="flex flex-col items-center w-full">
          <h2 className="font-semibold mb-2">SCHEDULE</h2>

          <div className="w-full px-3 overflow-x-auto ">
            <table className="w-full border border-black table-fixed text-sm">
              {/* COLUMN WIDTHS MATCHING THE FORM */}
              <colgroup>
                <col className="w-[32%]" /> {/* Address */}
                <col className="w-[10%]" /> {/* Tickets */}
                <col className="w-[12%]" /> {/* Installments */}
                <col className="w-[18%]" /> {/* Amount per installment */}
                <col className="w-[14%]" /> {/* Series */}
                <col className="w-[14%]" /> {/* Chit amount */}
              </colgroup>

              <thead>
                <tr>
                  <th className="border border-black px-2 py-2 text-left">
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
                    Amount per Ticket per Installment
                  </th>
                  <th className="border border-black px-2 py-2">
                    Series and Chits No.
                  </th>
                  <th className="border border-black px-2 py-2">
                    Chits Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="h-[120px]">
                  <td className="border border-black p-2 align-top">
                    <textarea className="w-full h-full resize-none outline-none" />
                  </td>

                  <td className="border border-black p-2 align-top">
                    <input className="w-full outline-none" />
                  </td>

                  <td className="border border-black p-2 align-top">
                    <input className="w-full outline-none" />
                  </td>

                  <td className="border border-black p-2 align-top">
                    <input className="w-full outline-none" />
                  </td>

                  <td className="border border-black p-2 align-top">
                    <input className="w-full outline-none" />
                  </td>

                  <td className="border border-black p-2 align-top">
                    <input className="w-full outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex w-full px-3 py-2">
            <div className="flex items-start w-full text-sm">
              <label className=" text-center w-50">
                Time of Auction <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                placeholder="Time of Auction"
                className="border-b w-64 px-3 py-1"
              />
            </div>

            <div className="flex  items-start w-full text-sm">
              <label className=" text-center w-50">
                Day of Auction <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Day of Auction"
                className="border-b w-64  px-3 py-1"
              />
            </div>
          </div>
          <div className="w-full text-sm ">
            <label className="text-center w-50 px-3 py-1 mx-9 ">
              Last date for payment of Installment is{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Day of Auction"
              className="border-b w-190 px-3 py-1"
            />
          </div>
          <p className="mx-9 text-justify py-2 text-sm leading-tight">
            of each calendar month <br />(The Foreman may at his discretion change the
            day, date and time of auction and also last date for payment) If the
            day fixed for auction falls on holiday or if any auction already
            notified could not be conducted on the appointed day owing to causes
            beyond the control of the Foreman the day of auction will be
            adjourned to networking day or some other convenient and suitable
            day under intimation to subscribers
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AgreementPrintPreview;
