import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const ParallaxBackground = ({ containerRef, isVisible = true }) => {
  const localContainerRef = useRef(null);

  // Track only hero section progress instead of whole page to reduce scroll work
  const { scrollYProgress } = useScroll({
    target: containerRef || localContainerRef,
    offset: ["start start", "end start"],
  });

  const x = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    mass: 0.4,
  });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section ref={localContainerRef} className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className={`absolute inset-0 -z-40 ${!isVisible ? "animation-paused" : ""}`}
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className={`absolute inset-0 -z-30 ${!isVisible ? "animation-paused" : ""}`}
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className={`absolute inset-0 -z-20 ${!isVisible ? "animation-paused" : ""}`}
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className={`absolute inset-0 -z-10 ${!isVisible ? "animation-paused" : ""}`}
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
