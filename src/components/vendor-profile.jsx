import React from "react";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Link as LinkIcon } from "lucide-react";

const VENDOR = {
  name: "TechWorld Nigeria",
  username: "techworld",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  posts: 12,
  followers: "8,245",
  following: 126,
  bio: "Verified gadget vendor • Lagos • Phones, Laptops, Accessories",
  website: "techworld.ng",
};

const VENDOR_POSTS = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520962918287-7448c2878f65?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
];

export function VendorProfile({ onNavigate }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="grid grid-cols-6 gap-8 items-center mb-8">
        <div className="col-span-2 flex justify-center">
          <img
            src={VENDOR.avatar}
            alt={VENDOR.username}
            className="h-28 w-28 rounded-full object-cover border"
          />
        </div>
        <div className="col-span-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl">{VENDOR.username}</h1>
            <Button size="sm" variant="outline">Follow</Button>
            <Button size="sm" variant="outline">Message</Button>
            <Button size="sm" onClick={() => onNavigate("vendor-post")}>New Post</Button>
          </div>
          <div className="flex gap-6 text-sm">
            <div><span className="font-semibold">{VENDOR.posts}</span> posts</div>
            <div><span className="font-semibold">{VENDOR.followers}</span> followers</div>
            <div><span className="font-semibold">{VENDOR.following}</span> following</div>
          </div>
          <div className="text-sm">
            <div className="font-semibold">{VENDOR.name}</div>
            <div>{VENDOR.bio}</div>
            <div className="inline-flex items-center gap-1 text-blue-600"><LinkIcon className="h-4 w-4" /> {VENDOR.website}</div>
          </div>
        </div>
      </div>

      {/* Tabs (static) */}
      <div className="border-t text-xs uppercase tracking-widest text-gray-500 flex justify-center gap-8 py-3">
        <div className="font-semibold text-black">Posts</div>
        <div>Saved</div>
        <div>Tagged</div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-6">
        {VENDOR_POSTS.map((src, i) => (
          <div key={i} className="group relative bg-gray-100 overflow-hidden rounded-md">
            {/* 1:1 aspect square */}
            <div style={{ paddingTop: "100%" }} />
            <img src={src} alt="post" className="absolute inset-0 w-full h-full object-cover" />

            {/* Overlay on hover like Instagram: likes/comments and avatar badge */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white">
              <div className="inline-flex items-center gap-2"><Heart className="h-5 w-5" /> 1.2k</div>
              <div className="inline-flex items-center gap-2"><MessageCircle className="h-5 w-5" /> 112</div>
            </div>
            {/* Vendor avatar hovers over the post */}
            <div className="absolute top-3 left-3 transform opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
              <img src={VENDOR.avatar} alt="avatar" className="h-8 w-8 rounded-full ring-2 ring-white object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
