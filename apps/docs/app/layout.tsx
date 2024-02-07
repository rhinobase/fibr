import { type Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Protocol API Reference",
    default: "Protocol API Reference",
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="dark:bg-secondary-950 flex min-h-full bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
