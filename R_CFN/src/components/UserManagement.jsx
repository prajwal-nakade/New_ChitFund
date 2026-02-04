import {
  BookUser,
  Search,
  SquarePen,
  ToggleLeft,
  ToggleRight,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ViewUserDetails from "./ViewUserDetails";
import { deleteUser, getUserEntries, is_admin, toggleStatus } from "../api/endpoint";
import { toast } from "react-toastify";
import EditUserDetails from "./EditUserDetails";

const UserManagement = ({ data, setUserEntriesData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [isSuperuser, setIssuperuser] = useState(false)

  const handleSearch = (e) => {
    const keyword = e.toLowerCase();
    if (!keyword) {
      setUserData(data);
    } else {
      const filterd = data.filter(
        (f) =>
          f?.firstname.toLowerCase().includes(keyword) ||
          f?.mobile_no.toLowerCase().includes(keyword)
      );
      setUserData(filterd);
    }
  };

  const isAdmin = async()=>{
    const data = await is_admin()
    console.log(data)
    setIssuperuser(data.is_superuser)
  }

  useEffect(() => {
    setUserData(data);
    
    isAdmin()
  }, [data]);

  const handleDelete = async (id, firstname) => {
    if (window.confirm(`Are you really want to delete User ${firstname}? `)) {
      const data = await deleteUser(id);
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setUserEntriesData((prev) => prev.filter((user) => user.id !== id));
      } else {
        toast.error(data.message || "Something went wrong");
      }
    }
  };
  if (data.length === 0) {
    return (
      <div className="w-full text-neutral-500 font-semibold flex items-center justify-center h-[20vh]">
        <h1>There is no current user right please add user first</h1>
      </div>
    );
  }

  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const response = await toggleStatus(id, newStatus);

      if (response.success) {
        toast.success(response.message || "Status updated");

        // 🔥 update UI immediately
        setUserData((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <div className="bg-white border rounded p-4 mt-10 border-neutral-300 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
        <h2 className="text-base lg:text-lg  font-medium mb-4 tracking-tight text-neutral-800 ">
          User Management
        </h2>
        <div className="flex items-center relative  me-auto lg:ms-auto w-full">
          <div className="absolute bg-gray-200 h-full rounded-l-md  border border-neutral-300 px-2">
            <Search size={14} className="text-neutral-500 mt-2" />
          </div>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            className="border border-neutral-300 shadow-sm text-neutral-800 text-sm px-10 py-1 placeholder:text-xs rounded-md w-full lg:w-84 outline-none"
            placeholder="Search by name and Mobile no."
          />
          {/* <button>Search</button> */}
        </div>
      </div>

      <div className="hidden md:block mt-3">
        <table className="w-full border border-neutral-300 text-sm rounded-md overflow-hidden">
          <thead className="bg-[#004f9e] ">
            <tr>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Sr.No.
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                CustomerID
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Name
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Mobile No
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Email
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                D.O.B
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Address
              </th>
              {isSuperuser && (
                <th className="border border-neutral-300 text-white font-medium p-2">
                  Status
                </th>
              )}
              <th className="border border-neutral-300 text-white font-medium p-2">
                Created at
              </th>
              <th className="border border-neutral-300 text-white font-medium p-2">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {userData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="border border-neutral-300 p-6 text-center text-neutral-500 font-medium"
                >
                  No user found
                </td>
              </tr>
            ) : (
              userData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="border border-neutral-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-neutral-300 p-2 text-center">
                    {item.CustomerID}
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <div className="flex items-center gap-1 justify-center">
                      <span>{item.firstname}</span>
                      <span>{item.middlename}</span>
                      <span>{item.lastname}</span>
                    </div>
                  </td>
                  <td className="border border-neutral-300 text-center p-2">
                    {item.mobile_no}
                  </td>
                  <td className="border border-neutral-300 text-center p-2">
                    {item.email}
                  </td>
                  <td className="border border-neutral-300 text-center p-2">
                    {dayjs(item.dob).format('DD MMM YYYY')}
                  </td>
                  <td className="border border-neutral-300 text-center p-2">
                    {item.permanent_address}
                  </td>
                  {isSuperuser && (
                    <td className="border border-neutral-300 text-center p-2">
                      <button
                        onClick={() => handleStatus(item.id, item.status)}
                        className="flex items-center justify-center w-full"
                      >
                        {item.status === "active" ? (
                          <ToggleRight size={20} className="text-green-500" />
                        ) : (
                          <ToggleLeft size={20} className="text-red-500" />
                        )}
                      </button>
                    </td>
                  )}

                  <td className="border border-neutral-300 text-center p-2">
                    {dayjs(item.created_at).format("DD MMM YYYY")}
                  </td>
                  <td className="border border-neutral-300 p-2">
                    <div className="flex items-center justify-center gap-2">
                      {isSuperuser && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUser(item);
                              setActiveModal("edit");
                            }}
                            className="p-1 bg-yellow-500 rounded-sm hover:bg-yellow-600 transition-colors duration-300 cursor-pointer relative group"
                          >
                            <SquarePen size={16} />
                            <span className="absolute -top-7 -left-3 rounded-md text-xs bg-neutral-800 text-white px-4 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.firstname)}
                            className="relative group  p-1 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                          >
                            <Trash size={16} />
                            <span className="absolute text-white bg-black -top-7 -left-3 px-3 py-0.5 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Delete
                            </span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          setSelectedUser(item);
                          setActiveModal("view");
                        }}
                        className="relative group p-1 bg-slate-400 text-white rounded-sm hover:bg-slate-500 transition-colors duration-300 cursor-pointer"
                      >
                        <BookUser size={16} />
                        <span className="absolute -top-7 -left-3 text-xs px-3 py-0.5 text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          View
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {activeModal === "edit" && selectedUser && (
        <EditUserDetails
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "view" && (
        <ViewUserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <div className="block md:hidden mt-4 space-y-4">
  {userData.length === 0 ? (
    <p className="text-center text-neutral-500 font-medium">No user found</p>
  ) : (
    userData.map((item, index) => (
      <div
        key={item.id || index}
        className="border border-neutral-300 rounded-md p-4 shadow-sm bg-white"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-neutral-800">
            {item.firstname} {item.lastname}
          </h3>
          <span className="text-xs text-neutral-500">
            #{item.CustomerID}
          </span>
        </div>

        <div className="mt-2 space-y-1 text-sm text-neutral-700">
          <p><strong>Mobile:</strong> {item.mobile_no}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>DOB:</strong> {dayjs(item.dob).format("DD MMM YYYY")}</p>
          <p><strong>Address:</strong> {item.permanent_address}</p>
          <p><strong>Created:</strong> {dayjs(item.created_at).format("DD MMM YYYY")}</p>
        </div>

        <div className="mt-3 flex justify-between items-center">
          {isSuperuser && (
            <button
              onClick={() => handleStatus(item.id, item.status)}
              className="flex items-center gap-1"
            >
              {item.status === "active" ? (
                <ToggleRight size={20} className="text-green-500" />
              ) : (
                <ToggleLeft size={20} className="text-red-500" />
              )}
              <span className="text-xs capitalize">{item.status}</span>
            </button>
          )}

          <div className="flex gap-2">
            {isSuperuser && (
              <>
                <button
                  onClick={() => {
                    setSelectedUser(item);
                    setActiveModal("edit");
                  }}
                  className="p-2 bg-yellow-500 rounded text-white"
                >
                  <SquarePen size={14} />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.firstname)}
                  className="p-2 bg-red-500 rounded text-white"
                >
                  <Trash size={14} />
                </button>
              </>
            )}

            <button
              onClick={() => {
                setSelectedUser(item);
                setActiveModal("view");
              }}
              className="p-2 bg-slate-400 rounded text-white"
            >
              <BookUser size={14} />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    </div>
    
</>
  );
};

export default UserManagement;