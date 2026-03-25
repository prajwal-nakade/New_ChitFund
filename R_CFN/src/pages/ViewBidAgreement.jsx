import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";
import { getAllBidAgreement } from "../api/endpoint"; // make sure this exists

const ViewBidAgreement = () => {
  const [bidAgreementData, setBidAgreementData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getAllBidAgreement();
    setBidAgreementData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg max-w-sm mx-auto lg:max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-medium mb-4 tracking-tight text-neutral-800">
            Bid Agreement
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full border border-neutral-300 text-sm rounded-md overflow-hidden">
            
            <thead className="bg-[#004f9e]">
              <tr>
                <th className="border p-2 text-white border-black">ID</th>
                <th className="border p-2 text-white border-black">Bylaws No</th>
                <th className="border p-2 text-white border-black">Customer Name</th>
                <th className="border p-2 text-white border-black">Auction No</th>
                <th className="border p-2 text-white border-black">Bid Amount</th>
                <th className="border p-2 text-white border-black">Prize Amount</th>
                <th className="border p-2 text-white border-black">Branch</th>
                <th className="border p-2 text-white border-black">Action</th>
              </tr>
            </thead>

            <tbody>
              {bidAgreementData.length > 0 ? (
                bidAgreementData.map((item) => {
                  
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

                      {/* Customer */}
                      <td className="border p-2">
                        {user
                          ? `${user.firstname} ${user.lastname}`
                          : "-"}
                      </td>

                      {/* Auction No */}
                      <td className="border p-2">
                        {item.auctionNumber || "-"}
                      </td>

                      {/* Bid Amount */}
                      <td className="border p-2">
                        {item.totalBidAmount || "-"}
                      </td>

                      {/* Prize */}
                      <td className="border p-2">
                        {item.prizedAmount || "-"}
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
                        >
                          <CircleCheckBig size={18} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
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