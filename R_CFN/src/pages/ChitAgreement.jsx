import { useContext, useState } from "react";
import Layout from "../components/layout";
import { UserContext } from "../context/UserContext";
import { createChitAgreement } from "../api/endpoint";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ChitAgreement = () => {
  const navigate = useNavigate()
  const { fetchChitsData, allchitData, branchData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [selectedChit, setSelectedChit] = useState(null);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState({
    branch: "",
    ByLawsNumber: "",
    BylawsDate: "",
    fullName: "",
    permanent_address: "",
  });
  const [formData, setFormData] = useState({
    conducts_of_chits: '',
    number_of_tickets: '01',
    number_of_installments: '',
    installment_amount: '',
    scheduled_auction_time: '',
    scheduled_auction_day: '',
    scheduled_last_date_of_payment: '',
    date_of_commencement: '',
    date_of_termination: '',
    first_auction_date: '',
    auction_frequency: '',
    auction_session_start: '',
    auction_session_end: '',
    register_bank_branch: '',
    foreman_name: '',
    company_reg_number: '',
    deposit_bank_name: '',
    deposit_receipt_no: '',
    deposit_date: '',
    term_month: '',
    prize_collection: '',
    jurisdiction_place: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setData([]);
      return;
    }

    const keyword = value.trim().toLowerCase();
    const filtered = allchitData.filter((f) =>
      String(f?.application_id || "")
        .toLowerCase()
        .includes(keyword),
    );

    setData(filtered);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChit) {
      alert("Please select an application number first");
      return;
    }
    setLoading(true)
    try {



      const payload = {
        user: selectedChit.user.id,
        branch: selectedChit.branch,
        chit: selectedChit.id,

        conducts_of_chits: formData.conducts_of_chits,
        number_of_tickets: formData.number_of_tickets,
        number_of_installments: Number(formData.number_of_installments),
        installment_amount: Number(formData.installment_amount),
        scheduled_auction_time: formData.scheduled_auction_time,
        scheduled_auction_day: formData.scheduled_auction_day || null,
        scheduled_last_date_of_payment: formData.scheduled_last_date_of_payment || null,
        date_of_commencement: formData.date_of_commencement,
        date_of_termination: formData.date_of_termination,
        first_auction_date: formData.first_auction_date,
        auction_frequency: formData.auction_frequency,
        auction_session_start: formData.auction_session_start,
        auction_session_end: formData.auction_session_end,
        register_bank_branch: formData.register_bank_branch,
        foreman_name: formData.foreman_name,
        company_reg_number: formData.company_reg_number,
        deposit_bank_name: formData.deposit_bank_name,
        deposit_receipt_no: formData.deposit_receipt_no,
        deposit_date: formData.deposit_date,
        term_month: formData.term_month,
        prize_collection: formData.prize_collection,
        jurisdiction_place: formData.jurisdiction_place,
      };

      const response = await createChitAgreement(payload);
      if(response.success){
        toast.success(`Chit Agreement is Created for Customer ${displayData.fullName} having Agreement ID : ${response.id}`)
        setTimeout(() => {
          navigate(`/AgreementPrintPreview/${response.id}`)
        }, 2000)
      }
      console.log(response);
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  const autoFill = (chit) => {
    setDisplayData({
      branch: chit.branch || "",
      ByLawsNumber: chit.ByLawsNumber || "",
      BylawsDate: chit.BylawsDate || "",
      conductsOfChit: "",
      fullName:
        `${chit.user.firstname} ${chit.user.middlename} ${chit.user.lastname}` ||
        "",
      permanent_address: chit.user.permanent_address || "",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-[#004c9e] text-white px-4 py-1 rounded-t flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold">Agreement of Chit</h2>

        <div className="flex items-center gap-2 text-sm relative">
          <label>
            Application No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="srNo"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Enter Sr. No."
            className="border border-neutral-400 rounded px-3 py-1 text-sm text-white"
            required
          />
          {search && data.length > 0 && (
            <div className="absolute top-full -left-10 w-78 bg-white border border-neutral-300 rounded shadow z-10">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => {
                    setData([]);
                    setSearch(item.application_id);
                    autoFill(item);
                    setSelectedChit(item)
                  }}
                >
                  <span className="font-semibold">
                    APP_ID : {item.application_id}
                  </span>{" "}
                  – {item.ByLawsNumber}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white text-sm rounded-b-md border border-neutral-300"
      >
        <div className="px-5 py-2 flex flex-col gap-4">
          <div className=" w-full border-neutral-200 flex flex-col">
            <label>
              Full Name and Address<span className="text-red-500">*</span>
            </label>
            <textarea
              name="fullName"
              value={`${displayData.fullName}\n${displayData.permanent_address}`}
              onChange={handleChange}
              placeholder="Full Name and Address"
              className="w-full  px-3 py-1 border border-neutral-300 rounded-md text-sm"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Branch */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                value={displayData.branch}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              >
                <option value="">Select Branch</option>
                {branchData.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.branchName}
                  </option>
                ))}
              </select>
            </div>

            {/* Bye Law No */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Bye Law No. <span className="text-red-500">*</span>
              </label>
              <input
                name="ByLawsNumber"
                value={displayData.ByLawsNumber}
                onChange={handleChange}
                placeholder="Bye Law Number"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Bye Law Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="BylawsDate"
                value={displayData.BylawsDate}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Conducts of Chit */}
            <div className="flex flex-col w-full text-sm">
              <label>
                Conducts of Chit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="conducts_of_chits"
                value={formData.conducts_of_chits}
                onChange={handleChange}
                placeholder="Conducts of Chit"
                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                required
              />
            </div>
          </div>
        </div>
        <div className="bg-[#004c9e] text-white px-4 py-1  flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Schedule</h2>
        </div>

        <div className="flex w-full px-5  border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              No. of Tickets <span className="text-red-500">*</span>
            </label>
            <input
           
              value={"01"}
              name="number_of_tickets"
              type="text"
              placeholder="No. of Tickets"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              No. of Installments <span className="text-red-500">*</span>
            </label>
            <input
            required
              name="number_of_installments"
              type="number"
              onChange={handleChange}
              placeholder="No. of Installments"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Amount per Ticket per Installments{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="installment_amount"
              type="text"
              placeholder="Amount per Ticket per Installments"
              className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Time of Auction <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="scheduled_auction_time"
              type="time"
              placeholder="Time of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Day of Auction <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="scheduled_auction_day"
              type="date"
              placeholder="Day of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Last date for Payment of Installment is{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="scheduled_last_date_of_payment"
              type="date"
              placeholder="Last Date of Installment"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>
        <div className="w-full items-start px-3 py-1 border-t border-neutral-400">
          <h2 className="text-base  font-medium">
            Date of Commencement and termination of Chit{" "}
          </h2>
        </div>
        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm  ">
            <label>
              Date of Commencement <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="date_of_commencement"
              type="date"
              placeholder="Date of Commencement "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Date of Termination <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="date_of_termination"
              type="date"
              placeholder="Date of Termination
             "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="w-full items-start px-3 pt-2 border-t border-neutral-400">
          <h2 className="text-base  font-medium">
            The Date , time and Place at which the chit is to be Drawn
          </h2>
        </div>
        <div className="flex w-full px-5 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm  ">
            <label>
              First Auction shall be held on{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="first_auction_date"
              type="date"
              placeholder="Date of Commencement "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Subsequent Auction on Every{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="auction_frequency"
              type="date"
              placeholder="Date of Termination
             "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="flex w-full px-5 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Time 1 <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="auction_session_start"
              type="time"
              placeholder="Time of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Time 2 <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="auction_session_end"
              type="time"
              placeholder="Time of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium py-1">
            Registrar with whom the Bye-Laws have been Registered{" "}
            <span className="text-red-500">*</span>{" "}
          </h1>
          <input
          required
            onChange={handleChange}
            name="register_bank_branch"
            type="text"
            placeholder="Register Branch"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
            <h1 className="text-base font-medium py-1">
              Name of Foreman
              <span className="text-red-500">*</span>{" "}
            </h1>
            <input
            required
              onChange={handleChange}
              name="foreman_name"
              type="text"
              placeholder="Name Of Foreman"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
          <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
            <h1 className="text-base font-medium py-1">
              Company Registration Number
              <span className="text-red-500">*</span>{" "}
            </h1>
            <input
            required
              onChange={handleChange}
              name="company_reg_number"
              type="text"
              placeholder="Company Registration Number"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="flex-col w-full  border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium px-3 py-1">
            Particulars of security given or deposited by the Forman
            <span className="text-red-500">*</span>{" "}
          </h1>
          <div className="flex w-full px-5 border-neutral-200 gap-4">
            <div className="flex flex-col items-start w-full text-sm">
              <label>
                Deposited By the Forman With{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
              required
                onChange={handleChange}
                name="deposit_bank_name"
                type="text"
                placeholder="Deposited By the Forman With"
                className="border border-neutral-300 w-full rounded-md px-3 py-1"
              />
            </div>

            <div className="flex flex-col items-start w-full text-sm">
              <label>
                under Fixed Deposit receipt No.
                <span className="text-red-500">*</span>
              </label>
              <input
              required
                onChange={handleChange}
                name="deposit_receipt_no"
                type="text"
                placeholder="Receipt No."
                className="border border-neutral-300 w-full rounded-md px-3 py-1"
              />
            </div>
          </div>

          <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
            <div className="flex flex-col items-start py-2 w-full text-sm  ">
              <label>
                Dated <span className="text-red-500">*</span>
              </label>
              <input
              required
                onChange={handleChange}
                name="deposit_date"
                type="date"
                placeholder="Date"
                className="border border-neutral-300 w-full rounded-md px-3 py-1"
              />
            </div>

            <div className="flex flex-col py-2 items-start w-full text-sm">
              <label>
                For term of Months <span className="text-red-500">*</span>
              </label>
              <input
              required
                onChange={handleChange}
                name="term_month"
                type="text"
                placeholder="No. of Months"
                className="border border-neutral-300 w-full rounded-md px-3 py-1"
              />
            </div>
          </div>
        </div>

        <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium py-1">
            Recovery of Loss
            <span className="text-red-500">*</span>{" "}
          </h1>
          <input
          required
            onChange={handleChange}
            name="prize_collection"
            type="text"
            placeholder="Recovery of Loss"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="w-full items-start px-3 py-1 border-t border-neutral-400">
          <h2 className="text-base  font-medium">
            The Subscriber under takes to abide by the registered Bye-Laws of
            Chit
          </h2>
        </div>
        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm  ">
            <label>
              Jurisdiction Place <span className="text-red-500">*</span>
            </label>
            <input
            required
              onChange={handleChange}
              name="jurisdiction_place"
              type="text"
              placeholder=""
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Heading <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder=" "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-4 pb-4">
          {loading ? (
            <button
              type="submit"
              className="px-6 py-1 bg-[#06c] flex items-center gap-2 text-white rounded-md text-sm shadow-md"
            >
              <Loader2 size={18} className="animate-spin" />Saveing Agreement...
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 text-white rounded-md text-sm shadow-md"
            >
              Save Agreement
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default ChitAgreement;
