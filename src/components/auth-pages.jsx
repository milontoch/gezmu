import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ShoppingBag, User, Store as StoreIcon } from "lucide-react";

export function AuthPages({ initialView = "signin", onNavigate }) {
  const [tab, setTab] = useState(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userType, setUserType] = useState("consumer");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("marketplace");
    }, 600);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("marketplace");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
            <span className="text-3xl">Gezmu</span>
          </div>
          <p className="text-gray-600">Welcome to your gadget marketplace</p>
        </div>

        <div className="grid grid-cols-2 mb-6 border rounded-lg overflow-hidden">
          <button className={`py-2 ${tab === "signin" ? "bg-blue-600 text-white" : "bg-white"}`} onClick={() => setTab("signin")}>Sign In</button>
          <button className={`py-2 ${tab === "signup" ? "bg-blue-600 text-white" : "bg-white"}`} onClick={() => setTab("signup")}>Sign Up</button>
        </div>

        {tab === "signin" && (
          <div className="border rounded-xl bg-white">
            <div className="p-6 space-y-4">
              {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signin-email" className="text-sm">Email</label>
                  <Input id="signin-email" type="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signin-password" className="text-sm">Password</label>
                  <Input id="signin-password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
              </form>
            </div>
          </div>
        )}

        {tab === "signup" && (
          <div className="border rounded-xl bg-white">
            <div className="p-6 space-y-4">
              {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm">Account Type</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setUserType("consumer")} className={`p-4 border-2 rounded-lg transition-all ${userType === "consumer" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm">Consumer</div>
                    </button>
                    <button type="button" onClick={() => setUserType("store")} className={`p-4 border-2 rounded-lg transition-all ${userType === "store" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <StoreIcon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="text-sm">Store Owner</div>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-name" className="text-sm">Full Name</label>
                  <Input id="signup-name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm">Email</label>
                  <Input id="signup-email" type="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm">Password</label>
                  <Input id="signup-password" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                {userType === "store" && (
                  <div className="p-3 bg-blue-50 rounded text-sm text-blue-900 border border-blue-200">Store accounts require verification and a registration fee before you can start listing products.</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</Button>
              </form>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <button onClick={() => onNavigate("landing")} className="text-sm text-gray-600 hover:text-gray-900">← Back to home</button>
        </div>
      </div>
    </div>
  );
}
