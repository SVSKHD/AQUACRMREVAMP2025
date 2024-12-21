"use client";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { authService } from "@/lib/services/auth.service";
import { setCredentials } from "@/lib/store/slices/authSlice";
import { DropletIcon } from "lucide-react";
import { LoginForm } from "./login-form";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      try {
        const response = await authService.login(values);
        dispatch(setCredentials({
          token: response?.token,
          user: response?.user
        }));
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response?.token));
        localStorage.setItem('user', JSON.stringify(response?.user));
        toast({
          title: "Login successful",
          description: "Welcome to Aquakart Dashboard!",
        });
        onOpenChange(false);
      } catch (error: any) {
        toast({
          title: "Login failed",
          description: error.response?.data?.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, onOpenChange, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-4">
            <DropletIcon className="h-6 w-6 text-primary" />
            <DialogTitle>Login to Aquakart Dashboard</DialogTitle>
          </div>
        </DialogHeader>
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}