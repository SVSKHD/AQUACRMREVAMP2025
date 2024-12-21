// app/invoice/[id]/layout.tsx
import { ReactNode } from "react";

export default function InvoiceLayout({ children }: { children: ReactNode }) {
  return (
    // Use flexbox to center children horizontally & vertically
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background image container */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png")',
          backgroundSize: "300px 300px",
          opacity: 0.8, // 80% transparency
        }}
      />
      {/* Content container above the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
