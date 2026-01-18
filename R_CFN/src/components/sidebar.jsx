import React, { useContext, useState } from "react";
import { LayoutDashboard, Form, ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const Menus = [
    { title: "Customer Application", icon: <LayoutDashboard size={16} />, path: "/customerapplication" },
    // { title: "Menu 2", icon: <LayoutDashboard size={16} />, path: "/menu2" },
  ];

  const masterSubMenus = [
    { title: "Customer Master Form", path: "/" },
    // { title: "Drop 2", path: "/drop2" },
    // { title: "Drop 3", path: "/drop3" },
  ];
  return (
    <div className="flex h-screen w-54 overflow-hidden opacity-0 lg:opacity-100">
      <aside className="flex flex-col h-full w-full border border-neutral-300">
        <div className="flex  w-full items-center justify-start ps-4 gap-2 border-b py-4 border-neutral-300">
          <Link to={"/"}>
            <div className="flex flex-col items-start justify-start leading-tight">
              <h1 className="font-medium">Cheat Fund Management</h1>
            </div>
          </Link>
        </div>
        <div className="w-55 flex-1 mx-auto py-4 space-y-4">
          <div className="w-full flex flex-col items-start justify-start gap-1 py-2 space-y-3">
            {Menus.map((items, idx) => (
              <NavLink
                key={idx}
                to={items.path}
                className={({ isActive }) =>
                  `flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group
                                    ${
                                      isActive
                                        ? "text-[#272323] hover:bg-red-100 transition-all duration-300"
                                        : "text-[#272323] hover:bg-red-100 transition-all duration-300"
                                    }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-transform duration-200 ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
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
                className="flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group text-[#272323] hover:bg-red-100 transition-all duration-300"
              >
                <span className="transition-transform duration-200 group-hover:scale-105">
                  <Form size={16} />
                </span>
                Masters
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform duration-200 ${
                    isMasterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMasterOpen && (
                <div className="dropdown-container ml-6 mt-1 space-y-1">
                  {masterSubMenus.map((subItem, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group
                                          ${
                                            isActive
                                              ? "text-[#272323] hover:bg-red-100 transition-all duration-300"
                                              : "text-[#272323] hover:bg-red-100 transition-all duration-300"
                                          }`
                      }
                    >
                      {subItem.title}
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