import React, { useEffect, useCallback } from "react";
import { motion } from "motion/react";
import OptimizedImage from "./OptimizedImage";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  webpImage,
  mobileImage,
  mobileWebpImage,
  tags,
  href,
  closeModal,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 sm:p-6 md:p-8 bg-black/60"
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-5xl h-[90vh] flex flex-col border shadow-2xl rounded-2xl bg-midnight border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 transition-all rounded-full top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
        </button>

        {/* Content Container - Two Column Layout */}
        <div className="flex flex-col h-full overflow-hidden md:flex-row">
          {/* Left Column - Image */}
          <div className="relative flex-shrink-0 w-full md:w-1/2 bg-black/20">
            <div className="sticky top-0 flex items-center justify-center h-full p-4 sm:p-6">
              <OptimizedImage
                src={image}
                webpSrc={webpImage}
                mobileSrc={mobileImage}
                mobileWebpSrc={mobileWebpImage}
                alt={title}
                width={600}
                height={400}
                className="object-contain w-full h-auto max-h-full rounded-lg shadow-lg"
                priority={true}
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto sm:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {/* Title */}
              <h5 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{title}</h5>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-white/10">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="rounded size-5"
                    />
                    <span className="text-sm text-neutral-300">{tag.name}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
                  {description}
                </p>
                {subDescription.map((subDesc, index) => (
                  <p key={index} className="text-base leading-relaxed text-neutral-400">
                    {subDesc}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer - View Project Button */}
            {href && (
              <div className="flex-shrink-0 p-6 border-t sm:p-8 bg-black/20 border-white/10">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 font-medium transition-all rounded-lg sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                >
                  View Live Project
                  <img src="assets/arrow-up.svg" className="size-5" alt="External link" />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Memoize ProjectDetails component - modal content doesn't need frequent re-renders
export default React.memo(ProjectDetails);
