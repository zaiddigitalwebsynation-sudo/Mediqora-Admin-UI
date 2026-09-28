import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/fullLogo.png";
import { LayoutDashboard, Building2, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Clinics",
      path: "/clinic",
      icon: Building2,
    },
  ];

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-primary text-white shadow-xl transition-transform duration-300 ease-in-out lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Mediqora"
              className="object-contain"
            />
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-2">
            {menus.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary-light font-semibold text-primary shadow-xs"
                          : "text-white/80 hover:bg-primary-hover hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 transition-colors ${
                            isActive
                              ? "text-primary"
                              : "text-white/60 group-hover:text-white"
                          }`}
                        />

                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="m-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">
                Mediqora
              </p>

              <p className="text-[11px] text-white/50">
                Version 1.0.0
              </p>
            </div>

            <span className="inline-flex items-center rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-medium text-primary">
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;