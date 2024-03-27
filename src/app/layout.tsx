import "./globals.css";
import Navbar from "./_components/Navbar";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/providers/AuthProvider";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ibm-mono",
});

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-sans",
});

export const metadata = {
  title: "Comatch",
  description: "Cohousing made simple",
  themeColor: "#C4B6E3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${ibm_plex_mono.variable} ${ibm_plex_sans.variable} bg-background`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
