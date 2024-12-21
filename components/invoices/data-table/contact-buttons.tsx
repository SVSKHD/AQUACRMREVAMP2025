"use client";

import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import { getWhatsAppLink, getEmailLink } from "@/lib/utils/contact";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContactButtonsProps {
  phone: number | null;
  email: string;
}

export function ContactButtons({ phone, email }: ContactButtonsProps) {
  return (
    <div className="flex space-x-2">
      {phone && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => window.open(getWhatsAppLink(phone), "_blank")}
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {email && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => window.open(getEmailLink(email), "_blank")}
              >
                <Mail className="h-4 w-4 text-blue-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send Email</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}