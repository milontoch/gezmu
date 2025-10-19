import React from "react";
import { PostCardInstagram } from "./post-card-instagram";

const SHARP_DEALS = [
  { id: "d1", title: "Quick Sale: iPhone 13 Pro", price: "₦680,000", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", sellerName: "QuickPhones", sellerAvatar: "https://i.pravatar.cc/100?img=7", storeId: "v1", sellerPhone: "+234 811 111 1111", location: "Lagos", category: "Phones", posterType: "vendor" },
  { id: "d2", title: "Flash Deal: PS5 Console", price: "₦420,000", image: "https://images.unsplash.com/photo-1606813907291-76f0b6d4e20b?auto=format&fit=crop&w=800&q=80", sellerName: "GameRush", sellerAvatar: "https://i.pravatar.cc/100?img=15", storeId: "v2", sellerPhone: "+234 822 222 2222", location: "Abuja", category: "Gaming", posterType: "vendor" },
  { id: "d3", title: "Today Only: AirPods Pro 2", price: "₦170,000", image: "https://images.unsplash.com/photo-1585386959984-a4155223168f?auto=format&fit=crop&w=800&q=80", sellerName: "SoundBits", sellerAvatar: "https://i.pravatar.cc/100?img=22", storeId: "v3", sellerPhone: "+234 833 333 3333", location: "Port Harcourt", category: "Audio", posterType: "customer" },
  { id: "d4", title: "Deal: Samsung S23 Ultra", price: "₦930,000", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerName: "GadgetSprint", sellerAvatar: "https://i.pravatar.cc/100?img=29", storeId: "v4", sellerPhone: "+234 844 444 4444", location: "Kano", category: "Phones", posterType: "customer" },
];

export function SharpDeals({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 rounded-lg border bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
        Sharp Deals is a separate quick-deals posting lane for gadgets. To post here, you need an account (vendor or customer) and a paid quick-deal placement. Regular marketplace posts don’t appear here.
      </div>

      {/* Endless style grid (static demo) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {SHARP_DEALS.map((deal) => (
          <PostCardInstagram key={deal.id} product={deal} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Load more placeholder */}
      <div className="text-center py-10 text-sm text-gray-500">More sharp deals will load as you scroll (static demo)</div>
    </div>
  );
}
