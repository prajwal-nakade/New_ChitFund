import { useContext, useState } from "react";
import Layout from "../components/layout";
import { UserContext } from "../context/UserContext";

const ChitAgreement = () => {

    const { fetchChitsData, allchitData, branchData } = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        branch: "",
        ByLawsNumber: "",
        BylawsDate: "",
        conductsOfChit: "",
        fullName: "",
        permanent_address: ""
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
        setSearch(value)

        if (!value.trim()) {
            setData([])
            return
        }

        const keyword = value.trim().toLowerCase()
        const filtered = allchitData.filter((f) =>
            String(f?.application_id || "")
                .toLowerCase()
                .includes(keyword)
        )

        setData(filtered)
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Agreement Data:", formData);
        // API call can be added here
    };

    const autoFill = (chit) => {
        setFormData({
            branch: chit.branch || "",
            ByLawsNumber: chit.ByLawsNumber || "",
            BylawsDate: chit.BylawsDate || "",
            conductsOfChit: "",
            fullName: `${chit.user.firstname} ${chit.user.middlename} ${chit.user.lastname}` || "",
            permanent_address: chit.user.permanent_address || ""
        })
    }

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
                            {data.map(item => (
                                <div
                                    key={item.id}
                                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                                    onClick={() => {
                                        setData([])
                                        setSearch(item.application_id)
                                        autoFill(item)
                                    }}
                                >
                                    <span className="font-semibold">APP_ID : {item.application_id}</span> – {item.ByLawsNumber}
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
                    {/* Row 1 */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        {/* Branch */}
                        <div className="flex flex-col w-full text-sm">
                            <label>
                                Branch <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                                required
                            >
                                <option value="">Select Branch</option>
                                {branchData.map(b => (
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
                                value={formData.ByLawsNumber}
                                onChange={handleChange}
                                placeholder="Bye Law Number"
                                className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div className="flex flex-col w-full text-sm">
                            <label>
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="BylawsDate"
                                value={formData.BylawsDate}
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
                                name="conductsOfChit"
                                value={formData.conductsOfChit}
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

                <div className="px-5  border-neutral-200 flex flex-col">
                    <label>
                        Full Name and Address<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="fullName"
                        value={`${formData.fullName}\n${formData.permanent_address}`}
                        onChange={handleChange}
                        placeholder="Full Name and Address"
                        className="w-full  px-3 py-1 border border-neutral-300 rounded-md text-sm"
                        required
                    />
                </div>
                <div className="flex w-full px-5  border-neutral-200 gap-4">
                    <div className="flex flex-col items-start w-full text-sm">
                        <label>
                            No. of Tickets <span className="text-red-500">*</span>
                        </label>
                        <input 
                        value={'01'}
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
                            type="text"
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
                            type="text"
                            placeholder="Amount per Ticket per Installments"
                            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                        />
                    </div>
                </div>
                <div className="flex w-full px-5 border-neutral-200 gap-4 ">
                    <div className="flex flex-col items-start w-full text-sm">
                        <label>
                            Series and per Chits No. <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Group Code"
                            className="w-full mt-1 px-3 py-1 border border-neutral-300 rounded-md text-sm"
                        />
                    </div>
                    <div className="flex flex-col items-start w-full text-sm">
                        <label>
                            Chits Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Total Chit Amount"
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
                            type="date"
                            placeholder="Day of Auction"
                            className="border border-neutral-300 w-full rounded-md px-3 py-1"
                        />
                    </div>

                    <div className="flex flex-col items-start w-full text-sm">
                        <label>
                            Last date for Payment of Installment is <span className="text-red-500">*</span>
                        </label>
                        <input
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
              type="time"
              placeholder="Time of Auction"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              at Foreman's offices situated at
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Branch"
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
            type="text"
            placeholder="Register Branch"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="w-full items-start px-3 py-1 border-t border-neutral-400">
          <h2 className="text-base  font-medium">
            Registration Number and Date of Registration of Bye Laws
          </h2>
        </div>
        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm  ">
            <label>
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Registration Number "
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>

          <div className="flex flex-col items-start w-full text-sm">
            <label>
              Date of Registration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Date of Registration"
              className="border border-neutral-300 w-full rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium py-1">
            Name of Foreman
            <span className="text-red-500">*</span>{" "}
          </h1>
          <input
            type="text"
            placeholder="Name Of Foreman"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="flex-col w-full px-5 border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium py-1">
            Total Chit Amount
            <span className="text-red-500">*</span>{" "}
          </h1>
          <input
            type="text"
            placeholder="Total Chit Amount"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="flex-col w-full  border-neutral-200 border-t pt-3 gap-4">
          <h1 className="text-base font-medium px-3 py-1">
            Particulars of security given or deposited by the Forman
            <span className="text-red-500">*</span>{" "}
          </h1>
          <div className="flex w-full px-5 border-neutral-200 gap-4">
            <div className="flex flex-col items-start w-full text-sm">
              <label>
                The Sum Of Rs. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Chit Amount"
                className="border border-neutral-300 w-full rounded-md px-3 py-1"
              />
            </div>

            <div className="flex flex-col items-start w-full text-sm">
              <label>
                Deposited By the Forman With{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
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
            type="text"
            placeholder="Recovery of Loss"
            className="border border-neutral-300 w-full rounded-md px-3 py-1"
          />
        </div>

        <div className="w-full items-start px-3 py-1 border-t border-neutral-400">
          <h2 className="text-base  font-medium">
            The Subscriber under takes to abide by the registered Bye-Laws of Chit 
          </h2>
        </div>
        <div className="flex w-full px-5 pb-2 border-neutral-200 gap-4">
          <div className="flex flex-col items-start w-full text-sm  ">
            <label>
              Heading <span className="text-red-500">*</span>
            </label>
            <input
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
                    <button
                        type="submit"
                        className="px-6 py-1 bg-[#004f9e] hover:bg-[#06c] transition-all duration-300 text-white rounded-md text-sm shadow-md"
                    >
                        Save Agreement
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default ChitAgreement;
