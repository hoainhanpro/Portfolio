import { useState, useMemo, lazy, Suspense, useCallback, useTransition } from "react";
import { myProjects } from "../constants";
import SectionLoader from "../components/SectionLoader";

// Lazy load components để giảm bundle size
const ProjectCard = lazy(() => import("../components/ProjectCard"));
const ProjectModal = lazy(() => import("../components/ProjectModal"));

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(3); // Chỉ hiển thị 2 projects đầu
  const [isPending, startTransition] = useTransition();
  
  // Memoize projects để tránh re-render không cần thiết
  const projects = useMemo(() => myProjects, []);

  // Memoize displayed projects
  const displayedProjects = useMemo(() => 
    projects.slice(0, visibleProjects), 
    [projects, visibleProjects]
  );

  const handleShowMore = useCallback(() => {
    startTransition(() => {
      setVisibleProjects(prev => Math.min(prev + 3, projects.length));
    });
  }, [projects.length]);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section className="relative c-space section-spacing">
      <h2 className="text-heading">My Personal Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      {/* Projects Grid với lazy loading */}
      <div className="mt-12 space-y-8">
        <Suspense fallback={<SectionLoader />}>
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={handleProjectClick}
            />
          ))}
        </Suspense>
      </div>

      {/* Show More Button */}
      {visibleProjects < projects.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            disabled={isPending}
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium transition-all hover:scale-105 shadow-lg ${
              isPending ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isPending ? 'Loading...' : `Load More Projects (${projects.length - visibleProjects} remaining)`}
          </button>
        </div>
      )}

      {/* Modal chỉ render khi cần */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </section>
  );
};

export default Projects;
