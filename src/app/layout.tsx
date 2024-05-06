import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/modules/Sidebar";
import Header from "@/components/modules/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="grid pl-[57px] w-full h-screen">
          <Sidebar />
          <div className={cn("flex flex-col")}>
            <Header />
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
