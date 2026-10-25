import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import Loader from "../components/Loader";
import ThreeJSErrorBoundary from "../components/ThreeJSErrorBoundary";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const canvasRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  
  // Device capability detection
  const shouldLoadThreeJS = useMemo(() => {
    // Check hardware concurrency (number of CPU cores)
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    
    // Load Three.js on desktop or on mobile devices with 4+ cores
    return !isMobile || hardwareConcurrency >= 4;
  }, [isMobile]);
  
  // Intersection Observer to detect Hero section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the section is visible
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);
  
  // WebGL context loss handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
      setWebGLAvailable(false);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setWebGLAvailable(true);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  return (
    <section 
      ref={heroSectionRef}
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <HeroText isVisible={isVisible} />
      <ParallaxBackground containerRef={heroSectionRef} isVisible={isVisible} />
      {shouldLoadThreeJS && webGLAvailable ? (
        <ThreeJSErrorBoundary>
          <figure
            ref={canvasRef}
            className="absolute inset-0"
            style={{ width: "100vw", height: "100vh" }}
          >
            <Canvas 
              camera={{ position: [0, 1, 3] }}
              frameloop={isVisible ? "always" : "demand"} // Stop render loop when hero is off-screen
              dpr={isMobile ? [1, 1.5] : [1, 2]} // Limit device pixel ratio to prevent over-rendering
              performance={{ min: 0.5 }} // Adaptive performance with min threshold
              gl={{
                antialias: !isMobile, // Disable antialiasing on mobile
                powerPreference: isMobile ? 'low-power' : 'high-performance', // Optimize for device profile
                alpha: true
              }}
              onCreated={({ gl }) => {
                // Store canvas reference for context loss handling
                canvasRef.current = gl.domElement;
              }}
            >
              <Suspense fallback={<Loader />}>
                <Float>
                  <Astronaut
                    scale={isMobile && 0.23}
                    position={isMobile && [0, -1.5, 0]}
                    isMobile={isMobile}
                    isVisible={isVisible}
                  />
                </Float>
                <Rig isVisible={isVisible} />
              </Suspense>
            </Canvas>
          </figure>
        </ThreeJSErrorBoundary>
      ) : (
        // Fallback content for low-powered devices or WebGL unavailable
        <figure
          className="absolute inset-0 flex items-center justify-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className="text-center opacity-20">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-sm text-white-600">
              {!webGLAvailable ? 'WebGL unavailable' : 'Optimized for your device'}
            </p>
          </div>
        </figure>
      )}
    </section>
  );
};

function Rig({ isVisible }) {
  return useFrame((state, delta) => {
    // Only update camera position when Hero section is visible
    if (isVisible) {
      easing.damp3(
        state.camera.position,
        [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
        0.5,
        delta
      );
    }
  });
}

export default Hero;
