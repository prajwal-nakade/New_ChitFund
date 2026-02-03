import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  Menu,
  X,
  LayoutDashboard,
  Form,
  ChevronDown,
  ClipboardList,
  Table2,
  Handshake,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/endpoint";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  // 🔹 SAME MENUS AS SIDEBAR
  const Menus = [
    { title: "Application Form", icon: <ClipboardList size={16} />, path: "/customerapplication" },
    { title: "View Applications", icon: <Table2 size={16} />, path: "/viewapplications" },
    { title: "Chit Agreement", icon: <Handshake size={16} />, path: "/ChitAgreement" },
    { title: "View Chit Agreement", icon: <ClipboardList size={16} />, path: "/ViewChitAgreement" },
  ];

  const masterSubMenus = [
    { title: "Customer Master", icon: <User size={16} />, path: "/application-form" },
    { title: "Branch Master", icon: <MapPin size={16} />, path: "/branch-master" },
  ];

  return (
    <>
      {/* 🔹 MOBILE SIDEBAR */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 w-64 bg-[#ffffff] text-black px-4 py-4">
          <div className="flex justify-end mb-3">
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 text-sm">
            {Menus.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded
                  ${
                    isActive
                      ? "bg-[#06c] text-white"
                      : "hover:bg-[#06c] hover:text-white"

                  }`
                }
              >
                {item.icon}
                {item.title}
              </NavLink>
            ))}

            {/* 🔹 MASTERS */}
            <button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#06c] hover:text-white rounded"
            >
              <GraduationCap size={16} />
              Masters
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${
                  isMasterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMasterOpen && (
              <div className="ml-6 space-y-1">
                {masterSubMenus.map((sub, i) => (
                  <NavLink
                    key={i}
                    to={sub.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded text-xs
                      ${
                        isActive
                          ? "bg-[#06c] text-white"
                          : "hover:bg-[#06c] hover:text-white"
                      }`
                    }
                  >
                    {sub.icon}
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="mt-4 px-3 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 text-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* 🔹 TOP NAVBAR */}
      <header className="flex items-center justify-start h-14 px-6 border-b border-neutral-300 bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-neutral-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden md:block w-full">
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-red-500 text-red-600 rounded hover:bg-red-50 text-sm flex justify-end ms-auto"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
