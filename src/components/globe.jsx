"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";

import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointerInteracting = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Detect mobile device - with safety check for SSR
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  }, []);

  const pixelRatio = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const dpr = window.devicePixelRatio || 1;
    return Math.min(dpr, isMobile ? 1.25 : 1.75);
  }, [isMobile]);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  // Optimize pointer interaction handlers with useCallback
  const updatePointerInteraction = useCallback((value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  }, []);

  const updateMovement = useCallback((clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  }, [r]);

  const handlePointerDown = useCallback(
    (e) => {
      pointerInteracting.current = e.clientX;
      updatePointerInteraction(e.clientX);
    },
    [updatePointerInteraction]
  );

  const handlePointerUp = useCallback(() => {
    updatePointerInteraction(null);
  }, [updatePointerInteraction]);

  const handleMouseMove = useCallback(
    (e) => {
      updateMovement(e.clientX);
    },
    [updateMovement]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches[0]) {
        updateMovement(e.touches[0].clientX);
      }
    },
    [updateMovement]
  );

  // Pause globe render loop when section is off-screen
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    // Safety check for window object
    if (typeof window === 'undefined' || !canvasRef.current || !isVisible) return;

    window.addEventListener("resize", onResize);
    onResize();

    // Reduce mapSamples on mobile devices for better performance
    const optimizedConfig = {
      ...config,
      mapSamples: isMobile ? 8000 : config.mapSamples,
      devicePixelRatio: pixelRatio,
      width: widthRef.current * pixelRatio,
      height: widthRef.current * pixelRatio,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * pixelRatio;
        state.height = widthRef.current * pixelRatio;
      },
    };

    const globe = createGlobe(canvasRef.current, optimizedConfig);
    const opacityTimer = window.setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    // Proper cleanup to prevent memory leaks
    return () => {
      window.clearTimeout(opacityTimer);
      globe.destroy();
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", onResize);
      }
    };
  }, [rs, config, isMobile, pixelRatio, isVisible]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      />
    </div>
  );
}
