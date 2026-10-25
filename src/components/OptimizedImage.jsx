import { useState, useEffect, useRef } from "react";

/**
 * OptimizedImage component with lazy loading and smooth transitions
 * Prevents CLS by reserving space with explicit dimensions
 * Uses Intersection Observer for efficient lazy loading
 * Supports WebP with fallbacks for browser compatibility
 */
const OptimizedImage = ({
  src,
  webpSrc = null,
  mobileSrc = null,
  mobileWebpSrc = null,
  alt,
  width,
  height,
  className = "",
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    // Priority images load immediately (above-fold content)
    if (priority) {
      return;
    }

    // Lazy load images using Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [priority]);

  return (
    <div
      ref={imgRef}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        position: "relative",
      }}
      className={className}
    >
      {/* Placeholder with pulse animation while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-800 animate-pulse rounded"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {/* Actual image with fade-in transition and WebP support */}
      {shouldLoad && (
        <picture>
          {/* Mobile WebP */}
          {mobileWebpSrc && (
            <source
              srcSet={mobileWebpSrc}
              type="image/webp"
              media="(max-width: 768px)"
            />
          )}
          {/* Mobile fallback */}
          {mobileSrc && (
            <source
              srcSet={mobileSrc}
              media="(max-width: 768px)"
            />
          )}
          {/* Desktop WebP */}
          {webpSrc && (
            <source
              srcSet={webpSrc}
              type="image/webp"
            />
          )}
          {/* Desktop fallback */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
