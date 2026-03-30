import React, { useState } from "react";
import {
  LayoutDashboard,
  ChevronDown,
  ClipboardList,
  User,
  MapPin,
  GraduationCap,
  Handshake,
  Table2,
  BookOpenCheck,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Footer from "./Footer";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isReportsOpen , setIsReportsOpen] = useState(false);

  const Menus = [
    {
      title: "Application Form",
      icon: <ClipboardList size={16} />,
      path: "/customerapplication",
    },

    {
      title: "Chit Agreement",
      icon: <Handshake size={16} />,
      path: "/ChitAgreement",
    },

    {
      title: "Bid Agreement",
      icon: <BookOpenCheck size={16} />,
      path: "/viewauthenticationform",
    },
  ];

  const masterSubMenus = [
    {
      title: "Customer Master",
      icon: <User size={16} />,
      path: "/application-form",
    },
    {
      title: "Branch Master",
      icon: <MapPin size={16} />,
      path: "/branch-master",
    },
    
  ];

  const Reports = [
    {
      title: "View Applications",
      icon: <Table2 size={16} />,
      path: "/viewapplications",
    },
    {
      title: "View Chit Agreement",
      icon: <ClipboardList size={16} />,
      path: "/ViewChitAgreement",
    },
    {
      title: "View Bid Agreements",
      icon: <LayoutDashboard size={16} />,
      path: "/viewbidAgreements",
    },
  ];

  return (
    // Added h-screen to ensure the sidebar takes full height
    <div className="flex h-screen w-60 overflow-hidden opacity-0 lg:opacity-100 bg-[#E0F2FE] border-r border-[#1E3A8A]/10">
      <aside className="flex flex-col w-full h-full">
        {/* Header/Logo Section */}
        <div className="flex w-full items-center justify-start py-2 bg-[#E0F2FE] border-b border-[#1E3A8A]/20">
          <Link to={"/"} className="w-full">
            <div className="mx-auto my-[9.5px] flex justify-center items-center font-bold text-2xl w-full">
              {/* <img src="./Gemini.png" alt="Logo" width={160} className="object-cover px-3 my-1.5" /> */}
              <h1 className=" flex items-center text-blue-950">
                <span className="text-red-600">R</span>-Accounts
              </h1>
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
          <div className="flex flex-col gap-1 space-y-3 text-[#1E3A8A]">
            {Menus.map((items, idx) => (
              <NavLink
                key={idx}
                to={items.path}
                className={({ isActive }) =>
                  `flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group rounded-lg transition-all duration-300
                  ${isActive ? "text-white bg-[#1E3A8A] shadow-lg" : "hover:text-white hover:bg-[#1E3A8A]"}`
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

            {/* Masters Dropdown */}
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
                <div className="ml-6 mt-1 space-y-1">
                  {masterSubMenus.map((subItem, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex font-medium text-xs items-center gap-2 w-full px-3 py-2 group rounded-lg transition-all duration-300
                        ${isActive ? "text-white bg-[#1E3A8A]" : "text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A]"}`
                      }
                    >
                      {subItem.icon}
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>



          <div className="w-full">
              <button
                onClick={() => setIsReportsOpen(!isReportsOpen)}
                className="flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A] transition-all duration-300 rounded-lg"
              >
                <span className="transition-transform duration-200 group-hover:scale-105">
                  <GraduationCap size={16} />
                </span>
                Reports
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-200 ${isReportsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isReportsOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {Reports.map((subItem, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex font-medium text-xs items-center gap-2 w-full px-3 py-2 group rounded-lg transition-all duration-300
                        ${isActive ? "text-white bg-[#1E3A8A]" : "text-[#1E3A8A] hover:text-white hover:bg-[#1E3A8A]"}`
                      }
                    >
                      {subItem.icon}
                      {subItem.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
        </div>

        {/* Footer Fixed at Bottom */}
        <div className="border-t border-[#1E3A8A]/10 bg-[#E0F2FE]">
          <Footer />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
