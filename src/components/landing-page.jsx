import React from 'react';
export function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
            <h1 className="text-5xl mb-6">
              Your Premier Gadget Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with verified stores, discover the best deals on gadgets, and join a thriving community of tech enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate('signup')}>
                Get Started/Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('signup')}>
                Register Your Store
              </Button>
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
            
                <TrendingDown className="h-12 w-12 text-blue-600 mb-4" />
                Best Prices</CardTitle>
                
                  Stores compete on pricing, ensuring you always get the best deal available.
                </CardDescription>
              </CardHeader>
            </Card>
            
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                Verified Stores</CardTitle>
                
                  All stores are verified and monitored to ensure your safety and satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>
            
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                Community & Support</CardTitle>
                
                  Join discussions, read reviews, and get repair services all in one place.
                </CardDescription>
              </CardHeader>
            </Card>
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
            
                <Store className="h-12 w-12 text-green-600 mb-4" />
                Easy Setup</CardTitle>
                
                  Register, get verified, and start selling your gadgets in minutes.
                </CardDescription>
              </CardHeader>
            </Card>
            
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                Promoted Listings</CardTitle>
                
                  Boost your visibility with optional ad placements to reach more customers.
                </CardDescription>
              </CardHeader>
            </Card>
            
                <ShoppingBag className="h-12 w-12 text-green-600 mb-4" />
                Direct Communication</CardTitle>
                
                  Chat directly with customers to finalize deals and build relationships.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">How It Works</h2>
          <p className="text-xl mb-12 opacity-90">
            Simple steps to start buying or selling gadgets
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                1
              </div>
              <h3 className="mb-2">Sign Up</h3>
              <p className="opacity-90">Create your account/p>
            </div>
            
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                2
              </div>
              <h3 className="mb-2">Get Verified</h3>
              <p className="opacity-90">Stores complete verification and payment process</p>
            </div>
            
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                3
              </div>
              <h3 className="mb-2">Browse & Connect</h3>
              <p className="opacity-90">Find gadgets or list products, chat with buyers/sellers</p>
            </div>
            
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                4
              </div>
              <h3 className="mb-2">Complete Deal</h3>
              <p className="opacity-90">Finalize purchase with secure payment and shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and verified stores on GadgetHub
          </p>
          <Button size="lg" onClick={() => onNavigate('signup')}>
            Create Your Account
          </Button>
        </div>
      </section>
    </div>
  );
}
