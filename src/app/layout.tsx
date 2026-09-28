import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechBlog",
  description: "Blog tecnológico con Next.js 16, Supabase y Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}