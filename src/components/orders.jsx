import React, { useState, useEffect } from 'react';
export function Orders() {
  const { profile, accessToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/orders', {}, accessToken || undefined);
      setOrders(data || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await apiRequest(`/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      }, accessToken || undefined);

      toast.success('Order status updated!');
      await loadOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error(error.message || 'Failed to update order');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered'="h-5 w-5 text-green-600" />;
      case 'shipped'="h-5 w-5 text-blue-600" />;
      case 'paid'="h-5 w-5 text-purple-600" />;
      default="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
      case 'paid':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const myOrders = filteredOrders.filter(o => o.consumerId === profile?.id);
  const storeOrders = filteredOrders.filter(o => o.storeId === profile?.id);

  const isStore = profile?.userType === 'store';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Orders</h1>
        <p className="text-gray-600">
          {isStore ? 'Manage your store orders' : 'Track your purchases'}
        </p>
      </div>

      {/* Status Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading orders...</div>
        </div>
      ) : (
        <>
          {/* Consumer View - My Orders */}
          {!isStore && (
            <>
              {myOrders.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'all' 
                      ? 'No orders yet' 
                      : `No ${activeTab} orders`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myOrders.map(order => (
                    <Card key={order.id}>
                      
                        <div className="flex items-start justify-between">
                          
                            <CardTitle className="text-lg mb-1">
                              {order.productName}
                            </CardTitle>
                            
                              Order #{order.id.slice(-8)} • {order.storeName}
                            </CardDescription>
                          </div>
                          {getStatusIcon(order.status)}
                        </div>
                      </CardHeader>
                      
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          
                            <div className="text-sm text-gray-600 mb-1">Quantity</div>
                            {order.quantity}</div>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                            ${order.totalAmount.toFixed(2)}</div>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Status</div>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Order Date</div>
                            <div className="text-sm">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Shipping to: </span>
                          {order.shippingAddress}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Store View - Store Orders */}
          {isStore && (
            <>
              {storeOrders.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'all' 
                      ? 'No orders received yet' 
                      : `No ${activeTab} orders`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {storeOrders.map(order => (
                    <Card key={order.id}>
                      
                        <div className="flex items-start justify-between">
                          
                            <CardTitle className="text-lg mb-1">
                              {order.productName}
                            </CardTitle>
                            
                              Order #{order.id.slice(-8)} • Customer: {order.consumerName}
                            </CardDescription>
                          </div>
                          {getStatusIcon(order.status)}
                        </div>
                      </CardHeader>
                      
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          
                            <div className="text-sm text-gray-600 mb-1">Quantity</div>
                            {order.quantity}</div>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                            ${order.totalAmount.toFixed(2)}</div>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Current Status</div>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          
                            <div className="text-sm text-gray-600 mb-1">Order Date</div>
                            <div className="text-sm">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm mb-4">
                          <span className="text-gray-600">Shipping to: </span>
                          {order.shippingAddress}
                        </div>

                        {/* Update Status (Store Only) */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Update status:</span>
                          <Select 
                            value={order.status}
                            onValueChange={(value) => handleUpdateStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Info */}
      {!loading && orders.length > 0 && (
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              {isStore ? (
                <>
                  📦 Store Orders:</strong> Keep customers informed by updating order status. 
                  Timely updates lead to better reviews and repeat customers.
                </>
              ) : (
                <>
                  📦 Track Your Orders:</strong> You'll receive updates. 
                  Contact the store directly through messages if you have any questions.
                </>
              )}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
