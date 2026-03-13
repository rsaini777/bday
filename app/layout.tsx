import type { Metadata, Viewport } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#ff6b9d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Happy Birthday My Love ❤️",
  description: "A special birthday surprise for the one who stole my heart.",
  openGraph: {
    title: "Happy Birthday My Love ❤️",
    description: "A special birthday surprise for the one who stole my heart.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dancingScript.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
