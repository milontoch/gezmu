import React from "react";
import { Button } from "./ui/button";

export function Info({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl mb-4">Welcome to Gezmu</h1>
        <p className="text-lg text-gray-600 mb-8">
          Gezmu is a gadgets-only marketplace inspired by the best of jiji-style discovery and Amazon-style filtering.
          Buy from verified stores, compare prices, and contact sellers directly. No reels—just clean product posts and
          simple interactions like Chat and Call.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-xl bg-gray-50">
            <h3 className="mb-2">Verified Stores</h3>
            <p className="text-sm text-gray-600">We highlight trusted vendors for safe transactions.</p>
          </div>
          <div className="p-6 border rounded-xl bg-gray-50">
            <h3 className="mb-2">Great Prices</h3>
            <p className="text-sm text-gray-600">Competitive deals across phones, laptops, audio, and more.</p>
          </div>
          <div className="p-6 border rounded-xl bg-gray-50">
            <h3 className="mb-2">Direct Communication</h3>
            <p className="text-sm text-gray-600">Message or call sellers to finalize details before buying.</p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => onNavigate("home")}>Enter Gezmu</Button>
        </div>
      </section>
    </div>
  );
}
