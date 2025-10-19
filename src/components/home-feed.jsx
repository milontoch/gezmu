import React, { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { PostCardInstagram } from "./post-card-instagram";

const FEED_PRODUCTS = [
  { id: "p1", title: "iPhone 15 Pro Max", price: "₦1,200,000", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", sellerName: "TechWorld", sellerAvatar: "https://i.pravatar.cc/100?img=10", storeId: "s1", sellerPhone: "+234 801 234 5678", location: "Lagos", category: "Phones", hasAd: true, adPaid: true },
  { id: "p2", title: "MacBook Air M2", price: "₦1,299,000", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", sellerName: "ByteStore", sellerAvatar: "https://i.pravatar.cc/100?img=5", storeId: "s3", sellerPhone: "+234 805 678 9012", location: "Ibadan", category: "Laptops" },
  { id: "p3", title: "Sony WH-1000XM5", price: "₦349,000", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", sellerName: "SoundPro", sellerAvatar: "https://i.pravatar.cc/100?img=21", storeId: "s4", sellerPhone: "+234 803 456 7890", location: "Port Harcourt", category: "Audio" },
  { id: "p4", title: "Canon EOS M50", price: "₦400,000", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", sellerName: "LensCraft", sellerAvatar: "https://i.pravatar.cc/100?img=48", storeId: "s6", sellerPhone: "+234 806 789 0123", location: "Enugu", category: "Cameras" },
  { id: "p5", title: "Apple Watch Series 9", price: "₦350,000", image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80", sellerName: "WatchHub", sellerAvatar: "https://i.pravatar.cc/100?img=17", storeId: "s4", sellerPhone: "+234 804 567 8901", location: "Kano", category: "Smartwatches" },
];

const CATEGORIES = [
  "Phones",
  "Tablets",
  "Laptops",
  "Accessories",
  "Cameras",
  "Audio",
  "Gaming",
  "Drones",
  "Smart Home",
  "Other Gadgets",
];

export function HomeFeed({ onNavigate }) {
  const [q, setQ] = useState("");
  const products = useMemo(() => {
    const l = q.toLowerCase();
    return FEED_PRODUCTS.filter(
      (p) => p.title.toLowerCase().includes(l) || p.sellerName.toLowerCase().includes(l) || p.category.toLowerCase().includes(l),
    );
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* search */}
      <div className="mb-6">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gadgets or vendors..." />
      </div>

      {/* category hotlinks */}
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-blue-700">
        {CATEGORIES.map((name) => (
          <button key={name} className="hover:underline text-sm" onClick={() => onNavigate("marketplace", { category: name })}>
            {name}
          </button>
        ))}
      </div>

      {/* responsive Instagram-like grid: more columns on wide screens */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((prod) => (
          <PostCardInstagram key={prod.id} product={prod} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
