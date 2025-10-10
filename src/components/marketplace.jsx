import React, { useState, useEffect } from 'react';
export function Marketplace({ onNavigate }) {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const data = await apiRequest('/products', {}, accessToken || undefined);
      clearTimeout(timeoutId);
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      if (error.name !== 'AbortError') {
        toast.error('Failed to load products');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleContactStore = (product) => {
    onNavigate('messages', { recipientId: product.storeId, recipientName: product.storeName, productId: product.id });
  };

  const handleBuyNow = (product) => {
    onNavigate('checkout', { product });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Gadget Marketplace</h1>
        <p className="text-gray-600">Discover the best deals from verified stores</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for gadgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No products found</p>
          {products.length === 0 && (
            <p className="text-sm text-gray-500">Be the first to discover new gadgets when stores list them!</p>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1723637152067-178a129bd36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbGFwdG9wJTIwZGV2aWNlc3xlbnwxfHx8fDE3NTk0ODQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.hasAd && product.adPaid && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    <Zap className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                  <div className="text-lg text-blue-600">
                    ${product.price}
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">{product.storeName}</div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleContactStore(product)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleBuyNow(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="mb-2">💡 Why GadgetHub?</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          ✓ All stores are verified for your safety</li>
          ✓ Competitive pricing - stores compete to offer you the best deals</li>
          ✓ Direct communication with sellers before purchase</li>
          ✓ Secure payment and shipping options</li>
        </ul>
      </div>
    </div>
  );
}
