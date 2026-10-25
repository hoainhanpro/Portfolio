import React, { useState, useRef, useEffect, memo } from "react";

const LazyImage = ({
  src,
  webpSrc,
  alt,
  className = "",
  containerClassName = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PC9zdmc+",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer để lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px", // Load 50px trước khi vào view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center ${className}`}>
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && isLoaded && (
        <div className={`flex items-center justify-center bg-white/5 ${className}`}>
          <div className="text-center text-neutral-500">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">📷</div>
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Actual image - chỉ load khi vào view */}
      {isInView && !hasError && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default memo(LazyImage);
