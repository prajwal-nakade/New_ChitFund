import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { CircleCheckBig, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { getAllBidAgreement } from "../api/endpoint"; // make sure this exists

const ViewBidAgreement = () => {
  const [bidAgreementData, setBidAgreementData] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getAllBidAgreement();
    setBidAgreementData(data);
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
      setSearched(bidAgreementData);
    } else {
      // Filter based on customer name and GroupCode
      const filtered = bidAgreementData.filter((item) => {
        const chitAgreement = item?.chitAgreement;
        const chit = chitAgreement?.chit;
        const user = chit?.user;
        
        const firstName = (user?.firstname || "").toLowerCase();
        const lastName = (user?.lastname || "").toLowerCase();
        const fullName = `${firstName} ${lastName}`;
        const groupCode = (chit?.GroupCode || "").toLowerCase();
        
        return fullName.includes(searchKeyword) || groupCode.includes(searchKeyword);
      });
      setSearched(filtered);
    }
  };

  return (
    <Layout>
      <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg max-w-sm mx-auto lg:max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between w-full flex-wrap gap-4">
          <h2 className="text-lg font-medium mb-4 tracking-tight text-neutral-800">
            Print Bid Agreements
          </h2>
          
          {/* Search Bar */}
          <div className="flex items-center relative mb-4">
            <div className="absolute bg-gray-200 h-full rounded-l-md border border-neutral-300 px-2">
              <Search size={14} className="text-neutral-500 mt-2" />
            </div>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-full lg:w-80 outline-none"
              placeholder="Search by name or Group Code..."
              value={searchTerm}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full border border-neutral-300 text-sm rounded-md ">
            
            <thead className="bg-[#004f9e]">
              <tr>
                <th className="border p-2 text-white border-black">ID</th>
                <th className="border p-2 text-white border-black">Bylaws No</th>
                <th className="border p-2 text-white border-black">Group Code</th>
                <th className="border p-2 text-white border-black">Customer Name</th>
                <th className="border p-2 text-white border-black">Auction No</th>
                <th className="border p-2 text-white border-black">Bid Amount</th>
                <th className="border p-2 text-white border-black">Prize Amount</th>
                <th className="border p-2 text-white border-black">Branch</th>
                <th className="border p-2 text-white border-black">Action</th>
              </tr>
            </thead>

            <tbody>
              {searched.length > 0 ? (
                searched.map((item) => {
                  
                  const chitAgreement = item?.chitAgreement;
                  const chit = chitAgreement?.chit;
                  const user = chit?.user;

                  return (
                    <tr key={item.id} className="text-center border-t">
                      
                      {/* ID */}
                      <td className="border p-2">{item.id}</td>

                      {/* Bylaws */}
                      <td className="border p-2">
                        {chit?.ByLawsNumber || "-"}
                      </td>
                      <td className="border p-2 uppercase">
                        {chit?.GroupCode || "-"}
                      </td>

                      {/* Customer */}
                      <td className="border p-2">
                        {user
                          ? `${user.firstname || ""} ${user.middlename || ""} ${user.lastname || ""}`.trim()
                          : "-"}
                      </td>

                      {/* Auction No */}
                      <td className="border p-2">
                        {item.auctionNumber || "-"}
                      </td>

                      {/* Bid Amount */}
                      <td className="border p-2">
                        {item.totalBidAmount ? `₹${item.totalBidAmount.toLocaleString()}` : "-"}
                      </td>

                      {/* Prize */}
                      <td className="border p-2">
                        {item.prizedAmount ? `₹${item.prizedAmount.toLocaleString()}` : "-"}
                      </td>

                      {/* Branch */}
                      <td className="border p-2">
                        {chitAgreement?.branchName || "-"}
                      </td>

                      {/* Action */}
                      <td className="border p-2">
                        <button
                          onClick={() =>
                            navigate(`/authenticationform/${item.id}`)
                          }
                          className="px-1 py-1 text-xs bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                          title="View Details"
                        >
                          <CircleCheckBig size={18} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
                    No bid agreements found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ViewBidAgreement;