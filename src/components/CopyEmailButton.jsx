import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "hoainhannro@gmail.com";
  const timeoutRef = useRef(null);

  // Memoize animation variants to prevent recreation on each render
  // Use transform instead of x/y for GPU acceleration
  const buttonHoverVariant = useMemo(() => ({ transform: 'translateY(-5px)' }), []);
  const buttonTapVariant = useMemo(() => ({ scale: 1.05 }), []);

  const copiedInitialVariant = useMemo(() => ({ opacity: 0, transform: 'translateY(-10px)' }), []);
  const copiedAnimateVariant = useMemo(() => ({ opacity: 1, transform: 'translateY(0)' }), []);
  const copiedExitVariant = useMemo(() => ({ opacity: 0, transform: 'translateY(-10px)' }), []);
  const copiedTransition = useMemo(() => ({ duration: 0.1, ease: "easeInOut" }), []);

  const copyInitialVariant = useMemo(() => ({ opacity: 0 }), []);
  const copyAnimateVariant = useMemo(() => ({ opacity: 1 }), []);
  const copyExitVariant = useMemo(() => ({ opacity: 0 }), []);
  const copyTransition = useMemo(() => ({ duration: 0.1 }), []);

  // Wrap copyToClipboard with useCallback to prevent recreation
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [email]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={buttonHoverVariant}
      whileTap={buttonTapVariant}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={copiedInitialVariant}
            animate={copiedAnimateVariant}
            exit={copiedExitVariant}
            transition={copiedTransition}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="copy Icon" />
            Email has Copied
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={copyInitialVariant}
            animate={copyAnimateVariant}
            exit={copyExitVariant}
            transition={copyTransition}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
