import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";
import NextTopLoader from 'nextjs-toploader';

const robotoHeading = Roboto({ subsets: ['latin'], variable: '--font-heading' });

const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  title: "CodeMorten",
  description: "Ai code reviewer that reviews each line of your code",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", oxanium.variable, robotoHeading.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <NextTopLoader
              color="red"
              showSpinner={false}
            />
            <div className="w-full h-full relative bg-blue-100/40 dark:bg-background">
              {children}
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
