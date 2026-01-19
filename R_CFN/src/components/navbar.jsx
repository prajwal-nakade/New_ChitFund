import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Form,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data (adjust if you use cookies/context)
    localStorage.removeItem("token");

    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-r border-neutral-300 px-6 py-4 fixed inset-0 z-50 w-64">
          <nav className="flex flex-col gap-3 text-sm">
            <button onClick={() => setOpen(false)} className="self-end mb-2">
              <X size={18} />
            </button>

            {/* Menu links */}
            <NavLink
              to="/customerapplication"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <LayoutDashboard size={16} />
              Customer Application
            </NavLink>

            {/* <NavLink
              to="/menu2"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <LayoutDashboard size={16} />
              Menu 2
            </NavLink> */}

            {/* Master dropdown */}
            <button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <Form size={16} />
              Masters
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${
                  isMasterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMasterOpen && (
              <div className="ml-6 flex flex-col gap-1">
                <NavLink
                  to="/application-form"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 hover:bg-red-100"
                >
                  Customer Master Form
                </NavLink>

                {/* <NavLink
                  to="/drop2"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 hover:bg-red-100"
                >
                  Drop 2
                </NavLink>

                <NavLink
                  to="/drop3"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 hover:bg-red-100"
                >
                  Drop 3
                </NavLink> */}
              </div>
            )}

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="mt-4 px-3 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Navbar */}
      <header className="flex items-center justify-between h-14 px-6 border-b border-neutral-300 bg-white">
        <div className="flex items-center gap-4">
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-neutral-600"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop Logout */}
        <button
          onClick={handleLogout}
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 
                     text-sm font-medium border border-red-500 text-red-600 
                     rounded hover:bg-red-50 transition"
        >
          Logout
        </button>
      </header>
    </>
  );
};

export default Navbar;
