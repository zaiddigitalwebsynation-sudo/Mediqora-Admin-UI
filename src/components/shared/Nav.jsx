import React, { useState } from "react";
import {
  Menu,
  UserCircle,
  ChevronDown,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ApiService from "../../services/service";

const Nav = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await ApiService.logout();

      setUser(null);
      setShowLogoutModal(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);

      setUser(null);
      setShowLogoutModal(false);

      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }

    return user?.email?.charAt(0).toUpperCase() || "A";
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Super Admin</h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Manage your clinic network
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 sm:gap-4">
            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
                <span className="text-sm font-semibold text-primary">
                  {getInitials()}
                </span>
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
                  {user?.name || "Super Admin"}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.role || "Administrator"}
                </p>
              </div>

              <ChevronDown
                className={`hidden h-4 w-4 text-gray-400 transition sm:block ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
                      <span className="text-sm font-semibold text-primary">
                        {getInitials()}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user?.name || "Super Admin"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user?.email || "Administrator"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-2 py-2">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                    <ShieldCheck className="h-4 w-4 text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-400">Role</p>

                      <p className="text-sm font-medium capitalize text-gray-700">
                        {user?.role || "Super Admin"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                  <LogOut className="h-5 w-5 text-red-500" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Logout
                  </h2>

                  <p className="text-xs text-gray-500">
                    End your current session
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-600">
              Are you sure you want to logout from your admin account? You will
              need to sign in again to access the dashboard.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
