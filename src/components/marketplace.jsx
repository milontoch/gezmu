import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Zap } from "lucide-react";
import { PostCardInstagram } from "./post-card-instagram";

const NIGERIA_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    description: "128GB, Space Black",
    price: 1099000,
    category: "phones",
    storeName: "TechWorld",
    storeId: "s1",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    hasAd: true,
    adPaid: true,
    sellerAvatar: "https://i.pravatar.cc/100?img=10",
    sellerPhone: "+234 801 234 5678",
    location: "Lagos",
    state: "Lagos",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    description: "256GB, Phantom Black",
    price: 899000,
    category: "phones",
    storeName: "Gezmu Store",
    storeId: "s2",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    sellerAvatar: "https://i.pravatar.cc/100?img=32",
    sellerPhone: "+234 802 345 6789",
    location: "Abuja",
    state: "FCT",
  },
  {
    id: "3",
    name: "MacBook Air M2",
    description: "13.6",
    price: 1299000,
    category: "laptops",
    storeName: "ByteStore",
    storeId: "s3",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    sellerAvatar: "https://i.pravatar.cc/100?img=5",
    sellerPhone: "+234 805 678 9012",
    location: "Ibadan",
    state: "Oyo",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    description: "Noise Cancelling Headphones",
    price: 349000,
    category: "audio",
    storeName: "SoundPro",
    storeId: "s4",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    sellerAvatar: "https://i.pravatar.cc/100?img=21",
    sellerPhone: "+234 803 456 7890",
    location: "Port Harcourt",
    state: "Rivers",
  },
];

export function Marketplace({ onNavigate, initialData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorQuery, setVendorQuery] = useState("");
  // Amazon-like multi-select filters
  const [filters, setFilters] = useState({
    categories: new Set(),
    price: { min: "", max: "" },
    brands: new Set(),
    state: "",
  });

  const categories = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.storeName))), []);
  const states = useMemo(() => NIGERIA_STATES, []);

  // Apply initial filter if navigated from landing
  useEffect(() => {
    const cat = initialData?.category?.toLowerCase?.();
    if (!cat) return;
    // naive normalize
    const normalized = cat.replace(/\s+/g, "-");
    if (categories.includes(normalized) || categories.includes(cat)) {
      setFilters((prev) => ({ ...prev, categories: new Set([normalized]) }));
    }
  }, [initialData, categories]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const vq = vendorQuery.toLowerCase();
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesVendor = vq === "" || p.storeName.toLowerCase().includes(vq);
      const catOk = filters.categories.size === 0 || filters.categories.has(p.category);
      const brandOk = filters.brands.size === 0 || filters.brands.has(p.storeName);
      const stateOk = !filters.state || p.state === filters.state;
      const priceOk = (() => {
        const min = filters.price.min ? Number(filters.price.min) : -Infinity;
        const max = filters.price.max ? Number(filters.price.max) : Infinity;
        return p.price >= min && p.price <= max;
      })();
      return matchesSearch && matchesVendor && catOk && brandOk && stateOk && priceOk;
    });
  }, [searchQuery, vendorQuery, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Gadget Marketplace</h1>
        <p className="text-gray-600">Discover the best deals from verified stores</p>
      </div>

      {/* Top bar */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input className="pl-10" placeholder="Search for gadgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Filter by vendor name..." value={vendorQuery} onChange={(e) => setVendorQuery(e.target.value)} />
          <Button variant="outline" onClick={() => setFilters({ categories: new Set(), price: { min: "", max: "" }, brands: new Set(), state: "" })}>Clear all</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left filter rail (Amazon-like) */}
        <aside className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">Category</h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.has(c)}
                    onChange={(e) => {
                      setFilters((prev) => {
                        const next = new Set(prev.categories);
                        e.target.checked ? next.add(c) : next.delete(c);
                        return { ...prev, categories: next };
                      });
                    }}
                  />
                  <span className="capitalize">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Location (Nigeria)</h3>
            <select
              className="w-full h-9 border rounded-md px-2 text-sm"
              value={filters.state}
              onChange={(e) => setFilters((p) => ({ ...p, state: e.target.value }))}
            >
              <option value="">All states</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Price</h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Min" value={filters.price.min} onChange={(e) => setFilters((p) => ({ ...p, price: { ...p.price, min: e.target.value } }))} />
              <span>—</span>
              <Input placeholder="Max" value={filters.price.max} onChange={(e) => setFilters((p) => ({ ...p, price: { ...p.price, max: e.target.value } }))} />
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Brand</h3>
            <div className="space-y-2">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.brands.has(b)}
                    onChange={(e) => {
                      setFilters((prev) => {
                        const next = new Set(prev.brands);
                        e.target.checked ? next.add(b) : next.delete(b);
                        return { ...prev, brands: next };
                      });
                    }}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No products match the current filters</p>
              <Button variant="link" onClick={() => setFilters({ categories: new Set(), price: { min: "", max: "" }, brands: new Set(), state: "" })}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <PostCardInstagram
                  key={p.id}
                  onNavigate={onNavigate}
                  product={{
                    id: p.id,
                    title: p.name,
                    price: `₦${(p.price ?? 0).toLocaleString()}`,
                    image: p.imageUrl,
                    sellerName: p.storeName,
                    sellerAvatar: p.sellerAvatar,
                    storeId: p.storeId,
                    sellerPhone: p.sellerPhone,
                    location: p.location,
                    hasAd: p.hasAd,
                    adPaid: p.adPaid,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="mb-2">Why Gezmu?</h3>
        <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4">
          <li>All stores are verified for your safety</li>
          <li>Competitive pricing</li>
          <li>Direct communication with sellers before purchase</li>
          <li>Secure payment and shipping options (coming soon)</li>
        </ul>
      </div>
    </div>
  );
}
