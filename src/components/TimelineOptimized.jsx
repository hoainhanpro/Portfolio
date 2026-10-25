import React, { memo, useRef, useEffect, useState } from "react";

const TimelineOptimized = ({ data }) => {
  const timelineRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Intersection Observer để chỉ animate items khi visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          setVisibleItems(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            }
            return newSet;
          });
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px 0px"
      }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="c-space section-spacing">
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={timelineRef} className="relative pb-20">
        {/* Static timeline line - không cần animation */}
        <div className="absolute left-1 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
        
        {data.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={`timeline-item flex justify-start pt-10 md:pt-40 md:gap-10 transition-all duration-700 ${
              visibleItems.has(index) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Timeline dot */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div 
                  className={`w-4 h-4 p-2 border rounded-full transition-all duration-500 ${
                    visibleItems.has(index)
                      ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/20'
                      : 'bg-neutral-800 border-neutral-700'
                  }`} 
                />
              </div>
              
              {/* Desktop layout */}
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <h3 className="text-sm uppercase tracking-wider text-neutral-500">{item.date}</h3>
                <h3 className="text-2xl text-neutral-300">{item.title}</h3>
                <h3 className="text-lg text-neutral-400">{item.job}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              {/* Mobile layout */}
              <div className="block mb-4 text-left md:hidden">
                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-1">{item.date}</h3>
                <h3 className="text-xl font-bold text-neutral-300 mb-1">{item.title}</h3>
                <h3 className="text-lg text-neutral-400">{item.job}</h3>
              </div>
              
              {/* Experience content */}
              <div className="space-y-3">
                {item.contents.map((content, contentIndex) => (
                  <p 
                    key={contentIndex} 
                    className={`text-neutral-400 leading-relaxed transition-all duration-700 delay-${contentIndex * 100} ${
                      visibleItems.has(index)
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    }`}
                  >
                    • {content}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TimelineOptimized);
