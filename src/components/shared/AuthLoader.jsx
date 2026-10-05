import React from "react";

const AuthLoader = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR SKELETON (Dark Navy Theme) */}
      <aside className="w-64 bg-[#0B2238] hidden lg:flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
        <div className="space-y-6">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/60 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-slate-700/60 rounded animate-pulse" />
              <div className="h-2.5 w-20 bg-slate-800 rounded animate-pulse" />
            </div>
          </div>

          {/* Navigation Items Skeleton */}
          <div className="space-y-2 pt-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-800/30 border border-transparent"
              >
                <div className="w-5 h-5 rounded bg-slate-700/50 animate-pulse" />
                <div
                  className={`h-3.5 rounded bg-slate-700/50 animate-pulse ${
                    i % 2 === 0 ? "w-28" : "w-20"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Skeleton */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <div className="space-y-1.5">
            <div className="h-3 w-16 bg-slate-700/60 rounded animate-pulse" />
            <div className="h-2 w-12 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-5 w-12 bg-slate-700/50 rounded-full animate-pulse" />
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR SKELETON */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-2.5 w-40 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>

          {/* User Profile Menu */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
            <div className="hidden sm:block space-y-1">
              <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="h-2.5 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </header>

        {/* PAGE BODY SKELETON */}
        <main className="p-6 md:p-8 space-y-6  w-full mx-auto">
          
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <div className="h-7 w-36 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-3.5 w-48 bg-gray-200/70 rounded animate-pulse" />
          </div>

          {/* Main Form Box Container */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-sm space-y-8">
            
            {/* SECTION 1: Clinic Information */}
            <div className="space-y-5">
              <div className="h-5 w-40 bg-gray-300/80 rounded-md animate-pulse" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Field */}
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
                {/* Field */}
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
                {/* Field */}
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
                {/* Field */}
                <div className="space-y-2">
                  <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>

            {/* SECTION 2: Personal & Account Details */}
            <div className="space-y-5 pt-6 border-t border-gray-100">
              <div className="h-5 w-52 bg-gray-300/80 rounded-md animate-pulse" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>

            {/* SECTION 3: Address Information */}
            <div className="space-y-5 pt-6 border-t border-gray-100">
              <div className="h-5 w-44 bg-gray-300/80 rounded-md animate-pulse" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
                <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

          </div>
        </main>
      </div>

    </div>
  );
};

export default AuthLoader;