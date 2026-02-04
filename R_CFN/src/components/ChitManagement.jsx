import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Printer, Search } from "lucide-react";
import { useNavigate } from "react-router";

const ChitManagement = ({ data = [], fetchChitsData }) => {
  const navigate = useNavigate()
  const [chitData, setChitData] = useState([]);

  useEffect(() => {
    setChitData(data);
  }, [data]);

  const handleSearch = (value) => {
    const keyword = value.toLowerCase();

    if (!keyword) {
      setChitData(data);
      return;
    }

    const filtered = data.filter(
      (item) =>
        item.ByLawsNumber?.toLowerCase().includes(keyword) ||
        item.GroupCode?.toLowerCase().includes(keyword) ||
        item.TicketNmber?.toLowerCase().includes(keyword) ||
        item.branchName?.toLowerCase().includes(keyword)
    );

    setChitData(filtered);
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full text-neutral-500 font-semibold flex items-center justify-center h-[20vh]">
        <h1>No Chit Applications Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg max-w-sm mx-auto lg:max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
        <h2 className="text-base font-medium mb-4 tracking-tight text-neutral-800">
          Chit Management
        </h2>

        <div className="flex items-center relative">
          <div className="absolute bg-gray-200 h-full rounded-l-md border border-neutral-300 px-2">
            <Search size={14} className="text-neutral-500 mt-2" />
          </div>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-full lg:w-64 outline-none"
            placeholder="Search chit / branch / ticket"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 max-w-full overflow-x-auto">
        <table className="w-full border border-neutral-300 text-sm rounded-md">
          <thead className=" bg-[#004f9e]">
            <tr>
              <th className="border p-2 text-white font-medium border-black">Sr.No.</th>
              <th className="border p-2 text-white font-medium border-black">Application ID</th>
              <th className="border p-2 text-white font-medium border-black">Bylaws No</th>
              <th className="border p-2 text-white font-medium border-black">Group Code</th>
              <th className="border p-2 text-white font-medium border-black">Ticket No</th>
              <th className="border p-2 text-white font-medium border-black">Chit Value</th>
              <th className="border p-2 text-white font-medium border-black">Duration</th>
              <th className="border p-2 text-white font-medium border-black">Branch</th>
              <th className="border p-2 text-white font-medium border-black">Created At</th>
              <th className="border p-2 text-white font-medium border-black">Action</th>
            </tr>
          </thead>

          <tbody>
            {chitData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="border p-6 text-center text-neutral-500 font-medium"
                >
                  No chit found
                </td>
              </tr>
            ) : (
              chitData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border p-2 text-center">
                    {item.application_id}
                  </td>

                  <td className="border p-2 text-center">
                    {item.ByLawsNumber}
                  </td>

                  <td className="border p-2 text-center">
                    {item.GroupCode}
                  </td>

                  <td className="border p-2 text-center">
                    {item.TicketNmber}
                  </td>

                  <td className="border p-2 text-center">
                    ₹ {item.ChitValue}
                  </td>

                  <td className="border p-2 text-center">
                    {item.Duration} {item.DurationCategory}
                  </td>

                  <td className="border p-2 text-center">
                    {item.branchName}
                  </td>

                  <td className="border p-2 text-center">
                    {dayjs(item.created_at).format("DD MMM YYYY")}
                  </td>
                  <td className="border relative group "><button onClick={()=> navigate(`/chit/print/${item.id}`)} className=" text-white w-full flex items-center justify-center text-center cursor-pointer"><div className="bg-green-500 p-1.5 shadow-sm rounded-md hover:bg-green-700"> 
                    <span className="bg-black text-white shadow-sm px-4 py-1 rounded-md text-xs tracking-tight opacity-0 absolute group-hover:opacity-100 -top-6 right-3">Print</span>
                    <Printer size={18}/></div></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChitManagement;
