import React from 'react';
export function Navigation({ currentView, onNavigate }) {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('landing');
  };

  if (!user) {
    return (
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('landing')}
            >
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl">GadgetHub</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => onNavigate('signin')}>
                Sign In
              </Button>
              <Button onClick={() => onNavigate('signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(profile?.userType === 'store' ? 'store-dashboard' : 'marketplace')}
          >
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-xl">GadgetHub</span>
          </div>

          <div className="flex items-center gap-6">
            {profile?.userType === 'consumer' && (
              <>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'marketplace' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Store className="h-5 w-5" />
                  Marketplace</span>
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'blog' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="h-5 w-5" />
                  Blog</span>
                </button>
                <button
                  onClick={() => onNavigate('repair')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'repair' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Wrench className="h-5 w-5" />
                  Repair</span>
                </button>
              </>
            )}

            {profile?.userType === 'store' && (
              <>
                <button
                  onClick={() => onNavigate('store-dashboard')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'store-dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Store className="h-5 w-5" />
                  Dashboard</span>
                </button>
                <button
                  onClick={() => onNavigate('store-products')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'store-products' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Products</span>
                </button>
              </>
            )}

            <button
              onClick={() => onNavigate('messages')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              Messages</span>
            </button>

                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {profile?.name}</span>
                  {profile?.verified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('orders')}>
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
