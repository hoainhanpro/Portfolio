import React, { useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import LazyImage from "./LazyImage";

const ProjectModal = ({ project, onClose }) => {
  const {
    title,
    description,
    subDescription,
    image,
    webpImage,
    mobileImage,
    mobileWebpImage,
    tags,
    href,
  } = project;

  // Prevent body scroll khi modal mở
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle ESC key và click outside
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Portal modal để tránh reflow issues
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-midnight border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* Header với close button */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white truncate pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image section */}
          <div className="lg:w-1/2 bg-black/20 flex items-center justify-center p-6">
            <div className="w-full max-w-md aspect-video">
              <LazyImage
                src={image}
                webpSrc={webpImage}
                alt={title}
                className="w-full h-full object-contain rounded-lg"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          {/* Content section */}
          <div className="lg:w-1/2 flex flex-col overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300"
                  >
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-4 h-4"
                      loading="lazy"
                    />
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-neutral-300">
                  {description}
                </p>
                {subDescription?.map((desc, index) => (
                  <p key={index} className="text-base leading-relaxed text-neutral-400">
                    • {desc}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer với action button */}
            {href && (
              <div className="p-6 border-t border-white/10 bg-black/20">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-lg"
                >
                  View Live Project
                  <img src="assets/arrow-up.svg" className="w-5 h-5" alt="" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal trong portal
  return createPortal(modalContent, document.body);
};

export default memo(ProjectModal);
