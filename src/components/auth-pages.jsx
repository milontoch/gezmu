import React, { useState } from 'react';
export function AuthPages({ initialView, onNavigate }) {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [userType, setUserType] = useState<'consumer' | 'store'>('consumer');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(signInEmail, signInPassword);
      // Navigation handled by auth context
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(signUpEmail, signUpPassword, signUpName, userType);
      // Navigation handled by auth context
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
            <span className="text-3xl">GadgetHub</span>
          </div>
          <p className="text-gray-600">Welcome to your gadget marketplace</p>
        </div>

        <Tabs defaultValue={initialView} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            Sign In</CardTitle>
                Enter your credentials to access your account</CardDescription>
              </CardHeader>
              
                <form onSubmit={handleSignIn} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      {error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            Create Account</CardTitle>
                Choose your account type and get started</CardDescription>
              </CardHeader>
              
                <form onSubmit={handleSignUp} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      {error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    Account Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserType('consumer')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          userType === 'consumer'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm">Consumer</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('store')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          userType === 'store'
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Store className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-sm">Store Owner</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  {userType === 'store' && (
                    
                        Store accounts require verification and a registration fee before you can start listing products.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
