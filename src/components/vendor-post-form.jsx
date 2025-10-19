import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function VendorPostForm({ onNavigate }) {
  const [negotiable, setNegotiable] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Post a Gadget</h1>
        <p className="text-sm text-gray-600">Create a new listing. Media and data are static for now.</p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm mb-2">Title</label>
          <Input placeholder="e.g., iPhone 13 Pro, 128GB, Graphite" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Category</label>
            <select className="w-full h-9 border rounded-md px-2">
              {[
                "Phones","Tablets","Laptops","Accessories","Cameras","Audio","Gaming","Drones","Smart Home","Other Gadgets"
              ].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Brand</label>
            <Input placeholder="e.g., Apple" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Model</label>
            <Input placeholder="e.g., iPhone 13 Pro" />
          </div>
          <div>
            <label className="block text-sm mb-2">Condition</label>
            <select className="w-full h-9 border rounded-md px-2">
              {["New","Like New","Gently Used","Used","For Parts/Not Working"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Price (₦)</label>
            <Input type="number" placeholder="e.g., 680000" />
          </div>
          <div className="flex items-end gap-2">
            <input id="negotiable" type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} />
            <label htmlFor="negotiable" className="text-sm">Negotiable</label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">City</label>
            <Input placeholder="e.g., Lagos" />
          </div>
          <div>
            <label className="block text-sm mb-2">State</label>
            <Input placeholder="e.g., Lagos" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Photos</label>
          <div className="border-dashed border rounded-md p-6 text-center text-sm text-gray-600">Drop images here (1–10) • 1:1 ratio recommended</div>
        </div>

        <div>
          <label className="block text-sm mb-2">Description</label>
          <Textarea rows={6} placeholder="Key details: storage, color, battery health, accessories, warranty, delivery options..." />
        </div>

        {/* Preview chip for Negotiable */}
        <div className="text-sm text-gray-700">
          Preview: Price {negotiable ? <span className="px-2 py-1 bg-green-50 text-green-700 rounded">Negotiable</span> : <span className="px-2 py-1 bg-gray-100 rounded">Fixed</span>}
        </div>

        <div className="flex gap-3">
          <Button onClick={() => onNavigate("vendor")}>Save Draft</Button>
          <Button variant="outline" onClick={() => onNavigate("vendor")}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
