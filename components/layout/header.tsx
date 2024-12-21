"use client";

import { ThemeSwitch } from "@/components/theme/theme-switch";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/store/slices/authSlice";

export function Header() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md rounded-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-192x192_kwyo3d.png"
            alt="Aquakart Logo"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold">Aquakart Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {isAuthenticated && (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
