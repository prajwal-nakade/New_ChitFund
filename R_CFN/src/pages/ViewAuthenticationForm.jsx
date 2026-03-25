import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { getAllChitAgreement } from "../api/endpoint";
import { CircleCheckBig, Printer } from "lucide-react";
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const ViewAuthenticationForm = () => {

  const [chitAgreementData, setChitAgreementData] = useState([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getAllChitAgreement()
    setChitAgreementData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout>
      <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg max-w-sm mx-auto lg:max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-medium mb-4 tracking-tight text-neutral-800">
            Authentication Form
          </h2>


        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full border border-neutral-300 text-sm rounded-md overflow-hidden">
            <thead className=" bg-[#004f9e]">
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
              {chitAgreementData.length > 0 ? (
                chitAgreementData.map((item) => (
                  <tr key={item.id} className="text-center border-t">

                    {/* Agreement Id */}
                    <td className="border p-2">{item.id}</td>

                    {/* Bylaws No */}
                    <td className="border p-2">
                      {item.chit?.ByLawsNumber || "-"}
                    </td>
                    {/* Bylaws No */}
                    <td className="border p-2 uppercase">
                      {item.chit?.GroupCode || "-"}
                    </td>
                    {/* Customer Name */}
                    <td className="border p-2">
                      {`${item.chit.user?.firstname} ${item.chit.user?.lastname}`}
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
                        
                        onClick={() => {
                          if (item.has_bid) {
                            toast.error("Bid already exists for this Group Code");
                            return;
                          }
                          navigate(`/BidAgreementDetails/${item.id}`);
                        }}
                        className={`px-1 py-1 text-xs rounded ${item.has_bid
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
                          }`}
                      >
                        <CircleCheckBig size={18} />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No agreements found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default ViewAuthenticationForm


