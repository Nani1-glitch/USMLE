import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NoBadge from "@/components/NoBadge";

export const metadata: Metadata = {
  title: "USMLE Tutor",
  description: "Private, adaptive USMLE prep. Educational use only.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
          <body className="antialiased">        
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <NoBadge />
            </ThemeProvider>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // Force remove Next.js badge
                  (function() {
                    function removeNextJSBadge() {
                      const selectors = [
                        '[data-next-badge-root]',
                        '[data-next-badge]',
                        '#next-logo',
                        '[data-next-mark]',
                        '[data-next-mark-loading]',
                        '[data-nextjs-toast]',
                        '[data-nextjs-dialog]',
                        '[data-nextjs-portal]',
                        '[data-nextjs-scroll-focus-boundary]',
                        '[data-nextjs-dialog-overlay]',
                        '[data-nextjs-dialog-backdrop]',
                        '[data-nextjs-toast-root]'
                      ];
                      
                      selectors.forEach(selector => {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(el => {
                          if (el && el.parentNode) {
                            el.parentNode.removeChild(el);
                          }
                        });
                      });
                    }
                    
                    // Remove immediately
                    removeNextJSBadge();
                    
                    // Remove on DOM changes
                    const observer = new MutationObserver(removeNextJSBadge);
                    observer.observe(document.body, { childList: true, subtree: true });
                    
                    // Remove on load
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', removeNextJSBadge);
                    }
                  })();
                `,
              }}
            />
          </body>
    </html>
  );
}
