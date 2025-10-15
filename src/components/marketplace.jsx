import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, ShoppingCart, MessageSquare, Zap } from "lucide-react";

const SAMPLE_PRODUCTS = [
  { id: "1", name: "iPhone 14 Pro", description: "128GB, Space Black", price: 1099, category: "phones", storeName: "TechWorld", storeId: "s1", imageUrl: "", hasAd: true, adPaid: true },
  { id: "2", name: "Samsung Galaxy S23", description: "256GB, Phantom Black", price: 899, category: "phones", storeName: "GizmoHub", storeId: "s2", imageUrl: "" },
  { id: "3", name: "MacBook Air M2", description: "13.6", price: 1299, category: "laptops", storeName: "ByteStore", storeId: "s3", imageUrl: "" },
  { id: "4", name: "Sony WH-1000XM5", description: "Noise Cancelling Headphones", price: 349, category: "audio", storeName: "SoundPro", storeId: "s4", imageUrl: "" },
];

export function Marketplace({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)))], []);

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Gadget Marketplace</h1>
        <p className="text-gray-600">Discover the best deals from verified stores</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input className="pl-10" placeholder="Search for gadgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select className="w-full sm:w-48 h-9 border rounded-md px-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
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
