import React, { memo } from "react";
import LazyImage from "./LazyImage";

const ProjectCard = ({ project, index, onClick }) => {
  const { title, description, tags, image, webpImage } = project;

  const handleClick = () => {
    onClick(project);
  };

  return (
    <div className="flex-wrap items-center justify-between py-10 space-y-8 sm:flex sm:space-y-0 group">
      {/* Project Info */}
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-neutral-400 line-clamp-2 max-w-2xl">
            {description}
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span 
              key={tag.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300"
            >
              <img 
                src={tag.path} 
                alt={tag.name}
                className="w-3 h-3"
                loading="lazy"
              />
              {tag.name}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-3 py-1 text-xs text-neutral-500 rounded-full bg-white/5">
              +{tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Project Preview & CTA */}
      <div className="flex items-center gap-6 sm:flex-col sm:items-end">
        {/* Mini Preview */}
        <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
          <LazyImage
            src={image}
            webpSrc={webpImage}
            alt={title}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
        </div>

        {/* Read More Button */}
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 group-hover:scale-105"
        >
          View Details
          <img src="assets/arrow-right.svg" className="w-4 h-4" alt="" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-full mt-8">
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      </div>
    </div>
  );
};

// Memoize component để tránh re-render không cần thiết
export default memo(ProjectCard);
