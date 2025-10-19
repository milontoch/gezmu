import React from "react";

export function Navigation({ currentView, onNavigate }) {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <span className="text-xl font-bold">Gezmu</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("marketplace")}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate("vendor")}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Vendor
            </button>
            <button
              onClick={() => onNavigate("customer")}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Customer
            </button>
            <button
              onClick={() => onNavigate("sharp-deals")}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Sharp Deals
            </button>
            <button
              onClick={() => onNavigate("signin")}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}