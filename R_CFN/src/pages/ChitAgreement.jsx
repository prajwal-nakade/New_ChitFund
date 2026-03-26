import { useContext, useState } from "react";
import Layout from "../components/layout";
import { UserContext } from "../context/UserContext";
import { createChitAgreement } from "../api/endpoint";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ChitAgreement = () => {
  const navigate = useNavigate();
  const { fetchChitsData, allchitData, branchData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [selectedChit, setSelectedChit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState({
    branch: "",
    ByLawsNumber: "",
    BylawsDate: "",
    fullName: "",
    permanent_address: "",
    installment_amount: "",
  });
  const [formData, setFormData] = useState({
    conducts_of_chits: "",
    number_of_tickets: "01",
    number_of_installments: "",
    installment_amount: "",
    scheduled_auction_time: "21:00",
    scheduled_auction_day: "",
    scheduled_last_date_of_payment: "",
    date_of_commencement: "",
    date_of_termination: "",
    first_auction_date: "",
    auction_frequency: "",
    auction_session_start: "21:00",
    auction_session_end: "21:30",
    register_bank_branch: "Chh. Sambhajinagar",
    foreman_name: "",
    company_reg_number: "",
    deposit_bank_name: "",
    deposit_receipt_no: "",
    deposit_date: "",
    term_month: "",
    prize_collection: "",
    jurisdiction_place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setData([]);
      return;
    }
    const keyword = value.trim().toLowerCase();
    const filtered = allchitData.filter((f) =>
      String(f?.application_id || "").toLowerCase().includes(keyword)
    );
    setData(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChit) {
      alert("Please select an application number first");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        user: selectedChit.user.id,
        branch: selectedChit.branch,
        chit: selectedChit.id,
        conducts_of_chits: formData.conducts_of_chits.toUpperCase(),
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
        jurisdiction_place: formData.jurisdiction_place || null,
      };

      const response = await createChitAgreement(payload);
      if (response.success) {
        toast.success(`Chit Agreement Created for ${displayData.fullName}`);
        setTimeout(() => { navigate(`/AgreementPrintPreview/${response.id}`); }, 2000);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const autoFill = (chit) => {
    const chitAmt = Number(chit.ChitValue);
    const chitDuration = Number(chit.Duration);
    const installmentAmt = chitDuration > 0 ? Math.round((chitAmt / chitDuration) * 100) / 100 : "";

    setDisplayData({
      branch: chit.branch || "",
      ByLawsNumber: chit.ByLawsNumber || "",
      BylawsDate: chit.BylawsDate || "",
      installment_amount: installmentAmt.toFixed(2),
      fullName: `${chit.user.firstname} ${chit.user.middlename} ${chit.user.lastname}`,
      permanent_address: chit.user.permanent_address || "",
      conducts_of_chits: chit.GroupCode || "",
    });

    setFormData((prev) => ({
      ...prev,
      number_of_installments: chitDuration,
      installment_amount: installmentAmt,
      conducts_of_chits: chit.GroupCode,
    }));
  };

  // Styles for the tabular structure
  const labelClass = "bg-gray-50 border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 w-1/3";
  const inputClass = "border border-neutral-300 px-4 py-2 w-2/3";
  const sectionHeader = "bg-[#004c9e] text-white px-4 py-2 font-semibold text-lg";

  return (
    <Layout>
      <div className="px-10 lg:mx-auto mx-0.5 rounded-md shadow-sm lg:my-3  border-neutral-300 overflow-hidden">
        {/* Header with Search */}
        <div className="bg-[#004c9e] text-white px-4 py-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <h2 className="text-lg font-semibold">Agreement of Chit</h2>
          
        </div>

        <form onSubmit={handleSubmit} className="bg-white">

          <div className="flex items-center gap-2 text-xs lg:text-sm relative bg-neutral-100 px-10 py-2">
            <label className="font-semibold">Application No. <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Enter Application No."
              className="border border-neutral-400 rounded px-3 py-1 text-sm text-black outline-none"
              required
            />
            {search && data.length > 0 && (
              <div className="absolute top-full left-0 w-70 bg-white border border-neutral-300 rounded shadow-lg z-50 mt-1">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black border-b last:border-0"
                    onClick={() => {
                      setData([]);
                      setSearch(item.application_id);
                      autoFill(item);
                      setSelectedChit(item);
                    }}
                  >
                    <span className="font-semibold"> APP_id: {item.application_id}</span> -{item.GroupCode}– {item.user.firstname} {item.user.lastname}
                  </div>
                ))}
              </div>
            )}
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {/* --- Basic Information --- */}
              <tr>
                <td className={labelClass}>Full Name and Address <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <textarea
                    
                    value={displayData.fullName || displayData.permanent_address ? `${displayData.fullName}\n${displayData.permanent_address}` : ""}
                    className="w-full px-3 py-1 border border-neutral-300 rounded-md bg-gray-100"
                    rows="2"
                  />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Branch <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <select name="branch" value={displayData.branch} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required>
                    <option value="">Select Branch</option>
                    {branchData.map((b) => <option key={b.id} value={b.id}>{b.branchName}</option>)}
                  </select>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Bye Law No. & Date <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="ByLawsNumber" value={displayData.ByLawsNumber} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" placeholder="No." required />
                    <input type="date" name="BylawsDate" value={displayData.BylawsDate} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Conducts of Chit <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="conducts_of_chits" value={displayData.conducts_of_chits} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md uppercase" required />
                </td>
              </tr>

              {/* --- Schedule Section --- */}
              <tr><td colSpan="2" className={sectionHeader}>Schedule</td></tr>
              <tr>
                <td className={labelClass}>Tickets & Installments <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="text-xs">No. of Tickets</label>
                        <input value="01" readOnly className="w-full px-3 py-1 border border-neutral-300 rounded-md bg-gray-50" />
                    </div>
                    <div className="w-1/2">
                        <label className="text-xs">No. of Installments</label>
                        <input name="number_of_installments" type="number" value={formData.number_of_installments} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Installment Amount <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                   <input name="installment_amount" type="number" value={formData.installment_amount} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Auction Time & Day <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="scheduled_auction_time" type="time" value={formData.scheduled_auction_time} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                    <input name="scheduled_auction_day" type="number" value={formData.scheduled_auction_day} onChange={handleChange} placeholder="Day of Month" className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Last Payment Date (Day) <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="scheduled_last_date_of_payment" type="number" value={formData.scheduled_last_date_of_payment} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>

              {/* --- Commencement & Termination --- */}
              <tr><td colSpan="2" className={sectionHeader}>Date of Commencement and Termination</td></tr>
              <tr>
                <td className={labelClass}>Commencement & Termination Dates</td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="date_of_commencement" type="date" value={formData.date_of_commencement} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" />
                    <input name="date_of_termination" type="date" value={formData.date_of_termination} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" />
                  </div>
                </td>
              </tr>

              {/* --- Drawing Details --- */}
              <tr><td colSpan="2" className={sectionHeader}>Chit Drawing Details</td></tr>
              <tr>
                <td className={labelClass}>First Auction Date <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="first_auction_date" type="date" value={formData.first_auction_date} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Subsequent Frequency (Day) <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="auction_frequency" type="number" value={formData.auction_frequency} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Session Time (From - To) <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="auction_session_start" type="time" value={formData.auction_session_start} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                    <input name="auction_session_end" type="time" value={formData.auction_session_end} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                  </div>
                </td>
              </tr>

              {/* --- Legal & Foreman --- */}
              <tr>
                <td className={labelClass}>Registered With <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="register_bank_branch" value={formData.register_bank_branch} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Foreman Name <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="foreman_name" value={formData.foreman_name} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Company Reg. Number <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="company_reg_number" value={formData.company_reg_number} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>

              {/* --- Security Deposits --- */}
              <tr><td colSpan="2" className={sectionHeader}>Security Particulars (Deposited by Foreman)</td></tr>
              <tr>
                <td className={labelClass}>Bank & Receipt Details <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="deposit_bank_name" value={formData.deposit_bank_name} onChange={handleChange} placeholder="Bank Name" className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                    <input name="deposit_receipt_no" value={formData.deposit_receipt_no} onChange={handleChange} placeholder="Receipt No." className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Deposit Date & Term <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <div className="flex gap-2">
                    <input name="deposit_date" type="date" value={formData.deposit_date} onChange={handleChange} className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                    <input name="term_month" value={formData.term_month} onChange={handleChange} placeholder="No. of Months" className="w-1/2 px-3 py-1 border border-neutral-300 rounded-md" required />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Recovery of Loss <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="prize_collection" value={formData.prize_collection} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
              <tr>
                <td className={labelClass}>Jurisdiction Place <span className="text-red-500">*</span></td>
                <td className={inputClass}>
                  <input name="jurisdiction_place" value={formData.jurisdiction_place} onChange={handleChange} className="w-full px-3 py-1 border border-neutral-300 rounded-md" required />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="flex justify-center p-6 bg-gray-50 border-t border-neutral-300">
            {loading ? (
              <button disabled className="px-8 py-2 bg-[#06c] flex items-center gap-2 text-white rounded-md text-sm shadow-md opacity-70">
                <Loader2 size={18} className="animate-spin" /> Saving Agreement...
              </button>
            ) : (
              <button type="submit" className="px-8 py-2 bg-[#004f9e] hover:bg-[#06c] transition-all text-white rounded-md text-sm shadow-md">
                Save Agreement
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChitAgreement;