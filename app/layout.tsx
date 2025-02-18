import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "3D concurrent Demo",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-blue-950">
      <body>
        {children}
      </body>
    </html>
  );
}
