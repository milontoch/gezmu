import React from "react";

export function Orders() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Orders</h1>
        <p className="text-gray-600">This is a static preview of the orders page. Order history will appear here once the backend is connected.</p>
      </div>
      <div className="grid gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">MacBook Air M2</div>
              <div className="text-sm text-gray-600">Order #00012345 • ByteStore</div>
            </div>
            <div className="px-2 py-1 text-xs rounded bg-gray-100">paid</div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 mt-4 text-sm">
            <div><div className="text-gray-600">Quantity</div>1</div>
            <div><div className="text-gray-600">Total Amount</div>$1299.00</div>
            <div><div className="text-gray-600">Status</div>Paid</div>
            <div><div className="text-gray-600">Order Date</div>2025-10-15</div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 rounded-xl border bg-blue-50 border-blue-200 text-sm text-blue-900">
        📦 This page will be fully interactive after API integration. For now, use the Marketplace and Checkout to simulate the flow.
      </div>
    </div>
  );
}
