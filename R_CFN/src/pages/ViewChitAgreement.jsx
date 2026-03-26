import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { getAllChitAgreement } from "../api/endpoint";
import { Printer, Search } from "lucide-react";
import { useNavigate } from "react-router";

const ViewChitAgreement = () => {
  const [searched, setSearched] = useState([]);
  const [chitAgreementData, setChitAgreementData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Optional: track search term
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getAllChitAgreement();
    setChitAgreementData(data);
    setSearched(data); // Initialize searched with all data
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    const searchKeyword = keyword.toLowerCase().trim();
    
    if (!searchKeyword) {
      // If search is empty, show all data
      setSearched(chitAgreementData);
    } else {
      // Filter based on name or mobile number
      const filtered = chitAgreementData.filter(
        (item) => {
          const firstName = (item?.chit?.user?.firstname || "").toLowerCase();
          const lastName = (item?.chit?.user?.lastname || "").toLowerCase();
          const fullName = `${firstName} ${lastName}`;
          const GroupCode = (item?.chit?.GroupCode || "").toLowerCase();
          
          return fullName.includes(searchKeyword) || GroupCode.includes(searchKeyword);
        }
      );
      setSearched(filtered);
    }
  };

  return (
    <>
      <Layout>
        <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg max-w-sm mx-auto lg:max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between w-full flex-wrap gap-4">
            <h2 className="text-lg font-medium mb-4 tracking-tight text-neutral-800">
              Chit Agreements
            </h2>
            <div className="flex items-center relative ms-auto lg:ms-auto">
              <div className="absolute bg-gray-200 h-full rounded-l-md border border-neutral-300 px-2">
                <Search size={14} className="text-neutral-500 mt-2" />
              </div>
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-full lg:w-84 outline-none"
                placeholder="Search by name and Group code"
                value={searchTerm}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-3">
            <table className="w-full border border-neutral-300 text-sm rounded-md overflow-hidden">
              <thead className="bg-[#004f9e]">
                <tr>
                  <th className="border p-2 text-white font-medium border-black">
                    Agreement Id
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Bylaws No
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Group Code
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Customer Name
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Ticket No
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Chit Value
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Duration
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Branch
                  </th>
                  <th className="border p-2 text-white font-medium border-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {searched.length > 0 ? (
                  searched.map((item) => (
                    <tr key={item.id} className="text-center border-t">
                      {/* Agreement Id */}
                      <td className="border p-2">{item.id}</td>

                      {/* Bylaws No */}
                      <td className="border p-2">
                        {item.chit?.ByLawsNumber || "-"}
                      </td>
                      <td className="border p-2 uppercase">
                        {item.chit?.GroupCode ?? "-"}
                      </td>
                      {/* Customer Name */}
                      <td className="border p-2">
                        {`${item.chit.user?.firstname || ""} ${item.chit.user?.lastname || ""}`}
                      </td>

                      {/* Ticket No */}
                      <td className="border p-2">
                        {item.number_of_tickets}
                      </td>

                      {/* Chit Value */}
                      <td className="border p-2">
                        {item.chit?.ChitValue ?? "-"}
                      </td>

                      {/* Duration */}
                      <td className="border p-2">
                        {item.chit?.Duration
                          ? `${item.chit.Duration} ${item.chit.DurationCategory}`
                          : "-"}
                      </td>

                      {/* Branch */}
                      <td className="border p-2">
                        {item.branchName}
                      </td>

                      {/* Action */}
                      <td className="border p-2">
                        <button
                          onClick={() => navigate(`/AgreementPrintPreview/${item.id}`)}
                          className="px-1 py-1 text-xs bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Printer size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center p-4 text-gray-500">
                      No agreements found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewChitAgreement;