import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";

export function Checkout({ product, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const subtotal = useMemo(() => (product?.price || 0) * quantity, [product?.price, quantity]);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl mb-2">Checkout</h1>
        <p className="text-gray-600">No product selected. Please choose an item in the marketplace.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Checkout</h1>
        <p className="text-gray-600">Static demo. No real payment processed.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-4 rounded-xl border bg-white">
            <h3 className="mb-4">Shipping Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="border rounded-md h-9 px-3" placeholder="Full Name" />
              <input className="border rounded-md h-9 px-3" placeholder="Phone" />
              <input className="border rounded-md h-9 px-3 sm:col-span-2" placeholder="Street Address" />
              <input className="border rounded-md h-9 px-3" placeholder="City" />
              <input className="border rounded-md h-9 px-3" placeholder="State" />
              <input className="border rounded-md h-9 px-3" placeholder="ZIP Code" />
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-white">
            <h3 className="mb-2">Payment Information</h3>
            <p className="text-sm text-gray-600 mb-4">Demo only. Entering data won’t charge anything.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="border rounded-md h-9 px-3 sm:col-span-2" placeholder="Card Number" />
              <input className="border rounded-md h-9 px-3" placeholder="MM/YY" />
              <input className="border rounded-md h-9 px-3" placeholder="CVV" />
            </div>
          </div>
        </div>

        <div>
          <div className="p-4 rounded-xl border bg-white sticky top-24">
            <h3 className="mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2"><span>Item</span><span>{product.name}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Store</span><span>{product.storeName}</span></div>
            <div className="flex items-center justify-between mb-4">
              <span>Quantity</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
            </div>
            <div className="border-t my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t my-4" />
            <div className="flex justify-between"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>
            <Button className="w-full mt-4" onClick={() => onNavigate("orders")}>Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
