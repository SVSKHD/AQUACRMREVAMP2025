"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/invoice/");
  if (hideHeader) return null;

  return <Header />;
}
