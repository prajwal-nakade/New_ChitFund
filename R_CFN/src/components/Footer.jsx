import React from "react";

const Footer = () => {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#1E3A8A]">
   

      <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-4 pt-5">
        {/* Logo + Developed by */}
        <div className="flex flex-col items-center ">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-100 opacity-100">
            Developed by
          </span>
          <a
            href="https://redogroup.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
          >
            <div className="relative px-2   transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:scale-105">
              <img
                src="./Redo.png"
                alt="Redo Group Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
          </a>
        </div>

        {/* Website link */}
        <a
          href="https://redogroup.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 text-[11px] text-blue-200 hover:text-white transition-colors duration-200"
        >
          {/* Globe icon */}
          <svg
            className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="tracking-wide font-medium underline-offset-2 group-hover:underline">
            www.redogroup.in
          </span>
        </a>

        {/* Copyright */}
        <div className="flex w-full items-center justify-center gap-1 text-[10px] text-blue-100/80 tracking-wide mb-2">
          
          <span>©{year}.</span>
          <span className="font-semibold text-blue-200/80">Redogroup</span>
          <span className="w-full">All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
