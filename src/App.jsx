import React, { useState } from 'react';
import { Navigation } from './components/top-navigation.jsx';
import { LandingPage } from './components/landing-page.jsx';
import { AuthPages } from './components/auth-pages.jsx';
import { Marketplace } from './components/marketplace.jsx';
import { StoreDashboard } from './components/store-dashboard.jsx';
import { StoreProducts } from './components/store-products.jsx';
import { Messages } from './components/messages.jsx';
import { Blog } from './components/blog.jsx';
import { RepairService } from './components/repair-service.jsx';
import { Checkout } from './components/checkout.jsx';
import { Orders } from './components/orders.jsx';
import { Toaster } from './components/ui/sonner.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [viewData, setViewData] = useState(null);

  const handleNavigate = (view, data) => {
    setCurrentView(view);
    setViewData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      
      <main>
        {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentView === 'signin' && <AuthPages initialView="signin" onNavigate={handleNavigate} />}
        {currentView === 'signup' && <AuthPages initialView="signup" onNavigate={handleNavigate} />}
        {currentView === 'marketplace' && <Marketplace onNavigate={handleNavigate} />}
        {currentView === 'store-dashboard' && <StoreDashboard onNavigate={handleNavigate} />}
        {currentView === 'store-products' && <StoreProducts onNavigate={handleNavigate} />}
        {currentView === 'messages' && <Messages initialData={viewData} onNavigate={handleNavigate} />}
        {currentView === 'blog' && <Blog onNavigate={handleNavigate} />}
        {currentView === 'repair' && <RepairService onNavigate={handleNavigate} />}
        {currentView === 'checkout' && viewData?.product && (
          <Checkout product={viewData.product} onNavigate={handleNavigate} />
        )}
        {currentView === 'orders' && <Orders onNavigate={handleNavigate} />}
      </main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">Gezmu</h3>
              <p className="text-sm text-gray-600">
                Your premier marketplace for buying and selling gadgets.
              </p>
            </div>
            <div>
              <h4 className="mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Browse Marketplace</li>
                <li>Blog & Reviews</li>
                <li>Repair Service</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Register Your Store</li>
                <li>List Products</li>
                <li>Promote with Ads</li>
                <li>Manage Orders</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety & Security</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2025 Gezmu. All rights reserved. Built with security and trust in mind.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}