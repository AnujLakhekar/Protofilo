import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Providers from "../../providers/QueryClientProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Anuj Lakhekar | Full-Stack Developer',
  description: 'Full-stack developer specializing in high-performance React and Next.js applications.',
  openGraph: {
    title: 'Anuj Lakhekar | Full-Stack Developer',
    description: 'Full-stack developer specializing in high-performance React and Next.js applications.',
    url: 'https://anujlakhekar.is-a.dev',
    siteName: 'Anuj Lakhekar Portfolio',
    images: [
      {
        url: 'https://www.google.com/search?q=portfolio+logo&oq=portfolio+logo&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgYIAhAjGCcyDAgDEAAYQxiABBiKBTIMCAQQABhDGIAEGIoFMgwIBRAAGEMYgAQYigUyDAgGEAAYQxiABBiKBTIMCAcQABhDGIAEGIoFMgwICBAAGEMYgAQYigUyDAgJEAAYQxiABBiKBTIKCAoQABiABBjHBTIHCAsQABiABDIKCAwQABiABBjHBTIHCA0QABiABDIKCA4QABiABBjHBdIBCDkxNTNqMGo0qAIOsAIB8QVniCfm_b4K2_EFHziRwQPXJUw&client=ms-android-oppo-rvo3&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8#sv=CAMScRoyKhBlLVBxaTFmUHRDOVQ2RXFNMg5QcWkxZlB0QzlUNkVxTToOUVFFWTJEZTFNRGRmV00gBCoxChtfbzB5a2FyLVhKTWFhaHZjUHFfTFIyUXNfNDASEGUtUHFpMWZQdEM5VDZFcU0YADABSgQIARACGAcgltjktwNKCBACGAEgAigB', // Add a 1200x630 banner in /public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>

        {/* Load Google Tag Manager Library */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DTC8PQHH45"
          strategy="afterInteractive"
        />

        {/* Inline Google Tag Manager Configuration */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTC8PQHH45');
          `}
        </Script>
      </body>
    </html>
  );
        }
