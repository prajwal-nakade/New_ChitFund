import dayjs from "dayjs";
import React from "react";

const GuaranteeAgreement = ({ chit, user, chitAgreement, bidAgreement, gurantor }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-black px-8 py-6 text-[15px] leading-7">
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

        {/* TITLE */}
        <div className="bg-black text-white text-center text-[13px] font-bold py-[3px] mt-3">
          GUARANTEE AGREEMENT
        </div>

        {/* PARAGRAPH 1 */}
        <p className="mt-4 text-justify">
          In consideration of KARDE KRISHNA CHITS PRIVATE LIMITED (hereinafter
          referred to as “The Company”) granting of time for repayment or
          deferring the filing of suit for recover against
          <input className="border-b border-black w-full outline-none bg-transparent mx-2 flex-1" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
        </p>

        <div className="flex items-center mt-2">
          <p className="text-justify mt-2">
            (Hereinafter Called “The Prized Subscriber”) which expression shall
            where the context so admit his heirs, legal representative,
            administrator, executors and like, a sum of Rs.
         
          <input className="border-b border-black w-28 outline-none bg-transparent mx-2" />
          <span>(Rupees -</span>
          <input className="border-b border-black w-80 outline-none bg-transparent mx-2" />
          <span>) by way of Prized.</span>

           </p>
        </div>

        {/* TEXT */}
        <div className="flex flex-wrap items-center mt-2">
        <p className="mt-3 text-justify">
          Under Chit Amount ( hereinafter referred to as the “Prized Amount”) as
          mentioned in the Chit Agreement which is registered with the Joint
          Registrar of Chits, Aurangabad Registration No.
        

        {/* REG DETAILS */}
      
          <input className="border-b border-black w-60 outline-none bg-transparent mx-2" disabled value={chitAgreement?.company_reg_number}/>
          <span>Of</span>
          <input className="border-b border-black w-40 outline-none bg-transparent mx-2 text-center" disabled value={bidAgreement?.dateofAuction ? dayjs(chitAgreement.dateofAuction).format("DD MMM YYYY") : ""}/>
          
          <span>under section 4” if the Maharashtra Chit Fund Act1982</span>
          </p>
        </div>

        <p className="mt-2 text-justify">
          (hereinafter Called as “Chit Agreement”)The understand.
        </p>

        {/* AND */}
        <div className="text-center font-semibold mt-4">AND</div>

        {/* GUARANTOR TEXT */}
        <p className="mt-3 text-justify">
          (Hereinafter referred to as the “guarantors”) hereby jointly and
          severally agree with the Company as Follow :
        </p>

        {/* BULLETS */}
        <div className="mt-2 space-y-2 text-justify">
          <p>
            • I/We hereby unconditionally and irrevocably guarantee to the
            Company the due repayment the Prizes Subscriber of the said Prized
            amount and the due payment of all amount which or which may at any
            time hereafter become due and payable by the prized Subscriber to
            the Company under or in connection with the said Prized Amount
            including but not limited to all Sums payable by way of Monthly
            Installment, Principle, On Interest, Fees, Costs or enforcement of
            the said Prized Amount all of which hereinafter collectively
            referred to as “the Prized Subscriber’s dues”.
          </p>

          <p>
            • In the of Prized Subscriber if the reason unwilling, failing or
            defaulting in making due payment of the Prized Subscriber’s Dues or
            any thereof , I/We shall without any demand pay to the Company the
            Prized Subscriber’s Dues in full together with interest, additional
            interest costs, charges etc. up to the date of payment
          </p>

          <p>
            • Any such demand by the Company in me/us may be made by sending a
            written communication to me. us at the address given in Schedules
            the Company, I/We agree that I/We will not required and shall not be
            entitled to require any further from the company.
          </p>

          <p>
            • To give effects to this guarantee the Company shall be at liberty
            to consider and treat me /each of us as principle debtor’s to the
            Company in respect if all payment by me/us the Company hereunder,
            I/we waive in favor of the Company all Payment guarantor’s against
            the Company, so far as may be necessary to give effect to any the
            Provision of this guarantee or to recover the Prized Subscriber’s
            Dues From me/us.
          </p>

          <p>
            • Our liability hereunder is joint and several along with the
            liability of the Prized Subscriber and coextensive with that of the
            Prized Subscribers.
          </p>

          <p>
            • The Company shall be at liberty in its sole discretion to demand
            payment of the Prized Subscriber’s Dues From, to adopt Proceedings
            against and or to recover the Prized Subscriber’s and me/us jointly
            or severally, the Subscriber alone, me/us alone or any one or more
            of us.
          </p>

          <p>
            • This agreement shall be enforceable against me/us notwithstanding
            that negotiable instrument may be outstanding at the time when
            demand is made or proceeding are taken
          </p>

          <p>
            • against the Prized Subscriber or ant security is available to our
            outstanding with the company or is sold or sought to be sold by the
            Company.
          </p>
          <p>
            • I/We agree that the correctness of any statement of account sent
            or furnished by the company shall be accept by any be binding on
            ne/us and shall be conclusive proof of the correctness or the sum
            mentioned therein and shall not be questioned or disputed my me/us
            ground whatsoever.
          </p>
          <p>
            •I/we shall be not be entitled to revoke guarantee and this
            guarantee shall remain in force till all amount due and payable by
            me/us to the Company hereunder and /or respect of the Prized
            Subscriber's Dues have been Finally paid in full.
          </p>
          <p>
            • In the event of my death during the continuance of this guarantee
            shall not be by me/our death and my/our estate, effects, heirs,
            executors, administrators and legal representative will continue to
            be liable for the full payment of all the moneys payable and/or due
            hereunder or in connection with said Prized Subscriber's Dues.
          </p>
          <p>
            • I/We Agree that for the purpose of limitation any admission or
            acknowledgement in writing given or part payment made by the Prized
            Subscriber in respect of ir repayment of the Prized Subscriber's
            Dues or otherwise in relation to the said amount shall be binding on
            me/us shall be treated as given on my /our behalf also. I/We hereby
            irrevocably constitute the Prized Subscriber as my/our agent /s for
            the purpose of giving such admission or acknowledgement and for
            making such part payment.
          </p>

          <p>
            • This guarantee shall be in addition to,and not by way any
            limitation of or substitution for, any shall not prejudice by, any
            other guarantee or security, whenever by way of hypothecation,
            mortgage, insurance, lien or otherwise. Which the company may mow or
            at any time hereafter have or any of the moneys their by secured.
          </p>
          <p>
            • I/we declare that I/we have perused a copy of the said Guarantee
            Agreement between the Company and Prized Subscriber and have
            understood the same.
          </p>
          <p>
            • Any notice, Communication or other correspondence addressed my the
            company to me/us be addressed to the address given by me/us herein
            or such other address as the Company may be aware, such notice,
            communication or correspondence may be served by ordinary post or
            hand delivery or otherwise and in case of post shall be deemed to
            have been served on me/us at the time it would have been delivered
            in the normal course. In the event of any change in my/our address,
            I/We shall forthwith intimate the same to the Company Failing which
            service of notice or correspondence to the address last given by
            ne/us shall be deemed to be service on me/us.
          </p>
          <p>
            • I/we agree that the Company may at my/our risk and engage a
            collection agency to collect my/our dues and liabilities hereunder
            and any furnish to the collection agency such information, facts and
            figure as the Company thinks Fit.
          </p>
          <p>
            • All costs(including cost between Advocate and client),charges,
            expenses, taxes, duties (including stamp duties) in relation to this
            agreement and any document executed pursuant hereto and in relation
            to the creation, enforcement, realization and attempted enforcement
            of this agreement and or any security shall be born and paid by
            me/us alone.
          </p>

          <p className="mt-3 text-[15px] leading-6">
            The Guarantee Agreement made and entered in to Chh. Sambhajinagar on
            the
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent text-center" disabled value={bidAgreement?.dateofAuction ? dayjs(chitAgreement.dateofAuction).format("DD") : ""} />
            day of
            <input className="border-b border-black mx-2 w-28 outline-none bg-transparent" disabled value={ bidAgreement.dateofAuction ? dayjs(bidAgreement.dateofAuction).format("MMMM YYYY") : ""}/>
          </p>
        </div>

        {/* SIGNATURES */}
        <div className="mt-10 space-y-8 mx-10">
          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled value={`${user?.firstname} ${user?.middlename} ${user?.lastname} `} />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>

          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled value={`${gurantor?.firstname} ${gurantor?.middlename} ${gurantor?.lastname} `} />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>

          <div className="flex items-center">
            <input className="border-b border-black w-100 outline-none bg-transparent text-center" disabled />
            <div className="w-20 h-24 border border-black ml-10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuaranteeAgreement;
