import React from "react";

const CUSTOMER = {
  name: "Ada Lovelace",
  username: "ada",
  avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d1?q=80&w=300&auto=format&fit=crop",
};

const SAVED = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop",
];

export function CustomerProfile() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-6">
        <img src={CUSTOMER.avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover border" />
        <div>
          <div className="text-xl">{CUSTOMER.username}</div>
          <div className="text-sm text-gray-600">{CUSTOMER.name}</div>
        </div>
      </div>

      <div className="border-t text-xs uppercase tracking-widest text-gray-500 flex justify-center gap-8 py-3">
        <div className="font-semibold text-black">Saved</div>
        <div>Purchases</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-6">
        {SAVED.map((src, i) => (
          <div key={i} className="relative bg-gray-100 overflow-hidden rounded-md">
            <div style={{ paddingTop: "100%" }} />
            <img src={src} alt="saved" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
