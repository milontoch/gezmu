import React, { useState, useEffect } from 'react';
export function StoreProducts() {
  const { accessToken, profile } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(`/products?storeId=${profile?.id}`, {}, accessToken || undefined);
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product?) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        imageUrl: product.imageUrl || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile?.verified || !profile?.registrationPaid) {
      toast.error('You must be verified and have paid registration to manage products');
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (editingProduct) {
        // Update existing product
        await apiRequest(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        }, accessToken || undefined);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await apiRequest('/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        }, accessToken || undefined);
        toast.success('Product created successfully!');
      }

      await loadProducts();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await apiRequest(`/products/${productId}`, {
        method: 'DELETE',
      }, accessToken || undefined);
      toast.success('Product deleted successfully!');
      await loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const handlePayForAd = async (productId) => {
    if (!confirm('Pay $29 to feature this product at the top of search results?')) return;

    try {
      await apiRequest(`/products/${productId}/pay-ad`, {
        method: 'POST',
      }, accessToken || undefined);
      toast.success('Ad placement activated! Your product will now appear first.');
      await loadProducts();
    } catch (error) {
      console.error('Failed to activate ad:', error);
      toast.error(error.message || 'Failed to activate ad');
    }
  };

  if (!profile?.verified || !profile?.registrationPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl mb-4">Products Not Available</h2>
          <p className="text-gray-600 mb-6">
            You must complete registration payment and verification before you can manage products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        
          <h1 className="text-3xl mb-2">My Products</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading products...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-gray-600 mb-4">No products yet</p>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden">
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
              
                <Badge variant="secondary">{product.category}</Badge>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenDialog(product)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                {!product.hasAd || !product.adPaid ? (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="w-full"
                    onClick={() => handlePayForAd(product.id)}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Feature Product ($29)
                  </Button>
                ) : (
                  <div className="text-xs text-center text-gray-600 py-2">
                    ✨ This product is featured
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            
              {editingProduct 
                ? 'Update your product details' 
                : 'Fill in the details to list a new product'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="iPhone 15 Pro Max"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="999.99"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    
                      <SelectItem value="Smartphones">Smartphones</SelectItem>
                      <SelectItem value="Laptops">Laptops</SelectItem>
                      <SelectItem value="Tablets">Tablets</SelectItem>
                      <SelectItem value="Wearables">Wearables</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Cameras">Cameras</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500">
                  Provide a direct link to your product image
                </p>
              </div>
            </div>

              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
