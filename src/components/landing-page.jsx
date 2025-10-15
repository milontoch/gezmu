import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag, Shield, Users, TrendingDown, Zap, Store } from "lucide-react";

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
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate("signup")}>Get Started</Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("signup")}>Register Your Store</Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl shadow-2xl w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ShoppingBag className="h-32 w-32 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features for Consumers */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">For Consumers</h2>
            <p className="text-xl text-gray-600">Everything you need to find the perfect gadget</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-white">
              <TrendingDown className="h-12 w-12 text-blue-600 mb-4" />
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
              <ShoppingBag className="h-12 w-12 text-green-600 mb-4" />
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
    </div>
  );
}
