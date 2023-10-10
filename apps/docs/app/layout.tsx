import glob from "fast-glob";

import { Providers } from "./providers";
import { Layout } from "../components/Layout";

import "./globals.css";
import { type Metadata } from "next";
import { type Section } from "../components/SectionProvider";

export const metadata: Metadata = {
  title: {
    template: "%s - Protocol API Reference",
    default: "Protocol API Reference",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await glob("**/*.mdx", { cwd: "./app" });
  const allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      "/" + filename.replace(/(^|\/)page\.mdx$/, ""),
      (await import(`./${filename}`)).sections,
    ])
  )) as Array<[string, Array<Section>]>;
  const allSections = Object.fromEntries(allSectionsEntries);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="dark:bg-secondary-900 flex min-h-full bg-white antialiased">
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
