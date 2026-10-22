import "../globals.css";
import "../fonts.css";
import { fontVariables } from "../site-fonts";

export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * Print documents (resume, CV) live outside the locale layout: no nav, no
 * footer, no intro, just A4 sheets. They are rendered to the PDFs in
 * public/downloads by scripts/build-docs.sh (npm run docs).
 */
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="print-doc bg-[#e9e8e6] text-foreground">
        {/* Keep the dev-mode indicator out of rendered PDFs and artboards. */}
        <style>{"nextjs-portal{display:none!important}"}</style>
        {children}
      </body>
    </html>
  );
}
