import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, ShoppingCart, MessageSquare, Zap } from "lucide-react";

const SAMPLE_PRODUCTS = [
  { id: "1", name: "iPhone 14 Pro", description: "128GB, Space Black", price: 1099, category: "phones", storeName: "TechWorld", storeId: "s1", imageUrl: "", hasAd: true, adPaid: true },
  { id: "2", name: "Samsung Galaxy S23", description: "256GB, Phantom Black", price: 899, category: "phones", storeName: "Gezmu", storeId: "s2", imageUrl: "" },
  { id: "3", name: "MacBook Air M2", description: "13.6", price: 1299, category: "laptops", storeName: "ByteStore", storeId: "s3", imageUrl: "" },
  { id: "4", name: "Sony WH-1000XM5", description: "Noise Cancelling Headphones", price: 349, category: "audio", storeName: "SoundPro", storeId: "s4", imageUrl: "" },
];

export function Marketplace({ onNavigate, initialData }) {
  const [searchQuery, setSearchQuery] = useState("");
  // Amazon-like multi-select filters
  const [filters, setFilters] = useState({
    categories: new Set(),
    price: { min: "", max: "" },
    brands: new Set(),
  });

  const categories = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.storeName))), []);

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
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const catOk = filters.categories.size === 0 || filters.categories.has(p.category);
      const brandOk = filters.brands.size === 0 || filters.brands.has(p.storeName);
      const priceOk = (() => {
        const min = filters.price.min ? Number(filters.price.min) : -Infinity;
        const max = filters.price.max ? Number(filters.price.max) : Infinity;
        return p.price >= min && p.price <= max;
      })();
      return matchesSearch && catOk && brandOk && priceOk;
    });
  }, [searchQuery, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Gadget Marketplace</h1>
        <p className="text-gray-600">Discover the best deals from verified stores</p>
      </div>

      {/* Top bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input className="pl-10" placeholder="Search for gadgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setFilters({ categories: new Set(), price: { min: "", max: "" }, brands: new Set() })}>Clear all</Button>
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
              <Button variant="link" onClick={() => setFilters({ categories: new Set(), price: { min: "", max: "" }, brands: new Set() })}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="overflow-hidden rounded-xl border bg-white hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Image</div>
                    {product.hasAd && product.adPaid && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded inline-flex items-center gap-1">
                        <Zap className="h-3 w-3" /> Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-lg line-clamp-1">{product.name}</div>
                      <div className="text-lg text-blue-600">${product.price}</div>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">{product.storeName}</div>
                      <div className="px-2 py-1 text-xs rounded bg-gray-100">{product.category}</div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onNavigate("messages", { recipientId: product.storeId, recipientName: product.storeName, productId: product.id })}>
                      <MessageSquare className="h-4 w-4 mr-1" /> Contact
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => onNavigate("checkout", { product })}>
                      <ShoppingCart className="h-4 w-4 mr-1" /> Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No products found</p>
          <p className="text-sm text-gray-500">Be the first to discover new gadgets when stores list them!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="overflow-hidden rounded-xl border bg-white hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Image</div>
                {product.hasAd && product.adPaid && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded inline-flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-lg line-clamp-1">{product.name}</div>
                  <div className="text-lg text-blue-600">${product.price}</div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">{product.storeName}</div>
                  <div className="px-2 py-1 text-xs rounded bg-gray-100">{product.category}</div>
                </div>
              </div>
              <div className="p-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onNavigate("messages", { recipientId: product.storeId, recipientName: product.storeName, productId: product.id })}>
                  <MessageSquare className="h-4 w-4 mr-1" /> Contact
                </Button>
                <Button size="sm" className="flex-1" onClick={() => onNavigate("checkout", { product })}>
                  <ShoppingCart className="h-4 w-4 mr-1" /> Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
