"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words, duration = 3000, className, isActive = true }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize animation variants to prevent recreation on each render
  // Use transform instead of x/y for GPU acceleration
  const initialVariant = useMemo(() => ({
    opacity: 0,
    transform: 'translateY(10px)',
  }), []);

  const animateVariant = useMemo(() => ({
    opacity: 1,
    transform: 'translateY(0)',
  }), []);

  const exitVariant = useMemo(() => ({
    opacity: 0,
    transform: 'translateY(-40px) translateX(40px) scale(2)',
    filter: "blur(8px)",
    position: "absolute",
  }), []);

  const transitionConfig = useMemo(() => ({
    type: "spring",
    stiffness: 100,
    damping: 10,
  }), []);

  // Memoize letter animation variants
  const letterInitialVariant = useMemo(() => ({
    opacity: 0,
    transform: 'translateY(10px)',
    filter: "blur(8px)"
  }), []);

  const letterAnimateVariant = useMemo(() => ({
    opacity: 1,
    transform: 'translateY(0)',
    filter: "blur(0px)"
  }), []);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    if (!isActive) return;
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words, isActive]);

  useEffect(() => {
    if (!isAnimating && isActive) {
      const timeoutId = setTimeout(() => {
        startAnimation();
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating, duration, startAnimation, isActive]);

  // Memoize the exit complete callback
  const handleExitComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Keep per-letter animation but reduce nested motion wrappers to lower runtime cost
  const wordElements = useMemo(() => {
    return currentWord.split(" ").map((word, wordIndex) => (
      <span key={word + wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((letter, letterIndex) => (
          <motion.span
            key={`${word}-${letterIndex}`}
            initial={letterInitialVariant}
            animate={letterAnimateVariant}
            transition={{
              delay: wordIndex * 0.2 + letterIndex * 0.04,
              duration: 0.18,
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  }, [currentWord, letterInitialVariant, letterAnimateVariant]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      <motion.div
        initial={initialVariant}
        animate={animateVariant}
        transition={transitionConfig}
        exit={exitVariant}
        className={twMerge("z-10 inline-block relative text-left", className)}
        key={currentWord}
      >
        {wordElements}
      </motion.div>
    </AnimatePresence>
  );
};
