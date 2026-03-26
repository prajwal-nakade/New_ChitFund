import React, { useContext, useState } from "react";
import { LayoutDashboard, Form, ChevronDown, ClipboardType, ClipboardList, User, MapPin, GraduationCap, Handshake, Table, Table2, BookOpenCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const Menus = [
    { title: "Application Form", icon: <ClipboardList size={16} />, path: "/customerapplication" },
    { title: "View Applications", icon: <Table2 size={16} />, path: "/viewapplications" },
    { title: "Chit Agreement", icon: <Handshake size={16} />, path: "/ChitAgreement" },
    { title: "View Chit Agreement", icon: <ClipboardList size={16} />, path: "/ViewChitAgreement" },
    { title: "Bid Agreement", icon: <BookOpenCheck size={16} />, path: "/viewauthenticationform" },
    { title: "View Bid Agreements", icon: <LayoutDashboard size={16} />, path: "/viewbidAgreements" },
  ];

  const masterSubMenus = [
    { title: "Customer Master", icon: <User size={16} />, path: "/application-form" },
    { title: "Branch Master", icon: <MapPin size={16} />, path: "/branch-master" },
  ];

  return (
    <div className="flex min-h-screen w-60 overflow-hidden opacity-0 lg:opacity-100 bg-[#E0F2FE]">
      <aside className="flex flex-col h-full w-full">
        <div className="flex w-full items-center justify-start py-2 bg-[#E0F2FE] border-b border-[#1E3A8A]/20">
          <Link to={"/"} className="w-full">
            <div className="mx-auto flex justify-center items-center w-full">
              <img src="./Gemini.png" alt="" width={200} className="object-cover px-3" />
            </div>
          </Link>
        </div>
        <div className="w-55 flex-1 mx-auto py-4 space-y-4">
          <div className="w-full flex flex-col items-start justify-start gap-1 py-2 space-y-3 text-[#1E3A8A]">
            {Menus.map((items, idx) => (
              <NavLink
                key={idx}
                to={items.path}
                className={({ isActive }) =>
                  `flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group rounded-lg
                  ${isActive
                    ? "text-white bg-[#1E3A8A] hover:bg-[#1E3A8A] transition-all duration-300 shadow-lg"
                    : "text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A] transition-all duration-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-transform duration-200 ${isActive ? "scale-105" : "group-hover:scale-105"}`}
                    >
                      {items.icon}
                    </span>
                    {items.title}
                  </>
                )}
              </NavLink>
            ))}
            <div className="w-full">
              <button
                onClick={() => setIsMasterOpen(!isMasterOpen)}
                className="flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A] transition-all duration-300 rounded-lg"
              >
                <span className="transition-transform duration-200 group-hover:scale-105">
                  <GraduationCap size={16} />
                </span>
                Masters
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-200 ${isMasterOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMasterOpen && (
                <div className="dropdown-container ml-6 mt-1 space-y-1">
                  {masterSubMenus.map((subItem, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex font-medium text-xs items-center gap-2 w-full px-3 py-2 group rounded-lg
                        ${isActive
                          ? "text-white bg-[#1E3A8A] transition-all duration-300"
                          : "text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A] transition-all duration-300"
                        }`
                      }
                    >
                      {subItem.icon}{subItem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;