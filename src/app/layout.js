import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Oswald } from "next/font/google";
import { ThemeProviders } from "../components/ThemeProvider";
import Container from "../components/container";

const OswaldFont = Oswald({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Invent Tree",
  description: "Discover Invent-Tree – a leading political, survey, and geospatial consultancy firm. Explore our services, case studies, and blog in English and Hindi. Modern, responsive, and insight-driven. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${OswaldFont.className}  antialiased`}>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
