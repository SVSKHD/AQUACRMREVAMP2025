"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { LoginDialog } from "./login-dialog";
import { Button } from "@/components/ui/button";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative">
      {children}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-background/80" />
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex items-center space-x-2 mb-8">
              <img
                src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-192x192_kwyo3d.png"
                alt="Aquakart Logo"
                className="h-12 w-12"
              />
              <h1 className="text-3xl font-bold">Aquakart Dashboard</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Please login to access the dashboard
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowLogin(true)}
              className="relative z-[60]"
            >
              Login to Dashboard
            </Button>
          </div>
        </div>
      )}
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </div>
  );
}