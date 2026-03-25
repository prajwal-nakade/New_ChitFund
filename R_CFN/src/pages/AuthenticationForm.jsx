import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router";
import { getChitAgreementbyID } from "../api/endpoint";
import { File, Receipt, ShipWheel } from "lucide-react";
import MeetingMinutesForm from "./MeetingMinutesForm";
import dayjs from "dayjs";
import PromissoryNote from "./PromissoryNote";
import DemandPromissoryNote from "./DemandPromissoryNote";
import GuaranteeAgreement from "./GuaranteeAgreement";
import ReceiptForAuction from "./ReceiptForAuction";
import Receiptform from "./Receipt";
import BidPayableMemo from "./BidPayableMemo";
import DebitParticulars from "./DebitParticulars";
import CashVoucher from "./CashVoucher";
import NoClaim from "./NoClaim";
import NOC from "./NOC";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const AuthenticationForm = () => {
  const [selectedForm, setSelectedForms] = useState({
    authenticationForm: false,
    meetingMinutes: false,
    promissoryNote: false,
    demandPromissoryNote: false,
    guaranteeAgreement: false,
    receiptForAuction: false,
    receipt: false,
    bidPayableMemo: false,
    debitParticulars: false,
    cashVoucher: false,
    noClaim: false,
    noc: false
  });

  const { id } = useParams();
  const [chitAgreementData, setChitAgreementData] = useState(null);

  const fetchChitAgreementData = async () => {
    const data = await getChitAgreementbyID(id);
    setChitAgreementData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchChitAgreementData();
  }, []);

  const isAnySelected = Object.values(selectedForm).some(value => value === true);
  
  // 1. ADDED: Check if all forms are selected
  const isAllSelected = Object.values(selectedForm).every(value => value === true);

  // 2. ADDED: Function to handle Select All / Deselect All
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedForms = Object.keys(selectedForm).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setSelectedForms(updatedForms);
  };

  const ref = useRef();
  const handleDownload = useReactToPrint({
    contentRef: ref,
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
  
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          font-family: Arial, sans-serif;
          font-size: 8px;
        }
          .print-page {
  width: 210mm;
  min-height: 297mm;
  page-break-after: always;
  break-after: page;
  box-sizing: border-box;
  flex-grow : 1
}
  .print-page {
  page-break-after: always;
  break-after: page;
}

.print-page:last-child {
  page-break-after: auto;
}
        .print-container {
          padding: 0;
          margin: 0;
        }
  
        /* ✅ FORCE NEW PAGE */
        .print-page-break {
          break-before: page;
          page-break-before: always; /* fallback for older browsers */
        }
      }
    `,
  });

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
      <div className="max-w-4xl mx-5 lg:mx-auto mt-4" >
        <div className="w-full flex flex-col items-start justify-start gap-1 ">
          <h1 className="w-full font-semibold text-neutral-800 tracking-tight text-2xl flex items-center gap-1"><File size={22} className="text-neutral-800"/>Select Forms</h1>
          <span className="text-sm text-neutral-500 tracking-tight leading-3">Choose the forms you need to process.</span>
        </div>
        
        {/* 3. ADDED: Select All Checkbox UI */}
        <div className="mt-4 flex justify-end">
          <label className="px-4 py-1 text-xs mx-8 bg-neutral-100 border border-neutral-300 flex items-center justify-start gap-1 rounded-sm shadow hover:bg-neutral-200 cursor-pointer transition-all">
            <input 
              type="checkbox" 
              checked={isAllSelected} 
              onChange={handleSelectAll} 
              className="cursor-pointer w-4 h-4"
            /> 
            Select All Forms
          </label>
        </div>
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 space-x-7 mb-6 max-w-4xl mx-4 lg:mx-auto my-5 space-y-3 w-full">
        {/* ADDED checked={...} to all inputs below to reflect the state visually */}
        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.authenticationForm} onChange={(e) => setSelectedForms(prev => ({ ...prev, authenticationForm: e.target.checked }))} />Authentication Form</label>
        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.meetingMinutes} onChange={(e) => setSelectedForms(prev => ({ ...prev, meetingMinutes: e.target.checked }))} /> Meeting Minutes</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.promissoryNote} onChange={(e) => setSelectedForms(prev => ({ ...prev, promissoryNote: e.target.checked }))} /> Promissory Note</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.demandPromissoryNote} onChange={(e) => setSelectedForms(prev => ({ ...prev, demandPromissoryNote: e.target.checked }))} /> Demand Promissory Note</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.guaranteeAgreement} onChange={(e) => setSelectedForms(prev => ({ ...prev, guaranteeAgreement: e.target.checked }))} /> Guarantee Agreement</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.receiptForAuction} onChange={(e) => setSelectedForms(prev => ({ ...prev, receiptForAuction: e.target.checked }))} /> Receipt For Auction</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.receipt} onChange={(e) => setSelectedForms(prev => ({ ...prev, receipt: e.target.checked }))} /> Receipt</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.bidPayableMemo} onChange={(e) => setSelectedForms(prev => ({ ...prev, bidPayableMemo: e.target.checked }))} /> Bid Payable Memo</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.debitParticulars} onChange={(e) => setSelectedForms(prev => ({ ...prev, debitParticulars: e.target.checked }))} /> Debit Particulars</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.cashVoucher} onChange={(e) => setSelectedForms(prev => ({ ...prev, cashVoucher: e.target.checked }))} /> Cash Voucher</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.noClaim} onChange={(e) => setSelectedForms(prev => ({ ...prev, noClaim: e.target.checked }))} /> No Claim</label>

        <label className="px-3 py-1 text-sm border border-neutral-300 flex items-center justify-start gap-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer hover:scale-102 transition-all du"><input type="checkbox" checked={selectedForm.noc} onChange={(e) => setSelectedForms(prev => ({ ...prev, noc: e.target.checked }))} /> NOC</label>
        <span></span>
      </div>

      <div ref={ref}>
        {selectedForm.authenticationForm && (
          <div className="print-page">
            <div className="max-w-4xl mx-auto bg-white border border-black p-6 text-[16px] leading-5.5">
              {/* CIN */}
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

              {/* TITLE */}
              <div className="w-full text-center py-1 bg-black text-white font-bold mt-4">
                BID AUTHORISATION CUM OFFER FORM
              </div>

              {/* DATE + REF */}
              <div className="flex justify-end mt-4 space-y-2 flex-col items-end">
                <div className="flex items-center">
                  <label className="mr-2">Date :</label>
                  <input
                    disabled
                    value={dayjs(chit.BylawsDate).format('DD MMM YYYY')}


                    type="text"
                    className="border-b border-black w-48 outline-none text-center bg-transparent text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="mr-2">Chit REF :</label>
                  <input
                    disabled
                    type="text"
                    className="border-b border-black w-48 outline-none text-center bg-transparent text-sm"
                    value={chit.GroupCode}
                  />
                </div>
              </div>

              {/* COMPANY */}
              <div className="mt-4">
                <p>
                  The,
                  <br />
                  <b>KARDE KRISHNA CHITS PRIVATE LIMITED</b>
                </p>

                <div className="flex items-center mt-2">
                  <label className="mr-2">Branch :</label>
                  <input
                    disabled
                    value={chit.branchName}
                    type="text"
                    className="border-b border-black w-64 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>

              {/* BODY */}
              <div className="mt-4 space-y-4">
                <p>Dear Sir,</p>

                {/* POINT 1 */}
                <div>
                  <p className="font-semibold">
                    • I wish to inform you that I would not be able to personally
                    attend and participate in the auction

                    <p className="lg:ms-2">
                      relation to the above group to be held on
                      <input
                        type="text"
                        disabled
                        value={dayjs(chit.BylawsDate).format("DD MMM YYYY")}
                        className="border-b border-black w-72 outline-none bg-transparent mt-1 text-center font-normal text-sm"
                      />
                    </p>
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    • I therefore request you to please allow

                    <p className="lg:ms-2">
                      who is hereby authorized to bid on my behalf and whose signature
                      is attended below:
                    </p>
                    <p className="lg:ms-2">
                      Signature of Representative
                      <input
                        type="text"
                        disabled
                        className="border-b border-black w-72 outline-none bg-transparent mt-1 text-center font-normal"
                      />
                    </p>
                  </p>
                </div>

                {/* POINT 2 */}
                <div className="flex flex-wrap items-center font-semibold">
                  <span>
                    • I request you accept my bid offer in which I am ready to forego
                    up to Rs.
                  </span>
                  <span
                    className="border-b border-black w-28 mx-2 outline-none bg-transparent font-normal text-center text-sm"
                  >{chit.ChitValue}/-</span>

                  <span className="border-b border-black w-28 mx-2 outline-none bg-transparent font-normal text-center text-sm">
                    {chit.ChitValue}/-
                  </span>


                  <span className="lg:ms-2">for the month of</span>

                  <input

                    disabled
                    value={dayjs(chit.BylawsDate).format('MMMM YYYY')}

                    type="text"
                    className="border-b border-black w-40 ml-2 outline-none bg-transparent font-normal text-center text-sm"
                  />
                </div>

                {/* DECLARATION */}
                <p>
                  I do hereby agree that if I am declared as Successful Bidder, I
                  would provide sureties to the satisfaction of the Company and bidder
                  in accordance with company's rules.
                </p>

                <div className="w-full flex justify-between items-center">

                  <span>Thanking you.</span>
                  <span>Your's faithfully</span>
                </div>
                <div className="text-xs flex flex-col items-center justify-center leading-tight">
                  <span className="text-start">• Please state the name and furnish specimen signature without which the form will not be accepted <br />• Strike our which is not applicable</span>
                </div>
              </div>

              {/* NAME + ADDRESS */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center">
                  <label className="mr-2">Name :</label>
                  <input
                    type="text"
                    value={`${user.firstname} ${user.middlename} ${user.lastname}`}
                    className="font-medium border-b border-black w-153 outline-none bg-transparent text-sm"
                    disabled
                  />
                </div>

                <div className="flex w-full">
                  <label className="mr-2 w-24">Address :</label>
                  <textarea
                    disabled
                    value={user.permanent_address}
                    className="w-full border-b border-black outline-none bg-transparent resize-none overflow-hidden leading-tight text-sm"
                  />
                </div>
              </div>

              {/* SIGNATURE */}
              <div className="flex justify-end py-2 ">
                <div className="text-center">
                  <p className="text-sm mt-1">Signature</p>
                  <input
                    type="text"
                    className="border-b border-black w-56 outline-none bg-transparent mt-5"
                  />
                </div>
              </div>

              {/* COMPANY REMARKS */}
              <div className="border border-black mt-8 p-3">
                <p className="font-semibold text-center mb-5">Company's Remarks.</p>

                <div className="flex justify-between items-center py-5">
                  <div>
                    Signature Verified
                    <input className="border-b border-black w-32 ml-2 outline-none bg-transparent" />
                  </div>

                  <div>
                    Prized On
                    <input className="border-b border-black w-32 ml-2 outline-none bg-transparent" />
                  </div>

                  <div className="px-4">Foreman</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedForm.meetingMinutes && (
          <div className="print-page">
            <MeetingMinutesForm chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}

        {selectedForm.promissoryNote && (
          <div className="print-page">
            <PromissoryNote chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.demandPromissoryNote && (
          <div className="print-page">
            <DemandPromissoryNote chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.guaranteeAgreement && (
          <div className="print-page">
            <GuaranteeAgreement chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.receiptForAuction && (
          <div className="print-page">
            <ReceiptForAuction chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.receipt && (
          <div className="print-page">
            <Receiptform chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.bidPayableMemo && (
          <div className="print-page">
            <BidPayableMemo chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.debitParticulars && (
          <div className="print-page">
            <DebitParticulars chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.cashVoucher && (
          <div className="print-page">
            <CashVoucher chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.noClaim && (
          <div className="print-page">
            <NoClaim chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
        {selectedForm.noc && (
          <div className="print-page">
            <NOC chit={chit} user={user} chitAgreementData={chitAgreementData} />
          </div>
        )}
      </div>
      {isAnySelected && (
        <div className="w-full flex items-center justify-center my-8">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-[#004f9e] text-sm rounded-md text-white hover:bg-[#06c] cursor-pointer transition-colors duration-200"
        >
          Print Application
        </button>
      </div>
      )}
    </Layout>
  );
};

export default AuthenticationForm;