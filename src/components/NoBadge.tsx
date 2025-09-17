"use client";

import { useEffect } from 'react';

export default function NoBadge() {
  useEffect(() => {
    const removeBadge = () => {
      // Remove all possible Next.js badge elements
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
        '[data-nextjs-toast-root]',
        'div[data-nextjs-scroll-focus-boundary]',
        'div[data-nextjs-toast-root]',
        'div[data-nextjs-portal]'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });

      // Also remove any elements with specific text content
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        if (div.textContent?.includes('Next.js') || 
            div.textContent?.includes('Relaunch to update') ||
            div.getAttribute('data-nextjs-toast-root')) {
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }
      });
    };

    // Remove immediately
    removeBadge();

    // Set up mutation observer to catch dynamically added elements
    const observer = new MutationObserver(() => {
      removeBadge();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['data-nextjs-toast-root', 'data-next-badge-root']
    });

    // Clean up on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
