import React, { Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SectionLoader from "./components/SectionLoader";

// Lazy load below-fold sections
const About = React.lazy(() => import("./sections/About"));
const Projects = React.lazy(() => import("./sections/Projects"));
const Experiences = React.lazy(() => import("./sections/Experiences"));
const Certificate = React.lazy(() => import("./sections/Certificate"));
const Contact = React.lazy(() => import("./sections/Contact"));
const Footer = React.lazy(() => import('./sections/Footer'));

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Experiences />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Certificate />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
