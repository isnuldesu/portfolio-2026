import "../globals.css";
import "../fonts.css";
import { fontVariables } from "../site-fonts";

/**
 * The dashboard sits outside the locale tree, so it needs a root layout of
 * its own: no nav, no footer, no intro, just the page.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
