import React, { useState, useEffect } from 'react';
export function StoreDashboard({ onNavigate }) {
  const { profile, accessToken, refreshProfile } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingRegistration, setPayingRegistration] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, [profile?.id]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        apiRequest(`/products?storeId=${profile?.id}`, {}, accessToken || undefined).catch(() => []),
        apiRequest('/orders', {}, accessToken || undefined).catch(() => []),
      ]);
      setProducts(productsData || []);
      setOrders((ordersData || []).filter((o) => o.storeId === profile?.id));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setProducts([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayRegistration = async () => {
    try {
      setPayingRegistration(true);
      await apiRequest('/stores/pay-registration', {
        method: 'POST',
      }, accessToken || undefined);
      
      toast.success('Registration paid successfully!');
      await refreshProfile();
    } catch (error) {
      console.error('Failed to pay registration:', error);
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setPayingRegistration(false);
    }
  };

  const handleRequestVerification = async () => {
    // In a real app, this would trigger an admin review process
    try {
      await apiRequest(`/stores/${profile?.id}/verify`, {
        method: 'POST',
      }, accessToken || undefined);
      
      toast.success('Verification request submitted!');
      await refreshProfile();
    } catch (error) {
      console.error('Failed to request verification:', error);
      toast.error(error.message || 'Failed to submit verification');
    }
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => !p.soldOut).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  };

  const setupProgress = [
    { label: 'Account Created', completed: true },
    { label: 'Registration Paid', completed: profile?.registrationPaid },
    { label: 'Store Verified', completed: profile?.verified },
    { label: 'First Product Listed', completed: products.length > 0 },
  ];

  const completedSteps = setupProgress.filter(s => s.completed).length;
  const progressPercent = (completedSteps / setupProgress.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Store Dashboard</h1>
        <p className="text-gray-600">Manage your store and track your performance</p>
      </div>

      {/* Setup Progress */}
      {!profile?.verified && (
        <Card className="mb-8">
          Store Setup Progress</CardTitle>
            Complete these steps to start selling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressPercent} className="h-2" />
            <div className="space-y-2">
              {setupProgress.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-300" />
                  )}
                  <span className={step.completed ? 'text-gray-900' : 'text-gray-500'}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {!profile?.registrationPaid && (
              
                <AlertCircle className="h-4 w-4" />
                
                  <div className="flex items-center justify-between">
                    Complete registration payment to continue</span>
                    <Button 
                      size="sm" 
                      onClick={handlePayRegistration}
                      disabled={payingRegistration}
                    >
                      {payingRegistration ? 'Processing...' : 'Pay $99'}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {profile?.registrationPaid && !profile?.verified && (
              
                <AlertCircle className="h-4 w-4" />
                
                  <div className="flex items-center justify-between">
                    Request verification to start listing products</span>
                    <Button 
                      size="sm" 
                      onClick={handleRequestVerification}
                    >
                      Request Verification
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {profile?.verified && products.length === 0 && (
              
                <AlertCircle className="h-4 w-4" />
                
                  <div className="flex items-center justify-between">
                    You're all set! List your first product to start selling</span>
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate('store-products')}
                    >
                      Add Product
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {profile?.verified && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Products</CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            
              <div className="text-2xl">{stats.totalProducts}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.activeProducts} active
              </p>
            </CardContent>
          </Card>

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Orders</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-600" />
            </CardHeader>
            
              <div className="text-2xl">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.pendingOrders} pending
              </p>
            </CardContent>
          </Card>

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            
              <div className="text-2xl">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">
                Total earnings
              </p>
            </CardContent>
          </Card>

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Store Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            
              <Badge variant={profile?.verified ? 'default' : 'secondary'}>
                {profile?.verified ? 'Verified' : 'Pending'}
              </Badge>
              <p className="text-xs text-gray-600 mt-2">
                {profile?.registrationPaid ? 'Paid' : 'Payment required'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Orders */}
      {profile?.verified && orders.length > 0 && (
        Recent Orders</CardTitle>
            Latest orders from your customers</CardDescription>
          </CardHeader>
          
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  {order.productName}</div>
                    <div className="text-sm text-gray-600">
                      {order.consumerName} • {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1">${order.totalAmount}</div>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'shipped' ? 'secondary' :
                      'outline'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('orders')}
            >
              View All Orders
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {profile?.verified && (
        <div className="mt-8">
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => onNavigate('store-products')}
            >
              <Package className="h-6 w-6" />
              Manage Products</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => onNavigate('messages')}
            >
              <MessageSquare className="h-6 w-6" />
              View Messages</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2"
              onClick={() => onNavigate('orders')}
            >
              <TrendingUp className="h-6 w-6" />
              Track Orders</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
