import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <div
      ref={containerRef}
      {...props}
      className={twMerge(
        `group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ${
          vertical ? "flex-col" : "flex-row"
        }`,
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={twMerge(
              "flex shrink-0 justify-around [gap:var(--gap)] transform-gpu",
              vertical
                ? "animate-marquee-vertical flex-col"
                : "animate-marquee flex-row",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              !isVisible && "animation-paused",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
