import { useEffect, useRef } from 'react';

/**
 * Custom hook to throttle scroll event handlers for better performance
 * Limits execution to 60fps (16ms intervals) with passive event listeners
 * 
 * @param {Function} callback - The function to call on scroll
 * @param {number} delay - Throttle delay in milliseconds (default: 16ms for 60fps)
 */
export const useThrottledScroll = (callback, delay = 16) => {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        callback();
        lastRun.current = now;
      } else {
        // Schedule the callback to run after the remaining delay
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback();
          lastRun.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    };

    // Safety check for window object
    if (typeof window === 'undefined') return;

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};
