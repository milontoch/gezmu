import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquare, Phone } from "lucide-react";

export function PostCardInstagram({
  product,
  onNavigate,
}) {
  const {
    id,
    title,
    price,
    image,
    sellerName,
    sellerAvatar,
    storeId,
    sellerPhone,
    location,
    hasAd,
    adPaid,
    posterType, // 'vendor' | 'customer'
  } = product;

  const [showCall, setShowCall] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border bg-white">
      {/* Header: avatar + vendor name */}
      <header className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img src={sellerAvatar} alt={sellerName} className="h-8 w-8 rounded-full object-cover border" />
          <div className="text-sm">
            <div className="font-medium leading-tight">{sellerName}</div>
            {location && <div className="text-gray-500 leading-tight">{location}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {posterType && (
            <span className="text-[10px] uppercase tracking-wide bg-gray-900 text-white px-2 py-0.5 rounded-full">
              {posterType === "vendor" ? "Vendor" : "Customer"}
            </span>
          )}
          {hasAd && adPaid && (
            <span className="text-[10px] uppercase tracking-wide bg-yellow-400/90 text-black px-2 py-0.5 rounded-full">Sponsored</span>
          )}
        </div>
      </header>

      {/* Media: square post */}
      <div className="relative bg-gray-100">
        <div style={{ paddingTop: "100%" }} />
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Meta and actions */}
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          {price && <div className="text-blue-600 font-semibold">{price}</div>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => onNavigate?.("messages", { recipientId: storeId, recipientName: sellerName, productId: id })}
            className="inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> Chat
          </Button>
          <Button
            onClick={() => setShowCall((s) => !s)}
            className="inline-flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" /> Call
          </Button>
        </div>

        {showCall && (
          <div className="mt-2 rounded-lg border bg-gray-50 p-3 text-sm">
            <div className="text-gray-600 mb-1">Call this vendor:</div>
            <div className="font-medium">{sellerPhone || "+234 800 000 0000"}</div>
            <div className="text-xs text-gray-500 mt-1">Save the number and place your call outside the app.</div>
          </div>
        )}
      </div>
    </article>
  );
}
