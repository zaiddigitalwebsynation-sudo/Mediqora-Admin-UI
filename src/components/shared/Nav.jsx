import React from "react";
import { Menu, UserCircle } from "lucide-react";

const Nav = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Super Admin
            </h1>
            <p className="hidden text-xs text-gray-500 sm:block">
              Manage your clinic network
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
        
          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Super Admin
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;

