import { Shield, Users, Zap, Store, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { PostCardInstagram } from "./post-card-instagram";

// Amazon-style simplified categories (names only)
const CATEGORIES = [
  "Phones",
  "Tablets",
  "Accessories",
  "Smartwatches",
  "Laptops",
  "Cameras",
  "Audio",
  "Gaming",
  "Drones",
  "Smart Home",
  "Other Gadgets",
];

const DEMO_PRODUCTS = [
  {
    id: "p1",
    title: "iPhone 15 Pro Max",
    price: "₦1,200,000",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Phones",
    location: "Lagos",
    sellerName: "TechWorld",
    sellerAvatar: "https://i.pravatar.cc/100?img=10",
    storeId: "s1",
    sellerPhone: "+234 801 234 5678",
    desc: "Latest Apple flagship, 256GB, Sierra Blue.",
  },
  {
    id: "p2",
    title: "Samsung Galaxy Tab S9",
    price: "₦800,000",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    category: "Tablets",
    location: "Abuja",
    sellerName: "Abuja Gadgets",
    sellerAvatar: "https://i.pravatar.cc/100?img=32",
    storeId: "s2",
    sellerPhone: "+234 802 345 6789",
    desc: "12.4' AMOLED, 128GB, WiFi + LTE.",
  },
  {
    id: "p3",
    title: "Sony WH-1000XM5 Headphones",
    price: "₦180,000",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    location: "Port Harcourt",
    sellerName: "SoundPro",
    sellerAvatar: "https://i.pravatar.cc/100?img=21",
    storeId: "s3",
    sellerPhone: "+234 803 456 7890",
    desc: "Noise cancelling, wireless, black.",
  },
  {
    id: "p4",
    title: "Apple Watch Series 9",
    price: "₦350,000",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    category: "Smartwatches",
    location: "Kano",
    sellerName: "WatchHub",
    sellerAvatar: "https://i.pravatar.cc/100?img=17",
    storeId: "s4",
    sellerPhone: "+234 804 567 8901",
    desc: "GPS + Cellular, 45mm, Midnight.",
  },
  {
    id: "p5",
    title: "Dell XPS 13 Laptop",
    price: "₦950,000",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    category: "Laptops",
    location: "Ibadan",
    sellerName: "ByteStore",
    sellerAvatar: "https://i.pravatar.cc/100?img=5",
    storeId: "s5",
    sellerPhone: "+234 805 678 9012",
    desc: "13.4' FHD, 512GB SSD, 16GB RAM.",
  },
  {
    id: "p6",
    title: "Canon EOS M50 Camera",
    price: "₦400,000",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    category: "Cameras",
    location: "Enugu",
    sellerName: "LensCraft",
    sellerAvatar: "https://i.pravatar.cc/100?img=48",
    storeId: "s6",
    sellerPhone: "+234 806 789 0123",
    desc: "Mirrorless, 24MP, 15-45mm lens.",
  },
];

export function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl mb-6">Gezmu: Your Gadget Marketplace</h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with verified stores, discover great deals, and buy without visiting a physical shop.
            </p>
            <input
              type="text"
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 mb-4"
              placeholder="Search gadgets..."
              disabled
            />
            <button
              className="px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
              onClick={() => onNavigate("marketplace")}
            >
              Browse Marketplace
            </button>
          </div>
          <div className="relative">
            <div className="rounded-2xl shadow-2xl w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              {/* Hero image or illustration could go here */}
            </div>
          </div>
        </div>
      </section>

      {/* Popular filters (Amazon-like hotlinks) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-semibold mb-3">Popular filters</h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-blue-700">
          {CATEGORIES.map((name, idx) => (
            <button
              key={name}
              className="hover:underline text-sm"
              onClick={() => onNavigate("marketplace", { category: name })}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Gadgets */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Trending Gadgets</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {DEMO_PRODUCTS.map((prod) => (
            <PostCardInstagram key={prod.id} product={prod} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Features for Consumers */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">For Consumers</h2>
            <p className="text-xl text-gray-600">Everything you need to find the perfect gadget</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-white">
              <Tag className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="mb-2">Best Prices</h3>
              <p className="text-gray-600">Stores compete on pricing, ensuring you always get the best deal available.</p>
            </div>
            <div className="p-6 rounded-xl border bg-white">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="mb-2">Verified Stores</h3>
              <p className="text-gray-600">All stores are verified to ensure your safety and satisfaction.</p>
            </div>
            <div className="p-6 rounded-xl border bg-white">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="mb-2">Community & Support</h3>
              <p className="text-gray-600">Join discussions, read reviews, and find repair services all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Stores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">For Store Owners</h2>
            <p className="text-xl text-gray-600">Grow your gadget business with powerful tools</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-white">
              <Store className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="mb-2">Easy Setup</h3>
              <p className="text-gray-600">Register, get verified, and start selling your gadgets in minutes.</p>
            </div>
            <div className="p-6 rounded-xl border bg-white">
              <Zap className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="mb-2">Promoted Listings</h3>
              <p className="text-gray-600">Boost visibility with optional ad placements to reach more customers.</p>
            </div>
            <div className="p-6 rounded-xl border bg-white">
              {/* Removed ShoppingBag icon */}
              <h3 className="mb-2">Direct Communication</h3>
              <p className="text-gray-600">Chat directly with customers to finalize deals and build relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join buyers and verified stores on Gezmu</p>
          <Button size="lg" onClick={() => onNavigate("signup")}>Create Your Account</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center border-t">
        <div className="text-sm text-gray-500">
          &copy; 2025 Gezmu. Demo site for gadgets only. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
