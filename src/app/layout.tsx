import "@/styles/globals.css";
import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";

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
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
