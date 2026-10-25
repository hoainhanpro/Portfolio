import { useMemo } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = useMemo(
    () => [
      "python",
      "react",
      "typescript",
      "docker",
      "FastAPI",
      "pytorch",
      "postgresql",
      "crewai-color",
      "n8n",
      "azure",
      "git",
      "javascript",
      "springboot",
      "tailwindcss",
      "vitejs",
      "mongodb",
    ],
    []
  );

  const reversedSkills = useMemo(() => [...skills].reverse(), [skills]);

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {reversedSkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
