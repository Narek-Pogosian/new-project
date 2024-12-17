import "@/styles/globals.css";
import { type Metadata } from "next";
import { Cookie } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";

const cookie = Cookie({ weight: ["400"], variable: "--font-cookie" });

export const metadata: Metadata = {
  title: "Shop",
  description: "A fake shop by AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${cookie.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
