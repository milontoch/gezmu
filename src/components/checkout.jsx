import React, { useState } from 'react';
export function Checkout({ product, onNavigate }) {
  const { accessToken } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = product.price * quantity;
  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Create order
      await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity,
          shippingAddress: `${shippingInfo.fullName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`,
        }),
      }, accessToken || undefined);

      // In production, process payment here

      toast.success('Order placed successfully!');
      onNavigate('orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    placeholder="123 Main St, Apt 4B"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information</CardTitle>
                </div>
                
                  Your payment information is encrypted and secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm">
                  <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  
                    <p className="text-blue-900">
                      Secure Payment:</strong> This is a demo environment. No real payment will be processed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          
            <Card className="sticky top-24">
              Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Info */}
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1723637152067-178a129bd36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbGFwdG9wJTIwZGV2aWNlc3xlbnwxfHx8fDE3NTk0ODQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="line-clamp-2 mb-1">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.storeName}</div>
                  </div>
                </div>

                <Separator />

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    Subtotal</span>
                    ${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    Shipping</span>
                    ${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    Tax</span>
                    ${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  Total</span>
                  <span className="text-xl">${total.toFixed(2)}</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </Button>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Free returns within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
