import React, { useState } from "react";
import { Bell, Search, User, Menu, X, LayoutDashboard, Form, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  return (
    <>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-r border-neutral-300 px-6 py-4 fixed inset-0 z-50 w-64">
          <nav className="flex flex-col gap-3 text-sm">
            <button onClick={() => setOpen(false)} className="self-end mb-2">
              <X size={18} />
            </button>

            {/* SAME LINKS AS SIDEBAR */}
            <NavLink
              to="/menu1"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <LayoutDashboard size={16} />
              Menu 1
            </NavLink>

            <NavLink
              to="/menu2"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <LayoutDashboard size={16} />
              Menu 2
            </NavLink>

            {/* MASTER */}
            <button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-red-100"
            >
              <Form size={16} />
              Master
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
                  to="/"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 hover:bg-red-100"
                >
                  Application Form
                </NavLink>

                <NavLink
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
                </NavLink>
              </div>
            )}
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
      </header>
    </>
  );
};

export default Navbar;
